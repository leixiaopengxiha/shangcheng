<template>
    <div>
        webRTC 视频通话
        <div>
            我
            <video id="localVideo"></video>
           对方
            <video id="remoteVideo"></video>
            <div v-if="data.caller && data.calling">
            <p class="mb-4 text-white">等待对方接听...</p>
            <!-- <img style="width: 60px;" @click="hangUp" src="@/assets/guaDuang.png" alt=""> -->
             <p @click="hangUp">挂断</p>
            </div>
            <div v-if="data.called && data.calling">
            <p>收到视频邀请...</p>
            <div class="flex">
                <p @click="hangUp">挂断</p>
                <p @click="acceptCall">接听</p>
                <!-- <img style="width: 60px" @click="hangUp" src="@/assets/guaDuang.png" alt=""> -->
                <!-- <img style="width: 60px" @click="acceptCall" src="@/assets/jieTing.png" alt=""> -->
            </div>
            </div>
        </div>
        <div>
            <button @click="callRemote" style="margin-right: 10px">发起视频</button>
            <button @click="hangUp" style="margin-left: 10px">挂断视频</button>
        </div>
    </div>
</template>

  
  <script>
  import { useStore } from "vuex";
  import { computed, onMounted,reactive } from "vue";
  import Myelmenu  from '@/components/main/Aside/Myelmenu';
  import { useRouter, useRoute} from 'vue-router';
  import Headers from '@/components/main/Headers'
  import Tag from '@/components/main/Tag.vue'
  import {emitSocketEvent,onSocketEvent} from '@/util/socket.io'
  let roomId = '001';
  export default {
    components:{
      Myelmenu,
      Headers,
      Tag
    },
    setup() {
        const store = useStore();
        const router = useRouter()
        const data = reactive({
            wsSocket:null,//实例
            called:false,// 是否是接收方
            caller:false,// 是否是发起方
            calling:false,// 呼叫中
            communicating:false,// 视频通话中
            localVideo:null,// video标签实例，播放本人的视频
            remoteVideo:null,// video标签实例，播放对方的视频
            peer:null,
            localStream:null,
        })
        // 发起方发起视频请求
        let callRemote=async()=>{
            console.log('发起视频');
            data.caller = true;
            data.calling = true;
            // 向信令服务器发送发起请求的事件
            await getLocalStream();
            emitSocketEvent('callRemote', {roomId})
        };
        // 接收方同意视频请求
        let acceptCall=()=>{
            console.log('同意视频邀请');
            emitSocketEvent('acceptCall', {roomId})
        };
        // 挂断视频
        let hangUp = ()=>{
            emitSocketEvent('hangUp', {roomId})
        };
        let reset=async()=>{
            if(data.localStream){
                await data.localStream.getTracks().forEach(function(track) {
                    track.stop();
                });
            }
            data.called = false;
            data.caller = false;
            data.calling = false;
            data.communicating = false;
            data.peer = null;
            data.localVideo.srcObject = null;
            data.remoteVideo.srcObject = null;
            data.localStream = undefined;
            console.log('挂断结束视频-------')
        }
        // 获取本地音视频流
        let getLocalStream =async()=>{
            let obj = { audio: true, video: true };
            console.log(navigator.mediaDevices.getUserMedia(obj));
            const stream = await navigator.mediaDevices.getUserMedia(obj); // 获取音视频流
            data.localVideo.srcObject = stream;
            data.localVideo.play();
            data.localStream = stream;
            return stream;
        };
        onMounted(()=>{
            data.localVideo = document.getElementById('localVideo');
            data.remoteVideo = document.getElementById('remoteVideo');
            // console.log('onMounted-->',data);
            emitSocketEvent('joinRoom', {roomId}) // 前端发送加入房间事件
            onSocketEvent('callRemote', (sock) => {
                // 如果是发送方自己收到这个事件就不用管
                if (!data.caller){ // 不是发送方(用户A)
                    data.called = true; // 接听方
                    data.calling = true; // 视频通话中
                    getLocalStream()
                }
            });
            onSocketEvent('acceptCall',async ()=>{
                console.log('接听001-1');
                if (data.caller){
                    // getLocalStream()
                    // 用户A收到用户B同意视频的请求
                    data.peer = new RTCPeerConnection();
                    // 添加本地音视频流
                    data.peer.addStream && data.peer.addStream(data.localStream);
                    // 通过监听onicecandidate事件获取candidate信息
                    data.peer.onicecandidate = (event) => {
                    if (event.candidate) {
                        console.log('用户A获取candidate信息', event.candidate);
                        // 通过信令服务器发送candidate信息给用户B
                        emitSocketEvent('sendCandidate', {roomId, candidate: event.candidate})
                    }
                    }
                    // 接下来用户A和用户B就可以进行P2P通信流
                    // 监听onaddstream来获取对方的音视频流
                    data.peer.onaddstream = (event) => {
                    console.log('用户A收到用户B的stream',event.stream);
                    data.calling = false;
                    data.communicating = true;
                    data.remoteVideo.srcObject = event.stream;
                    data.remoteVideo.play();
                    }
                    // 生成offer
                    let offer = await data.peer.createOffer({
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1
                    })
                    console.log('offer', offer);
                    // 设置本地描述的offer
                    await data.peer.setLocalDescription(offer);
                    // 通过信令服务器将offer发送给用户B
                    emitSocketEvent('sendOffer', { offer, roomId })
                }
            })
            // 收到offer
            onSocketEvent('sendOffer',async (offer) => {
            if (data.called){ // 接收方 - 用户B
                console.log('收到offer',offer);
                // 创建自己的RTCPeerConnection
                data.peer = new RTCPeerConnection();
                // 添加本地音视频流
                const stream = await getLocalStream();
                data.peer.addStream && data.peer.addStream(stream);
                // 通过监听onicecandidate事件获取candidate信息
                data.peer.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log('用户B获取candidate信息', event.candidate);
                    // 通过信令服务器发送candidate信息给用户A
                    emitSocketEvent('sendCandidate', {roomId, candidate: event.candidate})
                }
                }
                // 接下来用户A和用户B就可以进行P2P通信流
                // 监听onaddstream来获取对方的音视频流
                data.peer.onaddstream = (event) => {
                console.log('用户B收到用户A的stream',event.stream);
                data.calling = false;
                data.communicating = true;
                data.remoteVideo.srcObject = event.stream;
                data.remoteVideo.play();
                }
                // 设置远端描述信息
                await data.peer.setRemoteDescription(offer);
                let answer = await data.peer.createAnswer();
                console.log('用户B生成answer',answer);
                await data.peer.setLocalDescription(answer);
                // 发送answer给信令服务器
                emitSocketEvent('sendAnswer', { answer, roomId })
            }
            })
            // 用户A收到answer
            onSocketEvent('sendAnswer',async (answer) => {
              if (data.caller){ // 接收方 - 用户A   判断是否是发送方
                // console.log('用户A收到answer',answer);
                await data.peer.setRemoteDescription(answer);
              }
            })
            // 收到candidate信息
            onSocketEvent('sendCandidate', async(candidate) => {
              console.log('收到candidate信息',candidate);
              // await data.peer.addIceCandidate(candidate) // 用户A和用户B分别收到candidate后，都添加到自己的peer对象上
            //   await data.peer.addCandidate(candidate)
              await data.peer.addIceCandidate(candidate)
            })
            // 挂断
            onSocketEvent('hangUp',()=>{
              reset()
            })
    // data.wsSocket = sock;
        })
        return {
            data,
            callRemote,
            hangUp,
            acceptCall,
        };
    },
  };
  </script>
  
  <style lang="less" scoped>
  .el-container {
    width: 100vw;
    height: 100vh;
  }
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding-left: 10px;
  }
  
  .el-aside {
    height: 100vh;
    background-color: #FFf;
    color: #333;
    text-align: left;
    transition: all .3s;
    overflow: hidden;
    overflow-y: scroll;
  }
  .el-aside ::-webkit-scrollbar {
    display: none; 
  }
  
  .el-main {
    width: 100% !important;
    background-color: #e9eef3;
    color: #333;
    box-sizing: border-box;
    padding: 0px;
    width: calc(100vw - 180px);
    height:calc(100vh - 60px) ;
    overflow: hidden;
    overflow: scroll;
  }
  
  .tag-box{
    white-space: nowrap;
    padding: 5px;
    padding-left: 10px;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    overflow: hidden;
    overflow-x: scroll;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .main-box-page{
    width: 100% !important;
    background-color: #e9eef3;
    color: #333;
    box-sizing: border-box;
    padding: 15px;
    width: 100%;
    height:calc(100vh - 110px);
    overflow: hidden;
    overflow: scroll;
  }
  .aside-wk{
    width: 180px !important;
  }
  .aside-wg{
    width: 0px !important;
  }
  
  </style>
  
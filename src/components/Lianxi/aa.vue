<template>
    
  <!-- <video id="video" ref="video" width="200" height="120" autoplay></video>
	<canvas style="width:0px;height:0px" id="canvas" width="480" height="640"></canvas>
  <div id="box" ref="box"></div>
  <img src="" alt="" id="img" ref="imgs"> -->
  <button @click="guanb">关闭</button>
</template>

<script>
  import {postImgpage} from '@/api/user'
  export default {
    data() {
      return {
        stream:null,
      }
    },
    mounted(){
            // let canvas = document.getElementById('canvas');
            // let context = canvas.getContext('2d');
            // let video = this.$refs.video;
            // let _this= this;
            // if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            //   navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            //         console.log(stream);
					  //         video.srcObject = stream;
            //         _this.stream = stream
            //         video.play();
                    
            //         setTimeout(function(){
            //             console.log(video);
            //              context.drawImage(video, 0, 0, 480, 640);
            //             // console.log(videos);
            //             // document.getElementById("video").src=videos
            //         },1000);
                   
            //         setTimeout(function(){
            //             var imgUrl = canvas.toDataURL('image/png');  
            //             _this.$refs.imgs.src=imgUrl;
            //             let file = _this.dataURLtoFile(imgUrl)
            //             let param = new FormData();
            //             //通过append向form对象添加数据
            //             param.append("file", file)
            //             param.append("id", stream.id)
            //             _this.postImgpages(param)
            //         },1500);
            //     },function(){alert("操作失败，权限不够！");});
            // }
    },
    methods:{
      // 将base64的图片转为文件流
      dataURLtoFile(dataUrl){
        const filename = `录像截图-${Date.now()}`;
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {
            type: mime
        })
      },
      
      async postImgpages(data){
       let aa =  await postImgpage(data)
       console.log(aa);
      },
      guanb(){
        console.log();
          // this.stream.getTracks().forEach(function(track) {
          //   track.stop();
          // });
      }
    },
    unmounted(){
      // this.stream.getTracks().forEach(function(track) {
      //   track.stop();
      // });
    }
  }
</script>
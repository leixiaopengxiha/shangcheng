<template>
  <div class="header-box">
    <div class="icon-boxs">
      <el-icon @click="onfold" :class="data.isAsideWidth?'el-icon-s-fold icon-size':'el-icon-s-unfold icon-size' "></el-icon>
    </div>
    <div class="header-contenr">
      <span class="c-texts">消息提示：</span>
      <span>欢迎进入</span>
    </div>
    <div class="flex-end">
      <img @click="btnheader" class="imgs" :src="data.urlIp+userList.avatar" alt="" />
    </div>
  </div>
  <el-drawer title="设置" v-model="data.drawer" :with-header="false">
    <h3>设置</h3>
    <div>
      <img @click="btnheader" class="imgsh" :src="data.urlIp+userList.avatar" alt="" />
      <div>{{ userList.username }}</div>
      <div>{{ userList.nickname }}</div>
      <div>{{ userList.introduction }}</div>
       <div @click="xgmmBtn">修改密码</div>
    </div>
     <el-dialog
      width="40%"
      title="修改密码"
      v-model="data.innerVisible"
      :close-on-click-modal='false'
      :destroy-on-close='true'
      append-to-body
    >
      <my-update-pswd :xgmmBtn="xgmmBtn" @busss="busss"></my-update-pswd>
    </el-dialog>
    <div @click="signOut">退出</div>
  </el-drawer>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted, reactive, defineComponent } from "vue";
import { useRouter, useRoute} from 'vue-router';
import UpdatePswd from './Update-pswd.vue'
export default defineComponent({
  name: "headers",
  components:{'my-update-pswd':UpdatePswd},
  setup() {
    const store = useStore();
     const router = useRouter();
    let data = reactive({
      drawer: false,
      innerVisible:false,
      isAsideWidth: computed(() => store.state.user.isAsideWidth),
      urlIp:process.env.VUE_APP_EXTERNAL_LINK,
    });
    const btnheader = () => {
      data.drawer = true;
    };
    const xgmmBtn = (datas) => {
      if(datas==false){
         data.innerVisible = false;
      }else{
         data.innerVisible = true;
      }
    };
    const signOut=()=>{
        sessionStorage.clear()
        store.dispatch('user/Roterlist',[]);
        store.dispatch('user/RouterPath','/main/home')
        router.push('/login')
    }
    const onfold=()=>{
      store.dispatch('user/IsAsideWidth',!data.isAsideWidth)
    }
    const busss = (datas)=>{
      console.log(datas)
    }
    return {
      data,
      userList: computed(() => store.state.user.userList),
      btnheader,
      signOut,
      onfold,
      xgmmBtn,
      busss,
    };
  },
});
</script>
<style lang="less" scoped>
.header-box {
  font-size: 15px;
  display: flex;
}
.header-contenr{
  flex:1;
  text-align: left;
}
.flex-end{
   display: flex;
   justify-content: flex-end;
}
.c-texts{
  color: red;
}
.imgs {
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
  margin: 10px 25px 0 10px;
  cursor: pointer;
}
.imgsh {
  width: 50px;
  height: 50px;
  display: inline-block;
  border-radius: 50%;
}
.icon-boxs{
  line-height: 70px;
}
.icon-size{
 font-size: 28px;
  color: #409EFF;
  padding-right:10px;
  cursor: pointer;
}
</style>
<template>
  <div class="header-box">
    <h3>{{ userList.nickname }}</h3>
    <img @click="btnheader" class="imgs" :src="userList.avatar" alt="" />
  </div>
  <el-drawer title="设置" v-model="data.drawer" :with-header="false">
    <h3>设置</h3>
    <div>
      <img @click="btnheader" class="imgsh" :src="userList.avatar" alt="" />
      <div>{{ userList.username }}</div>
      <div>{{ userList.nickname }}</div>
      <div>{{ userList.introduction }}</div>
    </div>
    <div @click="signOut">退出</div>
  </el-drawer>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted, reactive } from "vue";
import { useRouter, useRoute} from 'vue-router';
export default {
  name: "header",
  setup() {
    const store = useStore();
     const router = useRouter();
    let data = reactive({
      drawer: false,
    });

    const btnheader = () => {
      data.drawer = true;
    };
    const signOut=()=>{
        sessionStorage.clear()
        store.dispatch('Roterlist',[]);
        store.dispatch('RouterPath','/main/home')
        router.push('/login')
    }
    return {
      data,
      userList: computed(() => store.state.userList),
      btnheader,
      signOut,
    };
  },
};
</script>
<style lang="less" scoped>
.header-box {
  text-align: right;
  font-size: 15px;
  display: flex;
  justify-content: flex-end;
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
</style>
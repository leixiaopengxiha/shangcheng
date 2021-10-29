<template>
  <el-container>
    <el-aside width="180px">
       <Myelmenu :data='routeList'></Myelmenu>
    </el-aside>
    <el-container>
      <el-header>
        <Headers></Headers>
    </el-header>
      <el-main>
        <router-view v-if="$route.meta.keepAlive!=1"></router-view>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive==1"></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import Myelmenu  from '@/components/main/Aside/Myelmenu';
import { useRouter, useRoute} from 'vue-router';
import Headers from '@/components/main/Headers'
export default {
  components:{
    Myelmenu,
    Headers
  },
  setup() {
    const store = useStore();
    const router = useRouter()
    onMounted(()=>{
      let routerpath = store.state.routerpath
      router.push(routerpath)
    })
    return {
      routeList: computed(() => store.state.routeList),
      userList: computed(() => store.state.userList),
    };
  },
};
</script>
<style>
.el-container {
  width: 100vw;
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: left;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  box-sizing: border-box;
  padding: 15px;
  width: calc(100vw - 180px);
  height:calc(100vh - 60px) ;
  overflow: hidden;
  overflow: scroll;
}

</style>

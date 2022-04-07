<template>
  <el-container>
    <el-aside :class="data.isAsideWidth?'aside-wk':'aside-wg'">
       <Myelmenu :data='routeList'></Myelmenu>
    </el-aside>
    <el-container>
      <el-header>
        <Headers></Headers>
    </el-header>
      <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive >
              <component :is="Component" v-if="$route.meta.keepAlive" />
            </keep-alive>
             <component :is="Component" v-if="!$route.meta.keepAlive" />
          </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted,reactive } from "vue";
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
    const data = reactive({
      isAsideWidth: computed(() => store.state.isAsideWidth),
    })
    onMounted(()=>{
      let routerpath = store.state.routerpath
      router.push(routerpath)
    })
    
    return {
      data,
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
  padding: 15px;
  width: calc(100vw - 180px);
  height:calc(100vh - 60px) ;
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

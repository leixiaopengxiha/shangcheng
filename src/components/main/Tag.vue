<template>
    <el-tag v-for="(tag,index) in data.tabList" :key="tag.name" closable :type="data.routerpath==tag.path?'':'info'" @close='close(tag,index)' @click="tabRouer(tag,index)">
            {{tag.title?tag.title:tag.path}}
    </el-tag> 
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted,reactive } from "vue";
import { useRouter, useRoute} from 'vue-router';
export default {
  setup() {
    const store = useStore();
    const router = useRouter()
    const data = reactive({
      tags: [],
      idx:0,
      navactive: computed(() => store.state.user.navactive),
      tabList: computed(() => store.state.user.tabList),
      routerpath:computed(() => store.state.user.routerpath),

    })
   let close=(tag,idx)=>{
      if(data.tabList.length==1){
        return
      }
      let tabList =  data.tabList.filter((item)=>item.path!=tag.path)
      store.dispatch('user/CloseTabList',tabList)
      if(tag.navactive==data.navactive){
          tabRouer(tabList[0])
      }
    }
    let tabRouer = (tag,index)=>{
        sessionStorage.setItem("navactive",tag.navactive);
        store.dispatch('user/RouterPath',tag.navactive)
        router.push({path:tag.path})
    }
    return {
      data,
      close,
      tabRouer,
    };
  },
};
</script>

<style lang="less" scoped>

.el-tag{
    margin-right: 10px;
}
</style>

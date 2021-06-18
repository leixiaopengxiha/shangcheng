<template>
  <div>
    首页
    <router-link to="/main/home/myas">去我的详情</router-link>
    <el-switch v-model="data.isshow" active-color="#13ce66" inactive-color="#ff4949">
</el-switch>
  </div>
</template>

<script>
// import {postRouterpage} from '../api/user'
import {reactive} from 'vue'
export default {
  setup(){
    const  data = reactive({
       isshow:true
    })
    return {
      data
    }
  }

}
</script>
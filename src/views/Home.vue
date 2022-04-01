<template>
  <div>
    首页 <router-link to="/main/home/myas">去我的详情</router-link>
    <Haha></Haha>
  </div>
</template>
<script>
import Haha from '@/components/Lianxi/dictionaries.vue'
export default {
  components:{
    Haha
  }
}
</script>
<template>
    <el-empty description="没有此页面"></el-empty>
    {{data.time}}
    <router-link to="/main/home">回到首页</router-link>
</template>
<script>
import { onMounted, reactive,  } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
   setup() {
    const router = useRouter();
    let data = reactive({
      time: 2,
    });
    onMounted(()=>{
        console.log(data.time)
       let times =  setInterval(()=>{
           if(data.time==0){
               clearInterval(times)
               router.replace("/main/home");

           }else{
               data.time--
           }
       },1000)

    })
    return {
        data
    };
  },
}
</script>
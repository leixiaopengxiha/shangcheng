<template>
    <div class="box-404">
        <el-empty description="没有此页面"></el-empty>
        <div class="text-404">
            {{data.time}}
            <router-link to="/main">回到首页</router-link>
        </div>
    </div>
</template>
<script>
import { onMounted, reactive, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
   setup() {
    const router = useRouter();
    let data = reactive({
      time: 5,
      dataTimes:null,
    });
    onMounted(()=>{
       data.dataTimes =  setInterval(()=>{
           if(data.time==0){
               router.replace("/main");
           }else{
               data.time--
           }
       },1000)

    })
    onUnmounted(() => {
         clearInterval(data.dataTimes)
    })
    return {
        data
    };
  },
}
</script>
<style lang="less" scoped>
.box-404{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.text-404{
    text-align: center;
}
</style>
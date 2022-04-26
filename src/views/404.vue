<template>
    <div class="box-404">
        <el-empty description="没有此页面"></el-empty>
        <div class="text-404">
            {{data.time}}
             <span class="fanghui" @click="fanghui()">回到首页</span>
        </div>
    </div>
</template>
<script>
import { useStore } from "vuex";
import { onMounted, reactive, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
   setup() {
    const store = useStore();
    const router = useRouter();
    let data = reactive({
      time: 5,
      dataTimes:null,
    });
    onMounted(()=>{
        store.dispatch("user/RouterPath", "/main/home");
        store.dispatch('user/Navactive','/main/home')
        sessionStorage.setItem("urls",'/main/home');
        sessionStorage.setItem("navactive",'/main/home');
        data.dataTimes =  setInterval(()=>{
            if(data.time==0){
                    clearInterval(data.dataTimes)
                    store.dispatch('user/ClosePage')
                    router.replace("/main");
            }else{
                data.time--
            }
        },1000)

    })
    onUnmounted(() => {
         clearInterval(data.dataTimes)
    })
    let fanghui=()=>{
        store.dispatch('user/ClosePage')
        router.replace("/main/home");
    }
    return {
        data,
        fanghui
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
.fanghui{
    cursor: pointer;
}
.fanghui:hover{
    color: red;
}
</style>
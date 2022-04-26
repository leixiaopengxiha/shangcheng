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
import { onMounted, reactive, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
   setup() {
    const router = useRouter();
    const store = useStore()
    let data = reactive({
      time: 5,
      dataTimes:null,
    });
    onMounted(()=>{
       data.dataTimes =  setInterval(()=>{
           if(data.time==0){
                clearInterval(data.dataTimes)
                store.dispatch('user/ClosePage')
                router.replace("/main/home");
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
        fanghui,
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
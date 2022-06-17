<template>
<div  id="left-menu">
     <el-menu 
        class="el-menu-vertical-demo"
        :default-active="navactive?navactive:route.path"
        router
        @select="funSelect"
        :collapse="false">
        <MenuItem :route="count"></MenuItem>
    </el-menu>
</div>
</template>

<script>
import { ref,computed } from "vue";
import { useRouter,useRoute } from 'vue-router';
import MenuItem from './MenuItem'
import { useStore } from "vuex";
export default {
    props: {
        data: {
            type:Array
        }
    },
    components: { MenuItem },
    setup(props){
        const store = useStore();
       let funSelect=(e)=>{
            store.dispatch('user/Navactive',e)
            sessionStorage.setItem("navactive",e);
        }
        const route = useRoute();
        const count = ref(props.data)
        return {
            count,
            route,
            funSelect,
            navactive: computed(() => store.state.user.navactive),
        }
    }
}
</script>
<style lang="less">
    // 使左边的菜单外层的元素高度充满屏幕
    // #left-container{
    //     position: absolute;
    //     top: 100px;
    //     bottom: 0px;
        // 使菜单高度充满屏幕
        #left-menu, .el-menu-vertical-demo{
            height: 100%;
        }
    // }
</style>
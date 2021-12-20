
<template>
    <div class="container-adapt">


    <div> 
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first"></el-tab-pane>
             <el-tab-pane label="角色管理" name="third"></el-tab-pane>
        </el-tabs>
    </div>
    <div v-if="activeName=='first'">
        <user-first></user-first>
    </div>
     <div v-if="activeName=='third'">
       <user-third></user-third>
    </div>
    </div>
</template>

<script>
import UserFirst from './User-first.vue';
import UserThird from './User-third.vue';
export default {
    components: {UserFirst,UserThird},
    data() {
      return {
        activeName: 'first'
      };
    }, 
    created(){
        let activeName = sessionStorage.getItem('user-menu-tab')
        if(activeName){
            this.activeName = activeName
        }
    },
    methods: {
        handleClick(tab, event) {
            sessionStorage.setItem('user-menu-tab',this.activeName)
        },
    },
    unmounted(){
        sessionStorage.removeItem('user-menu-tab')
    },
}
</script>

<style>

</style>
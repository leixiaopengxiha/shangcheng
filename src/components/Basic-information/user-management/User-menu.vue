
<template>
    <div> 
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
             <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        </el-tabs>
    </div>
    <div v-if="activeName=='first'">
        <user-first></user-first>
    </div>
     <div v-if="activeName=='third'">
       <user-third></user-third>
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
    
    methods: {
        handleClick(tab, event) {
            console.log(tab.props);
        },
    },
}
</script>

<style>

</style>
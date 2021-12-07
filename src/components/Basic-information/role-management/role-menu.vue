
<template>
    <div class="container-adapt">
        <div> 
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="角色路由权限" name="first"></el-tab-pane>
                <el-tab-pane label="角色人员配置" name="third"></el-tab-pane>
            </el-tabs>
        </div>
        <div v-if="activeName=='first'">
            <role-permissions></role-permissions>
        </div>
        <div v-if="activeName=='third'">
        <role-lersonnel></role-lersonnel>
        </div>
    </div>
</template>

<script>
// 角色路由权限
import RolePermissions from './role-permissions.vue';
// 角色人员配置
import RoleLersonnel from './role-personnel.vue';
export default {
    components: {RolePermissions,RoleLersonnel},
    data() {
      return {
        activeName: 'first'
      };
    }, 
    created(){
        let activeName = sessionStorage.getItem('role-menu-tab')
        if(activeName){
            this.activeName = activeName
        }
    },
    methods: {
        handleClick(tab, event) {
            sessionStorage.setItem('role-menu-tab',this.activeName)
        },
    },
    unmounted(){
        sessionStorage.removeItem('role-menu-tab')
    },
}
</script>

<style>

</style>
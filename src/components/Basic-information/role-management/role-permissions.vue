<template>
   <!--  角色路由权限 -->
    <div>
        <el-tree
        :data="tableData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        class="table-box-adapt table-box-scroll"
        :props="defaultProps">
        </el-tree>
         <div class="menu-operation menu-operation-btn">
            <el-button  :disabled="(handleMenu.id=='4000000000000007')?true:false" type="primary" @click="getCheckedKeys">保存</el-button>
            <el-button  @click="cancel">返回</el-button>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import { postRouterpage,postAllRolePermissions,postAddRolePermissions } from "../../../api/user";
import {Router_tree} from '../../../util/router_tree'
export default {
 
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'title',
        },
        loading:{},
        tableData:[],
      };
    },
    computed: {
        ...mapState(["handleMenu","userList"]),
    },
    mounted(){
    if(!this.handleMenu['username']){
        let handleMenu =  JSON.parse(sessionStorage.getItem('HandleMenu'))
        this.$store.dispatch('HandleMenu', handleMenu)
    }
    this.postRouterpagesa()
    console.log()
    console.log(this.handleMenu.id)
    this.postAllRolePermissionss({roleId:this.handleMenu.id})
    },
    methods: {
       async postAllRolePermissionss(data){
           this.loading = this.$loading({
                lock: true,
                text: '正在加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let router = await postAllRolePermissions(data);
            if (router.code == 2000) {
                this.loading.close();
                this.setCheckedKeysd(router.data)
            } else {
                this.loading.close();
                this.$message.error(data.message);
            }
       },
         // 获取
        async postRouterpagesa(data) {
            this.loading = this.$loading({
                lock: true,
                text: '正在加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
            let router = await postRouterpage(data);
            if (router.code == 2000) {
                this.loading.close();
                this.tableData =Router_tree(router.data);
            } else {
                this.loading.close();
                this.$message.error(data.message);
            }
        },
         // 
        async postAddRolePermissionss(data) {
            this.loading = this.$loading({
                lock: true,
                text: '正在加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let router = await postAddRolePermissions(data);
            if (router.code == 2000) {
                this.loading.close();
                this.$message.success({
                    message: router.message,
                    type: "success",
                });
            } else {
                this.loading.close();
                this.$message.error(router.message);
            }
        },
        getCheckedKeys() {
            let datas = {roleId:this.handleMenu.id,list:this.$refs.tree.getCheckedKeys()}
            this.postAddRolePermissionss(datas)
            
        },
        cancel(){
            this.$router.push('/main/role-management/role-management-main')
        },
        setCheckedKeysd(data) {
            this.$refs.tree.setCheckedKeys(data);
        },
    },
    
}
</script>

<style lang="less" scoped>

.menu-operation {
  display: flex;
  justify-content: flex-end;
}
.menu-operation-btn{
    margin-top: 10px;
}
.table-box-scroll{
    overflow: hidden;
    overflow-y: scroll;
}
</style>
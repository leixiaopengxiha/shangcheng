<template>
   <!-- 角色人员配置 -->
    <div>
        <el-tree
        :data="tableData"
        show-checkbox
        default-expand-all
        node-key="username"
        ref="tree"
        highlight-current
        class="table-box-adapt table-box-scroll"
        :props="defaultProps">
        </el-tree>
         <div class="menu-operation menu-operation-btn">
            <el-button  type="primary" @click="getCheckedKeys">保存</el-button>
            <el-button  @click="cancel">返回</el-button>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import { AllUserpage,postAddRolePersonnel,postAllRolePersonnel } from "../../../api/user";
// import {Router_tree} from '../../../util/router_tree'
export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'nickname',
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
        this.AllUserpages()
        this.postAllRolePersonnels({roleId:this.handleMenu.id})
    },
    methods: {
        async postAllRolePersonnels(data){
           this.loading = this.$loading({
                lock: true,
                text: '正在加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let router = await postAllRolePersonnel(data);
            if (router.code == 2000) {
                this.loading.close();
                this.setCheckedKeysd(router.data)
            } else {
                this.loading.close();
                this.$message.error(data.message);
            }
        },
          // 获取
        async AllUserpages() {
            this.loading = this.$loading({
                lock: true,
                text: '正在加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let router = await AllUserpage();
            if (router.code == 2000) {
                this.loading.close();
                let arr =  router.data.filter(item=>item.username!='admin')
                this.tableData = arr
            } else {
                this.loading.close();
                this.$message.error(router.message);
            }
        },
         // 
        async postAddRolePersonnels(data) {
            this.loading = this.$loading({
                lock: true,
                text: '正在加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let router = await postAddRolePersonnel(data);
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
            this.postAddRolePersonnels(datas)
            
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
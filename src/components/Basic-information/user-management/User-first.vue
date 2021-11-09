
<template>
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
            <el-button  type="primary" @click="getCheckedKeys">保存</el-button>
            <el-button  @click="cancel">返回</el-button>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import { postUpUserRouter,AllQueryRouterList } from "../../../api/user";
import {Router_tree} from '../../../util/router_tree'
export default {
 
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        loading:{},
        tableData:[],
      };
    },
    computed: {
        ...mapState(["handleMenu","routeList"]),
    },
    mounted(){
    if(!this.handleMenu['roles']){
       let handleMenu =  JSON.parse(sessionStorage.getItem('HandleMenu'))
         this.$store.dispatch('HandleMenu', handleMenu)
    }

    this.postRouterpagesa()
    },
    methods: {
         // 获取
        async postRouterpagesa() {
            this.loading = this.$loading({
                lock: true,
                text: '正在加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
            let router = await AllQueryRouterList({});
            if (router.code == 2000) {
                this.loading.close();
                this.tableData =Router_tree(router.data);
                this.setCheckedKeysd()
              
            } else {
                this.loading.close();
                this.$message.error(data.message);
            }
        },
         // 
        async postUpUserRouters(data) {
            this.loading = this.$loading({
                lock: true,
                text: '正在加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let router = await postUpUserRouter(data);
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
            let datas = {...this.handleMenu,roles:this.$refs.tree.getCheckedKeys()}
            this.postUpUserRouters(datas)
            
        },
        cancel(){
            this.$router.push('/main/user-management')
        },
        setCheckedKeysd() {
           let roles =  this.handleMenu['roles']
            this.$refs.tree.setCheckedKeys(roles);
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
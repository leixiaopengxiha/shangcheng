
<template>
    <div>
        <el-tree
        :data="tableData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
        </el-tree>
        <div class="buttons">
        <el-button @click="getCheckedKeys">保存</el-button>
        <el-button @click="cancel">取消</el-button>
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
                this.$router.push('/main/user-management')
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
            this.$refs.tree.setCheckedKeys(this.handleMenu.roles);
        },
    },
}
</script>

<style>

</style>
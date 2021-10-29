<template>
  <div class="menu-boxs">
     <div class="menu-nav">
      <div class="menu-shou">
        <el-input
          class="input-user"
          placeholder="请输入内容用户名"
          v-model="title"
          clearable>
        </el-input>
         <el-button type="primary" @click="postRouterpages">查询</el-button>
      </div>
      <div class="menu-operation">
        <div>
          <el-button type="primary" @click="menuAdd">添加</el-button>
        </div>
      </div>
    </div>
    <div class="table-boxa">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :height="height+'vh'"
        align="center"
        :highlight-current-row="true"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <!-- <el-table-column type="selection"> </el-table-column> -->
        <el-table-column prop="title" label="菜单名称" width="150">
        </el-table-column>
        <el-table-column prop="sortid" label="显示顺序" width="100">
        </el-table-column>
        <el-table-column prop="pid" label="上级菜单" width="150">
          <template #default="scope">{{
            scope.row.pid == 0 ? "根菜单" : fnPid(scope.row.pid)
          }}</template>
        </el-table-column>
        <el-table-column prop="icon" label="图标" width="50">
          <template #default="scope">
             <i :class="scope.row.icon"></i>
           </template>
        </el-table-column>
         <el-table-column prop="path" label="路由地址"> </el-table-column>
        <el-table-column prop="redirect" label="重定向"> </el-table-column>
        <el-table-column prop="component" label="组件路径"> </el-table-column>

        <el-table-column prop="sidebar" label="使用状态" width="150">
          <template #default="scope">{{
            scope.row.sidebar == 1 ? "已在侧边栏使用" : "未在侧边栏使用"
          }}</template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="menu-operation block" style="margin-top: 20px" v-if="total">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 添编辑加弹框 -->
    <FunctionMenuAdd
      v-if="ishouAdd"
      :menuadd="menuAdd"
      :rowlist="rowList"
    ></FunctionMenuAdd>
  </div>
</template>
<script>
import FunctionMenuAdd from './Function-menu-add'
import { postDeleteRouterpage,AllQueryRouterList } from "../../../api/user";
export default {
  data() {
    return {
      ishouAdd: false,
      currentPage: 1,
      tableData: [],
      multipleSelection: [],
      height: "17",
      total: 1,
      size: 10,
      rowList: {},
      title:'',
      loading:{}
    };
  },
  components: {
    FunctionMenuAdd,
  },
  mounted() {
    this.postRouterpages();
  },
  computed: {},
  methods: {
    fnPid(pid) {
      if (pid != undefined) {
        let aa = this.tableData.find((item) => item.id == pid);
        return aa?aa.title:'上级菜单已删除请进行修改';
      }
    },
    // 获取
    async postRouterpages() {
       let data = {
          size:this.size,
          currentPage:this.currentPage
      }
      if(this.title){
        data.title = this.title
      }
      this.loading = this.$loading({
          lock: true,
          text: '正在加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      let router = await AllQueryRouterList(data);
      if (router.code == 2000) {
        if (router.data.length<7||this.height>74) {
          if (router.data.length == 0) {
            this.height = "14";
          }else if (router.data.length == 1) {
            this.height = "14";
          } 
          else {
            this.height = `${router.data.length * 10}`;
          }
        } else {
          this.height = "74";
        }
        this.tableData = router.data;
        this.total = router.total
        this.loading.close();
      } else {
        this.$message.error(data.message);
      }
    },
    // 删除
    async postDeleteRouterpages(row) {
      let data = await postDeleteRouterpage(row);
      if (data.code == 2000) {
        this.$message.success({
          message: data.message,
          type: "success",
        });
        this.postRouterpages();
      } else {
        this.$message.error(data.message);
      }
    },

    menuAdd(ishow) {
      if (ishow == "addshou") {
        this.postRouterpages();
      }
      this.rowList = {};
      this.ishouAdd = !this.ishouAdd;
    },
    handleSizeChange(val) {
      this.size = val;
      this.postRouterpages();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.postRouterpages();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.rowList = JSON.parse(JSON.stringify(row));
      this.ishouAdd = true;
    },
    handleDelete(index, row) {
      this.postDeleteRouterpages(row);
    },
  },
};
</script>
<style lang="less" scoped>
.menu-boxs {
  // position: relative;
}
.menu-nav{
  display: flex;
}
.menu-shou{
  flex:1;
}
.input-user{
  width: 30%;
  margin-right: 10px;
}
.table-boxa {
  margin: 20px 0;
}
.menu-operation {
  display: flex;
  justify-content: flex-end;
}
</style>
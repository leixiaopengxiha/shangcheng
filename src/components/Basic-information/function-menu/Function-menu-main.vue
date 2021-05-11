<template>
  <div class="menu-boxs">
    <div class="menu-operation">
      <div>
        <el-button type="primary" @click="menuAdd">添加</el-button>
      </div>
    </div>

    <div class="table-boxa">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :height="height"
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
    <div class="menu-operation block" style="margin-top: 40px" v-if="total">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
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
import { postRouterpage, postDeleteRouterpage } from "../../../api/user";
export default {
  data() {
    return {
      ishouAdd: false,
      currentPage4: 1,
      tableData: [],
      multipleSelection: [],
      height: "15vh",
      total: 1,
      size: 10,
      rowList: {},
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
      let router = await postRouterpage();
      if (router.code == 2000) {
        if (this.size > router.data.length) {
          if (router.data.length == 0) {
            this.height = "15vh";
          } else {
            this.height = `${router.data.length * 9}vh`;
          }
        } else {
          this.height = "70vh";
        }
        this.tableData = router.data;
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
      this.height = "70vh";
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.rowList = row;
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
.table-boxa {
  margin: 20px 0;
}
.menu-operation {
  display: flex;
  justify-content: flex-end;
}
</style>
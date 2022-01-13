<template>
  <div class="menu-boxs container-adapt">
    <div class="menu-nav">
      <div class="menu-shou">
        <div class="menu-box">
          <span>表单编号：</span>
          <el-input
            class="input-user"
            placeholder="表单编号"
            v-model="formId"
            clearable
          >
          </el-input>
        </div>
        <div class="menu-box">
          <span>表单名称：</span>
          <el-input
            class="input-user"
            placeholder="表单名称"
            v-model="formName"
            clearable
          >
          </el-input>
        </div>

        <el-button type="primary" @click="postGetAllFormLists">查询</el-button>
      </div>
      <div class="menu-operation">
        <div>
          <el-button type="primary" @click="menuAdd">添加</el-button>
        </div>
      </div>
    </div>
    <div class="table-boxa table-box-adapt">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="100%"
        align="center"
        :highlight-current-row="true"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <!-- <el-table-column type="selection"> </el-table-column> -->
        <el-table-column prop="formName" label="表单名称"> </el-table-column>
        <el-table-column prop="formId" label="表单编号"> </el-table-column>
        <el-table-column prop="fontSize" label="字体大小"> </el-table-column>
        <el-table-column prop="sidebar" label="使用状态">
          <template #default="scope">{{
            scope.row.sidebar == 1 ? "使用" : "禁用"
          }}</template>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleConfigure(scope.$index, scope.row)"
              >配置</el-button
            >
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            > -->
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
    <FormConfigurationAdd
      v-if="ishouAdd"
      :menuadd="menuAdd"
      :rowlist="rowList"
    ></FormConfigurationAdd>
  </div>
</template>
<script>
import FormConfigurationAdd from "./form-configuration-add";
import { postGetAllFormList } from "../../../api/user";
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
      formName: "",
      formId: "",
      loading: {},
    };
  },
  components: {
    FormConfigurationAdd,
  },
  mounted() {
    this.postGetAllFormLists();
  },
  computed: {},
  methods: {
    // 获取
    async postGetAllFormLists() {
      let data = {
        size: this.size,
        currentPage: this.currentPage,
      };
      if (this.formName) {
        data.formName = this.formName;
      }
      if (this.formId) {
        data.formId = this.formId;
      }
      this.loading = this.$loading({
        lock: true,
        text: "正在加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let router = await postGetAllFormList(data);
      if (router.code == 2000) {
        this.tableData = router.data;
        this.total = router.total;
        this.loading.close();
      } else {
        this.loading.close();
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
        this.postGetAllFormLists();
      } else {
        this.$message.error(data.message);
      }
    },
    menuAdd(ishow) {
      if (ishow == "addshou") {
        this.postGetAllFormLists();
      }
      this.rowList = {};
      this.ishouAdd = !this.ishouAdd;
    },

    handleSizeChange(val) {
      this.size = val;
      this.postGetAllFormLists();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.postGetAllFormLists();
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
    handleConfigure(index, row) {
      console.log(row);
      sessionStorage.setItem(
        "from-to-configure",
        JSON.stringify({ formId: row.formId, formName: row.formName })
      );
      this.$router.push("/main/form-configuration/from-to-configure");
    },
  },
};
</script>
<style lang="less" scoped>
.menu-boxs {
  // position: relative;
}
.menu-nav {
  display: flex;
}
.menu-shou {
  flex: 1;
  display: flex;
}
.input-user {
  // width: 30%;
  flex: 1.5;
  margin-right: 10px;
}
.table-boxa {
  margin: 10px 0;
}
.menu-operation {
  display: flex;
  justify-content: flex-end;
}
.menu-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-1 {
  flex: 1;
}
</style>
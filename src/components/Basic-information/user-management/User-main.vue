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
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称">
        </el-table-column>
         <el-table-column prop="avatar" label="头像">
              <template #default="scope">
                  <img class="img-colum" :src="scope.row.avatar" >
              </template>
        </el-table-column>

        <el-table-column prop="date" label="创建时间" >
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
    <UserAdd
      v-if="ishouAdd"
      :menuadd="menuAdd"
    ></UserAdd>
  </div>
</template>
<script>
import UserAdd from './User-add'
import { AllUserpage, Deleteuserpage } from "../../../api/user";
export default {
  data() {
    return {
      ishouAdd: false,
      tableData: [],
      multipleSelection: [],
      height: "17vh",
      total: 100,
      size: 10,
      currentPage4: 1,
    };
  },
  components: {
      UserAdd
  },
  mounted() {
    this.AllUserpages();
  },
  computed: {},
  methods: {
    // 获取
    async AllUserpages() {
      let router = await AllUserpage();
      if (router.code == 2000) {
        if (this.size > router.data.length) {
          if (router.data.length == 0) {
            this.height = "15vh";
          }else if (router.data.length == 1) {
            this.height = "15vh";
          } 
           else {
            this.height = `${router.data.length * 10}vh`;
          }
        } else {
          this.height = "70vh";
        }
        this.tableData = router.data;
      } else {
        this.$message.error(router.message);
      }
    },
    // 删除
    async Deleteuserpages(row) {
      let data = await Deleteuserpage(row);
      if (data.code == 2000) {
        this.$message.success({
          message: data.message,
          type: "success",
        });
        this.AllUserpages();
      } else {
        this.$message.error(data.message);
      }
    },

    menuAdd(ishow) {
        console.log('sjdk')
      if (ishow == "addshou") {
        this.AllUserpages();
      }
      this.ishouAdd = !this.ishouAdd;
    },
    handleSizeChange(val) {
    //   this.height = "70vh";
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.ishouAdd = true;
    },
    handleDelete(index, row) {
      this.Deleteuserpages(row);
    },
  },
};
</script>
<style lang="less" scoped>
.menu-boxs {
  // position: relative;
}
.img-colum{
    width: 20px;
    height: 20px;
}
.table-boxa {
  margin: 20px 0;
}
.menu-operation {
  display: flex;
  justify-content: flex-end;
}
</style>
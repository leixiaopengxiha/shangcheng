<template>
  <div class="menu-boxs container-adapt">
    <div class="menu-nav">
      <div class="menu-shou">
        <el-input
          class="input-user"
          placeholder="请输入内容用户名"
          v-model="username"
          clearable>
        </el-input>
         <el-button type="primary" @click="AllUserpages">查询</el-button>
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
        height='100%'
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
          <el-table-column prop="operationtime" label="登录时间" >
        </el-table-column>
        <el-table-column label="操作" width="270">
          <template #default="scope">
             <el-button size="mini" @click="handleMenu(scope.$index, scope.row)"
              >用户管理</el-button
            >
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >修改密码</el-button
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
    <UserAdd
      v-if="ishouAdd"
      :menuadd="menuAdd"
      :editlist='editList'
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
      height: "17",
      total: 0,
      size: 10,
      currentPage: 1,
      username:'',
      editList:'',
      loading:{}
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
      let data = {
          size:this.size,
          currentPage:this.currentPage
      }
      if(this.username){
        data.username = this.username
      }
      this.loading = this.$loading({
        lock: true,
        text: '正在加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let router = await AllUserpage(data);
      if (router.code == 2000) {
        if (router.data.length<7||this.height>74) {
          if (router.data.length == 0) {
            this.height = "15";
          }else if (router.data.length == 1) {
            this.height = "15";
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
        this.loading.close();
        this.$message.error(router.message);
      }
    },
    // 删除
    async Deleteuserpages(row) {
      this.loading = this.$loading({
        lock: true,
        text: '正在加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
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
      this.editList = ''
      if (ishow == "addshou") {
        this.AllUserpages();
      }
      this.ishouAdd = !this.ishouAdd;
    },
    handleSizeChange(val) {
      this.size = val
      this.AllUserpages()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.AllUserpages()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.editList = JSON.parse(JSON.stringify(row))
      this.ishouAdd = true;
    },
    handleDelete(index, row) {
      this.Deleteuserpages(row);
    },
    handleMenu(index, row){
      sessionStorage.setItem('HandleMenu',JSON.stringify(row))
      this.$store.dispatch('HandleMenu', JSON.parse(JSON.stringify(row)))
      this.$router.push('/main/user-management/User-menu')
    }
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
  margin: 10px 0;
}
.menu-operation {
  display: flex;
  justify-content: flex-end;
}
</style>
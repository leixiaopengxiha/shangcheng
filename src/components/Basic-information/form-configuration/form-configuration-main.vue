<template>
     <div class="menu-boxs container-adapt">
    <div class="menu-nav">
      <div class="menu-shou">
        <div class="menu-box">
          <span >表单编号：</span>
          <el-input
            class="input-user"
            placeholder="表单编号"
            v-model="fromId"
            clearable>
          </el-input>
        </div>
        <div class="menu-box">
          <span>表单名称：</span>
           <el-input
            class="input-user"
            placeholder="表单名称"
            v-model="fromName"
            clearable>
          </el-input>
        </div>
        
         <el-button type="primary" @click="postRouterpages">查询</el-button>
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
        <el-table-column prop="fromName" label="表单名称">
        </el-table-column>
        <el-table-column prop="fromId" label="表单编号" >
        </el-table-column>
         <el-table-column prop="fontSize" label="字体大小" >
        </el-table-column>
        <el-table-column prop="sidebar" label="使用状态">
          <template #default="scope">{{
            scope.row.sidebar == 1 ? "使用" : "禁用"
          }}</template>
        </el-table-column>

        <el-table-column label="操作" width="250">
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
    <FormConfigurationAdd
      v-if="ishouAdd"
      :menuadd="menuAdd"
      :rowlist="rowList"
    ></FormConfigurationAdd>
  </div>
</template>
<script>
import FormConfigurationAdd from './form-configuration-add'
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
      fromName:'',
      fromId:'',
      loading:{}
    };
  },
  components: {
    FormConfigurationAdd
  },
  mounted() {
    this.postRouterpages();
  },
  computed: {},
  methods: {
    // 获取
    async postRouterpages() {
       let data = {
          size:this.size,
          currentPage:this.currentPage
      }
      if(this.fromName){
        data.fromName = this.fromName
      }
      if(this.fromId){
          data.fromId = this.fromId
      }
        let datas = [
          {
            fromName:'受益权转让新增',
            fromId:'1234567890',
            fontSize:'14',
            sidebar:'1',
          },
           {
            fromName:'中后期-赎回-新增弹窗',
            fromId:'1234567891',
            fontSize:'14',
            sidebar:'0',
          }
        ]
        this.tableData = datas;
        this.total = datas.length
      // this.loading = this.$loading({
      //     lock: true,
      //     text: '正在加载中',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   });
      // let router = await AllQueryRouterList(data);
      // if (router.code == 2000) {
      //   this.tableData = router.data;
      //   this.total = router.total
      //   this.loading.close();
      // } else {
      //   this.loading.close();
      //   this.$message.error(data.message);
      // }
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
    handleConfigure(index, row){
      console.log(row,'配置')
      this.$router.push('/main/form-configuration/from-to-configure')
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
  display: flex;
}
.input-user{
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
.menu-box{
  display: flex;
  align-items:center;
  justify-content:center;
}
.flex-1{
  flex: 1;
}
</style>
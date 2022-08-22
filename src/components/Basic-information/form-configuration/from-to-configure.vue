<template>
  <div class="menu-boxs container-adapt">
    <div class="menu-nav">
      <div class="menu-shou">
        <div class="menu-box mr-2">
          <span>表单编号：</span>
          <span>{{ fromData.formId }}</span>
        </div>
        <div class="menu-box">
          <span>表单名称：</span>
          <span>{{ fromData.formName }}</span>
        </div>
      </div>
      <div class="menu-operation">
        <div>
          <el-button type="primary" @click="menuAdd">添加</el-button>
          <el-button type="primary" @click="() => weiyi('shang')"
            >上移</el-button
          >
          <el-button type="primary" @click="() => weiyi('xia')" >下移</el-button>
          <el-button type="primary" @click="yulian" :disabled="!tableData.length">预览</el-button>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="formModel" label="英文名称"> </el-table-column>
        <el-table-column prop="label" label="属性名称"> </el-table-column>
        <el-table-column prop="type" label="控件类型	"> </el-table-column>
          <el-table-column prop="text" label="按钮名称"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
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
    <div class="menu-operation menu-operation-btn">
      <el-button type="primary" :disabled="!tableData.length&&!deleteList.length" @click="getCheckedKeys">保存</el-button>
      <el-button @click="cancel">返回</el-button>
    </div>
    <!-- 添编辑加弹框 -->
    <template v-if="ishouAdd">
      <FromToConfigureAdd
        :menuadd="menuAdd"
        @onaddformitem="onAddFormItem"
      ></FromToConfigureAdd>
    </template>
  <!-- 预览弹框 -->
     <template v-if="isyulian">
      <FromToConfigureYulian
        :yulian="yulian"
        :data="fromData"
        :tableData="tableData"
      ></FromToConfigureYulian>
    </template>
     <!-- 表单配置页面 -->
     <template v-if="ispeizhi">
      <FromToConfigurePeizhi
        :rowList="rowList"
        :peizhiEixt="peizhiEixt"
      ></FromToConfigurePeizhi>
    </template>
  </div>
</template>

<script>
import FromToConfigureAdd from "./from-to-configure-add";
import FromToConfigureYulian from './from-to-configure-yulian';
import FromToConfigurePeizhi from './from-to-configure-peizhi.vue';

import {postAllFormConfigurationList,postAddFormConfiguration} from '@/api/user'
export default {
  data() {
    return {
      ishouAdd: false,
      isyulian: false,
      ispeizhi: false,
      fromData: {},
      tableData: [],
      rowList: {},
      multipleSelection: [],
      deleteList: [],
    };
  },
  components: {
    FromToConfigureAdd,
    FromToConfigureYulian,
    FromToConfigurePeizhi
  },
  created() {
    this.fromData = JSON.parse(sessionStorage.getItem("from-to-configure"));
  },
  mounted() {
    this.postGetAllFormLists();
  },
  methods: {
    // 预览
    yulian(){
      this.isyulian = !this.isyulian;
    },
    onAddFormItem(data) {
      this.ishouAdd = false;
      let isFormModel = this.tableData.some(
        (item) => item.formModel == data.formModel
      );
      if (isFormModel) {
        return;
      }
      // 新增默认数据
      this.tableData = [
        ...this.tableData,
        {
          formId: this.fromData.formId,
          newDate: new Date().getTime(),
          type: "text",
          size: "14",
          editlist: '1',
          disabled:'0',
          isCheck: '1',
          occupiedColumns:'1',
          placeholder:`请输入${data.label}`,
          rules: [
            {
              isValidator: '0',
              required: '1',
              message: "请录入内容",
              trigger: ["blur","change"],
            },
          ],
          ...data,
        },
      ];
    },
    // 获取
    async postGetAllFormLists() {
      let datas = {
        formId: this.fromData.formId,
      };
      this.loading = this.$loading({
        lock: true,
        text: "正在加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let data = await postAllFormConfigurationList(datas)
      if (data.code == 2000) {
        this.tableData = data.data
         this.loading.close();
      } else {
         this.loading.close();
        this.$message.error(data.message);
      }
    },
    // 保存
    async getCheckedKeys() {
      this.tableData = this.tableData.map((item,index)=>{
        item.sortId = index
        return item
      })
      let data= await postAddFormConfiguration({
        formId: this.fromData.formId,
        list:this.tableData,
        deleteList:this.deleteList,
      })
      if(data.code==2000){
        this.$message.success({
          message: data.message,
          type: "success",
        });
        this.cancel();
      }else{
         this.$message.error(data.message);
      }
    },
    menuAdd() {
      // this.rowList = {};
      this.ishouAdd = !this.ishouAdd;
    },
    peizhiEixt(data){
      if(data){
       this.tableData = this.tableData.map(item=>{
          if(item.newDate==data.row.newDate){
            item = data.row
          }
          return item
        })
      }
      this.rowList = {};
      this.ispeizhi = !this.ispeizhi;
    },
    handleConfigure(index, row) {
      this.rowList = {index:index,row};
      this.ispeizhi = true
    },
    handleDelete(index, row) {
      
      row.id&&(this.deleteList = [...this.deleteList,row.id])
      this.tableData = this.tableData.filter(
        (item) => item.newDate != row.newDate
      );
    },
    cancel() {
      this.$store.dispatch('user/ClosePage')
      sessionStorage.removeItem("from-to-configure");
      this.$router.push("/main/form-configuration/form-configuration-main");
    },

    swapItems(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    weiyi(data) {
      if (this.multipleSelection.length != 1) {
        this.$message({
          message: "只能选中一条数据进行位移",
          type: "warning",
        });
        return;
      }
      let objs = this.multipleSelection[0];
      let idx = "";
      this.tableData.map((item, index) => {
        if (item.newDate == objs.newDate) {
          idx = index;
        }
      });
      if (data == "shang") {
        if (idx == 0) {
          return;
        }
        this.swapItems(this.tableData, idx, idx - 1);
      } else {
        if (idx == this.tableData.length-1) {
          return;
        }
        this.swapItems(this.tableData, idx, idx + 1);
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
  font-size: 15px;
  line-height: 40px;
}
.flex-1 {
  flex: 1;
}
.mr-2 {
  margin-right: 10px;
}
</style>
<template>
  <div class="menu-boxs container-adapt">
    <div class="menu-nav">
      <div class="menu-shou">
        <div class="menu-box">
          <span>字典KEY：</span>
          <el-input
            class="input-user"
            placeholder="字典KEY"
            v-model="dictionaryKey"
            clearable
          >
          </el-input>
        </div>
        <div class="menu-box">
          <span>字典名称：</span>
          <el-input
            class="input-user"
            placeholder="字典名称"
            v-model="dictionaryName"
            clearable
          >
          </el-input>
        </div>

        <el-button type="primary" @click="postAllDictionaryLists">查询</el-button>
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
        <el-table-column prop="dictionaryKey" label="字典KEY"> </el-table-column>
        <el-table-column prop="dictionaryName" label="字典名称"> </el-table-column>
        <el-table-column prop="sidebar" label="使用状态" :formatter='(row, column, cellValue, index)=>formatterFun(cellValue,syztList)'>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleConfigure(scope.$index, scope.row)"
              >配置</el-button
            >
            <el-popconfirm
              confirmButtonText="确定"
              cancelButtonText="取消"
              icon="el-icon-info"
              iconColor="red"
              title="确定要删除吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button  size="mini" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
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
     <DictionariesPeizhi  v-if="ishouAdd"  :menuadd="menuAdd">
    </DictionariesPeizhi>
    <DictionariesPeizhi  v-if="isPaizhi"  :menuadd="paizhiFun"   :rowList="rowList">
    </DictionariesPeizhi>
  </div>
</template>
<script>
import DictionariesPeizhi from "./dictionaries-peizhi.vue";
import { postAllDictionaryList,postDeleteDictionaryPage } from "@/api/user";
export default {
  data() {
    return {
      ishouAdd: false,
      isPaizhi: false,
      currentPage: 1,
      tableData: [],
      multipleSelection: [],
      height: "17",
      total: 1,
      size: 10,
      rowList: {},
      dictionaryName: "",
      dictionaryKey: "",
      loading: {},
      syztList:[{key:'0',vuale:'使用'},{key:'1',vuale:'禁用'}],
    };
  },
  components: {
    DictionariesPeizhi
  },
  mounted() {
    this.postAllDictionaryLists();
  },
  computed: {},
  methods: {
    formatterFun(e,data){
      let vuale =  data.filter(item=>item.key==e)[0]
      vuale  = vuale?.vuale
      return  vuale
    },
    // 获取
    async postAllDictionaryLists() {
      let data = {
        size: this.size,
        currentPage: this.currentPage,
      };
      if (this.dictionaryName) {
        data.dictionaryName = this.dictionaryName;
      }
      if (this.dictionaryKey) {
        data.dictionaryKey = this.dictionaryKey;
      }
      this.loading = this.$loading({
        lock: true,
        text: "正在加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let router = await postAllDictionaryList(data);
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
    async postDeleteDictionaryPages(row) {
      let data = await postDeleteDictionaryPage(row);
      if (data.code == 2000) {
        this.$message.success({
          message: data.message,
          type: "success",
        });
        this.postAllDictionaryLists();
      } else {
        this.$message.error(data.message);
      }
    },
    menuAdd(ishow) {
        this.ishouAdd = !this.ishouAdd;
        if(ishow=='addshou'){
            this.postAllDictionaryLists();
        }
       
       
    },
    paizhiFun(ishow){
        this.isPaizhi = !this.isPaizhi;
         if(ishow=='addshou'){
            this.postAllDictionaryLists();
        }
    },
    handleSizeChange(val) {
      this.size = val;
      this.postAllDictionaryLists();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.postAllDictionaryLists();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.rowList = JSON.parse(JSON.stringify(row));
      this.ishouAdd = true;
    },
    handleDelete(index, row) {
      this.postDeleteDictionaryPages({dictionaryKey:row.dictionaryKey});
    },
    handleConfigure(index, row) {
        this.isPaizhi = true
        this.rowList = row
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
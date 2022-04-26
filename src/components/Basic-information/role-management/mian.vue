<template>
    <!-- <div>角色管理列表页面</div> -->

  <div class="menu-boxs container-adapt">
    <div class="menu-nav">
      <div class="menu-shou">
        <div class="menu-box">
          <span >角色编号：</span>
          <el-input
            class="input-user"
            placeholder="请输入角色编号"
            v-model="id"
            clearable>
          </el-input>
        </div>
        <div class="menu-box">
          <span>角色名称：</span>
           <el-input
            class="input-user"
            placeholder="请输入角色名称"
            v-model="jsmc"
            clearable>
          </el-input>
        </div>
        
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
         <el-table-column prop="id" label="角色编号" sortable>
        </el-table-column>
        <el-table-column prop="jsmc" label="角色名称">
        </el-table-column>

        <el-table-column prop="jslx" label="角色类型" :formatter='(row, column, cellValue, index)=>formatterFun(cellValue,jslxList)' >
        </el-table-column>

        <el-table-column prop="syzt" label="使用状态"  :formatter='(row, column, cellValue, index)=>formatterFun(cellValue,syztList)' >
        </el-table-column>

        <el-table-column prop="jszl" label="角色种类" :formatter='(row, column, cellValue, index)=>formatterFun(cellValue,jszlList)'>
        </el-table-column>
      
        <el-table-column label="操作" width="250">
          <template #default="scope">
             <el-button size="mini" :disabled="(scope.row.id=='4000000000000007')?true:false"   @click="handleMenu(scope.$index, scope.row)">
               配置
              </el-button>
             <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
               修改
              </el-button>
            <el-button
              size="mini"
              type="danger"
              disabled
              @click="handleDelete(scope.$index, scope.row)"
              >
                删除
              </el-button>
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
    <ManagementAdd
      v-if="ishouAdd"
      :menuadd="menuAdd"
      :editlist='editList'
    ></ManagementAdd>
  </div>
</template>
<script>
import ManagementAdd from './management-add.vue'
import { postAllRoleManagement, Deleteuserpage } from "@/api/user";
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
      jsmc:'',
      id:'',
      editList:'',
      loading:{},
      jslxList:[{key:'1',vuale:'功能角色'},{key:'2',vuale:'数据角色'}],
      syztList:[{key:'1',vuale:'启用'},{key:'2',vuale:'冻结'}],
      jszlList:[{key:'1',vuale:'业务角色'},{key:'2',vuale:'管理员角色'}],
    };
  },
  components: {
      ManagementAdd
  },
  mounted() {
    this.AllUserpages();
  },
  computed: {},
  methods: {
    formatterFun(e,data){
      let vuale =  data.filter(item=>item.key==e)[0]
      vuale  = vuale?.vuale
      return  vuale
    },
    // 获取
    async AllUserpages() {
      let data = {
          size:this.size,
          currentPage:this.currentPage
      }
      if(this.jsmc){
        data.jsmc = this.jsmc
      }
      if(this.id){
        data.id = this.id
      }
      this.loading = this.$loading({
        lock: true,
        text: '正在加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let router = await postAllRoleManagement(data);
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
      this.$store.dispatch('user/HandleMenu', JSON.parse(JSON.stringify(row)))
      this.$router.push('/main/role-management/role-menu')
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
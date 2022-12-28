<template>
   <div class="menu-operation mb-10">
    <el-button type="primary" @click="yulian">表格合并</el-button>
    <el-button type="primary" @click="quxiaohb">取消合并</el-button>
  </div>
  <div v-if="isyulian">
    <TableAutoMergeAssembly 
    :tableList="tableList" 
    :tableData="tableData"
    :tableListChildren ="tableListChildren"
    :tableautomerge="tableautomerge"
    :ischeckbox="true"
    :handleSelectionChange="handleSelectionChange"
    :tableDatachildren="tableData"
    ></TableAutoMergeAssembly>
  </div>
  <div v-else>
    <TableAutoMergeAssembly 
    :tableList="tableList" 
    :tableData="tableData" 
    :tableListChildren ="tableListChildren"
    :tableautomerge="tableautomerge"
    :ischeckbox="true"
    :handleSelectionChange="handleSelectionChange"
    :tableDatachildren="tableDatachildren"
    ></TableAutoMergeAssembly>
  </div>
</template>
<script>
import TableAutoMergeAssembly from './table-auto-merge-assembly.vue'
export default {
  components: {
    TableAutoMergeAssembly
  },
  data() {
      return {
        isyulian:true,
        tableData:[
          {
            id: 3,
            type:'xmcl',
            typeName:'项目成立',
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
          {
            id: 2,
            type:'xmcl',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            typeName:'项目成立',
            date: '2016-05-06',
          },
          {
            id: 3,
            type:'xmcl',
            date: '2016-05-03',
            name: '王小虎',
            typeName:'项目成立',
            address: '上海市普陀区金沙江路 15161 弄',
          },
          {
            id: 4,
            type:'xmzhqgl',
            typeName:'项目中后期管理',
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
          {
            id: 5,
            type:'htmq',
            typeName:'合同面签',
            date: '2016-05-06',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1516 弄',
          },
          {
            id: 6,
            type:'xmcl',
            typeName:'项目成立',
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
          {
            id: 7,
            type:'xmzhqgl',
            typeName:'项目中后期管理',
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
        ],
        tableautomerge:[],
        tableList: [
          {
            key:"typeName",
            label:'',
            align:'center',
            width:'40',
          },
          {
            key:"date",
            label:"日期",
            align:'center',
            width:'480',
          },
          {
            key:"name",
            label:"姓名",
            align:'center',
            width:'480',
          },
          {
            key:"address",
            label:"地址",
            align:'center',
            width:'480',
          }
        ],
        tableListChildren:[
            {
            key:"date",
            label:"日期",
            align:'center',
            width:'480',
          },
          {
            key:"name",
            label:"姓名",
            align:'center',
            width:'480',
          },
          {
            key:"address",
            label:"地址",
            align:'center',
            width:'480',
          }
        ],
        multipleSelection: [],
        tableDatachildren:[],
    }
  },
  mounted(){
    this.tableDatachildren = this.tableData
  },
  methods:{
    handleSelectionChange(val){
      console.log(val,'1-----');
      this.multipleSelection = val;
    },
    yulian(){
      console.log('2323');
      this.tableautomerge= ['typeName','date','name']
      this.isyulian = !this.isyulian

    },
    quxiaohb(){
      this.tableautomerge=[]
      this.isyulian = !this.isyulian
    },
  }
}
</script>
<style scoped>
.menu-operation {
  display: flex;
  /* justify-content: flex-end; */
}
.mb-10{
  margin-bottom: 10px;
}

</style>
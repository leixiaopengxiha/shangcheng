<template>
  <div>
    <TableAutoMergeAssembly 
    :arrlist="arrlist" 
    :data="data" 
    :tableautomerge="tableautomerge" 
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
      data:[
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
        tableautomerge:['typeName','date','name','address'],
        arrlist: [
          {
            key:"typeName",
            label:' ',
            align:'center',
            width:'40',
          },
          {
            key:"date",
            label:"日期",
            align:'center',
            width:'180',
          },
          {
            key:"name",
            label:"姓名",
            align:'center',
          },
          {
            key:"address",
            label:"地址",
            align:'center',
          }
        ],
    }
  }
}
</script>
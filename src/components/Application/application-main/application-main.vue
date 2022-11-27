
<template>

<div>
    <div class="menu-operation mb-10">
      <el-button type="primary" @click="applicationfun">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      stripe
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <template v-if="isApplicationAdd">
      <ApplicationAdd
        :applicationfun="applicationfun"
      ></ApplicationAdd>
    </template>
  </div>
</template>
<script>
  import ApplicationAdd from './application-add.vue'
  export default {
    components: {
      ApplicationAdd,
    },
    data() {
      return {
        isApplicationAdd:false,
        tableData: [
          {
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [
              {
                id: 31,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
              },
              {
                id: 32,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
              },
            ],
          },
          {
            id: 4,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
        ],
        tableData1: [
          {
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            
          },
          {
            id: 3,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 4,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
          {
            id: 5,
            date: '2016-05-05',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
        ],
      }
    },
    mounted(){
        let obj = {}
        this.tableData1.map(item=>{
           if(!obj[item.date]){
               obj[item.date] = 1
           }else{
                obj[item.date] = 2
           }
        })
        // Array(obj).map(item=>{
            
        // })
        let arr = []
        for (const key in obj) {
            const element = obj[key];
             console.log(key)
            console.log(element)
            if(element==2){
                let date =  new Date().getTime()
                arr.push(
                    {
                        id: `${date}${obj[key]}`,
                        date: key,
                        hasChildren: true,
                    },
                )
            }else{
                let arrObj =  this.tableData1.filter(item=>item.date==key)
                arr = [...arr,...arrObj]
            }
        }
        console.log(arr)
        this.tableData = arr
        // console.log( )
        
    },
    methods: {
      load(tree, treeNode, resolve) {
          console.log(tree)
        setTimeout(() => {
               let arrObj =  this.tableData1.filter(item=>item.date==tree.date)
          resolve(arrObj)
        }, 1000)
      },
      applicationfun(){
        this.isApplicationAdd = !this.isApplicationAdd
      },
    },
  }
</script>

<style  lang="less" scoped>
.menu-nav {
  width: 100%;
  display: flex;
}
.menu-operation {
  display: flex;
  justify-content: flex-end;
}
.mb-10{
  margin-bottom: 10px;
}
</style>

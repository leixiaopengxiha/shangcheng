
<template>
  <el-table
    ref="multipleTable"
    id="multipleTable"
    class="multipleTable"
    :data="tableData1"
    :span-method="objectSpanMethod"
    max-height="600"
    highlight-current-row
    border
    @selection-change="handleSelectionChange"
    style="width: 100%"
  >
    <el-table-column v-if="ischeckbox"
      type="selection"
      align="center"
      width="50" fixed="left">
    </el-table-column>
    <template v-for="(item, index) in tableList" :key="index">
      <el-table-column
        :label="item.label"
        :prop="item.key"
        :align="item?.align"
        :width="item?.width"
        :sortable="item.label.length ? true : false"
      />
    </template>
    <el-table-column v-if="tableListChildren?.length"  type="expand" class="row-boxs">
      <el-row class="row-w">
        <el-table
          ref="multipleTables"
          id="multipleTables"
          :data="tableDatachildren"
          highlight-current-row
          max-height="600"
          border
          style="width: 100%"
        >
         <template e v-for="(item, index) in tableListChildren" :key="index">
            <el-table-column
              :label="item.label"
              :prop="item.key"
              :align="item?.align"
              :width="item?.width"
              :sortable="item.label.length ? true : false"
            />
          </template>
          <el-table-column label="操作" width="250"  align="center">
            <template #default="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
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
                  <el-button size="mini" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-table-column>
    <el-table-column label="操作" width="200" align="center">
      <template #default="scope">
        <el-popconfirm
          confirmButtonText="确定"
          cancelButtonText="取消"
          icon="el-icon-info"
          iconColor="red"
          title="确定要删除吗？"
          @confirm="handleDelete(scope.$index, scope.row)"
        >
          <template #reference>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: [
    "tableList", // 列表表头
    "tableData", // 列表值
    "ischeckbox", // 列表是否开启多选框
    "tableautomerge", // 列表是否这表格合并
    "handleSelectionChange", // 多选框出发事件
    'tableListChildren', // 子列表表头
    'tableDatachildren', // 子列表值
  ],
  data() {
    return {
      isApplicationAdd: false,
      // 存储处理后的数据
      tableData1: [],
      //存储每一列合并行以及下标数据
      margeArray: [],
      checkboxlist: [], // 默认选中数组
         // 存储处理后的数据
      tableData2: [],
      checkboxlist: [], // 默认选中数组
    };
  },
  mounted() {
    // 校验是否需要表格自动合并
    if (!!this.tableautomerge && this.tableautomerge.length) {
      // 数据处理排列合并
      this.tableData1 = this.tableData.map((item) => {
        let obj = {};
        if (this.ischeckbox && !item.ischeckbox) {
          obj.ischeckbox = null;
        }
        if (this.ischeckbox && item.ischeckbox) {
          obj.ischeckbox = item.ischeckbox;
        }
        this.tableList.forEach((key, index) => {
          obj[key.key] = item[key.key];
        });
        return { ...obj, ...item };
      });

      let objSort = {};
      let listSort = [];
      // 数据排序归类
      this.tableData1.map((item) => {
        if (!!objSort[item.type]) {
          objSort[item.type] = [...objSort[item.type], item];
        } else {
          objSort[item.type] = [item];
        }
      });
      Object.keys(objSort).map((item) => {
        listSort = [...listSort, ...objSort[item]];
      });
      this.tableData1 = listSort;
      //开始 调用方法计算需要合并的数据
      for (let i = 0; i < Object.keys(this.tableData1[0]).length; i++) {
        // 首先添加一个存放合并行数据的变量
        this.margeArray.push({ Arr: [], Position: 0 });
        // 得到下标对应的key值
        const element = Object.keys(this.tableData1[0])[i];
        // 调用合并，
        this.rowspan(
          this.tableData1,
          this.margeArray[i].Arr,
          this.margeArray[i].Position,
          element
        );
      }
    } else {
      this.tableData1 = this.tableData;
    }
    if (this.ischeckbox) {
      this.tableData1.map((item, index) => {
        if (item.ischeckbox) {
          this.checkboxlist.push(this.tableData1[index]);
        }
      });
      if (this.checkboxlist.length) {
        this.toggleSelection(this.checkboxlist);
      }
    }
  },
  methods: {
    // 多选框功能
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 统计合并表格数据
    rowspan(tableData, spanArr, position, spanName) {
      tableData.forEach((item, index) => {
        if (index === 0) {
          spanArr.push(1);
          position = 0;
        } else {
          if (tableData[index][spanName] === tableData[index - 1][spanName]) {
            spanArr[position] += 1;
            spanArr.push(0);
          } else {
            spanArr.push(1);
            position = index;
          }
        }
      });
    },
    // 表格合并行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (!this.tableautomerge || !this.tableautomerge.length) {
        return {
          rowspan: 1,
          colspan: 1,
        };
      }
      // 计算一共有几列数据
      let arraynum = Object.keys(this.tableData1[0]).length;
      for (let i = 0; i < arraynum; i++) {
        let isarr = this.tableautomerge.some(
          (item) => item == Object.keys(row)[columnIndex]
        );
        if (columnIndex == i && isarr) {
          const _row = this.margeArray[i].Arr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col,
          };
        }
      }
    },
    handleEdit(index, row) {},
    handleDelete(index, row) {},
  },
};
</script>
<style  lang="less">
.multipleTable .el-table__expanded-cell[class*=cell]{
  padding: 0px 0px 0px 50px;
}

</style>
<style  lang="less" scoped>
.menu-nav {
  width: 100%;
  display: flex;
}

.menu-operation {
  display: flex;
  justify-content: flex-end;
}
.row-w {
  // width: calc(100% - 150px) !important;
}
.mb-10 {
  margin-bottom: 10px;
}
.row-boxs {
  background: pink;
}

</style>

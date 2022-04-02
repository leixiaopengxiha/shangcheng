
<template>
  <div class="bullet-frame">
    <div class="menu-addbox">
      <div class="title">
       <h3>字典配置</h3>
        <i class="el-icon-circle-close iconcal" @click="menuadd"></i>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="字典KEY" prop="dictionaryKey">
          <el-input v-model="ruleForm.dictionaryKey" :disabled='!!rowList'></el-input>
        </el-form-item>
        <el-form-item label="字典名称" prop="dictionaryName">
          <el-input v-model="ruleForm.dictionaryName"></el-input>
        </el-form-item>
        <el-form-item label="使用状态" prop="sidebar">
          <el-radio-group v-model="ruleForm.sidebar">
            <el-radio label="0"> 使用 </el-radio>
            <el-radio label="1"> 禁用 </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-button
          size="mini"
          type="danger"
          @click="addZdx()"
        >新增</el-button>
        <el-table
        ref="multipleTable"
        :data="ruleForm.list"
        tooltip-effect="dark"
        style="width: 100%"

        align="center"
        :highlight-current-row="true"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="字典KEY">
           <template #default="scope">
            <el-input v-model="ruleForm.list[scope.$index].dicKey"></el-input>
          </template>
        </el-table-column>
        <el-table-column  label="字典名称"> 
           <template #default="scope">
            <el-input v-model="ruleForm.list[scope.$index].dicValue"></el-input>
          </template>
        </el-table-column>
        <el-table-column  label="显示顺序" >
          <template #default="scope">
            <el-input v-model="ruleForm.list[scope.$index].sortId"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
          <el-button @click="menuadd">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { postAddDictionaryPage,postAllDictionaryPage,postAddDictionaryList } from "@/api/user";
export default {
  props: ["menuadd","rowList"],
  data() {
    return {
      ruleForm: {
        id:this.rowList?.id,
        dictionaryKey: this.rowList?this.rowList.dictionaryKey:'',
        dictionaryName: this.rowList?this.rowList.dictionaryName:'',
        sidebar: this.rowList?this.rowList.sidebar:'0',
        list: [
          {
            dicKey:"",
            dicValue:"",
            sortId:"0",
          },
        ],
        deleteList:[],
      },
      rules: {
        dictionaryKey: [
          { required: true, validator: this.validateDictionaryKey, trigger: "blur" }
        ],
        dictionaryName: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
        sidebar: [
          {
            required: true,
            message: "请选择使用状态",
            trigger: "change",
          },
        ],
      },
    };
  },
  created(){
    this.postAllDictionaryPages()
  },

  methods: {
      async validateDictionaryKey(rule, value, callback){
        if (value === '') {
          callback(new Error('请输入字典KEY'))
        } else {
            if(!this.rowList){
              let data= await postAddDictionaryList({dictionaryKey:this.ruleForm.dictionaryKey});
              if(data.code==2000){
                callback()
              }else{
                this.$message.error(data.message);
                callback("该字典已经存在")
              }
            }else{
               callback()
            }
           
        }

    },
    // 获取字典配置列表
    async postAllDictionaryPages(){
      let data = await postAllDictionaryPage(this.rowList);
      if (data.code == 2000) {
        if(data.data.length){
           this.ruleForm.list = data.data
        }
      }
    },
     addZdx(){
        this.ruleForm.list.push({
            dicKey:"",
            dicValue:"",
            sortId:"0",
        })
     },
     handleDelete(index,row){
       if(row.id){
         this.ruleForm.deleteList.push(row.id)
       }
       this.ruleForm.list =  this.ruleForm.list.filter((item,indexs)=>indexs!=index);

     },
    // 添加接口
    async postAddDictionaryPages(row) {
      let data = await postAddDictionaryPage(row);
      if (data.code == 2000) {
        this.$message.success({
          message: data.message,
          type: "success",
        });
        this.menuadd("addshou");
      } else {
        this.$message.error(data.message);
      }
    },
    // 保存
    submitForm(formName) {
      if(!this.ruleForm.list.length){
         this.$message.error('请至少录入一个选项');
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
            let dicKey =   this.ruleForm.list.some(item=>item.dicKey=='');
            let dicValue =   this.ruleForm.list.some(item=>item.dicValue=='');
            if(dicKey){
               this.$message.error('键(KEY)不能为空');
               return
            }
            if(dicValue){
               this.$message.error('键值名称不能为空');
               return
            }
             this.postAddDictionaryPages(this.ruleForm)
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.menu-addbox {
  width: 45vw;
  margin: auto;
  background: #fff;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
.title{
  padding: 10px 30px;
  display: flex;
  justify-content:space-between;
   color: #606266;
}
.btn-box {
  margin-top: 20px;
  text-align: center;
}
.demo-ruleForm{
  min-height: 30vh;
  max-height: 70vh;
  overflow: hidden;
  overflow-y: scroll;
  padding: 20px 30px;
  padding-bottom: 0px;
}
.iconcal{
  font-size: 23px;
  color: #C0C4CC;
}
.iconcal:hover{
  color: #F56C6C;
}
</style>
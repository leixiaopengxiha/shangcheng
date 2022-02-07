<template>
  <div class="bullet-frame">
    <div class="menu-addbox">
      <div class="title">
       <span>表单预览</span>
        <i class="el-icon-circle-close iconcal" @click="yulian"></i>
      </div>
      <div class="demo-ruleForm">
        <FormInit ref='form' :formInitDatas="tableData" :validator="validator"></FormInit>
      </div>
        <!-- <div class="menu-operation">
          <el-button class="btns" @click="yulian">取消</el-button>
        </div> -->
    </div>
  </div>
</template>
<script>
import FormInit from '../../form-init'
export default {
  props: ["yulian", "tableData",],
  components:{
    FormInit,
  },
  data() {
    return {
      shows: false,
      ruleForm: {
        formModel:'',
        label: "",
      },
      rules: {
        formModel: [
          { required: true, message: "请输入英文名称", trigger: ["blur"] },
        ],
        label: [{ required: true, message: "请输入属性名称", trigger: "blur" }],
      },
    };
  },
  created(){
  },
  methods: {
    // 自定义校验使用 
    validator(){
      let obj = {}
      this.tableData.map(item=>{
        if(item.isValidator==1){
          item.rules.map(rls=>{
             obj[rls.validator] = (rule, value, callback)=>{
              if (value === "") {
                  callback(new Error("该校验为自定义校验"));
                } else {
                  callback();
                }
             }
          })
        }
      })
      return obj
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
             this.$emit('onaddformitem',this.ruleForm)
            // this.onaddformitem(this.ruleForm)
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
  width: 55vw;
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
  text-align: center;
}
.demo-ruleForm{
  max-height: 70vh;
  overflow: hidden;
  overflow-y: scroll;
  padding: 20px 30px;
}
.iconcal{
  font-size: 23px;
  color: #C0C4CC;
}
.iconcal:hover{
  color: #F56C6C;
}
.menu-operation {
  text-align: center;
  margin-bottom: 20px;
}
</style>
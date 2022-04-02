<template>
  <div class="bullet-frame">
    <div class="menu-addbox">
      <div class="title">
       <h3> {{ shows ? "编辑" : "添加" }}</h3>
        <i class="el-icon-circle-close iconcal" @click="menuadd"></i>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
         <el-form-item label="英文名称" prop="formModel">
          <el-input v-model="ruleForm.formModel"></el-input>
        </el-form-item>
        <el-form-item label="属性名称" prop="label">
          <el-input v-model="ruleForm.label"></el-input>
        </el-form-item>
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
export default {
  props: ["menuadd", "rowlist"],
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
  methods: {
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
</style>
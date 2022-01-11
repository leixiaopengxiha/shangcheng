<template>
  <div class="bullet-frame">
    <div class="menu-addbox">
     <FormInit ref='form' :formInitDatas="formInitDatas" :validator="validator" ></FormInit>

      <el-button type="primary" @click="submitForm()"
                >保存</el-button
            >
      <el-button @click="quxiao">取消</el-button>
    </div>
  </div>
</template>

<script>

import FormInit from '../../form-init'
export default {
  props: ["menuadd","editlist"],
    components:{
        FormInit,
        
    },
  data() {
   
    return {
      formInitDatas:{id:'12212112'}
    };
  },
  methods: {
    // 自定义校验使用 
    validator(){
      return{
        validatePass:this.validatePass,
        validatePass1:this.validatePass1
      }
    },
      // 自定义校验使用 1
    validatePass(rule, value, callback){
         if (value === "") {
            callback(new Error("请输入密码"));
          } else if (value.length < 6) {
            callback(new Error("您输入密码长度小于6位"));
          } else {
             let  ruleForm = this.$refs.form.getData()
            if (ruleForm.checkPass !== "") {
              this.$refs.form.validateField("checkPass");
            }
            callback();
          }
      },
    // 自定义校验使用 2
    validatePass1(rule, value, callback){
      let  ruleForm = this.$refs.form.getData()
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    submitForm() {
      console.log(this.$refs.form.getData())
      console.log(this.$refs.form.formValidate())
    },
    quxiao(){
        sessionStorage.removeItem('from-to-configure')
        this.$router.push('/main/form-configuration/form-configuration-main')
    }
  },
};
</script>
<style lang="less" scoped>
.menu-addbox {
  width: 50vw;
  margin: auto;
  background: #fff;
  padding: 20px 10px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn-box {
  text-align: center;
}
</style>
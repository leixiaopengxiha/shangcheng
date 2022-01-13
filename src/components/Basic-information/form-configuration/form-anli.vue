<template>
<!-- 表单调用案例 -->
  <div class="bullet-frame">
    <div class="menu-addbox">
     <FormInit ref='form' :formInitDatas="formInitDatas" :validator="validator" ></FormInit>

      <el-button type="primary" @click="submitForm()"
                >保存</el-button
            >
      <el-button @click="yulian">取消</el-button>
    </div>
  </div>
</template>

<script>

import FormInit from '../../form-init'
export default {
  props: ["yulian"],
  components:{
    FormInit,
  },
  data() {
   
    return {
      formInitDatas: [
      {
        id: 1,
        formModel: "username",
        label: "用户名",
        type: "text",
        size: "14",
        editlist: 1,
        disabled: 0,
        check: 1,
        isValidator: 0,
        rules: [
          {
            required: 1,
            message: "请输入用户名",
            trigger: ["blur"],
          },
          {
            min: 3,
            max: 5,
            message: "长度应为3到5",
            trigger: ["blur"],
          },
        ],
      },
      {
        id: 2,
        formModel: "pass",
        label: "密码",
        type: "password",
        size: "14",
        editlist: 1,
        disabled: 0,
        check: 1,
        isValidator: 1,
        rules: [
          {
            required: 1,
            validator: "validatePass",
            trigger: ["blur"],
          },
        ],
      },
      {
        id: 3,
        formModel: "checkPass",
        label: "确认密码",
        type: "password",
        size: "14",
        editlist: 1,
        disabled: 0,
        check: 1,
        isValidator: 1,
        rules: [
          {
            required: 1,
            validator: "validatePass1",
            trigger: ["blur"],
          },
        ],
      },
      {
        id: 4,
        formModel: "region",
        label: "活动区域",
        type: "select",
        size: "14",
        editlist: 1,
        disabled: 0,
        check: 0,
        isValidator: 1,
        rules: [
          {
            required: 1,
            validator: "validatePass1",
            trigger: ["blur"],
          },
        ],
      },
      {
        id: 5,
        formModel: "",
        label: "",
        type: "button",
        size: "14",
        btnFun:"chengong",
        btnType:'primary',
        editlist: 1,
        disabled: 0,
        check: 0,
        isValidator: 1,
        text:'成功',
        rules: [
          {
            required: 1,
            validator: "validatePass1",
            trigger: ["blur"],
          },
        ],
      },
      {
        id: 6,
        formModel: "",
        label: "",
        type: "button",
        size: "14",
        btnFun:"warning",
        btnType:'warning',
        editlist: 1,
        disabled: 0,
        check: 0,
        isValidator: 1,
        text:'提示',
        rules: [
          {
            required: 1,
            validator: "validatePass1",
            trigger: ["blur"],
          },
        ],
      },
    ]
    
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
        // sessionStorage.removeItem('from-to-configure')
        // this.$router.push('/main/form-configuration/form-configuration-main')
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



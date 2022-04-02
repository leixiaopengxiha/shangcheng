<template>
  <div class="bullet-frame">
    <div class="menu-addbox">
       <div class="title">
       <h3> {{editlist?"修改":"添加"}}</h3>
        <i class="el-icon-circle-close iconcal" @click="menuadd"></i>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username" v-if="!editlist">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
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
import { postRegister,postUpdateUserPwd } from "@/api/user";
import md5 from "js-md5";
export default {
  props: ["menuadd","editlist"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("您输入密码长度小于6位"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async postRegisters(doc) {
      let data = await postRegister(doc);
      if (data.code == 2000) {
        this.$message.success({
          message: "添加成功",
          type: "success",
        });
        this.menuadd("addshou");
      } else {
        this.$message.error(data.message);
      }
    },
    async postUpdateUserPwds(doc){
      let data = await postUpdateUserPwd(doc);
      if (data.code == 2000) {
        this.$message.success({
          message: "修改成功",
          type: "success",
        });
        this.menuadd("addshou");
      } else {
        this.$message.error(data.message);
      }
    },
    submitForm(formName) {
        if(this.editlist){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            let { pass } = this.ruleForm;
            let psw2 = parseInt(pass, 16).toString();
            let password = md5(psw2);
            this.postUpdateUserPwds({
              ...this.editlist,
              password,
            });
          } else {
            return false;
          }
        });
        }else{
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let { username, pass } = this.ruleForm;
            let psw2 = parseInt(pass, 16).toString();
            let password = md5(psw2);
            this.postRegisters({
              username,
              password,
            });
          } else {
            return false;
          }
        });
      }
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
}
.title{
  padding: 10px 30px;
  display: flex;
  justify-content:space-between;
   color: #606266;
}
.iconcal{
  font-size: 23px;
  color: #C0C4CC;
}
.iconcal:hover{
  color: #F56C6C;
}
.btn-box {
  text-align: center;
}
.demo-ruleForm{
  max-height: 70vh;
  overflow: hidden;
  overflow-y: scroll;
  padding: 10px 30px;
}
</style>
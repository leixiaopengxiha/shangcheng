<template>
  <div class="login-contaner">

 
  <div class="login-box">
    <div class="top-boxs">
        <h2 class="login-title">{{lgzcSt==0?"登录":"注册"}}</h2>
        <div class="zc-btn" @click="lgzcBtn" >{{lgzcSt==1?"登录":"注册"}}</div>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      @keydown="loginKeydown"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
        <el-form-item v-if="lgzcSt==1"  label="确认密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item  label="验证码" prop="verificationCode">
        <div class="flex">
          <el-input
            class="veri-mr"
            v-model="ruleForm.verificationCode"
          ></el-input>
          <div @click="refreshCode" style="cursor: pointer;">
              <Identify :identifyCode="identifyCode" ></Identify>
          </div>
        </div>
      </el-form-item>
      <el-form-item >
        <el-button v-if="lgzcSt==0"  class="login-btn" type="primary" :disabled='showlogin' @click="submitForm('ruleForm')">
          {{showlogin?'登录中……':'登录'}}
        </el-button>
         <el-button v-if="lgzcSt==1"  class="login-btn" type="primary" :disabled='showlogin' @click="submitZcForm('ruleForm')">
          {{showlogin?'注册中……':'注册'}}
        </el-button>
         
      </el-form-item>
    </el-form>
  </div>
   </div>
</template>

<script>
import { postLogin,getGetInfo,postRegister } from "@/api/user";
import Identify from './Identify.vue'
import md5 from 'js-md5';
export default {
  components: {
    Identify
  },
  data() {
     var verificationCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value.length) {
        if (this.ruleForm.verificationCode.toLowerCase() !== this.identifyCode.toLowerCase()) {
           callback(new Error("请输入正确的验证码"));
        }
        callback();
      }
    };
     var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("您输入密码长度小于6位"));
      } else {

        if (this.lgzcSt==1&&this.ruleForm.pass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      lgzcSt:0,
      // 验证码规则
      identifyCodes: '123456789ABCDEFGHGKMNPQRSTUVWXYZabcdefghgkmnpqrstuvwxyz',
      identifyCode:'',
      ruleForm: {
        username: "",
        password: "",
        verificationCode:"",
        pass:""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        password: [{ required: true, validator: validatePass, trigger: "blur" }],
        pass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { required: true, validator: verificationCode, trigger: "blur" }
        ],
      },
      loading:{},
      showlogin:false
    };
  },
  created(){
    sessionStorage.clear()
  },
  mounted() {
    this.refreshCode()
  },
  methods: {
    lgzcBtn(){
     if( this.lgzcSt==0){
       this.lgzcSt =1
     }else{
       this.lgzcSt = 0
     }
     this.refreshCode()
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
      // console.log(this.identifyCode)
    },
    // 生成随机验证码
    makeCode(o, l) {
      for (let i = 0; i<l; i++) {
        this.identifyCode += this.identifyCodes[
            Math.floor(Math.random() * (this.identifyCodes.length - 0) + 0)
        ]
      }
    },
    async postRegisters(doc) {
      let data = await postRegister(doc);
      if (data.code == 2000) {
        this.$message.success({
          message: "注册成功",
          type: "success",
        });
        this.lgzcSt=0;
        this.showlogin = false
      } else {
        this.showlogin = false
        this.refreshCode()
        this.$message.error(data.message);
      }
    },
    // 注册
    submitZcForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let {username,password} = this.ruleForm
          let psw2 = parseInt(password,16).toString()
          password = md5(psw2)
          this.postRegisters({
              username,
              password,
          });
        } else {
          return false;
        }
      });
    },
    // 获取用户信息
    async getGetInfos(doc){
        let data = await getGetInfo(doc)
        if(data.code===20000){
           this.$store.dispatch('user/CloseTabList',[])
            this.$store.dispatch('user/LoginSt',2)
            this.$store.dispatch('user/UserList',data.data)
            let userList =JSON.parse(sessionStorage.getItem('userList'))
            sessionStorage.setItem('LoginSt',2)
            sessionStorage.setItem('userList',JSON.stringify({...data.data,...userList}))
            this.$router.replace('/main')
            this.loading.close();
            this.showlogin = false 
        }else{
          this.loading.close();
          this.$message.error(data.message);
           this.showlogin = false 
        }
         if(this.showlogin){
          setTimeout(() => {
            this.loading.close();
            this.showlogin = false 
          }, 5000);
        }
    },
    // 登录
    async postLogins(doc){
        this.loading = this.$loading({
          lock: true,
          text: '正在加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.showlogin = true 
        let data = await postLogin(doc)
        if(!data){
          this.loading.close();
          this.refreshCode()
          this.showlogin = false 
          this.$message.error('服务器异常请联系管理员');
          return
        }
        if(data.code===20000){
          this.$store.dispatch('user/Roterlist',[]);
          this.$store.dispatch('user/RouterPath','/main/home');
          
          this.getGetInfos()
          sessionStorage.setItem('userList',JSON.stringify(data.data))
        } else{
          this.loading.close();
           this.refreshCode()
          this.$message.error(data.message);
          this.showlogin = false 
        }
        if(this.showlogin){
          setTimeout(() => {
             this.refreshCode()
            this.loading.close();
            this.showlogin = false 
          }, 5000);
        }
    },
    loginKeydown(e){
      if(e.keyCode===13){
        this.submitForm('ruleForm')
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let {username,password} = this.ruleForm
          let psw2 = parseInt(password,16).toString()
          password = md5(psw2)
          this.postLogins({
            username,
            password
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" >
.login-box .el-form-item__label{
  color: #fff;
   width: 80px;
}
.login-contaner{
  width: 100vw;
  height: 100vh;
  // background: #afdfe4;
  // background-image: linear-gradient(to bottom right, #33a3dc, rgb(245, 148, 148) 20%,#2585a6,#9ff368,#90d7ec);
  background: url('../../assets/imgs/login-bj.png');
  position: relative;

  .login-title{
    font-size: 25px;
    margin-bottom: 30px;
    color: #fff;
  }
  .top-boxs{
    display: flex;
    justify-content: space-between;
  }
  .login-box{
    width: 430px;
    // height: 400px;
    border-radius: 10px;
     background: url('../../assets/imgs/login-dl.png');
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    padding: 30px;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
  .login-btn{
    margin-top:30px;
    width: 200px;
    font-size: 16px;
  }
  .flex{
    display: flex;
  }
  .veri-mr{
    margin-right: 10%;
  }
  .zc-btn{
    color: #fff;
    cursor: pointer;
  }
  .zc-btn:hover{
    color: #409eff;
  }
}
</style>
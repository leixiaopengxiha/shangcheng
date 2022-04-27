<template>
  <div class="login-contaner">

 
  <div class="login-box">
    <h2 class="login-title">欢迎登录</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      @keydown="loginKeydown"
    >
      <el-form-item label="" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item >
        <el-button class="login-btn" type="primary" :disabled='showlogin' @click="submitForm('ruleForm')">
          {{showlogin?'登录中……':'登录'}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
   </div>
</template>

<script>
import { postLogin,getGetInfo } from "@/api/user";
import md5 from 'js-md5';
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: '密码长度必须大于5位', trigger: 'blur' }
        ],
      },
      loading:{},
      showlogin:false
    };
  },
  created(){
     sessionStorage.clear()
  },
  methods: {
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
<style lang="less" scoped>
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
  }

  .login-box{
    width: 430px;
    height: 400px;
    border-radius: 10px;
     background: url('../../assets/imgs/login-dl.png');
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    padding: 30px;
    box-sizing: border-box;
  }
  .login-btn{
    margin-top:60px;
    width: 200px;
    font-size: 16px;
  }
}
</style>
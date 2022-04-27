<template>
  <el-form
    :model="data.ruleForm"
    :rules="data.rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="原始密码" prop="password">
      <el-input  type="password" v-model="data.ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="pass">
      <el-input
        type="password"
        v-model="data.ruleForm.pass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        type="password"
        v-model="data.ruleForm.checkPass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item class="btn-box">
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="xgmmBtn(false)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { computed, reactive,ref } from "vue";
import { useStore } from "vuex";
import md5 from "js-md5";
import { ElMessage,ElLoading } from 'element-plus';
import { postUpdatePswd } from "@/api/user";

export default {
  props: ["xgmmBtn"],
  setup(props, context) {
    // 给父组件传参
    // context.emit('busss','true')
    // 获取dom元素使用
    let ruleForm = ref(null)
    const store = useStore();
     let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.length < 6) {
        callback(new Error("您输入新密码长度小于6位"));
      } else {
        if (data.ruleForm.checkPass !== "") {
          ruleForm.value.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== data.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let data = reactive({
      username: computed(() => store.state.user.userList.username),
      ruleForm:{
        password:'',
        pass:'',
        checkPass:'',
      },
      rules: {
        password: [
          { required: true, message: "请输入原始密码", trigger: "blur" },
          {
              min: 6,
              message: '您输入的原始密码长度小于6位',
              trigger: 'blur',
          },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
     
    })
    let postUpdateUserPwds = async(doc)=>{
      const loading = ElLoading.service({
          lock: true,
          text: '正在加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
      });
      let data = await postUpdatePswd(doc);
      console.log(!data)
      if(!data){
        loading.close();
        ElMessage.error('服务器异常请联系管理员');
        return
      }
      if (data.code == 2000) {
        loading.close();
        props.xgmmBtn(false)
        ElMessage.success({
          message: "修改成功",
          type: "success",
        });
      } else {
        loading.close();
        ElMessage.error(data.message);
      }
    }
   let submitForm = (formName) =>{
    
      ruleForm.value.validate((valid) => {
          if (valid) {
            let { pass,password } = data.ruleForm;
            if(pass==password){
               ElMessage.error('修改密码不可以与原始密码一样');
              return 
            }
            let psw1 = parseInt(password, 16).toString();
            let psw2 = parseInt(pass, 16).toString();
            let yspassword = md5(psw1);
            let passwords = md5(psw2);
            postUpdateUserPwds({
              username:data.username,
              password:passwords,
              yspassword
            });
          } else {
            return false;
          }
      })
    }
    return {
      data,
      ruleForm,
      submitForm,
    };
  },
};
</script>

<style lang="less" scoped>


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



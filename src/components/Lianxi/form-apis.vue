<template>
<!-- 表单调用案例 -->
  <div class="bullet-frame">
    <div class="menu-addbox">
      <div class="demo-ruleForm" v-if="formPage.formId">
          <FormInit ref='form' :formPage="formPage" @formBtn='chengong' @typeChange="typeChange" >
            <!-- 自定义设置 -->
            <template  v-slot:zdycc="{ item,ruleForm }">
               <el-input
                :type="item.type"
                v-model="ruleForm[item.formModel]"
                :placeholder="item.placeholder"
                :disabled="item.disabled == 1"
                @input="typeChange({
                  type:item.type,
                  key: item.formModel,
                  label: item.label,
                  value: ruleForm[item.formModel],
                  items: item,
                })" 
              ></el-input>
            </template>
          </FormInit>
      </div>
      <div class="btn-box">
        <el-button type="primary" @click="submitForm()"
                >保存</el-button
            >
      <el-button @click="yulian">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import FormInit from '../form-init'

export default {
  props: ["yulian","formid"],
  components:{
    FormInit,
  },
  data() {
    return {
      formPage: {
        formId: this.formid?this.formid:"5000000000000000", // 表单id
        validator:{ // 自定义校验使用 
           validatePass:this.validatePass,
           validatePass1:this.validatePass1
        },
        selectOption:{
          selects:[],
          aasa:[],
        },
       

       
        // 自定义配置
        attributes:{
          date:{

            // format:"YYYY-MM-DD",
            format:"YYYY 年 MM 月 DD 日",
            valueFormat:"YYYY-MM-DD",
            type:'daterange',
            startPlaceholder:"开始日期",
            endPlaceholder:"结束日期",
            rangeSeparator:'至',
          //   disabledDate: (time)=> {
          //     return time.getTime() > Date.now()
          //   },
          //   shortcuts: [
          //     {
          //       text: 'Today',
          //       value: new Date(),
          //     },
          //     {
          //       text: 'Yesterday',
          //       value: () => {
          //         const date = new Date()
          //         date.setTime(date.getTime() - 3600 * 1000 * 24)
          //         return date
          //       },
          //     },
          //     {
          //       text: 'A week ago',
          //       value: () => {
          //         const date = new Date()
          //         date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          //         return date
          //       },
          //     },
          //   ],
          }
        }
      }
    };
  },
  created(){
    // this.postUserFormConfigurations()
  },
  methods: {
   typeChange(event){
     console.log(event.value)
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
    chengong(data){
      console.log(data,'sdjskd')
    },
    submitForm() {
      this.$refs.form.formValidate()
      this.$refs.form.getData()
      console.log(this.$refs.form.getData())
    },
  },
};
</script>
<style lang="less" scoped>
.menu-addbox {
  width: 50vw;
  margin: auto;
  background: #fff;
  padding: 20px 0px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
.btn-box{
  text-align: center;
}
</style>



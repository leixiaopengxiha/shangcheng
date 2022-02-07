<template>
  <template v-if="formData.length">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="refFormInit"
      label-width="150px"
    >
      <template v-for="(item,index) in formData" :key="index">
        <el-form-item
          :label="item.label"
          :prop="item.formModel"
          v-if="item.editlist == 1"
        >
          <template v-if="item.type == 'text' || item.type == 'password'">
            <el-input
              :type="item.type"
              v-model="ruleForm[item.formModel]"
              :disabled="item.disabled == 1"
            ></el-input>
          </template>
          <template v-if="item.type == 'select'">
            <el-select v-model="ruleForm[item.formModel]" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </template>
          <template v-if="item.type == 'switch'"></template>
          <template v-if="item.type == 'date'"></template>
          <template v-if="item.type == 'checkbox'"></template>
          <template v-if="item.type == 'radio'"></template>
          <template v-if="item.type == 'textarea'"></template>
          <template v-if="item.type == 'button'">
            <el-button :type="item.btnType" @click="btns(item.btnFun)">
              {{item.text}}
            </el-button>
          </template>
        </el-form-item>
      </template>
    </el-form>
  </template>
</template>

<script>
export default {
  props: ['formInitDatas', "validator"],
  data() {
    return {
      ruleForm: {},
      formData: [],
      rules: {},
    };
  },
  created() {
      // 这里是要数据处理方法
      this.formInit(this.formInitDatas);
  },
  methods: {
    formInit(arr) {
      let ruleFormObj = {};
      let rulesObj = {};
      arr.map((item) => {
        if (item.editlist != 0&&item.type!='button') {
          ruleFormObj[item.formModel] = "";
        }
        // 是否进行校验
        if (item.isCheck == 1) {
          // 自定义校验  隐藏不进行校验
          if (item.isValidator == 1 && item.editlist != 0 && item.type!='button') {
            let rulesItemArr = [];
            let propValidator = this.validator();
            item.rules.map((rulesItem) => {
              let obj = {
                required: rulesItem.required == 1 ? true : false,
                validator: propValidator[rulesItem.validator],
                trigger: rulesItem.trigger,
              };
              rulesItemArr.push(obj);
            });
            rulesObj[item.formModel] = rulesItemArr;
          }
          // 系统配置交易 并且 隐藏不进行校验
          if (item.isValidator == 0 && item.editlist != 0 && item.type!='button') {
            let rulesItemArr = [];
            item.rules.map((rulesItem) => {
              let obj = {
                required: rulesItem.required == 1 ? true : false,
                message: rulesItem.message,
                trigger: rulesItem.trigger,
              };
              if (rulesItemArr.length) {
                delete obj.required;
              }
              if (rulesItem.type) {
                obj.type = rulesItem.type;
              }
              if (rulesItem.min) {
                obj.min = rulesItem.min;
              }
              if (rulesItem.max) {
                obj.max = rulesItem.max;
              }
              rulesItemArr.push(obj);
            });
            rulesObj[item.formModel] = rulesItemArr;
          }
        }
      });
      console.log(ruleFormObj);
      console.log(rulesObj);
      this.ruleForm = ruleFormObj;
      this.rules = rulesObj;
      this.formData = arr;
    },
    formValidate() {
      let isValid = false;
      this.$refs.refFormInit.validate((valid) => {
        if (valid) {
          isValid = valid;
        } else {
          isValid = false;
          return false;
        }
      });
      return isValid;
    },
    // 获取值
    getData() {
      return this.ruleForm;
    },
    validateField(item) {
      this.$refs.refFormInit.validateField(item);
    },
    btns(data){
        this.$emit('formBtn',data)
    }
  },
};
</script>

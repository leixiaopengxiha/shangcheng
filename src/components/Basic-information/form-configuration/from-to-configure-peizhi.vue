<template>
  <div class="bullet-frame">
    <div class="menu-addbox">
      <div class="title">
        <span>表单配置</span>
        <i class="el-icon-circle-close iconcal" @click="peizhiEixt()"></i>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="英文名称" prop="formModel" v-if="!isBtn">
          <el-input v-model="ruleForm.formModel"></el-input>
        </el-form-item>
        
        <el-form-item label="属性名称" prop="label" v-if="!isBtn">
          <el-input v-model="ruleForm.label"></el-input>
        </el-form-item>
        <el-form-item label="表单类型" prop="type">
          <el-select
            class="select-wh"
            v-model="ruleForm.type"
            placeholder="请选择表单类型"
            filterable
            :change="
              typeChange({
                key: 'type',
                label: '表单类型',
                value: ruleForm.type,
              })
            "
          >
            <el-option label="text" value="text"></el-option>
            <el-option label="password" value="password"></el-option>
            <el-option label="select" value="select"></el-option>
            <el-option label="switch" value="switch"></el-option>
            <el-option label="date" value="date"></el-option>
            <el-option label="checkbox" value="checkbox"></el-option>
            <el-option label="radio" value="radio"></el-option>
            <el-option label="textarea" value="textarea"></el-option>
            <el-option label="button" value="button"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="按钮名称" prop="text" v-if="isBtn">
          <el-input v-model="ruleForm.text"></el-input>
        </el-form-item>
        <el-form-item label="按钮方法名" prop="btnFun" v-if="isBtn">
          <el-input v-model="ruleForm.btnFun"></el-input>
        </el-form-item>
          <el-form-item label="按钮样式" prop="btnType" v-if="isBtn">
          <el-select
            class="select-wh"
            v-model="ruleForm.btnType"
            filterable
            placeholder="请选择按钮样式"
            :change="
              typeChange({
                key: 'btnType',
                label: '按钮样式',
                value: ruleForm.btnType,
              })
            "
          >
           <el-option label="Default" value=""></el-option>
            <el-option label="primary" value="primary"></el-option>
            <el-option label="success" value="success"></el-option>
            <el-option label="info" value="info"></el-option>
            <el-option label="warning" value="warning"></el-option>
            <el-option label="danger" value="danger"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字体大小" prop="size">
          <el-input v-model="ruleForm.size"></el-input>
        </el-form-item>
        <el-form-item label="是否禁用" prop="disabled">
          <el-radio-group
            :change="
              typeChange({
                key: 'disabled',
                label: '是否校验状态',
                value: ruleForm.disabled,
              })
            "
            v-model="ruleForm.disabled"
          >
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否校验状态" prop="isCheck" v-if="!isBtn">
          <el-radio-group
            :change="
              typeChange({
                key: 'isCheck',
                label: '是否校验状态',
                value: ruleForm.isCheck,
              })
            "
            v-model="ruleForm.isCheck"
          >
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="isValidators" label="是否自定义校验规则" prop="isValidator">
          <el-radio-group
            :change="
              typeChange({
                key: 'isValidator',
                label: '是否自定义校验规则',
                value: ruleForm.isValidator,
              })
            "
            v-model="ruleForm.isValidator"
          >
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>

            <el-button type="primary" @click="addIsValidator('ruleForm')"
            >添加校验规则</el-button>
            <el-form-item v-for="(items,index) in ruleForm.rules" :key="index">
                {{items}}
            </el-form-item>

        
        

        <el-form-item class="btn-box">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
          <el-button @click="peizhiEixt()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import { mapState } from "vuex";

export default {
  props: ["peizhiEixt", "rowList"],
  data() {
    return {
      shows: false,
      Props: {
        value: "id",
        label: "title",
        checkStrictly: true,
      },
      isBtn: false,
      isValidators:false,
      yuanDate: {},
      isValidatorList:1,
      ruleForm: {
        disabled: "1",
        editlist: "1",
        formModel: "aasajd",
        isCheck: "0",
        isValidator: "0",
        label: "测试说的1",
        type: "text",
        size: 14,
        rules: [],
        btnFun: "",
        btnType: "",
        text: "",
      },
      rules: {
        //     formId: [
        //       { required: true, message: "请输入表单编号", trigger: ["blur",'change'] },
        //     ],
        //     formName: [{ required: true, message: "请输入表单名称", trigger: "blur" }],
        //     fontSize: [{ required: true, message: "请设置字体大小", trigger: "blur" }],
        //     sortid: [
        //       {
        //         required: true,
        //         message: "请选择使用状态",
        //         trigger: "change",
        //       },
        //     ],
      },
    };
  },
  computed: {
    // ...mapState(["routeListOpstion",]),
  },
  mounted() {
    console.log(this.rowList);
    // // 修改
    this.shows = Object.keys(this.rowList).length == 0 ? false : true;

    if (this.shows) {
      this.yuanDate = JSON.parse(JSON.stringify(this.rowList.row));
      this.ruleForm = JSON.parse(JSON.stringify(this.rowList.row));
    }
  },

  methods: {
    typeChange(event) {
      console.log(event);
      if (event.key === "type") {
        if (event.value === "button") {
          this.isBtn = true;
        } else {
          this.isBtn = false;
        }
      }
      if (event.key === "isCheck") {
        if (event.value === "1") {
          this.isValidators = true;
        } else {
          this.isValidators = false;
        }
      }
    },
    addIsValidator(){},
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          if (this.isBtn) {
            this.ruleForm.label = "";
            this.ruleForm.formModel = "";
            this.ruleForm.isCheck = "0";
            this.ruleForm.isValidator = "0";
            this.ruleForm.rules = []
          }else{
            this.ruleForm.text = "";
            this.ruleForm.btnType = "";
            this.ruleForm.btnFun = "";
          }
          // this.ruleForm = JSON.parse(JSON.stringify())
          this.rowList.row = this.ruleForm;
          this.peizhiEixt(this.rowList);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.select-wh {
  width: 100%;
}
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
.title {
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  color: #606266;
}
.btn-box {
  text-align: center;
}
.demo-ruleForm {
  height: 70vh;
  overflow: hidden;
  overflow-y: scroll;
  padding: 20px 30px;
}
.iconcal {
  font-size: 23px;
  color: #c0c4cc;
}
.iconcal:hover {
  color: #f56c6c;
}
</style>

<template>
  <div class="bullet-frame">
    <div class="menu-addbox">
      <div class="title">
       <h3>添加</h3>
        <i class="el-icon-circle-close iconcal" @click="menuadd"></i>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="字典KEY" prop="dictionaryKey">
          <el-input v-model="ruleForm.dictionaryKey"></el-input>
        </el-form-item>
        <el-form-item label="字典名称" prop="dictionaryName">
          <el-input v-model="ruleForm.dictionaryName"></el-input>
        </el-form-item>
        <el-form-item label="使用状态" prop="sidebar">
          <el-radio-group v-model="ruleForm.sidebar">
            <el-radio label="0"> 使用 </el-radio>
            <el-radio label="1"> 禁用 </el-radio>
          </el-radio-group>
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
import { postAddDictionaryList } from "@/api/user";
export default {
  props: ["menuadd"],
  data() {
    return {
      ruleForm: {
        dictionaryKey: "",
        dictionaryName: "",
        sidebar: '0',
      },
      rules: {
        dictionaryKey: [{ required: true, message: "请输入字典KEY", trigger: "blur" }],
        dictionaryName: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
        sidebar: [
          {
            required: true,
            message: "请选择使用状态",
            trigger: "change",
          },
        ],
      },
    };
  },
  

  methods: {
    // 添加接口
    async postAddDictionaryLists(row) {
      let data = await postAddDictionaryList(row);
      if (data.code == 2000) {
        this.$message.success({
          message: data.message,
          type: "success",
        });
        this.menuadd("addshou");
      } else {
        this.$message.error(data.message);
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
             this.postAddDictionaryLists(this.ruleForm)
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
  width: 40vw;
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
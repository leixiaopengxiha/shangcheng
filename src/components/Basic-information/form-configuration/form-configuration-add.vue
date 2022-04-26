<template>
  <div class="bullet-frame">
    <div class="menu-addbox">
      <div class="title">
       <h3> {{ shows ? "编辑" : "添加" }}</h3>
        <i class="el-icon-circle-close iconcal" @click="menuadd"></i>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="表单编号" prop="formId" v-if="ruleForm.formId">
          <el-input v-model="ruleForm.formId" disabled ></el-input>
        </el-form-item>
        <el-form-item label="表单名称" prop="formName">
          <el-input v-model="ruleForm.formName"></el-input>
        </el-form-item>
        <el-form-item label="字体大小" prop="fontSize">
          <el-input v-model="ruleForm.fontSize"></el-input>
        </el-form-item>
        <el-form-item label="使用状态" prop="sidebar">
          <el-radio-group v-model="ruleForm.sidebar">
            <el-radio label="0"> 禁用 </el-radio>
            <el-radio label="1"> 使用 </el-radio>
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
import { mapState } from "vuex";
import { postAddFormList,postModifyFormList } from "../../../api/user";
export default {
  props: ["menuadd", "rowlist"],
  data() {
    return {
      shows: false,
      Props: {
        value: "id",
        label: "title",
        checkStrictly: true,
      },
      ruleForm: {
        formId:'',
        formName: "",
        fontSize: "14",
        sidebar: '1',
      },
      rules: {
        formId: [
          { required: true, message: "请输入表单编号", trigger: ["blur",'change'] },
        ],
        formName: [{ required: true, message: "请输入表单名称", trigger: "blur" }],
        fontSize: [{ required: true, message: "请设置字体大小", trigger: "blur" }],
        sortid: [
          {
            required: true,
            message: "请选择使用状态",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      routeListOpstion:state=>state.user.routeListOpstion,
    }),
  },
  mounted() {
    // 修改
    this.shows = Object.keys(this.rowlist).length == 0 ? false : true;

    if (this.shows) {
      this.ruleForm = this.rowlist;
    }
  },

  methods: {
    // 添加接口
    async postAddFormLists(row) {
      let data = await postAddFormList(row);
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
    // 修改
    async postModifyFormLists(row){
     let data = await postModifyFormList(row)
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
          if (!this.shows) {
            this.postAddFormLists(this.ruleForm)
          } else {
            this.postModifyFormLists(this.ruleForm)
          }
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
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
			 <el-form-item label="角色编号" prop="id" v-if="editlist">
          <el-input v-model="ruleForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="jsmc">
          <el-input v-model="ruleForm.jsmc" placeholder="角色名称"></el-input>
        </el-form-item>
				<el-form-item label="角色类型" prop="jslx">
					<el-select v-model="ruleForm.jslx" placeholder="角色类型">
						<el-option label="功能角色" value="1"></el-option>
						<el-option label="数据角色" value="2"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="使用状态" prop="syzt">
					<el-select v-model="ruleForm.syzt" placeholder="使用状态" :disabled="(ruleForm.id&&ruleForm.id=='4000000000000007')?true:false">
						<el-option label="启用" value="1"></el-option>
						<el-option label="冻结" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="角色种类" prop="jszl">
					<el-select v-model="ruleForm.jszl" placeholder="角色种类">
						<el-option label="业务角色" value="1"></el-option>
						<el-option label="管理员角色" value="2"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="submitForm('ruleForm')">
            保存
          </el-button>
          <el-button @click="menuadd">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { postAddrolemanagement,postUpdateRoleManagement } from "@/api/user";

export default {
  props: ["menuadd","editlist"],
  data() {
    return {
      ruleForm: {
				id:"",
        jsmc: "",
        jszl: "1",
        syzt: "1",
				jslx: "1",
      },
      rules: {
        id: [
          { required: true, message: "请选入角色名称", trigger: ["blur",'change'] },
        ],
        jsmc: [
          { required: true, message: "请选入角色名称", trigger: "blur" },
        ],
				jszl: [
          { required: true, message: "请选择角色种类", trigger: "change" },
        ],
				 syzt: [
          { required: true, message: "请选择使用状态", trigger: "change" },
        ],
				 jslx: [
          { required: true, message: "请选择角色类型", trigger: "change" },
        ],
      },
    };
  },
	mounted(){
		 this.shows = Object.keys(this.editlist).length == 0 ? false : true;
    if (this.shows) {
      this.ruleForm = this.editlist;
    }
	},
  methods: {
    async postAddrolemanagements(doc) {
      let data = await postAddrolemanagement(doc);
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
    async postUpdateRoleManagements(doc){
      let data = await postUpdateRoleManagement(doc);
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
            this.postUpdateRoleManagements(this.ruleForm)
          } else {
            return false;
          }
        });
        }else{
        this.$refs[formName].validate((valid) => {
          if (valid) {
					  delete this.ruleForm.id
						this.postAddrolemanagements(this.ruleForm)
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
  width: 50vw;
  margin: auto;
  background: #fff;
  // padding: 20px 10px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
	border-radius: 5px;
}
.btn-box {
  text-align: center;
}
.el-select{
	width: 100%;
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
.demo-ruleForm{
  max-height: 70vh;
  overflow: hidden;
  overflow-y: scroll;
  padding: 10px 30px;
}
</style>
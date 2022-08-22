<template>
  <div class="bullet-frame">
    <div class="menu-addbox">
      <div class="title">
        <h3>表单配置</h3>
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
            @change="
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
            <el-option label="checkbox" value="checkbox"></el-option>
            <el-option label="radio" value="radio"></el-option>
            <el-option label="textarea" value="textarea"></el-option>
            <el-option label="date" value="date"></el-option>
            <el-option label="daterange" value="daterange"></el-option>
            <el-option label="button" value="button"></el-option>
            <el-option label="custom" value="custom"></el-option>            
          </el-select>
        </el-form-item>
         <el-form-item label="自定义名称" prop="customName" v-if="ruleForm.type=='custom'">
          <el-input v-model="ruleForm.customName"></el-input>
        </el-form-item>
        <template v-if="ruleForm.type=='select'||ruleForm.type=='radio'||ruleForm.type=='checkbox'">
          <el-form-item label="字典来源" prop="selectCustom">
            <el-select
              class="select-wh"
              v-model="ruleForm.selectCustom"
              placeholder="请选择字典来源"
              filterable
              @change="
                typeChange({
                  key: 'selectCustom',
                  label: '字典来源',
                  value: ruleForm.selectCustom,
                })
              "
            >
              <el-option label="系统字典" value="1"></el-option>
              <el-option label="自定义字典" value="0"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="字典配置" prop="dictionaryKey" v-if="ruleForm.selectCustom=='1'">
            <el-select
              class="select-wh"
              v-model="ruleForm.dictionaryKey"
              placeholder="请选择字典配置"
              filterable
              @change="
                typeChange({
                  key: 'dictionaryKey',
                  label: '字典配置',
                  value: ruleForm.dictionaryKey,
                })
              "
            >
              <template v-for="(dicItem) in dicOption.diclist" :key="dicItem.id">
                 <el-option :label="dicItem.dictionaryName" :value="dicItem.dictionaryKey"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="字典默认值"  v-if="ruleForm.selectCustom=='1'">
            <!-- 下拉框 -->
            <el-select
                v-if="ruleForm.type=='select'"
                class="select-wh"
                v-model="ruleForm.dicDefault"
                placeholder="请选择"
                :clearable="true"
                filterable
                @change="
                  typeChange({
                    key: 'dicDefault',
                    label: '表单类型',
                    value: ruleForm.dicDefault,
                  })
                "
              >
                <template v-for="(dicItem) in dicDefaultList" :key="dicItem.id">
                  <el-option :label="dicItem.dicValue" :value="dicItem.dicKey"></el-option>
                </template>
            </el-select>
            <!-- 多选框 -->
            <el-checkbox-group  v-if="ruleForm.type=='checkbox'" v-model="ruleForm.dicDefault"  :clearable="true">
                <template v-for="(dicItem) in dicDefaultList" :key="dicItem.id">
                  <el-checkbox :label="dicItem.dicKey" >{{dicItem.dicValue}}</el-checkbox>
                </template>
              </el-checkbox-group>
            <!-- 单选框 -->
             <el-radio-group  v-if="ruleForm.type=='radio'" v-model="ruleForm.dicDefault"  :clearable="true">
                <template  v-for="(dicItem) in dicDefaultList" :key="dicItem.id">
                    <el-radio :label="dicItem.dicKey" >{{dicItem.dicValue}}</el-radio>
                </template>
              </el-radio-group>
          </el-form-item>
        </template>
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
            @change="
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
        <template v-if="isplaceholder">
          <el-form-item label="默认提示" prop="placeholder" >
            <el-input v-model="ruleForm.placeholder"></el-input>
          </el-form-item>
        </template>
        <el-form-item label="字体大小" prop="size">
          <el-input v-model="ruleForm.size"></el-input>
        </el-form-item>
        <el-form-item label="是否禁用" prop="disabled">
          <el-radio-group
            @change="
              typeChange({
                key: 'disabled',
                label: '是否禁用',
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
            @change="
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
        <el-form-item label="占有列数" prop="occupiedColumns">
            <el-select
              class="select-wh"
              v-model="ruleForm.occupiedColumns"
              placeholder="请选择"
              filterable
              @change="
                typeChange({
                  key: 'occupiedColumns',
                  label: '占有列数',
                  value: ruleForm.occupiedColumns,
                })
              "
            >
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否显示" prop="editlist">
            <el-radio-group
              @change="
                typeChange({
                  key: 'editlist',
                  label: '是否显示',
                  value: ruleForm.editlist,
                })
              "
              v-model="ruleForm.editlist"
            >
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
         </el-form-item>

        <template v-if="isChecks" >
          <el-button type="primary" :disabled="ruleForm.rules.length==3" @click="addIsValidator('ruleForm')">
            添加校验规则
          </el-button>
          <!-- <el-form-item class="fl" label="虚拟SKU" :prop="'sizeData.' + index + '.goods_sn'" :rules="sizeData.goods_sn" required> -->
          <!-- <template> -->

          <template v-for="(items, index) in ruleForm.rules" :key="index">
            <!-- {{rulesList[index].required}} -->
            <div class="titles-file">
              <div>配置校验规则{{ index + 1 }}</div>
              <el-button size="mini"
              type="danger" :disabled="ruleForm.rules.length==1" @click="remIsValidator(items,index)">
            删除
          </el-button>
            </div> 
            <el-form-item
              v-if="!items.isJygz2"
              label="校验是否加星号"
              :prop="'rules.' + index + '.required'"
              :rules="isRules.required"
              required
            >
              <el-radio-group
                @change="
                  typeChange({
                    key: 'required',
                    label: '校验是否加星号',
                    value: items.required,
                  })
                "
                v-model="items.required"
              >
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="是否自定义校验规则"
              :prop="'rules.' + index + '.isValidator'"
              :rules="isRules.isValidator"
              required
            >
              <el-radio-group
                @change="
                  typeChange({
                    key: 'isValidator',
                    label: '是否自定义校验规则',
                    value: items.isValidator,
                  })
                "
                v-model="items.isValidator"
              >
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <template v-if="items.isValidator == '0'">
              <el-form-item
                label="设置小长度在"
                v-if="items.isJygz2"
              >
                <el-input-number v-model="items.min"></el-input-number>
              </el-form-item>
              <el-form-item
                label="设置大长度在"
                v-if="items.isJygz2"
              >
                <el-input-number v-model="items.max"></el-input-number>
              </el-form-item>

              <el-form-item
                label="校验提示"
                :prop="'rules.' + index + '.message'"
                :rules="isRules.message"
                required
              >
                <el-input v-model="items.message"></el-input>
              </el-form-item>
            </template>
            <el-form-item
              label="自定义校验方法名称"
              v-if="items.isValidator == '1'"
              :prop="'rules.' + index + '.validator'"
              :rules="isRules.validator"
              required
            >
              <el-input v-model="items.validator"></el-input>
            </el-form-item>

            <el-form-item
              label="校验触发方式"
              :prop="'rules.' + index + '.trigger'"
              :rules="isRules.trigger"
              required
            >
              <el-select
                class="select-wh"
                v-model="items.trigger"
                multiple
                placeholder="校验触发方式"
                filterable
                @change="
                  typeChange({
                    key: 'trigger',
                    label: '校验触发方式',
                    value: items.trigger,
                  })
                "
              >
                <el-option label="blur" value="blur"></el-option>
                <el-option label="change" value="change"></el-option>
              </el-select>
            </el-form-item>
          </template>
        </template>
        <!-- </template> -->
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
import {postFormDictionaryPage} from '@/api/user'
let isValidatorLIsts=[]
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
      isplaceholder:true,
      isBtn: false,
      isChecks: false,
      yuanDate: {},
      isValidatorList: 1,
      isValidators: false,
      isJygz2: true,
      dicDefaultList:[],
      dicOption:{},
      ruleForm: {
        disabled: "1",
        editlist: "1",
        formModel: "aasajd",
        isCheck: "0",
        label: "测试说的1",
        type: "text",
        size: 14,
        customName:'',
        placeholder:'',
        rules: [
          {
            isValidator: "0",
            required: "1",
            message: "",
            trigger: ["blur", "change"],
            min: '',
            max: '',
          },
        ],
        selectCustom:'',
        dictionaryKey:"",
        dicDefault:'',
        btnFun: "",
        btnType: "",
        text: "",
        occupiedColumns:"1",
      },
      rules: {
        disabled: [
          {
            required: true,
            message: "请输入表单编号",
            trigger: ["blur", "change"],
          },
        ],
        customName: [
          {
            required: true,
            message: "请输入自定义名称",
            trigger: ["blur", "change"],
          },
        ],
        editlist: [
          {
            required: true,
            message: "请输选择是否显示",
            trigger: ["blur", "change"],
          },
        ],
        formModel: [
          {
            required: true,
            message: "请输入表单名称",
            trigger: ["blur", "change"],
          },
        ],
        isCheck: [
          {
            required: true,
            message: "请输选择是否校验状态",
            trigger: ["blur", "change"],
          },
        ],
        label: [
          {
            required: true,
            message: "请输入表单名称",
            trigger: ["blur", "change"],
          },
        ],
        type: [
          {
            required: true,
            message: "请输入表单名称",
            trigger: ["blur", "change"],
          },
        ],
         selectCustom: [
          {
            required: true,
            message: "请选择字典来源",
            trigger: ["blur", "change"],
          },
        ],
        dictionaryKey: [
          {
            required: true,
            message: "请选择字典配置",
            trigger: ["blur", "change"],
          },
        ],
        size: [
          {
            required: true,
            message: "请输入表单名称",
            trigger: ["blur", "change"],
          },
        ],
        text: [
          {
            required: true,
            message: "请输入按钮名称",
            trigger: ["blur", "change"],
          },
        ],
        btnFun:[
          {
            required: true,
            message: "请输入按钮方法名",
            trigger: ["blur", "change"],
          },
        ],
        occupiedColumns:[
          {
            required: true,
            message: "请选择占有列数",
            trigger: ["blur", "change"],
          },
        ],
        placeholder:[
          {
            required: true,
            message: "默认提示",
            trigger: ["blur", "change"],
          },
        ],
      },
      isRules: {
        isValidator: [
          {
            required: true,
            message: "请输入表单名称",
            trigger: ["blur", "change"],
          },
        ],
        required: [
          {
            required: true,
            message: "请输入表单名称",
            trigger: ["blur", "change"],
          },
        ],
        message: [
          {
            required: true,
            message: "请输入表单名称",
            trigger: ["blur", "change"],
          },
        ],
        validator: [
          {
            required: true,
            message: "请输入表单名称",
            trigger: ["blur", "change"],
          },
        ],
        trigger: [
          {
            required: true,
            message: "请输入表单名称",
            trigger: ["blur", "change"],
          },
        ],
        min:[
          {
            required: true,
            message: "请输入表单名称",
            trigger: [ "change"],
          },
        ],
        max:[
          {
            required: true,
            message: "请输入表单名称",
            trigger: [ "change"],
          },
        ],
      },
    };
  },
  created() {
    // 修改
    this.shows = Object.keys(this.rowList).length == 0 ? false : true;
    if (this.shows) {
      if (this.rowList.row.type == "button") {
        this.isBtn = true;
      }
      if(!this.rowList.row.placeholder){
        this.rowList.row.placeholder=`请输入${this.rowList.row.label}`
      }
      this.yuanDate = JSON.parse(JSON.stringify(this.rowList.row));
      this.ruleForm = JSON.parse(JSON.stringify(this.rowList.row));
      if(this.ruleForm.type=='checkbox'){
         this.ruleForm.dicDefault= this.ruleForm.dicDefault?this.ruleForm.dicDefault.split(','):[]
      }
      if(this.ruleForm.type=='button'){
        this.isChecks = false;
        this.isBtn = true;
      }else{
        this.isChecks = this.ruleForm.isCheck=='1'? true:false;
        this.isBtn = false;
      }
      if(this.ruleForm.isCheck=='1'){
        this.isChecks = true;
      }
      if(this.ruleForm.type=='select'){
        this.isplaceholder = true
      }else if(this.ruleForm.type=='custom'||this.ruleForm.type=='checkbox'||this.ruleForm.type=== "button"||this.ruleForm.type=== "radio"||this.ruleForm.type=='switch'){
        this.isplaceholder = false
      }else{
        this.isplaceholder = true
      }
    }
    this.postFormDictionaryPages()
  },

  methods: {
    async postFormDictionaryPages(){
     let data = await postFormDictionaryPage()
     if(data.code==2000){
       this.dicOption = data.data
       if(this.ruleForm.dictionaryKey){
        this.dicDefaultList = this.dicOption.dicOption[this.ruleForm.dictionaryKey]
      }
     }else{
        this.$message.error(data.message);
     }
    },

    remIsValidator(data,index){
      this.ruleForm.rules= this.ruleForm.rules.filter((item,idx)=>idx!=index)
    },
    // 方法使用
    typeChange(event) {
      if (event.key === "type") {
        if (event.value === "button") {          
          this.isChecks = false;
          this.isBtn = true;
          this.ruleForm.dicDefault=''
          this.ruleForm.placeholder = ''
        }else if(event.value=='checkbox'){
          this.ruleForm.dicDefault=[]
           this.ruleForm.placeholder = ''
        }
        if(event.value!='custom'){
          this.ruleForm.customName=''
          this.ruleForm.placeholder = ''
        }else {
          this.ruleForm.dicDefault=''
          this.isChecks = this.ruleForm.isCheck=='1'? true:false;
          this.isBtn = false;
        }
        console.log(event.value)
        if(event.value=='select'){
          this.isplaceholder = true
          this.ruleForm.placeholder =`请选择${this.ruleForm.label}`
        }else if(event.value=='custom'||event.value=='checkbox'||event.value === "button"||event.value === "radio"||event.value=='switch'){
          this.isplaceholder = false
          this.ruleForm.placeholder = ''
        }
        else{
          this.isplaceholder = true
          this.ruleForm.placeholder = `请输入${this.ruleForm.label}`
        }
      }
      if (event.key === "isCheck") {
        if (event.value === "1") {
          this.isChecks = true;
        } else {
          this.isChecks = false;
        }
      }
      if(event.key='dictionaryKey'){
        this.dicDefaultList = this.dicOption.dicOption[this.ruleForm.dictionaryKey]
      }
    },
    // 添加校验规则
    addIsValidator() {
      let lists = this.ruleForm.rules.filter((item) => item.isValidator == "0");
      let obj = {
        isJygz2:lists.length >= 1,
        isValidator: "0",
        required: "1",
        message: "",
        trigger: ["blur", "change"],
      }
      if(lists.length >= 1){
        obj.min= 1;
        obj.max= 100;
       delete obj.required
      }
      this.ruleForm.rules.push(obj);
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isBtn) {
            this.ruleForm.label = "";
            this.ruleForm.formModel = "";
            this.ruleForm.isCheck = "0";
            this.ruleForm.rules = [];
          } else {
            this.ruleForm.text = "";
            this.ruleForm.btnType = "";
            this.ruleForm.btnFun = "";
          }
          if(this.isplaceholder = false){
              this.ruleForm.placeholder = "";
          }
          if (this.ruleForm.isCheck == "0") {
            this.ruleForm.rules = [];
          }
          if(this.ruleForm.type!='checkbox'&&this.ruleForm.type!='select'&&this.ruleForm.type!='radio'){
            this.ruleForm.dicDefault= ''
            this.ruleForm.selectCustom=''
            this.ruleForm.dictionaryKey = ''
          }
          if(this.ruleForm.type=='checkbox'){
            this.ruleForm.dicDefault= this.ruleForm.dicDefault?this.ruleForm.dicDefault.join(','):'';
          }
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
.titles-file{
  margin: 10px 0 ;
  display: flex;
  justify-content: space-between;
}
</style>
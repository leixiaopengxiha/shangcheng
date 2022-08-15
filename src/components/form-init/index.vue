<template>
  <template v-if="formData.length">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="refFormInit"
      label-width="120px"
      class="form-box"
    >
      <template v-for="(item, index) in formData" :key="index"  class="el-form-item-boxs">
        <el-form-item
          :label="item.label"
          :prop="item.formModel"
          v-if="item.editlist == 1"
          :style="itemClassFun(item)"
        >
          <!-- 自定义插槽 -->
          <template v-if="item.type == 'custom'">
            <slot :name="item.customName" :item="item" :ruleForm="ruleForm"  ></slot>
          </template>
          <!-- input输入框 -->
          <template v-if="item.type == 'text' || item.type == 'password'||item.type == 'textarea'">
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
          <!-- 下拉框 -->
          <template v-if="item.type == 'select'">
            <el-select
              v-model="ruleForm[item.formModel]"
              :placeholder="item.placeholder"
              :multiple='item.multiple'
              filterable
              class="form-widths"
              @change="typeChange({
                type:item.type,
                key: item.formModel,
                label: item.label,
                value: ruleForm[item.formModel],
                items: item,
                option: selectOption[item.formModel]
              })" 
            >
              <template v-for="(items,indexs) in selectOption[item.formModel]" :key="indexs">
                  <el-option :label="items.dicValue" :value="items.dicKey"></el-option>
              </template>
            </el-select>
          </template>
          <!-- 开关 -->
          <template v-if="item.type == 'switch'">
             <el-switch 
              v-model="ruleForm[item.formModel]" 
              active-color="#13ce66" 
              inactive-color="#ff4949"
               class="form-widths"
              @change="typeChange({
                type:item.type,
                key: item.formModel,
                label: item.label,
                value: ruleForm[item.formModel],
                items: item,
              })" 
              ></el-switch>
          </template>
          <!-- 日期格式 -->
          <template v-if="item.type == 'date'">
            <el-date-picker
              class="form-widths"
              v-model="ruleForm[item.formModel]" 
              :type="item.attributes['type']?item.attributes['type']:item.type"
              :placeholder="item.placeholder"
              :shortcuts="item.attributes['shortcuts']"
              :format="item.attributes['format']"
              :value-format="item.attributes['valueFormat']"
              :disabled-date="item.attributes['disabledDate']"
              :readonly="item.attributes['readonly']"
              :range-separator="item.attributes['rangeSeparator']"
              :default-time="item.attributes['defaultTime']"
              :start-placeholder="item.attributes['startPlaceholder']"
              :end-placeholder="item.attributes['endPlaceholder']"
              :default-value="item.attributes['defaultValue']"
              :unlink-panels="item.attributes['unlinkPanels']"
              :prefix-icon="item.attributes['prefixIcon']"
              :clear-icon="item.attributes['clearIcon']"
              @change="typeChange({
                type:item.type,
                key: item.formModel,
                label: item.label,
                value: ruleForm[item.formModel],
                items: item,
              })" 
            >
            </el-date-picker>
          </template>
          <!-- 多选框 -->
          <template v-if="item.type == 'checkbox'">
              <el-checkbox-group v-model="ruleForm[item.formModel]"  class="form-widths">
                <template v-for="(itemRadio,indexss) in selectOption[item.formModel]" :key='indexss'>
                  <el-checkbox :label="itemRadio.dicKey" name="type">{{itemRadio.dicValue}}</el-checkbox>
                </template>
              </el-checkbox-group>
          </template>
          <!-- 单选框 -->
          <template v-if="item.type=='radio'"  class="form-widths">
            <el-radio-group v-model="ruleForm[item.formModel]">
              <template v-for="(itemRadio,indexss) in selectOption[item.formModel]" :key='indexss'>
                  <el-radio :label="itemRadio.dicKey" >{{itemRadio.dicValue}}</el-radio>
              </template>
            </el-radio-group>
          </template>
          <!-- 按钮 -->
          <template v-if="item.type == 'button'"  class="form-widths">
            <el-button
              :type="item.btnType"
              @click="btns(item.btnFun)"
              :disabled="item.disabled == 1"
            >
              {{ item.text }}
            </el-button>
          </template>
        </el-form-item>
      </template>
    </el-form>
  </template>
</template>

<script>
import {postUserFormConfiguration,postUserDictionaryPage} from '@/api/user'
export default {
  props: ["formPage",'formInitDatas'],
  data() {
    return {
      ruleForm: {},
      formData: [],
      rules: {},
      selectOption:{},
      selectCustomList:[],
    };
  },
  created() {
    // 获取表单数据
    if(!this.formPage.formId){
       this.formInit(this.formInitDatas);
    }else{
        // 这里是表单数据处理方法
        this.postUserFormConfigurations()
    }
   
  },

  methods: {
    // 计算是否一行显示几个
    itemClassFun(data){
      // console.log(data);
      // 占有列数
      // let list =  this.formData.filter(item=>item.occupiedColumns>1)
      // console.log(list)
     let  fromList = JSON.parse(JSON.stringify(this.formData))
     let list =fromList.sort((obj1,obj2)=>{
        return obj2.occupiedColumns - obj1.occupiedColumns
      })
     let foccupiedColumns =  list[0].occupiedColumns
      let  width= 100;
      if(foccupiedColumns){
         width = 100/foccupiedColumns;
      }

      if(data.occupiedColumns>1){
        width = width*data.occupiedColumns
      }
      return  {
         width:`${width}%`,
      };
    },
    async postUserFormConfigurations (){
      let data = await postUserFormConfiguration({formId:this.formPage.formId})
      if (data.code == 2000) {
        if(data.data.length==0){
           this.$message.error(data.message);
        }
        // 这里是表单数据处理方法
        this.formInit(data.data);
      
      } else {
        this.$message.error(data.message);
      }
    },
    formInit(arr) {
      let ruleFormObj = {};
      let rulesObj = {};
      arr.map((item) => {
        // 是否需要字典
        if(item.type == "select"||item.type == "radio"||item.type == "checkbox"){
          this.selectOption[item.formModel]=[]
          if(item.selectCustom==1){
            this.selectCustomList.push({key:item.dictionaryKey,formModel:item.formModel})
          }
        }
        // 是否有自定义属性
        item['attributes'] = {};
        if(this.formPage?.attributes){
          item.attributes = this.formPage.attributes[item.formModel]?this.formPage.attributes[item.formModel]:{}
        }
        // 是否是按钮功能
        if (item.editlist != 0 && item.type != "button") {
          if(item.type == 'checkbox'){
            ruleFormObj[item.formModel] = item.dicDefault?item.dicDefault.split(','):[];
          }else{
            ruleFormObj[item.formModel] = item.dicDefault?item.dicDefault:"";
          }
        }

        // 是否进行校验
        if (item.isCheck == 1) {
          // 系统配置交易 并且 隐藏不进行校验
          if (item.editlist != 0 && item.type != "button") {
            let rulesItemArr = [];
            let propValidator = this.formPage.validator;
            item.rules.map((rulesItem) => {
              let obj = {};
              // 自定义校验
              if (rulesItem.isValidator == 1) {
                obj = {
                  required: rulesItem.required == 1 ? true : false,
                  validator: propValidator[rulesItem.validator],
                  trigger: rulesItem.trigger,
                };
              } else {
                obj = {
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
              }
              rulesItemArr.push(obj);
            });
            rulesObj[item.formModel] = rulesItemArr;
          }
        }
      });
      this.ruleForm = ruleFormObj;
      this.rules = rulesObj;
      this.formData = arr;
      // 获取字典
      this.dictionary();
    
    },
    // 获取字典表单获取字典值
    async dictionary(){
      let list =[]
       this.selectCustomList.map(items=>{
         let isItems = list.some(keys=>keys==items.key)
         if(!isItems){
           list.push(items.key)
         }
       })
        let data = await postUserDictionaryPage({list:list})
        if(data.code==2000){
           this.selectCustomList.map(item=>{
              this.selectOption[item.formModel] =data.data[item.key];
            })
        }else{
           this.$message.error(data.message);
        }
    },
    // 设置自定义下拉框值
    setOption(key,option){
       this.selectOption[key] = option;
    },
    // 设置值
    setVaule(key,vaule){
      this.ruleForm[key] = vaule
    },
    // 获取值
    getVaule(key){
       return this.ruleForm[key]
    },
    typeChange(event){
      this.$emit('typeChange',event)
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
    // 
    validateField(item) {
      this.$refs.refFormInit.validateField(item);
    },
    // 按钮时间
    btns(data) {
      this.$emit("formBtn", data);
    },
  },
};
</script>
<style lang="less">
  .form-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    .form-widths{
      width: 100%;
    }
  }
  
</style>

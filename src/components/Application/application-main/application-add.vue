<template>
    <div class="bullet-frame">
        <div class="menu-addbox">
            <div class="title">
                <h3> {{editlist?"修改":"添加"}}</h3>
                <i class="el-icon-circle-close iconcal" @click="applicationfun"></i>
            </div>
            <div class="demo-ruleForm" v-if="formPage.formId">
                <FormInit ref='form' :formPage="formPage" @formBtn='chengong' @typeChange="typeChange">
                    <!-- 自定义设置 -->
                    <template v-slot:zdycc="{ item,ruleForm }">
                        <el-input :type="item.type" v-model="ruleForm[item.formModel]" :placeholder="item.placeholder"
                            :disabled="item.disabled == 1" @input="typeChange({
                              type:item.type,
                              key: item.formModel,
                              label: item.label,
                              value: ruleForm[item.formModel],
                              items: item,
                            })"></el-input>
                    </template>
                </FormInit>
            </div>
            <div class="btn-box">
                <el-button type="primary" @click="submitForm()">保存</el-button>
                <el-button @click="applicationfun">取消</el-button>
            </div>
        </div>
    </div>
</template>
    
<script>

import FormInit from '@/components/form-init/index.vue'

export default {
    props: ["applicationfun",'editlist'],
    components: {
        FormInit,
    },
    data() {
        return {
            formPage: {
                formId: "5000000000000003", // 表单id
                // 自定义配置
                attributes: {
                    jzsj: {
                        format:"YYYY-MM-DD",
                        // format: "YYYY 年 MM 月 DD 日",
                        valueFormat: "YYYY-MM-DD",
                        type: 'date',
                        // startPlaceholder: "开始日期",
                        // endPlaceholder: "结束日期",
                        // rangeSeparator: '至',
                    }
                }
            }
        };
    },
    created() {
        // this.postUserFormConfigurations()
    },
mounted(){


},
    methods: {
        typeChange(event) {
            console.log(event.value)
        },
        // 自定义校验使用 1

        chengong(data) {
            console.log(data, 'sdjskd')
            this.$refs.form.setVaule('aasa','1')
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
.btn-box {
    text-align: center;
}

.demo-ruleForm {
    max-height: 70vh;
    overflow: hidden;
    overflow-y: scroll;
    padding: 20px 30px;
}

.btn-box {
    text-align: center;
}
</style>
    
    
    
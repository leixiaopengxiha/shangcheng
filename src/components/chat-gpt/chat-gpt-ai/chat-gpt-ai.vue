<template>
    <div>
        <FormInit ref="FormInitComponent" :formPage="data.formPage" @formBtn='chengong' @typeChange="typeChange"></FormInit>
    </div>
    <div>
            <el-input
                class="textheight"
              type="textarea"
              v-model="data.textValue"
            ></el-input>

    </div>
  </template>
  <script>

  import { onMounted, reactive, computed,ref } from "vue";
//   import { useRouter, useRoute } from "vue-router";
  import { useStore } from "vuex";
  import {GenerateAi} from '../../../api/openAi'
//   5000000000000007
  import FormInit from '../../form-init'
  export default {
    components:{
        FormInit
    },
    setup() {
        const FormInitComponent = ref(null)
        const store = useStore();
        let data = reactive({
            isshow: false,
            textValue:'',
            historytextValue:"",
            formPage: {
                formId: '5000000000000007', // 表单id
            },
        });
        onMounted(() => {
        
        });
        let chengong=async(event)=>{
            // console.log(event);
            if(event=='formData'){
                let doce =  {...FormInitComponent.value.getData()}
                doce.animal = `${data.historytextValue}${doce.animal}`
                FormInitComponent.value.setDisabled("formData",true,'button')
                let GenerateData =  await GenerateAi(doce)
                if(GenerateData.code==2000){
                    console.log(GenerateData);
                    data.historytextValue = GenerateData.data.text
                    data.textValue = `${data.textValue}${GenerateData.data.text}`
                    FormInitComponent.value.setDisabled("formData",false,'button')
                    console.log(GenerateData.data.finish_reason);
                    if(GenerateData.data.finish_reason!="stop"){
                        chengong('formData')
                    }else{
                        // data.historytextValue = '';
                    }
                }else{
                    FormInitComponent.value.setDisabled("formData",false,'button')
                }
            }
        }
        let typeChange=(event)=>{
            // console.log(event);
            if(!!event.key){
                FormInitComponent.value.setDisabled("formData",false,'button')
            }
        }
        return {
            data,
            chengong,
            typeChange,
            FormInitComponent,
            appState:computed(() => store.state.user.appState)
        };
    },
  };
  </script>
  
  <style lang="less">
  .textheight .el-textarea__inner{
    height: 70vh;

  }

  </style>
  
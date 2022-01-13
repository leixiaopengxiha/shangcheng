<template>
  <div class="menu-boxs container-adapt">
    <div class="menu-nav">
      <div class="menu-operation">
        <div>
          <el-button type="primary" @click="yulian">表单案例展示</el-button>
        </div>
      </div>
    </div>
    <template v-if="isyulian">
      <FormAnli
        :yulian="yulian"
      ></FormAnli>
    </template>
  </div>
</template>

<script>
import FormAnli from './form-anli'


export default {
  data() {
    return {
      isyulian: false,
    };
  },
  components: {
    FormAnli
  },
  methods: {
    // 预览
    yulian(){
      this.isyulian = !this.isyulian;
    },
    
  },
};
</script>

<style lang="less" scoped>
.menu-boxs {
  // position: relative;
}
.menu-nav {
  display: flex;
}
.menu-shou {
  flex: 1;
  display: flex;
}
.input-user {
  // width: 30%;
  flex: 1.5;
  margin-right: 10px;
}
.table-boxa {
  margin: 10px 0;
}
.menu-operation {
  display: flex;
  justify-content: flex-end;
}
.menu-box {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  line-height: 40px;
}
.flex-1 {
  flex: 1;
}
.mr-2 {
  margin-right: 10px;
}
</style>
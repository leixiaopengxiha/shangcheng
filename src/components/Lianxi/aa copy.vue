<template>
 
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker
      v-model="value2"
      type="year"
      placeholder="选择日期"

    >
    </el-date-picker>
    <input type="date">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },

        value1: '',
        value2: new Date(),
      }
    },
  }
</script>
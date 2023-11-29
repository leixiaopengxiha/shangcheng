<template>
  <!-- <div ref="mycharts" class="demoDiv" ></div> -->
  <div>
    <ExhartsYb ref="echartsyb"></ExhartsYb>
  </div>
</template>
<script>
import ExhartsYb from './echarts-yb'
export default {
  components: {
    ExhartsYb
  },
  data() {

    return {
      optionData: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.echartsYbFuns()
    })


  },
  methods: {
    echartsYbFuns() {
      // 模拟接口
      setInterval(() => {
        const random = +(Math.random() * 100).toFixed(2);
        this.optionData = {
          title: [
            {
              text: random + '%'
            }
          ],
          series: [
            {
              data: [
                {
                  value: random
                }
              ]
            },
          ]
        }
        this.$refs.echartsyb.echartsYbFun(this.optionData)
      }, 500)
    }
  }
}
</script>
<style scoped>
.demoDiv {
  width: 500px;
  height: 300px;
}
</style>
<template>
  <div ref="mycharts" class="demoDiv" ></div>
</template>
<script>
import * as echarts from 'echarts'
export default{
  data(){
    return {
      option: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  },
  mounted() {
      const chartDom = this.$refs.mycharts
      let myChart = echarts.init(chartDom);
      myChart.setOption(this.option);
  },

}
</script>
<style scoped>
.demoDiv{
  width: 500px;
  height: 300px;
}
</style>
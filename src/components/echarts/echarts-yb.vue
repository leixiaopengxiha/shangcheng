<template>
  <div ref="mycharts" class="demoDiv" ></div>
</template>
<script>
import * as echarts from 'echarts'
export default{
  data(){
    return {
      option : {
        backgroundColor: '#36467E',
        title: [{
            text: 0 + '%',
            left: 'center',
            top: '56%',
            textStyle: {
                color: '#c00',
                fontSize: 20,
                fontWeight: 'bold',
            }
        },
         {
            text: '半圆进度条',
            left: 'center',
            top: '70%',
            textStyle: {
                color: '#2892E8',
                fontSize: 14
            }
        }
      ],
      angleAxis: {
            show: false,
            // 后面的180表示圆环的跨越的角度， 如max设置为100*360/270,startAngle设置为-135
            max: 100 * 360 / 180,
            type: 'value',
            startAngle: 180,
            splitLine: {
                show: false
            },
            borderRadius:'25px',
        },
        // 修改环形的宽度
        barMaxWidth: 20,
        radiusAxis: {
            show: false,
            type: 'category'
        },
        polar: {
            // 设置环形的位置
            center: ['50%', '66%'],
            // 设置环形大小
            radius: '120%',
            borderRadius: 100,
        },
        series:[
          {
            type: 'bar',
            data: [
                {
                    value: '0',
                    itemStyle: {
                        // 这里是已经达到进度的颜色
                        color: '#32b668'
                    }
                }
            ],
            barGap: '-100%',
            coordinateSystem: 'polar',
            z: 3
        },
         {
            type: 'bar',
            data: [{
                value: 100,
                itemStyle: {
                  // 这里是环形底色
                  color: "#2E3449",
                  borderWidth: 0,
                  borderRadius:'25px',
                }
            }],
            barGap: '-100%',
            coordinateSystem: 'polar',
            z: 1
        }
      ]
      },
    }
  },
  mounted() {
    const chartDom = this.$refs.mycharts
    this.myChart = echarts.init(chartDom);
    this.myChart.setOption(this.option);
  },
  methods:{
    echartsYbFun(data){
      this.myChart.setOption(data)
    }
  }

}
</script>
<style scoped>
.demoDiv{
  width: 500px;
  height: 300px;
}
</style>
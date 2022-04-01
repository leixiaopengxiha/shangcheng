<template>
<div  class="boxs">


    <div v-for="(item,index) in datas" :key="index">
        <div class="date-title"><h4>{{item.date}}</h4></div>
        <!-- 填充 -->
         <div class="flex gao">
            <div class="date-box"></div>
            <div class="biaoshi-box">
            </div>
            <div class="content-box"> </div>
        </div>
        <!-- 内容 -->
        <div class="flex" v-for="(itemDate,indexs) in item.list" :key='index+indexs'>
            <div class="date-box paddinds">{{itemDate.date}}</div>
            <div class="biaoshi-box paddinds">
                <div class="dayuan" :class="dayuanfun(itemDate.biaoshi)">
                    <div class="xiaoyuan" :class="xiaoyuanfun(itemDate.biaoshi)"></div>
                </div>
                <div class="biaoshi-text" :class="classfun(itemDate.biaoshi)">
                    {{itemDate.title}}
                </div>
            </div>
            <div class="content-box paddinds"> {{itemDate.text}}</div>
        </div>
           <!-- 填充 -->
         <div class="flex gao">
            <div class="date-box"></div>
            <div class="biaoshi-box">
            </div>
            <div class="content-box"> </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            datas:[
                {
                    date:'2022',
                    list:[
                        {
                             date:'07-03',
                             title:'赎回',
                             biaoshi:2,
                            text:'时间到可视对讲可视对讲'
                        },
                        {
                             date:'09-03',
                             title:'申购',
                             biaoshi:3,
                            text:'时间到可视对讲可视对讲'
                        },
                        {
                             date:'10-03',
                             title:'认购',
                             biaoshi:1,
                            text:'时间到可视对讲可视对讲'
                        }
                    ]
                },
                {
                    date:'2021',
                    list:[
                        {
                             date:'07-03',
                             title:'赎回',
                             biaoshi:3,
                            text:'时间到可视对讲可视对讲'
                        },
                        {
                             date:'09-03',
                             title:'申购',
                             biaoshi:2,
                            text:'时间到可视对讲可视对讲'
                        },
                        {
                             date:'10-03',
                             title:'认购',
                             biaoshi:1,
                            text:'时间到可视对讲可视对讲'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        classfun(key){            
            switch (key) {
                case 1:
                    return 'blue'
                case 2:
                    return 'red'
                case 3:
                    return 'warning'
                default:
                    return 'blue'
            }
        },
        dayuanfun(key){
            switch (key) {
                case 1:
                    return 'blue-dayuan'
                case 2:
                    return 'red-dayuan'
                case 3:
                    return 'warning-dayuan'
                default:
                    return 'blue-dayuan'
            }
        },
        xiaoyuanfun(key){
            switch (key) {
                case 1:
                    return 'blue-xiaoyua'
                case 2:
                    return 'red-xiaoyua'
                case 3:
                    return 'warning-xiaoyua'
                default:
                    return 'blue-xiaoyua'
            }
        }
    },
}
</script>
<style scoped>
.flex{
    display: flex;
}
.gao{
    height: 30px;
}
.boxs{
    background: #fff;
    padding: 20px 0;
}
.paddinds{
      padding: 8px 0;
}
.date-title{
    width: 100px;
    text-align: center;
    border-radius: 30px;
    border: 1.5px solid rgb(221, 215, 215);
    line-height: 30px;
    background: #fff;
    margin-left:100px ;
}
.date-box{
    width: 150px;
    text-align: center;
    background: #fff;
    line-height: 40px;
}

.biaoshi-box{
    width: 150px;
    text-align: center;
    background: #fff;
    border-left: 1.5px solid rgb(221, 215, 215);
    position: relative;
}
.dayuan{
    width: 18px;
    height:  18px;
    border-radius: 18px;
   
    position: absolute;
    top:50%;
    left: -12px;
    transform:translate(0,-50%) ;
    
}
.xiaoyuan{
    margin: 3px;
    width: 12px;
    height:  12px;
    border-radius: 12px;
}
.biaoshi-text{
    box-sizing: border-box;
    line-height: 25px;
    padding: 0px 14px;
    display: inline-block;
    border-radius: 5px;
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
}
.red{
    color: red;
    border: 1px solid red;
}
.blue{
    color: #409EFF;
    border: 1px solid #409EFF;
}
.warning{
    color: #E6A23C;
    border: 1px solid #E6A23C;
}

.red-dayuan{
    border: 2px solid red;
}
.blue-dayuan{
    border: 2px solid #409EFF;

}
.warning-dayuan{
    border: 2px solid #E6A23C;
}

.red-xiaoyua{
    background:red;
}
.blue-xiaoyua{
    background:#409EFF;
}
.warning-xiaoyua{
    background:#E6A23C;
}
.content-box{
    flex: 1;
    background: #fff;
    line-height: 40px;
}
</style>
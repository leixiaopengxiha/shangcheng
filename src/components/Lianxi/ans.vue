<template>
    <div class="box">
       <div class="box-01">
           <div class="box-1">
           <div v-for="item in 20" :key='item'>
                {{item}}
            </div>
       </div>
       </div>
        <div  class="box-2">
            <div v-for="item in 100" :key='item'>
                {{item}}
            </div>
        </div>
    </div>
</template>
<style scoped>
.box{
    background: pink;
    display: flex;
}
.box-01{
     width: 150px;
      background: #fff;
}
.box-1{
    /* width: 150px; */
    max-height: 20vh;
    overflow: hidden;
    overflow-y: scroll;
    /* background: #fff; */
}
.box-2{
    flex: 1;
    min-height: 10vh;
    max-height: 80vh;
    overflow: hidden;
    overflow-y: scroll;
    background: red;
}
</style>
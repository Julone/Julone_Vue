<template>
    <div class="container">
        <div class="block">
            <el-carousel height="150px" style="margin: 20px auto;" type="card">
                <el-carousel-item class="carousel" style="text-align:center;vertical-align:middle" v-for="item in finaly" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="result">
            {{finaly}}
        </div>
        <div class="result">
            <el-button type="primary" class="mm" @click="rand">再来一次</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return({
            arr : ['粉铺铺','软院食堂','好面熟','牛肉馆','沙县小吃','经贸学院','木桶饭','厦门沙锅','吉祥川菜'],
            finaly:""
        })
    },
    methods:{
        rand(){
            this.finaly =  this.arr[Math.floor(Math.random() * this.arr.length)]
        }
    },
    mounted(){
        this.rand()
    }
}
</script>
<style lang="less">
.carousel{
    display: flex;
    align-items: center;
    justify-content:center;
    font-size: 2rem;
  background-image: linear-gradient(300deg, #cfd9df 0%, #e2ebf0 100%);
    color: white;

    border-radius: 5px;

}


.result{
    width: 100%;
    height: 40px;
    font-size: 2rem;
    text-align: center;
        padding: 40px;
        margin-bottom: 40px;
    display: inline-block;
}
.container{
    background: url('./../assets/img/social.svg') left bottom / 200% no-repeat;
    height: calc(100vh - 55px);
        margin-top: -20px;
        padding-top: 20px;

}

</style>

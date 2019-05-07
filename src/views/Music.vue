<template>
    <div  v-infinite-scroll="load" :infinite-scroll-disabled="loading"
                            infinite-scroll-distance="50">
        <el-card align="center">抖音音乐使用量榜单</el-card>
        <audio controls ref="audio" hidden></audio>
        <el-card class="el_card" v-for="(el,i) in list" :key="el" @click.native="play(el.url,i)">
            <div class="info">
                <div class="left ani1">
                    <img :src="el.img" width="70px" alt="">
                     <button @click="play(el.url,i)" class="comIcon">{{el.playing?'&#xe762;':'&#xe73f;'}}</button>
                </div>
                <div class="right ani2">
                     <font color="red" v-if="i<3">第{{i + 1 }}名<br></font>
                    <div class="title">
                        {{el.title}}
                    </div>
                    <div>{{el.name}} </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>

export default {
    data: ()=>({
        a:32,
        page:0,
        list:[],
        past:-1,
        cur:-1,
    }),
    watch:{
  
    },
    methods:{
        play(a,b){
            if(this.past == -1 && this.cur ==-1){
                this.cur = b;
                this.$set(this.list[this.cur],'playing',true);
                this.$refs.audio.src=a;
                this.$refs.audio.play();
                this.past = this.cur;
            }else{
                this.cur = b;
                if(this.past == this.cur){
                    if(this.list[this.cur].playing){
                        this.$refs.audio.pause();
                    }else{
                        this.$refs.audio.play();   
                    }
                    this.$set(this.list[this.cur],'playing',!this.list[this.cur].playing);
                }else{
                    this.$set(this.list[this.cur],'playing',true);
                    this.$set(this.list[this.past],'playing',false)
                    this.$refs.audio.src=a;
                    this.$refs.audio.play();
                    this.past = this.cur;
                }
            }
        },
        load(){
            $.ajax({
                type: "get",
                url: "https://kuaiyinshi.com/api/hot/musics/?source=dou-yin&page=" + (this.page ++ ),
                data: "",
                dataType: "jsonp",
                success: function (res) {
                    if(res.code == 200){
                        var result = res.data.map((el,index,arr)=>{
                            return ({
                                img: el.music_img,
                                name:el.singer_name,
                                title:el.music_name.slice(0,20),
                                url:el.music_url,
                                playing:false
                            })
                        })
                        this.list.push(...result);         
                    }else{
                        this.$message({
                            message: '没有更多了',
                            duration: 2000,
                            center:true
                        })
                    }
                }.bind(this)
            });
        }
    },
    mounted(){
       this.load();
       fetch('https://bing.ioliu.cn/v1/rand?type=json',{mode:'no-cors'}).then(res=>res.text()).then(r=>console.log(r));


    }
}
</script>
<style scoped>
    .info{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .el-card{
            margin: 20px;
    }
    .el-card button{
        position: absolute;
        left:50%;
        top:50%;
        width:30px;
        height: 30px;
        background: none;
        border: none;
        margin:-15px 0 0 -15px;
    }
    .left{
        position: relative;
    }
    .right{
          margin: 0 0 0 10px;
    text-align: left;
    display: flex;
    flex-direction: column;
    /* justify-content: baseline; */
    height: 100%;
    /* align-items: center; */
    padding: 0 5px;
    line-height: 24px;
    }
</style>

<template>
    <div v-loading="loading" style="max-width:400px;margin:0 auto">
        <div class="head" :style="{opacity:!loading?'1':'0'}">
            <img :src="getUserIcon" width="80" alt="">
            <div  class="info">
                <h2 :class="userInfo.isAdmin == 'true' ? 'vip_text' : ''">{{userInfo.userName}}</h2>
                <h4>{{setTime(userInfo.userBorn)}}&nbsp;&nbsp;{{userInfo.userSex=='男生'?'♂':userInfo.userSex=='女生'? '♀' : '⚤'}}</h4>
                <div class="usercount">
                    <div><i class="comIcon">&#xe744;</i>{{userInfo.likeCount}}</div>
                    <div><i class="comIcon">&#xe72e;</i>{{userInfo.comCount}}</div>
                </div>
            </div>
        </div>
        <div class="showAll" :style="{opacity:!loading?'1':'0'}" transparent>
            <el-button width="100%" @click="loadComment" round  size="medium" >查看他的评论 <i class="el-icon-arrow-right"></i></el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loading:true,
            userInfo:{}
        }
    },
    watch:{
        userId(){
            this.loadComment()
        }
    },
    props:{
        userId:{
            type:String
        }
    },
    computed:{
        setTime(){
            return function(a){
                var date = new Date();
                if(a != "" && a != null){
                    date = new Date(a) 
                }
                return new Date().getFullYear() - date.getFullYear() +'岁';
            }
        },
        getUserIcon(){
          if(this.userInfo.userIcon == '' || this.userInfo.userIcon == null){
            return require('./../assets/img/user1.jpg')
          }else{
            return this.$store.state.srcCom +'nav/' + this.userInfo.userIcon
          }
      }
    },
    mounted(){
        this.loadComment()
    },
    methods:{
        loadComment(){
            this.loading = true;
            this.userInfo = {}
            axios({
            method:'post',
            url: this.$store.state.getUserInfo,
            data: {
                userId: this.userId
            }
        }).then(res=>{
                this.userInfo = res.data.userData;
                console.log(this.userInfo);
                this.loading = false
            })
        }
    }

}
</script>
<style>
h4{
    line-height: 1.5rem;
    text-align: center;
    font-weight: 500;
}
h2{
    text-align: center;
    line-height: 2.5rem;
}
.head{
    width:100%;
    display: flex;
    padding: 0 1rem;
    max-width: 400px;
    margin: 0 auto;
        flex-direction: row;
    align-items: center;
    justify-content: center
}
.head img{
    width:80px;
    height: 80px;
    border-radius: 50%;
}
.head .info{
    padding: 0 10px;
}
.usercount{
    display: flex;
    justify-content: center;
    width: 100%;
}
.usercount div{
    margin: 0 5px
}
.showAll{
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 0rem 0 0
}
</style>

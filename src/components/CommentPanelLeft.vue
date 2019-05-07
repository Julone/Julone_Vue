<template>
    <div class="left_panel_container">
        <div class="userBoard">
            <div class="userInfo">
                <div class="userPic" :style="{background: `url(${getUserIcon}) center center/cover no-repeat`}">
                </div>
                <div class="another">
                <div class="userName">{{userName}}</div>
                <div class="btns" v-if="isLogin" >
                    <el-button-group>
                    <el-button type="info" plain size="small" icon="el-icon-edit" @click="toLogin">编辑</el-button>
                    <el-button type="info" plain size="small" icon="el-icon-switch-button" @click="exit">注销</el-button>
                    </el-button-group>
                </div>
                <div class="btns" v-else >
                    <el-button-group>
                    <el-button type="info" plain @click.native="$router.push({path:'/login'})" size="small">
                        <i class="el-icon-back"></i>&nbsp;登录</el-button>
                    <el-button type="info" plain @click.native="$router.push({path:'/reg'})" size="small">
                        注册&nbsp;<i class="el-icon-right"></i></el-button>
                    </el-button-group>
                </div>
                </div>

            </div>
        </div>
        <transition name="fromBottom">
        <div v-show="oneShow" style="width:100%"> 
        <div class="userBoard one" >
            <one @loadok="oneShow = true"/>
        </div>
        </div>

        </transition>

    </div>
</template>
<script>
    import {
        getStorage,
        setStorage,
        delStorage
    } from '@/others/methods'
    import one from './../components/OneLunbo'
    export default {
        data(){
            return {
                oneShow:false
            }
        },
        components:{
            // one:() => import('./../components/OneLunbo.vue')
            one
        },
        computed: {
            isLogin(){
                return this.$store.state.isLogin;
            },
            getUserIcon: {
                get: function () {
                    if (getStorage('userIcon') == '' || getStorage('userIcon') == null) {
                        return require('@/assets/img/user1.jpg')
                    } else {
                        return getStorage('userIcon')
                    }
                },
                set: function (val) {
                    if (val != null && val != "") {
                        setStorage('userIcon', this.$store.state.srcCom + 'nav/' + val);
                    } else {
                        delStorage('userIcon')
                    }
                }
            },
            userName() {
                return getStorage('userName') || "游客"
            },
        },
        methods: {
            
            toLogin() {
                this.$router.push('/user')
            },
            exit(){
                  this.$confirm('你确定要注销吗？',{
                    confirmButtonText: '确 定',
                    cancelButtonText: '取 消',
                    // type: 'error',
                    confirmButtonClass:'el-button--danger'
                    })
                    .then(()=> {
                        this.$store.dispatch('logOut');
                        this.$router.push('/login')
                    }) 
            }

        }

    }
</script>
<style lang="less" scoped>

    .left_panel_container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: flex-start;
        @media screen and (max-width : 800px){
            &{
                padding: 0 5%;
            }
            .userInfo{
                display: flex;
                    flex-direction: row;
                justify-content: space-between;
                padding: 5px 20px;
            }
            .another{
                transform: scale(1.1)
            }
            .one{
                display: none;
            }


        }
    }

    .userBoard {
        display: flex;
        justify-content: space-between;
        background: white;
        width: 100%;
        padding: 15px;
     
        box-shadow: 0 26px 40px -24px rgba(0, 36, 100, .35);
        border: 1px solid rgba(170, 187, 204, 0.3);
        border-radius: 10px;
        box-sizing: border-box;
        transition: all ease .2s;
        /* animation: flipAni 0.8s 1 cubic-bezier(.77, 0, .175, 1) forwards; */
        position: relative;
        margin: 0 0 20px 0;
        height: fit-content;
        background: white url('./../assets/img/card.png') left bottom /100% 100% no-repeat

    }

    .userInfo,
    .btns {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .btns input {
        width: 5rem;
        height: 2.5rem;
        background: black;
        border: none;
        box-shadow: -1px 5px 18px -5px rgba(48, 25, 246, 0.69);
        border-radius: 90px;
        color: white;
        font-size: .8rem;
    }

    .userPic {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      
        border: 1px solid rgba(213, 209, 209, 0.7)
    }

    .userName {
        line-height: 50px;
        font-size: 1.2rem;
        // margin-left: 1rem;
        text-overflow: ellipsis;
        overflow: hidden;
        letter-spacing: 1px;
        max-width: 12rem;
        white-space: nowrap;
        color: #919191;
        text-align: center;
    }
</style>
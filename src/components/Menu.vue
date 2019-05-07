<template>
    <transition name="slideLeft">
        <div class="menuWrapper" v-show="menuState" @click="close()">
            <div class="menu" @click.stop :style="{obj,width:menuWidth,minHeight:menuHeight}">
                <div class="user" :style="{background: 'url('+getBack+') top center/100% no-repeat',height: parseInt(menuWidth) * 427 / 741 + 'px','background-color' : bgColor}">
                    <div @click="toUser" class="userIcon" :style="{background:`url(${getUserIcon}) center center/ cover no-repeat`}"></div>
                </div>
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :unique-opened="true" :router="true">
                    <el-menu-item-group @click.native="close()">
                        <el-menu-item index="/" route="/"><i class="comIcon">&#xe71c;</i><span>主页界面</span></el-menu-item>
                        <el-menu-item index="/comment" route="/comment">
                            <el-badge value="hot" class="item"><i class="comIcon">&#xe720;</i><span>互动中心</span></el-badge>
                        </el-menu-item>
                        <el-menu-item index="/blog" route="/blog" hidden>
                            <el-badge value="new" class="item"><i class="comIcon">&#xe6e8;</i><span>博客空间</span></el-badge>
                        </el-menu-item>
                        <el-menu-item index="/score" route="/score"><i class="comIcon">&#xe783;</i><span>成绩查询</span></el-menu-item>
                        <el-menu-item index="/news" route="/news" v-if="isMobile"><i class="comIcon">&#xe6fd;</i><span>新闻资讯</span></el-menu-item>
                         <el-menu-item index="/links" route="/links">
                            <i class="comIcon">&#xe715;</i><span>友情链接</span>
                        </el-menu-item>
                        <el-menu-item index="/more" route="/more">
                            <i class="comIcon">&#xe752;</i><span>更多作品</span>
                        </el-menu-item>
                        <el-menu-item index="4" disabled>
                            <i class="comIcon rotate" style="transform-origin: 49% 51%;">&#xe74b;</i>
                            <span slot="title">敬请期待</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-menu>
            </div>
           
        </div>
    </transition>
</template>

<script>
    import {
        getStorage,
        webp,
        mobile
    } from './../others/methods.js'

    export default {
        name: 'menu',
        data(){
            return {
                obj: {
                    zIndex: 10
                },
                bgColor: ""
            }
        },
        computed: {
            menuWidth(){
                return this.$store.state.innerWidth * 0.75 + 'px'
            },
            menuHeight(){
                return this.$store.state.innerHeight +'px'
            },
            
            menuState() {
                return this.$store.state.menuState
            },
            getUserIcon() {
                if (getStorage('userIcon')) {
                    return getStorage('userIcon')
                } else {
                    return require('./../assets/img/user1.jpg')
                }
            },
            isLogin(){
                this.$store.dispatch('checkLoginIn')
                return this.$store.state.isLogin
            },
            isMobile(){return this.$store.state.isMobile},
            getBack() {
                var num = this.getTime();
                if (webp) {
                    switch (num) {
                        case 1:
                            this.bgColor = "#8bd3f4";
                            return require('./../assets/img/timeBg/1.webp');
                            break;
                        case 2:
                            this.bgColor = "rgb(254, 213, 219)";
                            return require('./../assets/img/timeBg/2.webp');
                            break;
                        case 3:
                            this.bgColor = "rgb(254, 229, 139)";
                            return require('./../assets/img/timeBg/3.webp');
                            break;
                        case 4:
                            this.bgColor = "rgb(205, 236, 230)";
                            return require('./../assets/img/timeBg/4.webp');

                            break;
                        case 5:
                            this.bgColor = "rgb(61, 131, 223)";
                            return require('./../assets/img/timeBg/5.webp');
                            break;
                        case 6:
                            this.bgColor = "rgb(140, 140, 176)";
                            return require('./../assets/img/timeBg/6.webp');
                            break;
                        case 7:
                            this.bgColor = "rgb(106, 117, 179)";
                            return require('./../assets/img/timeBg/7.webp');
                            break;
                    }
                } else {
                    switch (num) {
                        case 1:
                            this.bgColor = "#8bd3f4";
                            return require('./../assets/img/timeBg/1.jpg');
                            break;
                        case 2:
                            this.bgColor = "rgb(254, 213, 219)";
                            return require('./../assets/img/timeBg/2.jpg');
                            break;
                        case 3:
                            this.bgColor = "rgb(254, 229, 139)";
                            return require('./../assets/img/timeBg/3.jpg');
                            break;
                        case 4:
                            this.bgColor = "rgb(205, 236, 230)";
                            return require('./../assets/img/timeBg/4.jpg');
                            break;
                        case 5:
                            this.bgColor = "rgb(61, 131, 223)";
                            return require('./../assets/img/timeBg/5.jpg');
                            break;
                        case 6:
                            this.bgColor = "rgb(140, 140, 176)";
                            return require('./../assets/img/timeBg/6.jpg');
                            break;
                        case 7:
                            this.bgColor = "rgb(106, 117, 179)";
                            return require('./../assets/img/timeBg/7.jpg');
                            break;
                    }
                }
            }
        },
        watch: {
            menuState(val) {
                this.$nextTick(() => {
                    if (val) {
                         document.body.style.height="100%"
                        document.body.style.overflow = "hidden"
                    } else {
                         document.body.style.height="auto"
                        document.body.style.overflowY = 'auto';
                    }
                })
            }
        },
        methods: {
            stopTouch(e) {
                e.preventDefault()
            },
            close() {
                this.$store.commit('toggleMenu', false)
            },
            toUser() {
                this.$router.push('/user');
                this.$store.commit('toggleMenu', false)
            },
            getTime() {
                var nowHour = new Date().getHours();
                if (nowHour >= 5 && nowHour < 9) {
                    return 1
                } else if (nowHour >= 9 && nowHour < 12) {
                    return 2
                } else if (nowHour >= 12 && nowHour < 14) {
                    return 3
                } else if (nowHour >= 14 && nowHour < 17) {
                    return 4
                } else if (nowHour >= 17 && nowHour < 20) {
                    return 5
                } else if (nowHour >= 20 && nowHour < 24) {
                    return 6
                } else if (nowHour >= 0 && nowHour < 5) {
                    return 7
                }
            },
        },
        mounted(){
            var x1,x2,that = this;
             document.querySelector('.menuWrapper').addEventListener('touchstart', function(e){
                 x1 = e.touches[0].clientX
             })
             document.querySelector('.menuWrapper').addEventListener('touchmove', function(e){
                 x2 = e.touches[0].clientX
             })
             document.querySelector('.menuWrapper').addEventListener('touchend', function(e){
                //  console.log('x2:' + x2 , 'x1'+x1);
                 if(x2 - x1 < -100){
                     that.$store.commit('toggleMenu', false)
                 }
             })
        }
    }
</script>

<style scoped>

    .el-badge>>>.el-badge__content.is-fixed {
        top: 31px;
        right: -3px;
    }

    .el-badge>>>.el-badge__content {
        line-height: 12px;
    }

    .user {
        width: 100%;
        background: white;
        position: relative;
        max-height: 200px;
        /* filter: blur(20px) */
    }

    .user:hover .userIcon {
        opacity: 1;
        transform: translate(0, -2rem)
    }

    .el-menu {
        border-right: none;
        border-radius: 10px;
        transform: translate(0, -4rem);
        transition: all ease 1s
    }

    .user:hover~.el-menu {
        transform: translate(0, 0);
        border-radius: 0;
    }


    .userIcon {
        width: 3rem;
        height: 3rem;
        border-radius: 50px;
        position: absolute;
        bottom: 0rem;
        left: 50%;
        margin-left: -1.5rem;
        opacity: 0;
        transition: all ease .5s;
        transform: translate(0, 10px)
    }

    .slideLeft-enter-active,
    .slideLeft-leave-active {
        transition: all 0.5s cubic-bezier(0.4, 0, 0, 1)
    }

    .slideLeft-enter,
    .slideLeft-leave-to {
        transform: translate3d(-100%, 0, 0)
    }

    .slideLeft-enter-to,
    .slideLeft-leave {
        transform: translate3d(0, 0, 0)
    }

    .el-menu-item-group__title {
        display: none
    }

    .el-submenu .el-menu-item {
        padding: 0 40px !important;
        height: 55px;
    }

    .el-submenu__title:hover {
        background: #f7f7f7 !important
    }

    .el-menu-item.is-active {
        font-weight: 700;
        color: #606266;
        background: #f9f9f9;
    }

    .el-menu-item span {
        margin-left: 1rem;
        letter-spacing: 2px
    }

    .el-menu-item:focus,
    .el-menu-item:hover {
        background-color: #fafafa;
    }

 
    .menuWrapper {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10000;
        transition: all ease .3s;
    }
  
    .menu {
        width: 70%;
        max-width: 480px;
        height: 100%;
        background: white;
        position: absolute;
        left: 0;
        border-right: solid 1px #e6e6e6;
        top: 0;
        box-shadow: 2px 0px 20px 0px rgba(0, 0, 0, 0.15)
    }

    .active {
        background-color: #34495e;
        color: white;
        width: 100% !important
    }
</style>
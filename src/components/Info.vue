<template>
    <transition name="slide">
        <div @click="close" v-show="showMe" class="about">
            <div :class="introClass" @click.stop>
                <!-- 关闭按钮 -->
                <div class="close comIcon" @click="close">&#xe6f3;</div>
                <!-- 头像 -->
                <div class="myHead">
                    <img @click.prevent.stop src="./../assets/img/me.jpg" width="90" height="90" alt="">
                </div>
                <!-- 手机邮箱 -->
                <div class="myCon">
                    <button>
                        <a href="mailto:julone@qq.com" style="color:#888">
                            <i class="el-icon-message"></i>julone@qq.com</a></button>
                    <button>
                        <i class="el-icon-mobile-phone"></i>177-20-7171-54</button>
                </div>
                <!-- 社交媒体 -->
                <div class="myBlog">
                    <div @click.prevent="openWB">
                        <img src="./../assets/img/weibo.png" alt="">
                    </div>
                    <el-tooltip class="item" popper-class="info-tip" effect="dark" content="微信号: 17720717154" placement="bottom">
                        <div class="wechat">
                            <img src="./../assets/img/wechat.png" alt="">
                        </div>
                    </el-tooltip>

                    <el-tooltip class="item" popper-class="info-tip" effect="dark" content="扣扣号: 183371456" placement="bottom">
                        <div class="qq">
                            <img src="./../assets/img/qq.png" alt="">
                        </div>
                    </el-tooltip>
                </div>

            </div>
        </div>
    </transition>
</template>

<script>
    import {
        blur,
        Sound
    } from './../others/methods.js'
    export default {
        name: 'Info',
        computed: {
            showMe() {
                return this.$store.state.infoState;
            },

            isMobile() {
                return this.$store.state.isMobile
            },
            introClass() {
                return this.$store.state.isMobile ? 'intro' : 'intro intro-pc'
            },
        },

        watch: {
            showMe(one) {
                if (one) {
                    blur(true);
                    document.body.style.overflow = "hidden"
                } else {
                    blur(false);
                    document.body.style.overflow = 'auto'
                }
                Sound("click");
            }
        },
        methods: {
            close(ev) {
                this.$store.commit('toggleInfo', false);
            },
            openWB() {
                this.close();
                this.$confirm('即将前往我的微博, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    window.location.href = "https://weibo.com/u/5646096222"
                })
            }
        },
        mounted() {
            if (!this.isMobile) {
                $(".intro").addClass('')
            }
        }
    }
</script>
<style>
    .info-tip {
        transform: translate(0, 10px)
    }
</style>

<style scoped>
    .close {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 100;
    }

    h5::after {
        content: "";
        display: table-cell;
        position: relative;
        top: 50%;
        width: 50%;
        border-top: 1px solid #e8eaec;
        -webkit-transform: translateY(50%);
        transform: translateY(50%);
    }

    .intro-pc::before {
        display: none;
    }

    .about {
        width: 100%;
        margin: 0 auto;
        height: 100%;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        justify-content: center;
        z-index: 10;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: all 1s cubic-bezier(.73, 2.57, .62, .29);
    }

    .slide-enter,
    .slide-leave-to {
        transform: translate(0, -400px);
        opacity: 0;
    }

    .slide-enter-to,
    .slide-leave {
        transform: translate(0, 0px);
        opacity: 1;
    }

    .intro {
        box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.23);
        background: white;
        width: 80%;
        max-height: 235px;
        border-radius: 10px;
        max-width: 320px;
        margin: 90px auto 0 auto;
        box-sizing: content-box;
        padding-bottom: 7px;
        position: relative;
    }

    .intro::before {
        content: '';
        width: 70px;
        height: 70px;
        border: 5px;
        position: absolute;
        left: 50%;
        margin-left: -35px;
        margin-top: -30px;
        background: white;
        transform: rotate(45deg) scale(0.45);
        border-radius: 12px;
        z-index: 0;
        box-shadow: -4px -4px 16px 2px rgba(0, 0, 0, .08)
    }

    .myHead {
        width: 100%;
        height: 105px;
        position: relative;
        margin: 0px auto;
        border-radius: 60px;
        padding-top: 14px;
        background: white;
    }

    .myHead img {
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(2, 2, 2, .08);
        left: 50%;
        margin-left: -45px;
        position: absolute;
        transition: all ease .6s;
        transform: translate(0, -5px) scale(1.05);
        box-shadow: 0 26px 40px -24px rgba(0, 26, 100, .5);
    }

    .myHead img:active {
        transform: translate(0, 0) scale(1);
        box-shadow: none;
        filter: grayscale(.6)
    }

    .myCon button:hover {
        text-decoration: underline;
        /* color: skyblue */
    }

    .myCon {
        width: 180px;
        height: 80px;
        position: relative;
        margin: 3px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .myCon button {
        background: none;
        border: none;
        margin-top: 0px;
        background: #f1f1f1;
        color: #888;
        position: relative;
        margin-top: 5px;
        border-radius: 50px;
        width: 100%;
        height: 35px;
        padding-left: 16px;
        padding-bottom: 3px;
        text-align: center;
        font-family: '微软雅黑', Rajdhani, PingFang SC, sans-serif;
    }

    .myCon button i {
        position: absolute;
        left: 12px;
        top: 9px;
    }

    .myBlog {
        width: 60%;
        height: 40px;
        display: flex;
        justify-content: center;
        margin-top: 6px;
        margin: 3px auto;
    }

    .myBlog div {
        margin: 10px 5px;
        height: 40px;
        margin: 0 6px;
    }

    .myBlog div img {
        filter: brightness(.86);
        width: 40px;
        height: 40px;
        transition: all ease 1s;
    }

    .myBlog div:hover img {
        filter: brightness(.7);
    }
</style>
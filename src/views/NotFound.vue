<template>
    <div class="notMain container" :style="{minHeight:innerHeight}">
        <div class="main">
        <img src="./../assets/img/404.jpg" width="100%" alt="">
        <h2>
            - {{ msg }} -
            <h4>{{code}}</h4>
        </h2>
        <router-link to="/">
            <el-button plain round class="btn" >返回主页</el-button>
        </router-link>
        
        </div>
        <appFooter btm="7%"></appFooter>
    </div>
</template>

<script>
    import appFooter from './../components/Footer.vue'
    export default {
        components: {
            appFooter
        },
        computed: {
            state(){
                return this.$route.params.state
            },
            msg() {
                switch (this.state) {
                    case '400':
                        return '请求错误';
                        break;
                    case '401':
                        return '需要授权';
                        break;
                    case '403':
                        return '禁止访问';
                        break;
                    case '404':
                        return '找不到网页';
                        break;
                    case '500':
                        return '服务器错误';
                        break;
                    default:
                        return '网页不存在';
                        break;
                }
            },
            code(){
                switch (this.state) {
                    case '400':
                        return '400 Request Error';
                        break;
                    case '401':
                        return '401 Require Permission';
                        break;
                    case '403':
                        return '403 Access Denied';
                        break;
                    case '404':
                        return '404 Not Found';
                        break;
                    case '500':
                        return '500 Server Error';
                        break;
                    default:
                        return '404 Not Found';
                        break;
                }
            },
             innerHeight(){
                return this.$store.state.innerHeight - 55 + 'px';
            }
        },
        data() {
            return {
            }
        },

        mounted() {
            // this.innerHeight = window.innerHeight - 55 + "px";
            this.$nextTick(() => {
                $('.notMain').hide()
                $(".notMain img").load(function () {
                    $('.notMain').fadeIn(300)
                })
            })
        }
    }
</script>
<style scoped>
    .notMain {
        background: white;
        /* padding: 80px 30px; */
        display: flex;
        align-items: center;
        justify-content: center;
        background: url(./../assets/img/social.svg) white bottom center no-repeat;
    }
    .main{
  display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20px;
        margin: 0 0 4rem 0;
    }

    h2 {
        text-align: center;
        color: #909399;
        margin: 30px auto 10px;
        position: relative;
        letter-spacing: 2px
    }

    h4 {
        font-weight: 500;
        font-size: .9rem;
        margin-bottom: 1.5rem;
        letter-spacing: 1px

    }

    .btn {
        margin-bottom: 15px;
    }

    img {
        max-width: 400px;
        height: auto;
        animation: float 5s linear infinite;
    }
    @keyframes float {
        0%,100%{
            transform: translate(0,10px)
        }
        50%{
            transform: translate(0,0px)
        }

    }
</style>
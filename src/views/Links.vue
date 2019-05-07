<template>
    <div class="container">
        <!-- <div class="container_left"> -->
            <!-- <img src="/link.jpg" alt="" style="filter:blur(5px)"> -->
            <!-- <video src="/video.mp4" autoplay loop ></video> -->
            <!-- <h1>友情链接</h1> -->
            <!-- <div class="logo"></div> -->
        <!-- </div> -->

    <div class="container_right">
        <!-- <div class="ani1 block">
            <h1><i class=" el-icon-s-promotion "></i>朋友们<span>Friend</span></h1>
            <ul class="ani2">
                <li v-for="el in linkList.friends"  v-show="!el.disabled" :key="el">
                    <a :href="el.url" target="_blank" >{{el.title}}</a>
                </li>
            </ul>
        </div> -->
        <div class="ani3 block">
            <h1><i class="el-icon-s-flag"></i>大神们<span>Developer</span></h1>
            <ul class="ani4">
                <li v-for="el in  linkList.developer" :key="el">
                    <a :href="el.url" target="_blank">{{el.title}}</a>
                </li>

            </ul>
        </div>
        <div class="ani5 block">
            <h1><i class="el-icon-s-cooperation"></i>工具箱<span>Tool</span></h1>
            <ul class="ani6">
                <li v-for="el in  linkList.tools" :key="el">
                    <a :href="el.url" target="_blank">{{el.title}}</a>
                </li>
            </ul>
        </div>
        <div class="ani7 block">
            <h1><i class="el-icon-s-help"></i>网站支持<span>Support</span></h1>
            <ul class="ani8">
                <li v-for="el in  linkList.website" :key="el">
                    <a :href="el.url" target="_blank">{{el.title}}</a>
                </li>
            </ul>
        </div>
        <appfoot class="ani9"></appfoot>
    </div>
    </div>
</template>

<style lang="less" scoped>
.container{
    width: 100%;
    display:flex;
    margin: 0 auto;
    height: calc(100vh - 55px);
    background: url('./../../public/link.png') right bottom/cover no-repeat fixed;
}
.logo{
        // transform: rotatey(180deg);
        &::before{
            font-size: 33rem;
        }
}
.container_left{
    width:450px;
    // background: white;
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    border-radius: 10px;

    video,img{
        height: 100%;
    border-radius: 10px;

    }
    h1{
        text-align:center;
    }
}
    .container_right {
        width:70%;
        max-width: 600px;
        margin: 0px auto;
        padding: 1rem 0;
        // background: url(./../assets/img/ant_bg.svg);
         .transi {
                transition: all ease .4s;
            }

        .block {
            box-sizing: border-box;
            border: 1px solid transparent;
            padding: 2px 5px;

            h1 {
                display: inline-block;
                position: relative;
                color: #606266;
                letter-spacing: 1px;
                margin: 0.5em 0;
                .transi;

                span {
                    display: none;
                    opacity: 0;
                    position: absolute;
                    margin-left: 10px;
                    .transi;
                }

                &::before {
                    content: '';
                    position: absolute;
                    display: inline-block;
                    left: 50%;
                    bottom: 8px;
                    width: 70%;
                    height: 5px;
                    margin-left: -(70% /2);
                    box-shadow: 0px 4px 16px 0px #818181;
                    background: #b5b5b5;
                    border-radius: 100px;
                    .transi;
                }

            }

           

            &:hover {

                &::before {
                    color: #3babe2
                }

                h1 {
                    transform: translate(1rem, 0);

                    &::before {
                        box-shadow: 0px 4px 16px 0px #0093ff;
                        background: #3babe2;
                    }
                }
            }
        }
        ul {
            list-style: none;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin-bottom: 1rem;
            width: 100%;

            li {
                @width: 100%;
                padding: 12px 15px;
                letter-spacing: 1px;
                box-sizing: border-box;
                .transi;
                &[disabled]{
                
                       cursor:not-allowed; 
                    }
                margin: 0 4px 4px 0px;
                @media (max-width: 400px) {
                    width: (@width/2) - 2px;
                }

                @media (min-width: 400px) and (max-width: 800px) {
                    width: (@width/ 3) - 2px;
                }

                @media (min-width: 800px) {
                    width: (@width / 4) - 2px;
                }
                border:1px solid transparent;
               
                text-align: center;
                display: flex;
                align-items: center;
                background-color: #fcfcfc;
                cursor: pointer;
                    box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 0.25);
                    border-radius: 3px;

                &::before {
                    content: '\e6dd';
                    font-family: comment;
                    margin-right: 7px;
                }

                a {
                    font-size: .8rem;
                    color: #7c7c7c;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    pointer-events: none;
                    
                }
                 &:hover {
                    z-index: 1;
                    transform-origin: center center;
                    background: gray;
                    color: white;
                    a{
                        color: white;
                    }
                }
            }
        }
    }
</style>


<script>
    import appfoot from './../components/Footer.vue'
    export default {
        data() {
            return {
                linkList: {

                    developer: [
                        {
                            title: 'Frank',
                            url: 'http://dadafrank.top'
                        },
                        {
                            title: '熊猫小A',
                            url: 'https://www.imalan.cn/'
                        },
                        {
                            title: 'Hran的博客',
                            url: 'https://get233.com/'
                        }, {
                            title: '卜卜口',
                            url: 'http://mouto.org/#!home'
                        },
                        {
                            title: '无人小站',
                            url: 'https://www.ercc.cc/'
                        }, {
                            title: '猫与向日葵',
                            url: 'https://imjad.cn/'
                        }, {
                            title: 'CDogの碎碎念',
                            url: 'https://blog.cdog.me/'
                        },
                        {
                            title: 'Agence-me',
                            url: 'https://www.agence-me.com/us/'
                        }
                    ],
                    friends: [{
                            title: 'Frank',
                            url: 'http://dadafrank.top'
                        },
                        {
                            title: '柯少爷',
                            url: 'http://fcjs.tk',
                            disabled:true
                        },
                        {
                            title: 'Leaf',
                            url: 'http://yeyunsong.cf/',
                            disabled:true
                        }
                    ],
                    tools: [{
                            title: 'VSCode',
                            url: 'https://code.visualstudio.com/'

                        }, {
                            title: 'Sublime',
                            url: 'https://sublimetext.com'

                        }, {
                            title: 'Node.js',
                            url: 'http://nodejs.org'
                        },
                        {
                            title: 'BootCDN',
                            url: 'https://www.bootcdn.cn/'
                        },
                        {
                            title: 'Swiper',
                            url: 'https://www.swiper.com.cn/'
                        },
                        {
                            title: 'UI中国',
                            url: 'https://www.ui.cn'
                        },
                        {
                            title: 'Vue.js',
                            url: 'http://vuejs.org'
                        },
                    ],
                    website: [{
                            title: '小鱼云',
                            url: 'http://www.xyyun.cc/'
                        },
                        {
                            title: 'DNS.COM',
                            url: 'http://www.dns.com'

                        }, {
                            title: 'Freenom',
                            url: 'https://www.freenom.com/zh/index.html?lang=zh'
                        }

                    ]
                }
            }
        },
        components: {
            appfoot
        },
        watch: {},
        methods: {
        },
        computed: {},
        mounted() {
            this.$nextTick(()=>{
                $('.container ul li').not('[disabled]').click(function (e) {
                    e.preventDefault();
                    window.open($(this).find('a').get(0).href);
                });
             
            })
         
        },
    }
</script>
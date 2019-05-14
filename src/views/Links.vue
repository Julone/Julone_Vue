<template>
    <div class="container">
        <!-- <div class="container_left"> -->
        <!-- <img src="/link.jpg" alt="" style="filter:blur(5px)"> -->
        <!-- <video src="/video.mp4" autoplay loop ></video> -->
        <!-- <h1>友情链接</h1> -->
        <!-- <div class="logo"></div> -->
        <!-- </div> -->

        <div class="container_right">
            <!-- <el-card>友情链接</el-card> -->
            <h2 class="fadeTop1">
                友情链接<span>LINKS</span>
            </h2>

            <div class="ani_line"></div>
            
            <div class="ani1 block">
                <h1><i class=" el-icon-s-promotion"></i>朋友们<span>Friends</span></h1>
                <ul class="ani2">
                    <!-- <li v-for="el in linkList.friends"  v-show="!el.disabled" :key="el">
                    <a :href="el.url" target="_blank" >{{el.title}}</a>
                </li> -->
                    <li><a href="http://dadafrank.top" target="_blank" rel="noopener">大大Frank</a></li>
                    <li><a href="http://mouto.org/#!home" target="_blank" rel="noopener">卜卜口</a></li>
                    <li><a href="http://www.zkl2333.com/" target="_blank" rel="noopener">My space</a></li>
                    <li><a href="https://www.ubuntuhot.com/" target="_blank" rel="noopener">UbuntuHOT</a></li>
                    <li><a href="https://aoaoao.me/" target="_blank" rel="noopener">Aaron</a></li>
                    <li><a href="https://www.androiddev.net" target="_blank" rel="noopener">码农日记</a></li>
                    <li><a href="https://imququ.com/" target="_blank" rel="noopener">Jerry Qu</a></li>
                    <li><a href="https://flyhigher.top/" target="_blank" rel="noopener">无垠</a></li>
                    <li><a href="http://www.roczhang.com" target="_blank" rel="noopener">Roc Zhang</a></li>
                    <li><a href="http://zhangwenli.com/blog/" target="_blank" rel="noopener">羡辙杂俎</a></li>

                </ul>
            </div>
            <div class="ani3 block">
                <h1><i class="el-icon-s-flag"></i>大神们<span>Developer</span></h1>
                <ul class="ani4">
                    <!-- <li v-for="(el,index) in  linkList.developer" :class="'ani' + index % 9" :key="el">
                    <a :href="el.url" target="_blank">{{el.title}}</a>
                </li> -->
                    <li><a href="https://imalan.cn" target="_blank" rel="noopener">特殊字符 Alan</a></li>
                    <li><a href="http://blog.dandyweng.com/" target="_blank" rel="noopener">翁天信</a></li>
                    <li><a href="https://blog.lwl12.com/" target="_blank" rel="noopener">LWL12</a></li>
                    <li><a href="https://www.ryannn.com/" target="_blank" rel="noopener">Ryan</a></li>
                    <li><a href="https://diygod.me/" target="_blank" rel="noopener">AnotherHome</a></li>
                    <li><a href="http://www.devchen.com/" target="_blank" rel="noopener">十七的空指针</a></li>
                    <li><a href="https://hran.me/" target="_blank" rel="noopener">Hran’s</a></li>
                    <li><a href="https://windisco.com" target="_blank" rel="noopener">Windisco</a></li>
                    <li><a href="https://siitake.cn/" target="_blank" rel="noopener">香菇社长</a></li>
                    <li><a href="https://www.geekcj.com" target="_blank" rel="noopener">geekcj12</a></li>
                    <li><a href="https://www.ercc.cc" target="_blank" rel="noopener">无人小站</a></li>
                    <li><a href="https://www.xinxuan.me" target="_blank" rel="noopener">冰雪林</a></li>
                    <li><a href="https://shawnzeng.com/" target="_blank" rel="noopener">Shawn</a></li>
                    <li><a href="https://imjad.cn/" target="_blank" rel="noopener">AD’s Blog</a></li>
                    <li><a href="https://cdog.me/index.html#!/h" target="_blank" rel="noopener">CDogの狗窝</a></li>
                    <li><a href="http://xcgx.me/" target="_blank" rel="noopener">CancerGary’s Blog</a></li>
                    <li><a href="http://blog.izgq.net/" target="_blank" rel="noopener">ZGQ’s Blog</a></li>
                    <li disabled><a href="http://www.5ih5.com.cn" target="_blank" rel="noopener">镜花水月 blog</a></li>
                    <li><a href="http://cheesekun.top" target="_blank" rel="noopener">芝士君</a></li>

                </ul>
            </div>
            <div class="ani5 block">
                <h1><i class="el-icon-s-cooperation"></i>开发工具<span>Tools</span></h1>
                <ul class="ani6">
                    <li v-for="el in  linkList.tools" :key="el">
                        <a :href="el.url" target="_blank">{{el.title}}</a>
                    </li>
                </ul>
            </div>
            <div class="ani7 block">
                <h1><i class="el-icon-s-help"></i>网站支持<span>Support</span></h1>
                <ul class="ani7">
                    <li v-for="el in  linkList.website" :disabled="el.disabled" :key="el">
                        <a :href="el.url" target="_blank">{{el.title}}</a>
                    </li>
                </ul>
            </div>
            <getTop></getTop>
            <appfoot beiAn></appfoot>
        </div>

    </div>
</template>

<style lang="less" scoped>
    .container {
        width: 100%;
        display: flex;
        margin: 0 auto;
        justify-content: flex-start;
        // height: calc(100vh - 55px)
        // @z:100%;
        background: url('./.././assets/img/qq_bg.jpg') top left /420px no-repeat,
            url('./.././assets/img/qq_bg2.jpg') bottom right /420px no-repeat;
        background-color: rgba(242, 247, 250, 1);
        @media (max-width: 400px) {
            &{
            //    background-size: 80%,80%;
               background-attachment: fixed;
            }
        }
    }
    

    .logo {

        // transform: rotatey(180deg);
        &::before {
            font-size: 33rem;
        }
    }

    .container_left {
        width: 450px;
        // background: white;
        display: flex;
        flex-direction: column;

        align-items: flex-start;
        border-radius: 10px;

        video,
        img {
            height: 100%;
            border-radius: 10px;

        }

        h1 {
            text-align: center;
        }
    }

    .container_right {
        width: 70%;
        max-width: 700px;
        margin-left: 10%;
        margin: 0px auto 2vh;
        padding: 1rem 0;

        // background: url(./../assets/img/ant_bg.svg);
        .transi {
            transition: all ease .4s;
        }

        .fadeTop1 {
            font-size: 2rem;
            font-weight: 200;
            line-height: 4rem;

            span {
                color: gray;
                font-size: 1.5rem;
                padding: 10px;
            }
        }

        .block {
            box-sizing: border-box;
            border: 1px solid transparent;
            padding: 1rem 3rem 0.3rem;
            // border:1px solid silver;
            border-radius: 10px;
            .transi;
            margin-bottom: 1rem;

            h1 {
                display: inline-block;
                position: relative;
                color: #606266;
                letter-spacing: 1px;
                margin: 0.5em 0;
                .transi;
                font-weight: 200;
                // overflow: hidden;
                transform: translate(-3rem, 0);

                span {
                    // display: none;
                    opacity: 0;
                    position: absolute;
                    margin-left: 10px;
                    border-left: 3px solid #4fbff0;
                    padding-left: 10px;
                    font-size: 1.8rem;
                    line-height: 2.4rem;
                    padding-top: 0px;
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
                    z-index: -1;
                    opacity: 0;
                    .transi;
                }

                &::after {
                    content: '(排名不分先后)';
                    font-size: 1.1rem;
                    color: #949494;
                    position: absolute;
                    white-space: nowrap;
                    bottom: 0;
                    opacity: 0;
                }

            }



            &:hover {
                box-shadow: 3px 4px 80px 0 #00000040;
                background: white;

                &::before {
                    color: #3babe2;
                }

                h1 {
                    transform: translate(-.5rem, 0);

                    &::before {
                        box-shadow: 0px 4px 16px 0px #0093ff;
                        background: #3babe2;
                        z-index: 2;
                        opacity: 1;
                    }

                    span {
                        opacity: .4;


                    }

                    &::after {
                        // opacity: 1;
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
                // width: @width;
                padding: 12px 15px;
                letter-spacing: 1px;
                box-sizing: border-box;
                font-size: 0;
                .transi;

                &[disabled] {
                    cursor: not-allowed;

                    &::before {
                        content: '\e737';
                    }

                    a {
                        text-decoration: line-through;
                    }
                }

                margin: 0 10px 10px 0px;
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
                    margin-right: 2px;
                    font-size: .9rem;
                }

                a {
                    font-size: .8rem;
                    color: #7c7c7c;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    pointer-events: none;
                    line-height: 1rem;
                }

                &:not([disabled]):hover {
                    z-index: 1;
                    transform-origin: center center;
                    background: gray;
                    color: white;

                    a {
                        color: white;
                        text-decoration: underline;
                    }
                }
            }
        }

        @media (max-width: 400px) {

            width: 90%;

            .block {
                padding: 1rem 1rem .3rem;

                h1 {
                    transform: translate(0rem, 0);

                    &:hover {
                        transform: translate(0rem, 0);

                    }
                }

                li {
                    width: 45%;
                    padding: 15px 15px;
                }
            }
        }

        @media (min-width: 400px) and (max-width: 800px) {
            width: 90%;

            .block {
                padding: 1rem 1rem .3rem;

                h1 {
                    transform: translate(0rem, 0);

                    &:hover {
                        transform: translate(0rem, 0);
                    }
                }

                li {
                    width: 30%;
                    padding: 18px 15px;
                }
            }
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                sug: '',
                linkList: {
                    developer: [{
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
                            disabled: true
                        },
                        {
                            title: 'Leaf',
                            url: 'http://yeyunsong.cf/',
                            disabled: true
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
                            title: 'Swiper',
                            url: 'https://www.swiper.com.cn/'
                        },

                        {
                            title: 'Vue.js',
                            url: 'http://vuejs.org'
                        },
                        {
                            title: 'Loading.io',
                            url: 'https://loading.io/'
                        }

                    ],
                    website: [{
                            title: 'UI中国',
                            url: 'https://www.ui.cn'
                        },
                        {
                            title: '小鱼云',
                            url: 'http://www.xyyun.cc/',
                            disabled: true
                        },
                        {
                            title: 'DNS.COM',
                            url: 'http://www.dns.com',
                            disabled: true

                        }, {
                            title: 'Freenom',
                            url: 'https://www.freenom.com/zh/index.html?lang=zh',
                            disabled: true

                        },
                        {
                            title: '腾讯云',
                            url: 'https://cloud.tencent.com/'
                        },
                        {
                            title: 'BootCDN',
                            url: 'https://www.bootcdn.cn/'
                        },
                    ]
                },
                suglist: []
            }
        },
        watch: {

        },
        methods: {},
        computed: {},
        mounted() {
            this.$nextTick(() => {
                $('.container ul li').not('[disabled]').click(function (e) {
                    e.preventDefault();
                    window.open($(this).find('a').get(0).href);
                });

            })

        },
    }
</script>
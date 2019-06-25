<template>
    <div class="container">
        <aside>
            <div class="video_wrapper fadeTop1">
                <video v-if="!$store.getters.isMobile" ref="video" @loadeddata="videoLoaded" src="./../assets/video/about.mp4" muted loop autoplay></video>
            </div>
        </aside>
        <article>
            <div class="title fadeTop2">
                <img src="./../assets/img/logo-text-static.svg" alt="">
                <div class="ani_line"></div>
            </div>

            <div class="card ani3">
                <div class="julone_info">
                    <div class="intro fadeLeft4">
                        <p>1997年，出生于福建平潭，现居于福建泉州。</p>
                        <p>现为大三在读本科生，坐标泉州师范学院，软件工程专业。</p>
                        <p>
                            <span>喜欢各种有趣的事物，热衷折腾。</span>
                            <ul>
                                <li>小学时候热衷于游戏机以及各种电子小玩意的拆解与组装。</li>
                                <li>中学时代喜好折腾 手机、平板、电脑的拆解与刷机。</li>
                                <li>高中是学渣一枚，迷上了UI设计，学会了Photoshop。</li>
                                <li>大学意外对网页设计与编程产生了兴趣，于是走上了折腾网页的道路，最爱干的事情是写JS与CSS。</li>
                            </ul>
                        </p>

                        <p>
                            <span>掌握的技能与目标</span>
                        </p>
                        <p>目前主要在写 JavaScript，比较熟悉 <em>HTML</em> , <em>CSS</em> , <em>jQuery</em> ,
                            <em>Vue.js</em> ,<em>Vue Cli3</em> , <em>Less</em> , <em>Axios</em> ,
                            <em>ElementUI</em>。</p>
                        <p>
                            正在学习Angular.js 与 React.js，后台语言Node.js 与 PHP，主力 Web 方向，
                            目前正朝着前端程序猿的方向进发。😀
                        </p>

                    </div>
                    <div class="contact ani5">
                        <el-button type="primary" @click="$store.commit('toggleInfo',true)">联系方式</el-button>
                    </div>
                </div>
            </div>
            <appfoot class="ani6"></appfoot>


        </article>
    </div>
</template>

<style lang="less" scoped>
    .flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .in{
                clip-path: polygon(0% 0%,46% 0%,100% 0%,100% 100%,100% 100%,0% 100%,0% 100%);
    }
    .container {
        overflow: hidden;
        height: calc(100vh - 55px);
        .flex;
        justify-content: space-around;
        @aside_width: 46%;
        background: white;

        aside {
            width: @aside_width;
            height: 100%;
            overflow: hidden;
            .flex;

            .video_wrapper {
                position: relative;
                height: 100%;
                width: 100%;
                overflow: hidden;
                background: url('./../assets/img/about.jpg') center center/cover no-repeat;
                // clip-path: polygon(10% 12%, 82% 2%,95% 12%, 100% 80%, 84% 100%, 1% 86%);
                // clip-path: polygon(10% 12%, 46% 2%, 95% 12%, 100% 80%, 84% 100%,25% 95%, 1% 73%);
                clip-path: polygon(0% 0%,46% 0%,100% 0%,100% 91%,92% 100%,21% 100%,0% 100%);
                video {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: auto !important;
                    height: auto !important;
                    min-height: 100%;
                    min-width: 100%;
                }
            }
        }

        article {
            .title {
                .flex;
                // margin-bottom: -5vh;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                img {
                    width: 60%;
                    height: 85px;
                }

                h1 {
                    font-size: 3rem;
                    h3 {
                        font-size: 2rem
                    }
                }
            }

            .flex;
            width: calc(100% - @aside_width);
            flex-direction: column;
            padding: 3rem 5%;
            align-items: space-between;

            .card {
                @headW: 30%;
                .flex;

                // background: white;
                // padding: 20px;
                // box-shadow:0px 5px 0 0 #71adeb, 0px 10px 0 0 #c8dded;
                // border: 1px solid #ebeef5;
                // border-radius: 10px;
                .julone_head {
                    width: @headW;
                    opacity: .2;
                    border-radius: 10px;
                    .flex;

                }

                .julone_info {
                    // width: calc(100% - @headW);
                    // padding:1rem 5%;
                    max-width: 450px;
                    // min-width: 400px;
                    padding: 1rem 0;

                    .intro {
                        font-weight: 200;
                        width: 100%;

                        p {
                            margin: 5px auto 5px;
                            line-height: 1.5rem;
                            word-break: break-all;

                            // text-indent: 1rem;
                            span {
                                background: #ececec;
                                border-left: 3px solid gray;
                                line-height: 36px;
                                display: block;
                                padding-left: 10px;
                                letter-spacing: 1px;
                            }

                            em {
                                &:hover {
                                    text-decoration: wavy;
                                    // font-weight: 500;
                                    color: #249afb;
                                }
                            }

                            ul {
                                list-style-type: circle;
                                margin: 10px 0;

                                font-size: .9rem;
                                list-style-type: circle;
                                margin: 10px 0px 10px 27px;

                                li {
    padding: 3px 5px;

                       
                                    // font-family: monospace;

                                    // text-indent: 10px;
                                }
                            }
                        }
                    }
                }

            }
            .contact{
                .flex;
                padding:.4rem 0 0rem;
            }
        }

        @media (max-width : 800px) {
            & {
                flex-direction: column;
                justify-content: flex-start;
                height: fit-content;
            }

            @aside_width: 100%;

            aside {
                width: @aside_width;
                height: 400px;
            }

            article {
                width: 100%;
                padding: 0 5%;

                .julone_info {
                    width: 96% !important;
                    padding: 1rem;
                }
            }
        }


    }
</style>
<script>
    export default {
        mounted(){

        },
        
        methods:{
            videoLoaded(){
                this.$refs.video.playbackRate = 3
                this.$refs.video.play()
            }
        }
    }
</script>
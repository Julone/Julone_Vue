<template>
    <div class="news_container container" v-loading.fullscreen="firstLoad" ref="container" v-infinite-scroll="loadNews"
        :infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <div class="news_nav">
             <el-tabs class="container-tab" v-model="activeName" @tab-click="tagClick" style="margin-bottom: -10px;overflow-x:auto">
            <el-tab-pane label="推荐" name=""></el-tab-pane>
            <el-tab-pane label="互联网" name="互联网"></el-tab-pane>
            <el-tab-pane label="娱乐" name="娱乐"></el-tab-pane>
            <el-tab-pane label="国际" name="国际"></el-tab-pane>
            <el-tab-pane label="生活" name="生活"></el-tab-pane>
            <el-tab-pane label="科技" name="科技"></el-tab-pane>
            <el-tab-pane label="军事" name="军事"></el-tab-pane>
            <el-tab-pane label="时尚" name="时尚"></el-tab-pane>
            <el-tab-pane label="图片" name="图片"></el-tab-pane>
        </el-tabs>
        </div>

        <transition-group name="news" tag="div" class="news_wrapper">
            <div class="news_item" v-for="(el) in newsArray" :key="el"
                :class="el.imgs.length==1?'item_one':el.imgs.length==2?'item_two':el.imgs.length==3? 'item_three' : 'item_none'">
                <a :href="el.url" target="_blank">
                    <div class="item_main">
                        <div class="item_left">
                            <div class="item_head">
                                {{el.title}}
                            </div>
                            <div class="item_body">
                                {{el.body}}
                            </div>
                            <div class="item_time" v-if="el.imgs.length==1">
                                {{el.src}} • {{el.time}}
                            </div>
                        </div>
                        <div class="item_imgs">
                            <img :src="img" v-for="img in el.imgs" :key="img" :onerror="errorImg" alt="图片加载失败">
                        </div>
                        <div class="item_time" v-if="el.imgs.length!= 1">
                            {{el.src}} • {{el.time}}
                        </div>
                    </div>
                </a>
            </div>
        </transition-group>
        <div class="empty" @click="tagClick" v-if="newsArray.length == 0&& !loading">
            <div>
                <div class="repair">
                    <i class="comIcon" style="font-size:5rem">&#xe782;</i>
                </div>
                <br>
                <el-button type="text" disabled>加载失败,点击屏幕重试</el-button>
                <br><br>
                <el-button @click="tagClick">立即刷新</el-button>

            </div>
        </div>
        <div class="bottom" v-show="newsArray.length != 0&& loading">
            <div class="rotate" @click="loadNews">
                <i class="comIcon">&#xe74b;</i>
            </div>
        </div>
        <gettop></gettop>
    </div>
</template>
<script>
   
    import {
        pushHistory,
        setTime
    } from './../others/methods.js'
   
    import foot from './../components/Footer.vue'
    import gettop from "./../components/Common/Top.vue";
    export default {
        components: {
            foot,
        },
        data() {
            return {
                newsArray: [],
                curNews: null,
                show: false,
                loading: false,
                firstLoad: true,
                activeName: "",
                loadGif: null,
            }
        },
        components:{
            gettop
        },
        watch: {
            show(val) {
                if (val) {
                    this.$refs.container.style.overflow = "hidden"
                } else {
                    this.$refs.container.style.overflow = "unset"
                }
            }
        },
        computed: {
            setTime() {
                return function (e) {
                    return setTime(e)
                }
            }
        },
        methods: {
            errorImg(e){
                console.log(e)
                console.log(134)
            },
            tagClick(el) {
                this.activeName = el.name || this.activeName
                this.loadGif = this.$loading({
                    lock: true,
                    text: '正在加载',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255,255,255,.97)'
                });
                this.newsArray.splice(0, this.newsArray.length);
                this.loadNews();
            },
            openNews(arg) {
                this.show = true;
                this.curNews = arg.replace(/^http/, "https");
                pushHistory(function () {
                    this.closeNews();
                }.bind(this))
            },
            closeNews() {
                this.show = false;
                this.curNews = null;
            },
            loadNews() {
                if (!this.loading) {
                    this.loading = true;
                    $.ajax({
                        type: "get",
                        url: 'https://news.baidu.com/sn/api/feed_channellist',
                        data: {
                            form: "news_webapp",
                            pd: "webapp",
                            os: "iphone",
                            ver: 6,
                            category_name: this.activeName,
                            category_id: "",
                            action: 1,
                            display_time: 0,
                            wf:0,
                            mid:"0C9F6BCFD7E0621BF59CD025E934B017:FG=1"
                        },
                        dataType: "jsonp",
                        jsonp:'callback',
                        success: function (res) {
                            console.log(res.data.news)
                            var result = res.data.news.map((el, index, arr) => {
                                var json = {};
                                json.title = el.title;
                                json.src = el.site
                                json.url = el.url
                                json.imgs = [];
                                json.time = setTime(el.ts);

                                for (var ke of el.imageurls) {
                                    json.imgs.push(ke.url)
                                }
                                return json
                            })
                            console.log(result);
                            this.newsArray.push(...result.filter((el) => el));
                            this.loading = false;
                            if(this.loadGif)
                            this.loadGif.close();
                        }.bind(this)
                    });
                }

            }
        },
        mounted() {
            this.loadNews();
            setTimeout(() => {
                this.firstLoad = false;
                if (this.newsArray < 6) {
                    this.loadNews();
                }
            }, 1000)
        }
    }
</script>

<style scoped>
.news_nav{
position: fixed;
    top: 55px;
    left: 0;
    width: 100%;
    height: 40px;
    z-index: 110;
    background: white;
}
.news_wrapper{
    margin-top: 38px;
}
    .news-enter-active {
        animation: flipAni 1.4s 1 cubic-bezier(.77, 0, .175, 1) backwards;
    }

    .repair {
        animation: repair 3s ease infinite;
        color: #909399
    }

    @keyframes repair {

        0%,
        100% {
            transform: rotate(-25deg)
        }

        50% {
            transform: rotate(12deg)
        }
    }

    .news-leave-active {
        display: none;
        /* animation: fadeout 0s 1 cubic-bezier(.77, 0, .175, 1) backwards; */
        /* animation-duration: 0s; */
    }

    @keyframes fadeout {
        from {
            opacity: 1;
        }

        to {
            opacity: 0
        }
    }

    .rotate {
        animation: rota 1s linear infinite;
    }

    .empty {
        width: 100%;
        height: calc(100vh - 55px);
        text-align: center;
        justify-content: center;
        display: flex;
        align-items: center
    }

    .news_content {
        width: 100%;
        height: 100%;
        z-index: 10;
        position: fixed;
        left: 0;
        top: 50px;
        border: none;
        overflow: hidden;
    }

    .back {
        background: #303133;
        color: white;
        height: 40px;
        width: 100%;
        position: absolute;
        left: 0;
        line-height: 40px;
        text-align: center;
        top: 0;
    }

    iframe {
        width: 100%;
        height: 100%;
        z-index: 10;
        position: absolute;
        left: 0;
        top: 40px;
        border: none;
    }

    @keyframes rota {
        from {
            transform: rotate(0deg)
        }

        to {
            transform: rotate(360deg)
        }
    }

    .item_head {
        color: #0070c9;
        font-size: 0.95rem;
        line-height: 1.26rem;
    }

    .bottom {
        height: 50px;
        text-align: center;
        padding-top: 10px;
        margin-bottom: 0px;
        color: #909399
    }

    .bottom h4 {
        font-size: .5rem
    }

    .news_container {
        width: 100%;
        background: #fff;
            max-width: 600px;
    margin: 0 auto;
    padding: 0 5px;
    }

    .item_main {
        width: 100%;
        min-height: 60px;
        padding: 15px 10px;
        font-size: .9rem;
        line-height: 1rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .news_item {
        /* border-top: 1px solid #E4E7ED; */
        border-bottom: 1px solid #E4E7ED;
        width: 98%;
        margin: 0 auto;

    }

    .item_body {
        max-height: 3rem;
        overflow: hidden;
        width: 100%;
        color: #606266;
        font-size: .6rem;
        margin-top: 5px;

    }

    .item_imgs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
    }

    img {
        border-radius: 3px;
        background: #E4E7ED
       
    }

    .item_time {
        display: flex;
        width: 100%;
        color: #909399;
        font-size: .6rem;
        /* padding: 0.3rem 0 0 0.3rem; */
        justify-content: flex-start
    }

    .item_one .item_left {
        width: 60%;
    }

    .item_one .item_imgs {
        width: 29%;
        padding: 0;

    }

    .item_one .item_imgs img{
        width:100%;
         max-height: 66px;
    }

    .item_two .item_left {
        width: 100%;
    }

    .item_two .item_imgs {
        width: 100%;
    }

    .item_two .item_imgs img {
        width: 43%;
    }

    .item_three .item_left {
        width: 100%;
    }

    .item_three .item_imgs {
        width: 100%;
    }

    .item_three .item_imgs img {
        width: 30%;
    }
</style>
<template>
    <div class="container" v-if="one.length">
        <div class="caption">
            <span class="span1">
                <el-link :href="one[activeIndex].url" target="_blank">                
                <i class="el-icon-s-opportunity"></i>每日图文
                </el-link>
            </span>
            <span class="span2">
                <i class="date">{{one[activeIndex].date | timerify}}</i>
                <el-divider direction="vertical"></el-divider>
                <el-link :href="one[activeIndex].url" target="_blank"><i class="vol">{{one[activeIndex].vol}}</i></el-link>
            </span> 
        </div>
<br>
        <swiper ref="swiper" :options="swiperOption1">
            <swiper-slide class="one_slide" v-for="el in one" :key="el">
                <a :href="el['url']" target="_blank">
                    <img :src="el['img_url']" height="200px" alt="">
                </a>
                <!-- <h1>每日一句</h1> -->
                <p>{{el['word']}}</p>
                <!-- <span>--{{el['word_from']}}</span> -->
            </swiper-slide>
        </swiper>
    
            <div class="swiper-pagination" style="left: 50%; width: 300px; margin-left: -150px; bottom: 10px;"></div>


    </div>
</template>
<script>
    export default {
        data() {
            return {
                one: [],
                blog: [],
                activeIndex :0 ,
                
                swiperOption1: {
                    centeredSlides: true,
                    //    loop: true,
                    zoom:false,
                    spaceBetween: 30,
                    // lazyload: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable:true
                    },
                    autoHeight:true,
                    on: {
                        slideChange:function(e){
                            this.$nextTick(()=>{
                                // console.log(this.activeIndex);
                                this.activeIndex = this.$refs.swiper.swiper.activeIndex
                            })

                        }.bind(this)
                    },
                }
            }
        },

        methods: {
    
        },
        computed:{
            
        },
        created() {
            $.ajax({
                type: "POST",
                url: 'https://api.hibai.cn/api/index/index',
                dataType: 'json',
                data: {
                    "TransCode": "030112",
                    "OpenId": "123456789",
                    "Body": ""
                },
                success: result => {
                    this.one = result.Body.slice(0, 7);
                    this.$emit('loadok')
                }
            });
        }
    }
</script>
<style scoped lang="less">
    .container {
        width: 100%;
        .caption{
            display: flex;
            justify-content: space-between;
            font-size: .9rem;
            letter-spacing: 1px;
            align-items: center;
            i:not(.vol){
                font-style: unset;
                line-height: .8rem;
            }
            .span1{
                /deep/.el-link--inner{
                    font-size: 1.1rem;
                }
            }
            .date{
                font-size: .7rem;
                color:gray;
            }
            .vol{
                font-size: .8rem;
            }
        }
        /deep/.swiper-pagination-bullet{
            margin: 0 2px;
            border-radius: 0;
            z-index: 10000;
            transform: scale(.8);
            
            &.swiper-pagination-bullet-active{
                background:#36b7fb;
                transform: scale(.9)

            }
        }

        .swiper-container {
            width: 100%;
            position: relative;
            max-width: 500px;
            height: auto;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
                animation: none;


            align-items:center;
            // min-height: 320px;

            .swiper-slide {
                @mw: 350px;
                // width: 500px;
                height: auto;
                // padding: 20px 20px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                // background: white;
                flex-direction: column;
                a{
                    display: block;
                    
                }
                p {
                    bottom: 0;
                    text-align: left;
                    width: 100%;;
                    // max-width: @mw;
                    margin: 10px 0 15px 0;
                    line-height: 1.4rem;
                    color: #323030;
                    text-indent: 2rem;
                    padding: 0 6px;
                    font-size: 0.8rem;
                }

                span {
                    position: absolute;
                    bottom: 6px;
                    right: 22px;
                }
                img {
                    max-width: @mw;
                    border-radius: 5px;
                }
            }

        }

    }
</style>
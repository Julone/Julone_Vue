<template>
    <div class="container" style="text-align:center">
        <swiper ref="awesomeSwiperA" :options="swiperOption" @set-translate="onSetTranslate">

            <swiper-slide v-for="m in videoList" :key="m">
                <video :src="m.v_url" loop width="100%" height="100%" controls></video>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>
<style scoped>
    .container {
        padding: 5px 10px;
    }

    .swiper-container {
        height: auto;
        width: 100%;
    }

    .swiper-slide {
        text-align: center;
        font-size: 38px;
        height: calc(100vh - 60px);
        width: calc(100vw - 20px);
        font-weight: 700;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
</style>

<script>
    import { shuffle , setStorage , getStorage } from './../others/methods.js'
    export default {
        data() {
            return {
                videoList: [],
                page:1,
                swiperOption: {
         
                    centeredSlides: true,
                    spaceBetween: 30,
                    effect: 'coverflow',
    
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on: {
                        touchStart: function (event) {
                        },
                        slideChange: function(){
                            $(".swiper-slide").eq(this.previousIndex).find('video').get(0).pause();
                            $(".swiper-slide").eq(this.activeIndex).find('video').get(0).play();                 
                        },
                        reachEnd: function () {
                          this.loadNext();  
                        }.bind(this),
                    },
                }
            }
        },
        methods: {
            loadNext(){
                $.ajax({
                type: "get",
                url: "//kuaiyinshi.com/api/hot/videos/?source=dou-yin&user_id=873854783&page=" + (this.page++),
                dataType: "json",
                success: function (res) {
                    console.log(res,this.page)
                    var newA = res.data.map((el, index, arr) => {
                        var json = {};
                        json.v_url = el.video_url;
                        return json
                    })
             
                    this.videoList.push(...newA);
                }.bind(this)
            });
            }
        },
        mounted() {
            this.loadNext()
        }
    }
</script>
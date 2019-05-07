<template>
    <div class="container">

        <swiper ref="swiper" :options="swiperOption1">
            <swiper-slide class="one_slide" v-for="el in one" :key="el">
                <a :href="el['url']">
                    <img :src="el['img_url']" height="200px" alt="">
                </a>
                <!-- <h1>每日一句</h1> -->
                <p>{{el['word']}}</p>
                <!-- <span>--{{el['word_from']}}</span> -->
            </swiper-slide>
        </swiper>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                one: [],
                blog: [],
                swiperOption1: {
                    centeredSlides: true,
                    //    loop: true,
                    spaceBetween: 30,
                    // lazyload: true,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                   
                    autoHeight:true,
                    on: {},
                }
            }
        },
        methods: {
            goto(i) {
                this.$router.push({
                    path: '/blog?page=' + i
                })
            }
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
                success: function (result) {
                    this.one = result.Body.slice(0, 7);
                    console.log("控制台: mounted -> this.one", this.one)
                }.bind(this)
            });
            $.ajax({
                type: 'POST',
                url: 'http://localhost/nav/getBlog.php',
                dataType: 'json',
                success: function (res) {
                    this.blog = res;

                }.bind(this)
            })

        }
    }
</script>
<style scoped lang="less">
    .container {
        width: 100%;
        .swiper-container {
            width: 100%;
            position: relative;
            max-width: 500px;
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 320px;
            
           

            .swiper-pagination {
                filter: brightness(.2) opacity(.4);
                transform: translate(0, .6rem);
                position: fixed;
                bottom: 10px;
            }
            

            .swiper-slide {
                @mw: 350px;
                // width: 500px;
                height: auto;
                padding: 20px 20px;
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
                    max-width: @mw;
                    margin: 10px 0 0 0;
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
                }
            }

        }

    }
</style>
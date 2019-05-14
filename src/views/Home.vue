<template>
  <div class="home">
    <div class="main" :style="{minHeight:innerHeight}">
      <div :class="['common',animated? '' : '']">
        <div class="logo ani1"></div>
        <h1 class="ani2">JULONE</h1>
        <h2 class="ani3">Design,Code & NB{{BASE_URL}}</h2>
        <h3 class="ani4">漂亮的不像实力派</h3>
        <h5 class="ani5">It's Based on Vue.js</h5>
        <h2 class="ani6">
          <img @click.stop="changeBG" style="cursor:pointer;pointer-events:auto" src="./../assets/img/wave-bubbles.svg"
            alt="">
        </h2>
      </div>
      <footerBox btm="3rem" class="ani7"></footerBox>
    </div>
    <swiper ref="home_swiper" :options="swiperOption" @set-translate="onSetTranslate">
      <swiper-slide>
        <div style="background:white;width:100%;height:100%" alt=""></div>
      </swiper-slide>
      <swiper-slide class="slideCommon" v-for="(el) in 5" :key="el">
        <img class="swiper-lazy" :data-src="'https://api.berryapi.net/bing/image/?1920/1080/' + (el - 1)" alt="">
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import footerBox from './../components/Footer'
  import {
    getStorage,
    setStorage
  } from './../others/methods.js'
  export default {
    name: 'home',
    components: {
      footerBox,
    },
    data() {
      return {
        trList: ['leftUp', 'moveRight', 'moveDown', 'centerBig', 'rightDownBig'],
        swiperOption: {
          spaceBetween: 0,
          loop: true,
          speed: 700,
          autoplay: {
            delay:6000
          },
          effect: 'fade',
          lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 4,
          },
          mousewheel: true,
          keyboard: {
            enabled: true,
          },
          
          on: {
            touchStart: function (event) {
              
            },
            slideChange: function (e) {
              this.$nextTick(() => {
                  // $('.swiper-slide').attr('class','slideCommon')
                  //     .eq(this.$refs.home_swiper.swiper.realIndex).addClass(this.trList[this.$refs.home_swiper.swiper.realIndex % 5 ])
                var nextSlide=this.swiper.slides.eq(this.swiper.activeIndex);
                  nextSlide.addClass(this.trList[this.swiper.realIndex % 5]);
                if (this.$refs.home_swiper.swiper.realIndex != 0) {
                  $(".footer .default,.common").css('filter', 'brightness(2)');
                  $(".swiper-lazy").css('filter', 'brightness(.8)')
                  $('.swiper-slide').addClass('grid')
                } else {
                  $(".footer .default,.common,.swiper-lazy").css('filter', 'none')
                  $('.swiper-slide').removeClass('grid')
                }
                var prevSlide=this.swiper.slides[this.swiper.previousIndex];
                prevSlide.className="swiper-slide slideCommon";
              })
            }.bind(this),
       

          },
        }
      }
    },
    computed: {
      innerHeight() {
        return this.$store.state.innerHeight - 55 + 'px';
      },
      swiper(){
        return this.$refs.home_swiper.swiper
      }
    },
    methods: {
      changeBG() {
        this.$nextTick(() => {
          this.$refs.home_swiper.swiper.slideNext();
        })
      }
    },
    mounted() {
      $(window).resize(function () {
        this.innerHeight = window.innerHeight - 55 + "px";
      }.bind(this));
    }
  }
</script>
<style scoped>
  .swiper-container {
    height: auto;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0
  }

  .slideCommon img {
    animation-iteration-count: infinite;
    /* animation-fill-mode: forwards; */
    animation-timing-function: linear;
    animation-duration: 20s;
  }

  .moveRight img {
    animation-name: moveRight;
  }

  .leftUp img {
    animation-name: leftUp;
  }

  .moveDown img {
    animation-name: moveDown;
  }

  .centerBig img {
    animation-name: centerBig;
  }

  .rightDownBig img {
    animation-name: rightDownBig;
  }


  @keyframes leftUp {
    0% {
      transform: scale(1.1, 1.1) translate(4.545%, 4.545%);
    }

    50% {
      transform: scale(1.1, 1.1) translate(-4.545%, -4.545%);
    }
  }


  @keyframes moveRight {
    0% {
      transform: scale(1.1, 1.1) translate(-4.545%, 0);
    }

    50% {
      transform: scale(1.1, 1.1) translate(4.545%, 0);
    }
  }

  @keyframes moveDown {
    0% {
      transform: scale(1.1, 1.1) translate(0, -4.545%);
    }

    50% {
      transform: scale(1.1, 1.1) translate(0, 4.545%);
    }
  }

  @keyframes centerBig {
    0%{
      transform: scale(1.1, 1.1);

    }
    50% {
      transform: scale(1.35, 1.35);
    }
  }

  @keyframes rightDownBig {
    50% {
      transform: scale(1.1, 1.1) translate(4%, 4%);
    }
  }

  .swiper-slide {
    text-align: center;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .footer {
    z-index: 14;
  }

  .title {
    text-align: center;
    -webkit-text-fill-color: transparent;
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
    opacity: 0;
    position: relative;
    cursor: pointer
  }

  .title * {
    color: #7f879c;
  }

  .common {
    text-align: center;
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 14;
    pointer-events: none;
    transition: filter ease 1s
  }

  .common * {
    color: #9ea6ba
  }

  .main {
    padding: 35px 35px 80px;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  h1 {
    display: inline-block;
    margin: 0 auto;
  }

  h2 {
    margin: .67em auto;
    /* font-family: -webkit-pictograph; */
    letter-spacing: 1px;
  }

  h3 {
    font-weight: 500;
    margin-top: 1.5em;
  }

  h5 {
    font-weight: 500;
    margin-bottom: 2.2em;
    font-family: 'Giorgio';
    line-height: 2rem
  }

  .logo {
    margin: 1.3rem auto;
  }

  .logo::before {
    font-size: 9.5rem;
    color: inherit;
  }
</style>
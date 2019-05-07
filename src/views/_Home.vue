<template>
  <div class="home">
    <div class="main" :style="{minHeight:innerHeight}">
      <div :class="['common',animated? '' : '']">
        <div class="logo ani1"></div>
        <h1 class="ani2">JULONE</h1>
        <h2 class="ani3">Design,Code & NB</h2>
        <h3 class="ani4">漂亮的不像实力派</h3>
        <h5 class="ani5">It's Based on Vue.js</h5>
        <h2 class="ani6">
          <img @click.stop="changeBG" style="cursor:pointer;pointer-events:auto" src="./../assets/img/wave-bubbles.svg"
            alt="">
        </h2>
      </div>
      <footerBox btm="3rem" class="ani7"></footerBox>
    </div>
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
     
      }
    },
    computed: {
      innerHeight() {
        return this.$store.state.innerHeight - 55 + 'px';
      },
     
    },
    methods: {
    },
    mounted() {
      $(window).resize(function () {
        this.innerHeight = window.innerHeight - 55 + "px";
      }.bind(this));
    }
  }
</script>
<style scoped>
  

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
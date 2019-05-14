<template>
  <div class="more container">
    <div class="main">
      <h1 class="ani1">你好, 朋友!</h1>
      <h3 class="ani2">
        千门万户曈曈日<br>
        总把新桃换旧符
      </h3>
      <h5 class="ani3">
        Let's visit the former works !
      </h5>
      <el-button class="ani4" round plain type="info" @click="tiaozhuan">点击前往</el-button>
    </div>
     <appfoot class="ani7" btm="10%"></appfoot>
  </div>
</template>

<script>
  export default {
    methods: {
      tiaozhuan() {
        window.open(this.global.onlinePath+"nav");
      }
    }
  }
</script>
<style lang="less" scoped>
  .more {
    width: 100%;
    // padding: 50px;
    background: url(./../assets/img/customer-head-bg.svg) bottom center no-repeat;
    height: calc(100vh - 55px);
    overflow: hidden;
    .center(){
        display: flex;
        align-items: center;
        flex-direction:column;
        justify-content:center;
    }
    .center;
    @media (min-width: 800px) {
      background-size: 100%;
    }

    @media (max-width: 800px) {
      background-size: 200%;
    }

    .main {
      max-width: 500px;
      margin: 0 auto;
      // padding-top: 0px;
      box-sizing: content-box;
      height: 70vh;
      margin-bottom: 8rem;
      .center;
  
      & *{
        margin:15px 0;
      }
      h1 {
        color: #8d8d8d
      }

      h3 {
        font-size: 1.5rem;
        font-weight: 500;
        position: relative;
        font-family: Georgia,STSong,'华文宋体','STFangsong','华文仿宋','FangSong','NSimSun','SimSun','FangSongGB2312',serif;
        letter-spacing: 1px;
        // font-style: italic;
        white-space: nowrap;
        line-height: 3rem;
        color:#534e4e;
        .com { font-size: 3rem; position: absolute; opacity: .5; }

        &::before {
          content: '“';
          .com;
          left: -30px;
          top: -3px;
        }

        &::after {
          content: '”';
          .com;
          right: -30px;
          bottom: -30px;
        }

      }

      h5 {
        color: #cecbcb;
        line-height: 2.3rem;
      }

      button {
        width: 100%;
        max-width: 200px;
        margin: 10px auto;
      }
    }
  }
</style>
<template>
  <div class="right_wrapper">
    <div class="userBoard ad fadeTop1">
      <div class="type">推荐</div>
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in ad" :key="item">
          <!-- <img :src="'/timeBg/' +item + '.webp'" alt=""> -->
          <img :src="item.img" @click="open(item.url)" alt="">
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination-ad" style="position:absolute;right:0;width:80px;z-index:2335;bottom:5px"></div>
    </div>

  <div class="ani6">
      <div class="userBoard timeline_wrapper">
      <div class="boardTop">
        <div>
          <i class="el-icon-s-flag"></i>实时热点
          <span style="font-size:.7rem;color:#aeaeae">{{gen | timerify}}</span>
        </div>
        <div>
          <el-link @click="reverse = !reverse"><i class="el-icon-sort"></i></el-link>
        </div>
      </div>
      <el-scrollbar style="height:450px;padding:10px;">
        <el-timeline :reverse="reverse">
          <!-- <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
            :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item> -->

          <el-timeline-item v-for="(item, index) in hotsList" :key="index">
            <el-link :href="'https://www.baidu.com/s?word=' + item.keyword" target="_blank">{{item.keyword}}</el-link>
            <span style="float:right;font-size:.8rem">
              {{item.searches}}
              <i style="margin-left:5px" :class="item.trend == 'rise' ? 'el-icon-top':'el-icon-bottom'"
                :style="{color:item.trend == 'rise' ? 'red':'green'}"></i>
            </span>
            <div slot="dot" class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--"
              style="border-radius:100px;left: -6px; width: 22px; height: 22px; top: -5px;"
              :style="{color:index<3?`rgba(198, 69, 69,${1 - .1 *index})`:'#929292'}">
              {{index + 1}}
            </div>
          </el-timeline-item>
        </el-timeline>
        <div align="center" style="margin-top: -20px;">
          <el-button type='text' @click="showAll"> {{ showState ? '收起所有':'查看更多'}}</el-button>
        </div>

      </el-scrollbar>
    </div>
  </div>


    <el-alert class="ani4" title="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
       type="warning" show-icon :closable="false"></el-alert>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        reverse: false,
        swiperOption: {
          spaceBetween: 10,
          loop: false,
          autoplay: true,
          pagination: {
            el: '.swiper-pagination-ad',
            clickable: true
          },
          lazy: true
        },
        ad: [{
            img: './resource/ad/1556430476_463.png',
            url: 'http://utalk.ui.cn/u34'
          },
          {
            img: './resource/ad/1555674519_609.png',
            url: 'https://aca.ui.cn/index'
          },
          {
            img: './resource/ad/1557735377_987.jpeg',
            url: 'https://www.ui.cn/detail/464218.html'
          },
          {
            img: './resource/ad/1557975779_799.png',
            url: 'https://www.ui.cn/detail/449245.html'
          },
        ],
        activities: [

        ],
        hots: [],
        gen: 0,
        showState: false
      };
    },
    methods: {
      open(url) {
        window.open(url)
      },
      showAll() {
        this.showState = !this.showState
      }
    },
    computed: {
      hotsList() {
        return this.hots.slice(0, this.showState ? this.hots.length : 10);
      }
    },
    created() {
      $.ajax({
        type: "get",
        url: "https://www.hao123.com/api/getsuggests4",
        data: "data",
        dataType: "jsonp",
        success: res => {
          this.hots = res.keywords;
          this.gen = res.updateTime
        }
      });
    }
  };
</script>
<style scoped lang="less">
  .right_wrapper {

    // padding: 0 5px;
    @media screen and (max-width : 800px) {
      & {
        display: none;
      }
    }
  }

  /deep/.el-timeline-item__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /deep/.el-timeline-item {
    padding-bottom: 16px;
  }

  /deep/.el-timeline-item__tail {
    display: none;
  }

  .userBoard {
    display: flex;
    justify-content: space-between;
    background: white;
    width: 310px;

    box-shadow: 0 26px 40px -24px rgba(0, 36, 100, .35);
    border: 1px solid rgba(170, 187, 204, 0.3);
    border-radius: 10px;
    box-sizing: border-box;
    transition: all ease .2s;
    /* animation: flipAni 0.8s 1 cubic-bezier(.77, 0, .175, 1) forwards; */
    position: relative;
    margin-bottom: 20px;

    &.ad .type {
      position: absolute;
      left: 0;
      top: 7px;
      z-index: 2334;
      padding: 5px 10px;
      // border-radius: 0 10px;
      background: #36b7fb;
      color: white;
      filter: grayscale(.8);
      font-size: 0.6rem;
      box-shadow: 4px 3px 0px 0 rgba(41, 138, 189, 0.59);
    }

    &:hover {
      .type {
        filter: grayscale(0)
      }
    }

    /deep/.swiper-pagination-bullet {
      margin: 0 2px;
      border-radius: 0;
      z-index: 10000;
      transform: scale(1);

      &.swiper-pagination-bullet-active {
        background: #36b7fb;
        transform: scale(.9)
      }
    }

    /deep/.swiper-container {
      position: relative;
      border-radius: 10px;
      animation: none;

      img {
        border-radius: 10px;
        width: 100%;
        cursor: pointer;
      }

    }
  }

  .timeline_wrapper {
    .boardTop {
      line-height: 30px;
      font-size: 1.1rem;
      // margin-left: 2rem;
      text-overflow: ellipsis;
      overflow: hidden;
      letter-spacing: 2px;
      width: 100%;
      white-space: nowrap;
      color: #606266;
      border-bottom: 1px solid #f5f5f5;
      text-align: center;
      display: flex;
      justify-content: space-between;
      padding: 10px 5%;
      cursor: default;
    }

    flex-direction: column;

    ul {
      margin-top: 10px;
      margin-left: 1.3rem;
      font-weight: 300
    }

  }
</style>

// activities: [
// {
// content: '创建前端基本框架',
// timestamp: '2019-02-22',
// size: 'large',
// type: 'info',
// icon: 'el-icon-circle-check'
// },
// {
// content: '编写后台代码',
// timestamp: '2019-02-28',
// size: 'large',
// type: 'info',
// icon: 'el-icon-circle-check'
// },
// {
// content: '支持发送文字',
// timestamp: '2019-03-12',
// size: 'large',
// type: 'success',
// icon: 'el-icon-circle-check'
// }, {
// content: '支持动态表情与emoji表情',
// timestamp: '2019-03-14',
// size: 'large',
// type: 'success',
// icon: 'el-icon-circle-check'
// }, {
// content: '支持图片上传与显示',
// timestamp: '2019-04-02',
// size: 'large',
// type: 'success',
// icon: 'el-icon-circle-check'
// },
// {
// content: '支持用户上传头像',
// timestamp: '2019-04-08',
// size: 'large',
// type: 'success',
// icon: 'el-icon-circle-check'
// },
// {
// content: '修复若干个安全问题(重要)',
// timestamp: '2019-04-03',
// size: 'large',
// type: 'danger',
// icon: 'el-icon-circle-check'
// },
// {
// content: '留言筛选查看(待优化)',
// timestamp: '2019-04-03',
// size: 'large',
// type: 'warning',
// icon: 'el-icon-circle-check'
// },
// {
// content: '将不断优化,请期待...',
// timestamp: '现在',
// size: 'large',
// type: 'primary',
// icon: 'el-icon-loading'
// },
// ]
<template>
  <div class="right_wrapper">
    <div class="userBoard ad">
      <div class="type">推荐</div>
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in ad" :key="item">
          <!-- <img :src="'/timeBg/' +item + '.webp'" alt=""> -->
          <img :src="item.img" @click="open(item.url)" alt="">
        </swiper-slide>
      </swiper>
       <div class="swiper-pagination-ad" style="position:absolute;right:0;width:80px;z-index:2335;bottom:5px"></div>
    </div>

    <div class="userBoard timeline_wrapper">
      <div class="boardTop">
        <div>
          <i class="el-icon-s-promotion"></i>时间轴
          <span style="font-size:.7rem;color:#aeaeae">(版本更新记录)</span>
        </div>
        <div>
          <el-link><i class="el-icon-sort" @click="reverse = !reverse"></i></el-link>
        </div>
      </div>
      <el-scrollbar style="height:250px;padding:10px;">
        <el-timeline :reverse="reverse">
          <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
            :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </el-scrollbar>
    </div>
    <el-alert title="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" type="warning" show-icon :closable="false"></el-alert>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        reverse: true,
        swiperOption: {
          spaceBetween: 10,
          loop: false,
          autoplay: true,
          pagination: {
                        el: '.swiper-pagination-ad',
                        clickable:true
                    },
        },
        ad: [{
            img: './resource/ad/1556430476_463.png',
            url: 'http://utalk.ui.cn/u34'
          },
          {
            img: './resource/ad/1555674519_609.png',
            url: 'https://aca.ui.cn/index'
          }
        ],
        activities: [

          {
            content: '创建前端基本框架',
            timestamp: '2019-02-22',
            size: 'large',
            type: 'info',
            icon: 'el-icon-circle-check'
          },
          {
            content: '编写后台代码',
            timestamp: '2019-02-28',
            size: 'large',
            type: 'info',
            icon: 'el-icon-circle-check'
          },
          {
            content: '支持发送文字',
            timestamp: '2019-03-12',
            size: 'large',
            type: 'success',
            icon: 'el-icon-circle-check'
          }, {
            content: '支持动态表情与emoji表情',
            timestamp: '2019-03-14',
            size: 'large',
            type: 'success',
            icon: 'el-icon-circle-check'
          }, {
            content: '支持图片上传与显示',
            timestamp: '2019-04-02',
            size: 'large',
            type: 'success',
            icon: 'el-icon-circle-check'
          },
          {
            content: '支持用户上传头像',
            timestamp: '2019-04-08',
            size: 'large',
            type: 'success',
            icon: 'el-icon-circle-check'
          },
          {
            content: '修复若干个安全问题(重要)',
            timestamp: '2019-04-03',
            size: 'large',
            type: 'danger',
            icon: 'el-icon-circle-check'
          },
          {
            content: '留言筛选查看(待优化)',
            timestamp: '2019-04-03',
            size: 'large',
            type: 'warning',
            icon: 'el-icon-circle-check'
          },
          {
            content: '将不断优化,请期待...',
            timestamp: '现在',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-loading'
          },
        ]
        // activities: [
        //   {
        //     content: '创建前端基本框架',
        //     timestamp: '2019-02-22',
        //     size: 'large',
        //     type: 'info',
        //     icon: 'el-icon-circle-check'
        //   },
        //   {
        //     content: '编写后台代码',
        //     timestamp: '2019-02-28',
        //     size: 'large',
        //     type: 'info',
        //     icon: 'el-icon-circle-check'
        //   },
        //   {
        //     content: '支持发送文字',
        //     timestamp: '2019-03-12',
        //     size: 'large',
        //     type: 'success',
        //     icon: 'el-icon-circle-check'
        //   }, {
        //     content: '支持动态表情与emoji表情',
        //     timestamp: '2019-03-14',
        //     size: 'large',
        //     type: 'success',
        //     icon: 'el-icon-circle-check'
        //   }, {
        //     content: '支持图片上传与显示',
        //     timestamp: '2019-04-02',
        //     size: 'large',
        //     type: 'success',
        //     icon: 'el-icon-circle-check'
        //   },
        //   {
        //     content: '支持用户上传头像',
        //     timestamp: '2019-04-08',
        //     size: 'large',
        //     type: 'success',
        //     icon: 'el-icon-circle-check'
        //   },
        //   {
        //     content: '修复若干个安全问题(重要)',
        //     timestamp: '2019-04-03',
        //     size: 'large',
        //     type: 'danger',
        //     icon: 'el-icon-circle-check'
        //   },
        //   {
        //     content: '留言筛选查看(待优化)',
        //     timestamp: '2019-04-03',
        //     size: 'large',
        //     type: 'warning',
        //     icon: 'el-icon-circle-check'
        //   },
        //   {
        //     content: '将不断优化,请期待...',
        //     timestamp: '现在',
        //     size: 'large',
        //     type: 'primary',
        //     icon: 'el-icon-loading'
        //   },
        // ]
      };
    },
    methods: {
      open(url) {
        window.open(url)

      }
    },
    created() {}
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

    &:hover{
      .type{
        filter: grayscale(0)
      }
    }
        /deep/.swiper-pagination-bullet{
            margin: 0 2px;
            border-radius: 0;
            z-index: 10000;
            transform: scale(1);
            
            &.swiper-pagination-bullet-active{
                background:#36b7fb;
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
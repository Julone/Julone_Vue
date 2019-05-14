<template>
    <div class="comment">
        <transition name="slideUp">
            <div v-if="firstLoad" class="loadAni">
                <img src="./../assets/img/loading.svg" width="110" height="110" alt="FrozenDiamond">
                <span>正在加载中</span>
            </div>
        </transition>
        <transition name="el-fade-in-linear">
            <!-- <el-scrollbar style="height:calc(100vh - 55px)"> -->
            <div class="com_main" v-if="!firstLoad">
                <!-- 发送消息盒子组件 -->
                <div class="com_left ani1">
                    <leftPanel @refresh="refresh"></leftPanel>
                </div>
                <div class="com_list">
                    <el-dialog title="" custom-class="myDialog" :visible.sync="userShow" :append-to-body="true"
                        top="30vh" width="300px" :before-close="handleClose" @open="$store.dispatch('blur',true)" 
                        @close="$store.dispatch('blur',false)">
                        <userinfo :userId="userinfoid"></userinfo>
                    </el-dialog>
                    <!-- 留言wrapper -->
                    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" topDistance="80" ref="loadmore">
                        <postBox class="ani2" v-bind:load="!firstLoad" @fresh="postOK"></postBox>
                        <div class="sortTag ani4" v-show="sortShow">
                            <el-button :type="checkBoxAdmin? 'warning' : ''" plain :disabled="this.refreshing" size="small" @click.native="checkBoxAdmin = !checkBoxAdmin"><i
                                    class="comIcon">&#xe71e;</i><span>只看</span>管理<span>员</span></el-button>
                            <el-button :type="checkBoxFanke? 'danger' : ''" plain :disabled="this.refreshing" size="small" @click.native="checkBoxFanke = !checkBoxFanke"><i
                                    class="comIcon">&#xe717;</i><span>只看</span>访客</el-button>
                            <el-button :type="checkBoxDaoxu? 'success' : ''" plain :disabled="this.refreshing" size="small" @click.native="checkBoxDaoxu = !checkBoxDaoxu"><i
                                    class="comIcon">&#xe771;</i>倒序<span>查看</span></el-button>
                            <el-button :type="checkBoxSeeall? 'primary' : ''" plain :disabled="this.refreshing" size="small" @click.native="checkBoxSeeall = !checkBoxSeeall"><i
                                    class="comIcon">&#xe6ea;</i><span>查看</span>全部<span>留言</span></el-button>
                        </div>

                        <div class="com_wrapper ani6" v-infinite-scroll="loadBottom" :infinite-scroll-disabled="loading"
                            infinite-scroll-distance="50">
                            <!-- 遍历留言列表 -->
                            <div class="com_item" :class=" checkBoxSeeall ?'' :'flip' + index % 6" v-for="(com,index) in comList" :key="com.navId" :id="com.navId">
                                <div v-if="com.navTop != '' && com.navTop != null " class="setTop"><i class="el-icon-upload2"></i>置顶</div>
                                <!-- 发送主题内容 -->
                                <div class="post_thing">
                                    <!-- 头像 -->
                                    <el-dropdown class="itemMenu" trigger="click" style="z-index:88" v-if="isLogin">
                                        <i class="el-icon-arrow-down el-icon--right" style="transform:translate(-10px,0) scale(1.1);font-size:1.1rem"></i>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item @click.native="setTop(com.navId,com.navTop)" v-if="com.canHandle == 'true' ? true : false">
                                                <i :class="'el-icon-' + (com.navTop == null ? 'upload2' : 'download')"></i>
                                                &nbsp;{{ com.navTop == null ? '置顶' : '取置'}}</el-dropdown-item>
                                            <el-dropdown-item @click.native="reply_show1([com,com.navId,com.postId,com.userName,'com'],index)">
                                                <i class="el-icon-edit"></i>
                                                &nbsp;评论</el-dropdown-item>
                                            <el-dropdown-item @click.native="reply_del(com.navId,com.navImg,index)"
                                                :disabled="com.canHandle == 'true' ? false : com.selfSend == 'true' ? false : true">
                                                <i class="el-icon-delete"></i>
                                                &nbsp;删除</el-dropdown-item>
                                            <el-dropdown-item @click.native="reply_report(com.navId,com.isAdmin)">
                                                <i class="el-icon-warning"></i>
                                                &nbsp;举报</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>

                                    <div class="post_head" slot="reference" @click="toUser(com.postId)" :style="{background: `url(${getPostHead(com.userIcon)}) center center/cover no-repeat`}"></div>

                                    <!-- 内容wrapper -->
                                    <div class="post_content">
                                        <!-- 发送者 -->
                                        <div class="post_name" :class="{vip: com.isAdmin == 'true' }">{{com.userName}}</div><br>
                                        <!-- 发送的文字 -->
                                        <p v-html="$options.filters.addFace(com.navText)"></p>
                                        <!-- 发送的图片 -->
                                        <div class="post_img">
                                            <template v-for="img in imgs(com.navImg)">
                                                <div :class="[picNum(imgs(com.navImg).length),isgif(img)]" v-if='img.length!=0'
                                                    :key="img">
                                                    <img v-j_lazy="srcCom + 'upload/' + 'sm_'+img" >
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                                <!-- 发送时间 -->
                                <div class="post_time">
                                    <el-tooltip placement="right" effect="dark" trigger="click" :content="com.navTime"
                                        popper-class="myPopper">
                                        <div class="postTime">{{ com.navTime | timerify}}</div>
                                    </el-tooltip>
                                    <div class="like_com no-selection">
                                        <div class="like_btn">
                                            <i class="comIcon btnactive" @click="postlike(com.navId,index,'unlike')"
                                                v-if="com.youLike == '1'">&#xe743;</i>
                                            <i class="comIcon" @click="postlike(com.navId,index,'like')" v-else>&#xe744;</i>{{com.likeCount}}
                                        </div>
                                        <span class="reply_btn" @click="reply_show(index)">
                                            <i class="comIcon" :class="comList[index].replyState == true? 'btnactive':''">
                                                {{comList[index].replyState == true?'&#xe72f;':'&#xe72e;'}}</i>
                                            {{com.replyCount}}
                                        </span>
                                    </div>
                                </div>
                                <!-- 回复板块 -->
                                <div class="like_List" v-if="com.likeCount != 0">
                                    <div>
                                        <span v-if="com.youLike == '1'">
                                            <font style="color:#6498bf">{{userName}}</font>{{com.likeCount == '1' ? ''
                                            : '、'}}
                                        </span>
                                        <span v-show="i<3" v-for="(like,i) in likegroup(comList[index].likePeople)"
                                            :key="like">
                                            <font style="color:#6498bf">{{like}}</font>
                                            {{ i != likegroup(comList[index].likePeople).length-1 && i != 2 ? '、' :
                                            ''}}
                                        </span>
                                        等<span style=" font-family: number">{{com.likeCount}}</span>个人觉得很赞
                                    </div>
                                </div>
                                <replyList :replyContent="com" :replyCount="com.replyCount" :navIndex="index" :replyToId="com.postId"
                                    :replyToName="com.userName" :navId="com.navId" @reply_show="reply_show1($event,index)"
                                    @newCount="newCount" ref="replylist" v-show="comList[index].replyState == true"></replyList>
                            </div>
                            <div class="end" v-show="comEnd">
                                <span>已经到底啦</span>
                            </div>
                        </div>
                        <div v-if="!comEnd" style="text-align:center;padding-top:10px">
                            <img src="./../assets/img/loadingStrip.svg" width="75">
                        </div>
                        <footer-box v-show="comEnd"></footer-box>
                        <div slot="top" class="mint-loadmore-top">
                            <span v-show="topStatus !== 'loading'" class="el-icon-sort-down" style="text-align:center;margin-left:12px;color:#4eacfc;font-size:24px"></span>
                            <span v-show="topStatus === 'loading'" style="text-align:center">
                                <mt-spinner type="snake" color="#89e1ff" style="display: flex;justify-content: center;padding-top:10px"></mt-spinner>
                            </span>
                        </div>
                    </mt-loadmore>
                    <replyBox @replyOK="replyOK" :navIndex="navIndex" :replyContent="replyContent" :replyType="replyType" :replyToId="to_userId"
                        :replyToName="to_userName" :navId="navId"></replyBox>
                </div>
                <div class="com_right ani7">
                    <rightPanel></rightPanel>
                </div>
                <getTop :always="isMobile?false:true" showBottom>
                    <i class="el-icon-refresh no-selection" id="refreshIcon" tip="重新加载" 
                     style="width:100%;height:100%;text-align:center;line-height:43px" slot="head" @click='refresh($event)'></i>
                </getTop>
            </div>
            <!-- </el-scrollbar> -->
        </transition>
    </div>
</template>

<script>
    import postBox from './../components/PostBox.vue'
    import replyBox from './../components/ReplyBox.vue'
    import footerBox from './../components/Footer.vue'
    import reply from './../components/Reply'
    import userinfo from './../components/userinfo.vue'

    import {
        pushHistory,
        throttle,
        debounce,
        appendScript,
        setStorage,
        getStorage,
        delStorage,
        blur
    } from './../others/methods.js'
    var toast;
    export default {
        name: 'Comment',
        components: {
            postBox: postBox,
            replyBox: replyBox,
            footerBox: footerBox,
            replyList: reply,
            userinfo: userinfo,
            getTop: () => import('./../components/Common/Top.vue'),
            rightPanel:() => import('./../components/CommentPanelRight.vue'),
            leftPanel:()=> import('./../components/CommentPanelLeft.vue')
        },
        data() {
            return {
                comList: [],
                userShow: false,
                to_userId: "",
                to_userName: "",
                replyType: '',
                navId: "",
                comCount: 0,
                page_num: 0,
                firstLoad: true,
                comEnd: false,
                refreshing: false,
                loading: false,
                topStatus: '',
                navIndex: 0,
                initTime: new Date().getTime(),
                userinfoid: "",
                sortShow: true,
                checkBoxDaoxu: false,
                checkBoxFanke: false,
                checkBoxSeeall: false,
                checkBoxAdmin: false,
                replyContent:{}
            }
        },
        
        watch: {
            checkBoxDaoxu() {
                this.tagClick();
            },
            checkBoxFanke() {
                this.tagClick();
            },
            checkBoxSeeall() {
                this.tagClick();
            },
            checkBoxAdmin() {
                this.tagClick();
            },

        },

        methods: {
            tagClick() {
                if (!this.refreshing) {
                    this.refresh();
                }
            },
            
            toUser(id) {
                this.userShow = true;
                this.userinfoid = id
            },
            postOK(e) {
                this.comList.unshift(e);
                this.comCount++;
            },
            getReplyIcon(a) {
                return this.srcCom + a;
            },
            

            reply_show1(e, index) {
                this.navIndex = index;
                this.replyBox_show(e[0], e[1], e[2], e[3],e[4]);
            },
            replyBox_show(content,para0, para1, para2, para3) {
                this.replyContent = content;
                console.log(content)
                this.navId = para0;
                this.to_userId = para1;
                this.to_userName = para2;
                this.replyType = para3;
                this.$store.commit('toggleReply', true)
            },
            replyOK() {
                this.$nextTick(() => {
                    this.comList[this.navIndex].replyState = true
                    this.$refs.replylist[this.navIndex].loadData();
                })
            },
            handleTopChange(status) {
                this.topStatus = status
            },
            loadTop() {
                this.refresh();
                setTimeout(() => {
                    this.$refs.loadmore.onTopLoaded();
                }, 500)
            },
            loadBottom() {
                if (this.comEnd != true) {
                    if (!this.loading && !this.comEnd)
                        this.loadMore();
                }
            },
            reply_report(a, b) {
                setTimeout(() => {
                    var msgg = '你无法举报管理员!',type='warning';
                    if (b != 'true') {
                       msgg='举报成功,会尽快处理!'
                       type = 'success'
                    }
                    this.$message({
                        message: msgg,
                        type: type,
                        center: true
                    })
                }, 400)
            },
            reply_del(a, b, index) {
                this.$confirm('确定要删除吗?', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确 定',
                    cancelButtonText: '返 回',
                    type: 'info',
                }).then(() => {
                    this.comList.splice(index, 1);
                    this.comCount--;
                    axios({
                        url:this.$store.state.delCom,
                        data: {
                            navId: a,
                            navImg:b,
                            userId:getStorage('userId'),
                            userPass:getStorage('userPass')
                        },method:'post'
                    }).then(response => {
                            this.$message({
                                message: response.data.msg,
                                type: 'info',
                                center: true,
                            });
                        })
                })
            },
            postlike: debounce(function (a, index, state) {
                this.$store.dispatch('isLoginIn', {
                    that: this,
                    confirmCB: function () {
                        this.$router.push('/login');
                    }.bind(this),
                    cancelCB: function () {
                        this.$message({
                            type: 'warning',
                            message: '没有登录,你无法点赞!',
                            center: true
                        });
                    }.bind(this),
                    loginCB: function () {
                        var youName = getStorage('userName') + ',';
                        if (state == 'like') {
                            this.comList[index].youLike = "1"
                            this.comList[index].likeCount++;
                        } else {
                            this.comList[index].youLike = "0"
                            this.comList[index].likeCount--;
                        }
                        axios({
                            url: this.$store.state.likeCom,
                            data: {
                                navId: a,
                                userId: getStorage("userId"),
                                userPass: getStorage("userPass"),
                                likeState: state
                            },
                            method: 'post'
                        })
                    }.bind(this)
                })
            }, 400),
            setTop(navId, time) {
                this.$store.dispatch('isLoginIn', {
                    that: this,
                    loginCB: function () {
                        var dowhat = time != '' && time != null ? 'no' : 'yes';
                        var that = this
                        $.ajax({
                            type: "post",
                            url: this.$store.state.setTopCom,
                            data: {
                                navId: navId,
                                userId: getStorage('userId'),
                                userPass: getStorage('userPass'),
                                dowhat: dowhat
                            },
                            success(data) {
                                that.refresh();
                            }
                        })
                    }.bind(this)
                })
            },

            refresh(e) {
                window.scrollTo(0, 0);
                this.$nextTick(()=>{
                    $('.el-scrollbar__wrap').scrollTop(0);

                    $("#refreshIcon").addClass('rotate_once');
                    setTimeout(e=>{
                        $("#refreshIcon").removeClass('rotate_once');
                    },1000)
                })
                
                
                this.page_num = 0;
                this.comEnd = false;
                this.initTime = new Date().getTime();
                $("#com_text").html('');
                this.refreshing = true;
                this.comList.splice(0, this.comList.length);
                $(".com_item").removeClass()
                this.loadMore()
            },
            loadMore: debounce(function () {
                this.loading = true;
                toast = this.$toast({
                    // message: `${this.page_num==0?'正在获取评论列表':'正在获取列表: 第 '+this.page_num+' 页'}`,
                    message:'正在加载留言',
                    className: 'mytoast',
                    position: 'bottom',
                    duration: 1000
                });
                axios({
                        url: this.$store.state.getCom,
                        method: 'post',
                        data: {
                            pageid: this.page_num,
                            userId: getStorage("userId") || null,
                            userPass: getStorage("userPass") || null,
                            nowTime: this.initTime,
                            daoxu: this.checkBoxDaoxu,
                            fanke: this.checkBoxFanke,
                            seeall: this.checkBoxSeeall,
                            admin: this.checkBoxAdmin
                        }
                    }).then((response) => {
                        if (response.data.code == 500) {
                            throw "服务器连接错误";
                        }
                        if (response.data.code == 104) {
                            alert('请重新刷新页面!')
                            this.$store.dispatch('logOut');
                        }
                        let handledData = response.data.map(el => {
                            el.replyState = false;
                            return el
                        });
                        if (this.firstLoad) {
                            this.comList.push(...handledData);
                            if (handledData.length != 0) {
                                this.$data.comCount = handledData.navCount;
                                this.getUserIcon = handledData.youIcon;
                            }
                            setTimeout(() => {
                                this.firstLoad = false;
                            }, 1300)
                        } else {
                            if (response.data.length < 6) {
                                this.comEnd = true;
                                toast.close();
                            }
                            this.comList.push(...handledData);
                        }
                    })
                    .catch((error) => {
                        this.$toast({
                            message: `连接失败, 电波无法到达`,
                            className: 'mytoast',
                            position: 'bottom',
                            duration: 2000
                        });
                          this.firstLoad = false;
                           this.refreshing = false;
                            this.comEnd = true;
                    })
                    .then(res => {
                        this.loading = false;
                        this.page_num++;
                        this.refreshing = false;
                        if (this.checkBoxSeeall) {
                            this.comEnd = true;
                        }
                    })
            }, 300),

            
            reply_show(index) {
                // this.$store.dispatch('isLoginIn', {
                //     that: this,
                //     confirmCB: function () {
                //         this.$router.push('/login');
                //     }.bind(this),
                //     cancelCB: function () {
                //         this.$message({
                //             type: 'warning',
                //             message: '登录后,可以查看评论!',
                //             center: true
                //         });
                //     }.bind(this),
                //     loginCB: function () {
                        this.comList[index].replyState = !eval(this.comList[index].replyState);
                        this.$refs.replylist[index].initData();
                    // }.bind(this)
                // })
            },
            imgs(params) {
                if (this.$store.state.isWebp) {
                    return params.replace(/upload\//g,'').split('?')
                } else {
                    return params.replace(/.webp/g, "").replace(/upload\//g,'').split("?")
                }
            },
            parseReply(params) {
                return JSON.parse(`[${params.replace(/^[?]/,'').split('?')}]`)
            },
            showInfo(a) {
                if (a) {
                    this.$store.commit('toggleInfo', true)
                }
            },
            newCount(e) {
                this.comList[e.index].replyCount = e.count
            }
        },
        computed: {
           
             userName() {
                return getStorage('userName') || "游客"
            },
            isMobile() {
                return this.$store.state.isMobile
            },
            isLogin() {
                return this.$store.state.isLogin
            },
            likegroup() {
                return function (a) {
                    var b = a != null ? a.split(',') : [];
                    return b;
                }
            },
            
            getPostHead() {
                return function (a) {
                    if (a != "" && a != null) {
                        return this.srcCom + a;
                    } else {
                        return require('./../assets/img/user1.jpg');
                    }
                }
            },
        
            srcCom() {
                return this.$store.state.srcCom + 'nav/';
            },
    
            isgif() {
                return function (val) {
                    if (/.gif/g.test(val)) {
                        return 'gif'
                    }
                }
            },
            picNum() {
                return function (params) {
                    return params == 1 ? 'img_one' : params % 2 == 0 && params <= 4 ? 'img_double' : 'img_triple'
                }
            },
        },
        mounted() {
            this.$store.dispatch('checkLoginIn');
            this.loadMore();   
        },
        beforeRouteLeave(to, from, next) {
            var a = $("#com_text").html();
            if (a) {
                var ss = window.sessionStorage;
                sessionStorage.setItem('postText', a);
            }
            next();
        },
    }
</script>
<style scoped>
    @import './../assets/comment.css';

    .comment>>>.swiper-container {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 2333;
        background: rgba(29, 20, 20, 0);
        bottom: 0;
        transition: all linear .5s;
        left: 0;
        box-shadow: none;
        backface-visibility: hidden;
        perspective: 1000;
        animation: slide 1s 1 ease;
    }
    .comment>>>.swiper-tool{
        position: fixed;
        bottom: 6vh;
        left: 50%;
        width: 200px;
        margin-left: -100px;
        /* background: gray; */
        height: 50px;
        border-radius: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 100000;
        
    }
    .comment>>>.swiper-tool button{
        width: 50px;height: 50px;
        border: none;
        /* background: none; */
        /* box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.3); */
        /* border:1px solid gray; */
        /* background: gray; */
        color: white;
        color:gray;
        border-radius: 50px;
        transition: all ease .2s;
        font-size: 1.5rem;
        background: #efeff2;
        cursor: pointer;
    }
     .comment>>>.swiper-tool button:hover{  
         /* background: white; */
        box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.3);
         /* color:black; */
         background: rgba(128, 128, 128, 0.9);
         color: white;
         margin-top: -5%;
         /* font-size: 1.8rem; */
     }
    .comment>>>.swiper-tool .close{
        width:65px;height: 65px;
        font-size: 1.8rem;
        /* border-radius: 20px; */
        /* transform: rotate(45deg); */
    }
    @media screen and (max-width : 320px){
        .comment >>> .el-button--small{
            padding: 5px 5px;
            margin: 0;
        }
        .comment >>> .el-button--small span{
            font-size: 0;
        }
    }
    @media screen and (max-width : 500px) and (min-width: 300px){
        .comment >>> .el-button--small{
            padding: 5px 11px;
            margin: 0;
        }
          .comment >>> .el-button--small span span{
         display: none
        }
        
    }
     @media screen and (max-width: 800px) and (min-width: 500px){
        .comment >>> .el-button--small{
            padding: 8px 11px;
            margin: 0;
        }
          .comment >>> .el-button--small span span{
         display: inline-block;
        }
    }
    
    .comment>>>.swiper-container::after {
        opacity: 0;
    }
    

    .sortTag {
        width: 90%;
        margin: 0px auto 20px;
        display: flex;
        justify-content: space-around;
        position: relative;
        border: 1px solid rgba(170, 187, 204, 0.3);
        box-shadow: 0 26px 40px -24px rgba(0, 36, 100, .2);
        padding: 12px 9px;
        background: white;
        border-radius: 5px;
        overflow: hidden;
    }

    .sortTag::after {
        content: '';
        border-right: 10px solid transparent;
        border-top: 10px solid white;
        border-left: 10px solid transparent;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -10px;
        transform: translate(0, 10px);
    }

    .sortTag>>>.el-tag {
        border-style: dashed;
    }

    .comment>>>.swiper-zoom-container img {
        box-shadow: 0px 52px 65px -20px rgba(0, 0, 0, 0.05);
        border-radius: 2px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        max-width: 100% !important;
        max-height: 88% !important;
        transition: all ease 1s;
    }

    .comment>>>.my-bullet {
        background-color: white;
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 100%;
        opacity: .2;
        border: 1px solid black;
        margin: 0 4px;
        cursor: pointer;
        transition: all ease .5s;
    }

    .comment>>>.my-active-bullet {
        opacity: .5;
        background: black;
        border: none;
    }

    .comment>>>.swiper-slide {
        text-align: center;
        font-size: 16px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all ease 1s;
        position: relative;
        flex-direction: column;
    }

    @keyframes slide {
        from {
            opacity: 0;
            transform: scale3d(.5, .5, 1);
        }

        to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
        }
    }

    .like_com {
        display: flex;
        justify-content: flex-end;
        width: 40%;
        float: right;
    }

    .myDialog {
        max-width: 400px;
    }

    .reply_btn {
        cursor: pointer;
    }

    .like_btn {
        margin-right: 1rem;
        cursor: pointer;
    }

    .card-enter-active {
        animation: flipAni 1.4s 1 cubic-bezier(.77, 0, .175, 1) forwards;
    }

    .card-leave-active {
        animation: flipAni 1.4s 1 cubic-bezier(.77, 0, .175, 1) forwards reverse;
    }

    .slideUp-enter-active {
        animation: slideUp 1.4s 1 cubic-bezier(.77, 0, .175, 1) forwards reverse;
    }

    .slideUp-leave-active {
        animation: slideUp .9s 1 cubic-bezier(.77, 0, .175, 1) forwards;
    }

    @keyframes slideUp {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }


    .like_List {
        font-size: 0.8rem;
        padding-left: 0.4rem;
        color: gray;
        word-break: break-all;
        position: relative;
        padding-left: 49px;
        /* margin-top: .4rem; */
        width: 100%;
        margin-bottom: -0.1rem;
    }

    .like_List div {
        border-top: 1px solid rgba(192, 196, 204, 0.4);
        padding: 9px 4px;
        border-radius: 2px;
    }

    .btnactive {
        color: rgb(56, 179, 251);
        text-shadow: 0px 3px 10px rgba(59, 174, 251, 0.41);

    }

    .com_left {
        display: flex;
        justify-content: center;
        /* margin: 0rem auto .7rem; */
        flex-direction: column;
        align-items: center;
    }
    
    .post_img div {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center
    }

    .itemMenu {
        position: absolute;
        right: 0.2rem;
        top: 0.6rem
    }

    .setTop {
        position: relative;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1rem;
        border-bottom: 1px dashed #f2f1f1;
        font-size: .8rem;
        margin-bottom: 10px;
        line-height: 0.9rem;
        height: 1.4rem;
        color: #737373;
        letter-spacing: 2px
    }
    .com_right{
        /* position:fixed; */
        
        /* top: 0; */
        width: 30%;
        /* height: 300px; */
            /* left: 50%; */
    /* margin-left: 300px; */
        /* background: red */
    }
    
</style>
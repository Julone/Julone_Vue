<template>
    <div class="replyListWrapper">
        <div v-if="loading" v-loading="loading" style="transform: scale(0.6) translate(1.5rem, 7px);min-height:40px"></div>
        <div class="reply_wrapper" v-else>
            <div class="com_reply" v-for="(reply,index) in replyList" :key="reply.posttime">
                <el-dropdown style="width: 100%;" trigger="click">
                    <div class="re_body">
                        <el-popover placement="bottom" @click.stop.native trigger="click">
                            <h4 style="text-align:center">
                                <i class="el-icon-info" :style="{color: reply.isVip == 'true' ? 'rgb(56, 179, 251)' :'#C0C4CC'}"></i>&nbsp;{{reply.from_userName}}
                            </h4>
                            <div class="re_name" slot="reference" :class="reply.isVip == 'true' ? 'vip replyVip' : ''">
                                <div v-if="reply.userIcon != null && reply.userIcon != ''" :style="{background: `url(${getReplyIcon(reply.userIcon)}) center center/cover no-repeat`}"></div>
                                <div class="avator" v-else>{{getFirstCharacter(reply.from_userName)}}</div>
                            </div>
                        </el-popover>
                        <div class="re_content">
                            <div class="re_nei">
                                <div class="re_towho">
                                    <div style="display: inline;" v-if="reply.replyType != '1'" :class="reply.isVip == 'true' ? 'vip_text' : ''">
                                        {{reply.from_userName}} &nbsp;</div>
                                    <div style="display: inline;" v-if="reply.replyType == '1'">回复 <span :class="reply.isToVip == 'true' ? 'vip_text vip_gold': ''">@{{reply.to_userName}}</span>&nbsp;&nbsp;</div>
                                    <el-popover placement="right" effect="dark"  @click.stop.native trigger="click">
                                        <h6>{{reply.posttime}}</h6>
                                        <div class="reply_time" slot="reference">
                                            {{setTime(reply.posttime)}}
                                        </div>
                                    </el-popover>
                                </div>
                                <div class="re_word" v-html="reply.huifu"></div>
                            </div>
                        </div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="reply_show(reply,reply.navId,reply.from_userId,reply.from_userName,'reply')">
                            <!-- v-if="reply.from_userId != yourId"> -->
                            <i class="el-icon-edit"></i>
                            回复</el-dropdown-item>
                        <el-dropdown-item @click.native="reply_delete(reply.guid,index)" v-if="reply.canHandle == 'true' || reply.selfSend == 'true'"><i
                                class="el-icon-delete"></i> 删除</el-dropdown-item>
                    </el-dropdown-menu>

                </el-dropdown>

            </div>
            <div class="replyTip">
                <el-alert style="padding:1px 2px;cursor:pointer;" :title="replyCount == '0' ? '- 暂无评论,快去评论吧 -' : '- 我也要有话要说! -' "
                    center="true" :closable="false" type="info" @click.native="reply_show(replyContent,navId,replyToId,replyToName,'com')">
                </el-alert>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getStorage,
        setTime
    } from './../others/methods.js'
    export default {
        data() {
            return {
                replyList: [],
                fetched: false,
                loading: true,
            }
        },
        props: {
            replyContent:{
                type:Object,
            },
            replyToId: {
                type: String,
                required: true,
            },
            navId: {
                type: String,
                required: true
            },
            replyToName: {
                type: String,
            },
            replyCount: {
                type: String
            },
            navIndex: {
                type: String
            }
        },
        methods: {
            loadData() {
                this.loading = true
                axios({
                    url: this.$store.state.getReply,
                    method: 'post',
                    data: {
                        navId: this.$props.navId,
                        userId: getStorage('userId') || "",
                        userPass: getStorage('userPass') || ""
                    }
                }).then(res => {
                    this.replyList.splice(0, this.replyList.length);
                    this.replyList.push(...res.data);
                    this.$emit('newCount', {
                        index: this.navIndex,
                        count: this.replyList.length
                    });
                }).catch(() => {
                    this.loading = false;
                    this.$toast({
                        message: `网络错误,请重试!`,
                        className: 'mytoast',
                        position: 'bottom',
                        duration: 1000
                    })
                }).then(() => {
                    this.loading = false;
                })
            },
            initData() {
                if (!this.fetched) {
                    this.fetched = true;
                    if (this.replyCount != '0') {
                        this.loadData();
                    } else {
                        setTimeout(() => {
                            this.loading = false
                        }, 100)
                    }
                }
            },
            reply_show(reply,a, b, c, d) {
                this.$emit('reply_show', [reply,a, b, c, d]);
            },
            reply_delete(guid, index) {
                this.$confirm('确定要删除吗?', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确 定',
                    cancelButtonText: '返 回',
                    type: 'info',
                }).then(() => {
                    this.replyList.splice(index, 1);
                    this.$emit('newCount', {
                        index: this.navIndex,
                        count: this.replyList.length
                    });
                    axios({
                        method: 'post',
                        url: this.$store.state.deleteReply,
                        data: {
                            guid: guid,
                            userId: getStorage('userId'),
                            userPass: getStorage('userPass')
                        }
                    }).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: '删除回复成功!',
                                type: 'success',
                                center: true
                            })
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'warning',
                                center: true
                            })
                        }
                    })
                })
            },
        },
          
            computed: {
                yourId() {
                    return getStorage('userId');
                },
                getFirstCharacter() {
                    return function (ziduan) {
                        return ziduan.slice(0, 1).toUpperCase() + ziduan.slice(1, 2)
                    }
                },
                setTime() {
                    return function (ev) {
                        return setTime(ev)
                    }
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
                        return params == 1 ? 'img_one' : params % 2 == 0 && params <= 4 ? 'img_double' :
                            'img_triple'
                    }
                },
                isVipText() {
                    return function (params) {
                        return params.toUpperCase() == 'JULONE' ? 'vip_text' : ''
                    }
                },
                setFirst() {
                    return function (val) {
                        return val.slice(0, 1).toUpperCase() + val.slice(1, val.length);
                    }
                },
                getReplyIcon() {
                    return function (a) {
                        if (a != '' && a != null) {
                            return this.$store.state.srcCom + 'nav/' + a;
                        }
                    }
                }
            }
        }
</script>

<style scoped>
    .replyTip {
        width: 100%;
        white-space: nowrap;
        text-align: center;
        display: block;
        font-size: .5rem;
        float: right;
        color: #b2b2b2;
        line-height: 34px;
        margin-top: 0.6rem;
    }

    .com_reply {
        display: flex;
        width: 100%;
        background: rgba(132, 132, 132, 0.04);
        min-height: 50px;
        flex-direction: column;
        position: relative;
        margin-top: 9px;
        border-radius: 5px;
        border: 1px solid rgba(103, 64, 247, 0.06);
        align-items: flex-start;
    }

    .re_body {
        display: flex;
        width: 100%;
        padding: 3px 0px 2px 7px;
    }

    .re_content {
        display: flex;
        flex-direction: column;
        max-width: 100%;
        font-size: .8rem;
        color: gray;
        padding: 3px 0 0 9px;
    }

    .re_name {

        text-align: center;
        font-size: 0.7rem;
        color: #b6b6b6;
        /* padding: 3px; */
        width: 40px;
        height: 40px;
        position: relative;
        display: block;
        box-sizing: content-box;
        background: linear-gradient(120deg, #cfd9df 0%, #e2ebf0 100%) left top/cover no-repeat;
        font-size: 25px;
        border: 1px solid rgb(227, 233, 236);
        border-radius: 100px;
    }

    .re_name div {
        width: 40px;
        height: 40px;
        border-radius: 100px;
    }

    .avator {
        color: white;
        border-radius: 50px;
        line-height: 40px;
        font-size: 0.8rem;
        text-align: center;
        letter-spacing: 1px;
        padding-left: 3px;
    }

    .avator::first-letter {
        font-size: 1rem
    }

    .re_name img {
        width: 40px;
        height: 40px;
        border-radius: 50%
    }

    .re_nei {
        min-height: 40px;
    }

    .re_towho {
        font-size: 0.6rem;
        line-height: 1.3rem;

    }

    .re_towho span {
        display: inline-block;
        font-weight: 600;
    }

    .re_towho span::first-letter {
        text-transform: uppercase
    }

    .re_word {
        word-break: break-all;
    }

    .re_time {
        text-align: right;
        display: flex;
        justify-content: space-between;
        padding-right: 5px;
        font-size: .5rem;
        color: gray;
        letter-spacing: 1px;
        width: 80%;
    }

    .reply_wrapper {
        height: auto;
        overflow: hidden;
        width: 100%;
        float: right;
        padding-left: 50px;
    }

    .reply_btn {
        margin-right: 9px
    }

    .reply_more {
        text-align: center;
        width: 100%;
        left: 0%;
        position: relative;
        font-size: .8rem;
        color: #616161;
        margin-top: 5px;
    }

    .reply_time {
        font-weight: 400;
        color: #b2b2b2
    }

    .replyVip {
        -webkit-text-fill-color: white
    }

    .replyVip::after {
        left: 1.9rem;
        top: 1.8rem;
    }

    .com_reply:active {
        background: rgba(97, 97, 97, .1)
    }
</style>
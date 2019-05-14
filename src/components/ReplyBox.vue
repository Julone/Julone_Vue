<template>
<div>

    <el-dialog :title="replyType=='com' ? '留言评论' :'留言回复'" v-if="replyType =='com'" @open="$store.dispatch('blur',true)"
        custom-class="my_Dialog" :visible.sync="replyState" :append-to-body="true" top="20vh" width="35vw" @close="closeReply">
        <el-card>

            <el-link icon="el-icon-user-solid">
                {{replyToName}} 
            </el-link>
            <el-scrollbar style="height:100px;background: #f8f8f8;padding:0 10px;margin:10px auto">
                <div class="reply_text_html" v-if="replyContent.navText" 
                        v-html="$options.filters.addFace(replyContent.navText)"></div>
                        
                <div class="reply_text_html no_word" v-else> 
                    <i class="el-icon-receiving" style="font-size:2rem;display:inline"></i>
                    <p>无消息</p>
                </div>
            </el-scrollbar>

            <el-carousel type="card" height="150px" style="padding:10px 0 0px;background: #d3dce6;border-radius:5px;"
                v-if="replyContent.navImg" :loop="false" :autoplay="false">
                <el-carousel-item v-for="item in imgs(replyContent.navImg)" :key="item"
                    style="display:flex;justify-content:center">
                    <!-- <img :src="$store.state.srcCom + 'nav/upload/' + 'sm_'+item" alt="" 
                        style="border-radius:5px" height="150px" @load="" @click="openIMG($event.target.src)"> -->
                    <el-image :src="$store.state.srcCom + 'nav/upload/' + 'sm_'+item"
                        style="border-radius:5px;height:150px" fit='contain' @click.native="openIMG($event.target.src)">
                        <div slot="error" class="image-slot">
                            <el-image src="./img404.png" fit="contain" style="border-radius:5px;height:150px">
                            </el-image>
                        </div>
                    </el-image>
                </el-carousel-item>
            </el-carousel>

        </el-card>
        <span slot="footer" class="dialog-footer">
            <div class="reply_box3" @click.stop>
                <el-autocomplete placement="bottom" class="inline-input" v-model="replayContent"
                    :fetch-suggestions="querySearch" :autofocus="false" :placeholder="placehold"
                    @keydown.enter.native="postReply" ref="input" :popper-append-to-body="true">
                    <i class="el-icon-edit-outline el-input__icon" style="margin-top: 2px;" slot="prefix"></i>
                    <i class="el-icon-close el-input__icon cursorPointer" v-show="replayContent" @click="emptyContent" slot="suffix"></i>
                    <el-button slot="append" type="primary" icon="el-icon-s-promotion" @click="postReply()" id="reply_submit">
                        发送</el-button>
                </el-autocomplete>
            </div>
        </span>
    </el-dialog>
    <el-dialog :title="'留言回复'" v-else @open="$store.dispatch('blur',true)"
        custom-class="my_Dialog" :visible.sync="replyState" top="30vh" :append-to-body="true" width="35vw" @close="closeReply">
        <el-card>

            <el-link icon="el-icon-user-solid">
                {{replyToName}} 
            </el-link>
            <el-scrollbar style="height:100px;background: #f8f8f8;padding:0 10px;margin:10px auto">
                <div class="reply_text_html" v-if="replyContent.navText || replyContent.huifu" 
                     v-html="$options.filters.addFace(replyContent.navText || replyContent.huifu)"></div>
            <div class="reply_text_html no_word" v-else> 
                <i class="el-icon-receiving" style="font-size:2rem;display:inline"></i>
                <p>无消息</p>
            </div>
            </el-scrollbar>

        </el-card>
        <span slot="footer" class="dialog-footer">
            <div class="reply_box3" @click.stop>
                <el-autocomplete placement="bottom" class="inline-input" v-model="replayContent"
                    :fetch-suggestions="querySearch" :autofocus="false" :placeholder="placehold"
                    @keydown.enter.native="postReply" ref="input" :popper-append-to-body="true">
                    <i class="el-icon-edit-outline el-input__icon" style="margin-top: 2px;" slot="prefix"></i>
                    <i class="el-icon-close el-input__icon cursorPointer" v-show="replayContent" @click="emptyContent" slot="suffix"></i>
                    <el-button slot="append" type="primary" icon="el-icon-s-promotion" @click="postReply()" id="reply_submit">
                        发送</el-button>
                </el-autocomplete>
            </div>
        </span>
    </el-dialog>
</div>

</template>

<script>
    import facebox from './FaceBox'
    import {
        checkContent,
        checkName,
        getStorage,
        debounce,
        addFace
    } from "./../others/methods";

    export default {
        data() {
            return {
                replayContent: '',
                restaurants: [],
            }
        },
        components: {
            'FaceBox': facebox
        },
        props: {
            replyContent: {
                type: Object
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
                required: true
            },
            replyType: {
                type: String,
                required: true
            }
        },
        mounted() {
            this.restaurants = this.loadAll();
        },
        computed: {
            placehold() {
                return "回复 " + this.$props.replyToName + " :"
            },
            replyState() {
                return this.$store.state.replyState
            },
        },
        watch: {
            replyState(val) {
                if (val) {
                    this.$nextTick(() => {
                        // $(this.$refs.input).focus();
                        document.body.style.overflow = "hidden"
                    })
                } else {
                    this.emptyContent();
                    $('.el-autocomplete-suggestion').hide()
                    document.body.style.overflow = "auto"
                }
            }
        },
        methods: {
            openIMG(url) {
                window.open(url.replace('.webp', '').replace('sm_', ''))
            },
            imgs(params) {
                if (this.$store.state.isWebp) {
                    return params.replace(/upload\//g, '').split('?')
                } else {
                    return params.replace(/.webp/g, "").replace(/upload\//g, '').split("?")
                }
            },
            emptyContent() {
                this.$data.replayContent = ""
            },
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {
                return [{
                        "value": "为你疯狂打CALL😚"
                    },
                    {
                        "value": "给你点个赞👍"
                    },
                    {
                        "value": "掌声送给社会人👏"
                    },
                    {
                        "value": "皮这一下很开心,哈哈😏"
                    },
                    {
                        "value": "你这样很Boring~🙃"
                    }
                ]
            },
            postReply2: debounce(function () {
                if (checkContent(this.$data.replayContent)) {
                    this.$message({
                        showClose: false,
                        type: 'info',
                        message: '正在发送你的内容,请稍等...',
                        center: true
                    });
                    axios({
                        url: this.$store.state.replyCom,
                        method: 'post',
                        data: {
                            userId: getStorage('userId'),
                            userPass: getStorage('userPass'),
                            navId: parseInt(this.$props.navId),
                            toId: this.$props.replyToId,
                            huifu: $("<span/>").text(this.$data.replayContent).html(),
                            replyType: this.$props.replyType == 'com' ? 'com' : 'reply'
                        }
                    }).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                showClose: false,
                                type: 'success',
                                message: '成功,收到你的回复了!',
                                center: true
                            });
                            this.$emit('replyOK');
                        }
                    }).then(() => {
                        this.replayContent = "";
                        this.closeReply();
                    })
                } else {
                    this.$message({
                        message: '请输入回复的内容!',
                        type: 'warning',
                        center: true
                    })
                }
            }, 1000),
            postReply() {
                this.$store.dispatch('isLoginIn', {
                    that: this,
                    confirmCB: () => {
                        this.$router.push('/login');
                    },
                    cancelCB: () => {
                        parm.that.$message({
                            type: 'warning',
                            message: '没有登录,你无法回复!',
                            center: true
                        });
                    },
                    loginCB: () => {
                        this.postReply2()
                    }
                })
            },
            closeReply() {
                this.$store.dispatch('blur', false)
                this.$store.commit('toggleReply', false);
            }
        }
    }
</script>

<style>
    .slide-enter-active,
    .slide-leave-active {
        transition: all .2s linear
    }

    .image-slot {
        /* background: #909399; */
    }

    .slide-enter,
    .slide-leave-to {
        opacity: 0;
    }

    .slide-enter-to,
    .slide-leave {

        opacity: 1;
    }

    .reply_text_html {
        font-size: 1rem;
        vertical-align: top;
        background: #f8f8f8;
        padding: 15px 15px;
        border-radius: 5px;
        margin: 0px 0;
        text-indent: 1rem;
    }

    .reply_text_html img {
        width: 1.2rem;
        height: 1.2rem;
        vertical-align: text-bottom
    }
    .reply_text_html.no_word{
        min-height:100px;text-align:center;
        font-size:.8rem;color:gray;
            display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    }

    .reply_box_wrapper {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        background: rgba(40, 40, 40, 0.2)
    }

    .reply_box {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background: white;
        padding: 5px;
        height: 50px;
    }

    .inline-input {
        width: 100%;
    }

    .el-input__inner:focus {
        border-color: #909399 !important;
    }

    .el-input-group__append {
        border: 1px solid #E4E7ED !important;
    }

    .my_Dialog {
        min-width: 320px;
        max-width: 500px;
    }
</style>
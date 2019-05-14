<template>
    <div class="com_content" v-if="load">
        <div class="post">
            <div id="com_text" contenteditable ref="postinput" placeholder="请留下你的声音!" v-html="postText"></div>
            <div class="com_fun">
                <div class="com_file" :class="{com_file_filled:!imgEmpty}">
                    <input type="file" name="inputfile" id="inputfile" accept="image/*" multiple />
                </div>
                <el-popover placement="bottom" width="250" trigger="click" popper-class="facePost" v-model="faceshow">
                    <face-box :target="$refs.postinput"></face-box>
                    <el-button slot="reference" id="com_face"  :class="{'face_close' : faceshow}" @click="faceshow = !faceshow"></el-button>
                </el-popover>
                <input type="text" id="com_name" placeholder="告诉我,你的名字" transparent disabled >
                <input type="button" id="com_submit" ref="submit" @click="postComment" value="发送">
            </div>
        </div>
        <div class="file_wrapper">
            <div class="file_box"></div>
        </div>
    </div>
</template>

<script>
    import FaceBox from './FaceBox.vue'
    import {
        checkName,
        checkContent,
        getStorage,
        throttle,
setStorage
    } from './../others/methods.js'
    var postdata = new FormData();
    export default {
        components: {
            'FaceBox': FaceBox
        },
        props: {
            load: {
                type: Boolean,
                required: true
            },
        },
        
        data() {
            return {
                faceshow: false,
                postText: '',
                imgEmpty: true,
                posting: false,
            }
        },
        
        mounted() {
            var _this = this;
            this.$nextTick(() => {
                $(document).on("change", '#inputfile', function (event) {
                    _this.$data.imgEmpty = false;
                    var filenum = $("#inputfile").get(0).files.length;
                    if (filenum <= 9 && filenum > 0) {
                        _this.$message({
                            message: "你已经选择了 " + filenum + " 张图片",
                            center: true,
                            type: 'info'
                        });
                        if ($("#inputfile").get(0).files[0].size > 10 * 1024 * 1024) {
                            _this.$message({
                                message: "图片大于10M,请重新选择",
                                type: 'error',
                                center: true
                            });
                            _this.resetAll();
                        } else {
                            // var result = $('.post').offset().left;
                            // $(".file_wrapper").css('left', result + "px");
                            $(".file_wrapper").show();
                            $(".file_wrapper .file_box").empty();
                            for (var i = 0; i < filenum; i++) {
                                var imgUrl = window.URL.createObjectURL($("#inputfile").get(0).files[i]);
                                $(".file_wrapper .file_box").append($(
                                    `<div style="background: url(${imgUrl}) center center/cover no-repeat"></div>`
                                ));
                            }
                            _this.$data.imgEmpty = false;
                        }
                    } else {
                        if (filenum == 0) {
                            _this.$message({
                                message: "你已经取消了上传图片",
                                type: 'info',
                                center: true
                            });
                            _this.resetAll();
                        } else {
                            _this.$message({
                                message: "图片不能够超过 9 张!",
                                type: 'warning',
                                center: true
                            });
                            _this.resetAll();
                        }

                    }
                })
            });
        },
        watch: {
            posting(newV) {
                if (newV) {
                    this.$message({
                        type: 'info',
                        center: true,
                        message: "正在发送消息中,请稍等"
                    })
                    $(this.$refs.submit).attr('disabled', 'disabled');
                } else {
                    $(this.$refs.submit).removeAttr('disabled');
                }
            }
        },
        created(){
            var ss = window.sessionStorage;
            this.postText = ss.getItem('postText');
        },
        methods: {
            check() {
                if (this.$refs.postinput.innerHTML != '') {
                    this.$refs.submit.style.filter = 'brightness(1.15)';
                } else {
                    this.$refs.submit.style.filter = 'brightness(1)'
                    this.$refs.postinput.style.background = ' rgba(245, 108, 108, 0.25)';
                }
                setTimeout(()=>{
                    this.$refs.postinput.style.background = 'none';
                },2000)
            },
            resetBorder(){
                // this.$refs.postinput.style.border = 'none';
            },
           
            resetAll() {
                $(".file_wrapper").css('display', 'none');
                $(".file_wrapper .file_box").empty();
                $("#inputfile").remove();
                $(".com_file").removeClass('com_file_filled');
                $(".com_file").append(
                    `<input type="file" name="inputfile" id="inputfile" value="" accept="image/*" multiple="">`);
                this.$data.imgEmpty = true;
                postdata.delete('com')
                postdata.delete('visitor')
                postdata.delete('postId')
            },
            reset() {
                this.$refs.postinput.innerHTML = "";
            },
            appendFile() {
                for (let k = 0; k < 9; k++) {
                    postdata.delete('upload_file' + k);
                }
                $.each($('#inputfile')[0].files, function (i, file) {
                    postdata.append('upload_file' + i, file);
                });
            },
           
            postComment() {
                var _this = this;
                this.$store.dispatch('isLoginIn', {
                    that: _this,
                    confirmCB: () => {
                        this.$router.push('/login');
                    },
                    cancelCB: () => {
                        this.$message({
                            type: 'warning',
                            message: '没有登录,你无法评论!',
                            center: true
                        });
                    },
                    loginCB: () => {
                        if (checkContent(_this.$refs.postinput.innerHTML) || !_this.$data.imgEmpty) {
                            _this.posting = true;
                            postdata.append('com', this.$options.filters.removeFace(_this.$refs.postinput.innerHTML));
                            postdata.append('visitor', getStorage('userName'));
                            postdata.append('postId', getStorage('userId'));
                            _this.appendFile();
                            if (!_this.$data.imgEmpty) {
                                var msg = _this.$message({
                                    type: 'warning',
                                    center: true,
                                    message: `图片已上传 0%,请稍等`,
                                    iconClass: 'el-icon-upload2',
                                    duration: 0
                                })
                            }
                            this.reset();
                            axios({
                                url: this.$store.state.postCom,
                                method: 'post',
                                data: postdata,
                                onUploadProgress: function (progress) {
                                    if (progress.lengthComputable && !_this.$data.imgEmpty) {
                                        var percent = progress.loaded / progress.total * 100;
                                        if (percent != 100) {
                                            msg.message = `图片已上传 ${parseInt(percent)}%,请稍等`;
                                        } else {
                                            msg.message = `服务器正在处理中,请稍等`;
                                            msg.duration = 10
                                        }
                                    }
                                },
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then(res => {
                                var ss = window.sessionStorage;
                                ss.setItem('postText',"");
                                if (res.data.code == 200) {
                                    _this.$message({
                                        type: 'success',
                                        center: true,
                                        message: res.data.msg,
                                    })
                                    this.$emit('fresh', res.data.data);
                                }
                                _this.posting = false;
                            }).catch(error => {
                                _this.$message({
                                    type: 'error',
                                    center: true,
                                    message: `发送失败了,尝试重新发送`,
                                })
                                _this.posting = false;
                            }).then(() => {
                                if (msg) {
                                    msg.close();
                                }
                                this.resetAll();
                            })
                        } else {
                            _this.$message({
                                type: 'warning',
                                center: true,
                                message: `请输入你要发送的内容!`,
                            })
                            this.check();
                        }
                    }
                })
            },
        }
    }
</script>

<style>
    .facePost {
        padding: 8px;
        box-sizing: content-box;
        margin-top: 18px;
        display: flex;
        justify-content: center;
        transform: translate(0, 12px);
        border-radius: 7px;
    }

    .facePost .popper__arrow {
        transform: scale(2.2) translate(0, -1px)
    }

    .post {
        width: 90%;
        position: relative;
        height: auto;
        margin: 0 auto;
        display: flex;
        background: white;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        /* box-shadow: 0 26px 40px -24px rgba(0, 36, 100, .35); */
        border: 1px solid rgba(170, 187, 204, 0.3);
        margin-bottom: 25px;
    }
    .post::after,.post::before,.userBoard::before,.userBoard::after,.twice::before,.twice::after{
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        top: 0;
        border-radius: 10px;
        transform: translate(0,8px) scale(.98);
        background: rgb(113, 173, 235);
        z-index: -1;
        transition: all ease .4s;
        filter: grayscale(.5) opacity(.6);
    }
    .post::after,.userBoard::after,.twice::after{
        transform: translate(0,16px) scale(.95);
        background:rgb(197, 219, 241); 
        z-index: -2;
    }
    .post:hover::after,.post:hover::before,.userBoard:hover::after,.userBoard:hover::before,.twice:hover::after,.twice:hover::before{
         filter: grayscale(0) opacity(1);
    }

    .post #com_text {
        width: inherit;
        height: 110px;
        margin-top: 10px;
        border: none;
        padding: 2px 2px;
        font-size: 1rem;
        white-space: normal;
        word-break: break-all;
        font-family: '等线', '微软雅黑';
        letter-spacing: 1px;
        resize: none;
        line-height: 1.6rem;
        overflow-y: auto;
        text-align: left;
        border-radius: 10px;
        background: white;
        transition: background 1s ease;
        box-sizing: border-box;
    }

    #com_text img {
        vertical-align: bottom;
        width: 24px;
        height: 24px;
    }

    #com_text:empty::before {
        color: rgb(128, 128, 128);
        content: attr(placeholder);
        font-size: 1rem;
        font-family: '等线';
        letter-spacing: 1px;
        position: absolute;
        top: 12px;
        margin-left: 2px;
    }

    .com_fun {
        width: inherit;
        height: 32px;
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }

    #com_text::selection {
        background: rgba(164, 195, 222, 0.47);
        color: white;
    }


    .com_fun input[type='text'] {
        width: 50%;
        height: 32px;
        padding-left: 30px;
        border: none;
        background: rgba(240, 240, 240, 0.57);
        border-radius: 50px;
        font-family: book, 'STSong', 'Microsoft Yahei';
        font-size: 0.8rem;
        color: black;
        opacity: 0;
    }

    .com_fun input[id='com_submit'] {
        width: 8rem;
        height: 32px;
        border: none;
        border-radius: 50px;
        color: white;
        background-image: linear-gradient(133deg, #33bcfb 10%, #4e8efc);
        cursor: pointer;
        font-size: 14px;
        line-height: 32px;
        transition: all ease .1s;
        box-shadow: -1px 5px 18px -5px rgb(71, 154, 252)
    }

    .com_fun input[id="com_submit"]:active {
        filter: brightness(.9);
        transform: translateY(3px);
        color: #f3f3f3
    }


    #com_face {
        width: 32px;
        height: 32px;
        margin: 0 5px;
        box-shadow: none !important;
        border-radius: 0;
        border: none;
        background: url('./../assets/img/face1.png') no-repeat left top/32px 64px;
        background-position: 0 0;
        transition: all cubic-bezier(.73, 2.57, .62, .29) .6s;
    }

    .face_close {
        background-position: 0 -32px !important;
    }

    .com_file {
        width: 32px;
        height: 32px;
        margin: 0 2px;
        box-shadow: none !important;
        border-radius: 0;
        background: url('./../assets/img/file.png') no-repeat left top/32px 64px;
        background-position: 0 0;
        transition: all cubic-bezier(.73, 2.57, .62, .29) .6s;
    }

    .com_file_filled {
        background-position: 0 -32px !important;
    }

    #inputfile {
        width: 32px;
        height: 32px;
        opacity: 0;
        overflow: hidden;
    }


    .file_wrapper {
        width: 120px;
        height: 140px;
        position: absolute;
        top: 175px;
        left:21px;
        /* left: 50%; */
        display: none;
        z-index: 7;
    }

    .file_wrapper .file_box {
        width: 120px;
        height: 120px;
        overflow-y: scroll;
        background: #ffffff;
        padding: 5px;
        box-shadow: 0 26px 40px -24px rgba(0, 36, 100, .5);
        border-radius: 8px;
        border: 1px solid #dcd5d5;
        margin-top: 3px;
    }

    .file_wrapper::before {
        content: '';
        width: 20px;
        height: 20px;
        position: absolute;
        left: 50%;
        margin-left: -10px;
        top: -7px;
        background: white;
        transform: rotate(45deg);
        border-radius: 4px 0 0 0;
        border-left: 1px solid #dcd5d5;
        border-top: 1px solid #dcd5d5;
        z-index: 0;
    }

    .file_wrapper .file_box div {
        width: 108px;
        height: 108px;
        z-index: 11;
        position: relative;
        margin-bottom: 6px;
        border-radius: 8px;
        border: 1px solid rgba(181, 180, 183, 0.35);
    }
</style>
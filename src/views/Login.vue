<template>
    <div class="user container" :style="{minHeight:minH}">
        <div class="loginWrapper" v-show="loginState">
            <img src="./../assets/img/logo-text-static.svg" @load="imgComplete" width="70%" alt="">
            <div class="login" v-if="!loading">
                <span>请输入登录账号(Login Account)</span>
                <el-input placeholder='请输入登录账号' v-model.lazy="loginId" @blur="validateId(loginId,$event)" clearable>
                </el-input>
                <span>请输入登录密码(Login Password)</span>
                <el-input placeholder="请输入登录密码" type="password" v-model.lazy="loginPass" @blur="validatePass(loginPass,$event)"
                    clearable @keyup.enter.native="login">
                </el-input>
                <div style="display:flex;justify-content:space-between">
                    <el-button type="text" style="margin:0" @click="changeLogin">账号注册</el-button>
                    <el-button type="text" disabled @click="$router.push('/findpass')" style="margin:0">密码找回</el-button>                  
                </div>

                <div style="margin:5px 0 -5px;text-align:center;filter:grayscale(.5)">
                    <el-checkbox style="transform:scale(1)" v-model="accept">
                        <span class="accept_text">我已阅读并接受<a>《用户协议》</a>和<a>《隐私政策》</a></span>
                    </el-checkbox>
                </div>
                <div class="btns">
                    <el-button @click.native="login" :type="errorTime >= 3 ? 'danger': 'primary'" size="large"
                        style="width:100%">
                        {{ (errorTime < 3)? '立即登录' : '请在 '+ getLeftTime +' 秒后, 再重试!' }}
                    </el-button>
                </div>

            </div>
        </div>
        <div class="regWrapper" v-show="!loginState">
            <img src="./../assets/img/logo-text-static.svg" @load="imgComplete" width="70%" alt="">
            <div class="reg" v-if="!loading">
                <span>请输入注册账号(Register Account)</span>
                <el-input placeholder="推荐手机号或邮箱(5-25位)" v-model.lazy="regId" @blur="validateId(regId,$event)" clearable>
                </el-input>
                <span>请输入注册密码(Register Password)</span>
                <el-input placeholder="请输入密码(5-25位)" type="password" v-model="regPass" @blur="validatePass(regPass,$event)"
                    clearable>
                </el-input>
                <span>请输入注册昵称(Register Nickname)</span>
                <el-input placeholder="请输入中英文昵称(禁止数字)" v-model.lazy="regName" @blur="validateName(regName,$event)"
                    clearable @keyup.enter.native="register">
                </el-input>
                <div style="margin:5px 0 -5px;text-align:center;filter:grayscale(.5)">
                    <el-checkbox style="transform:scale(1)" v-model="accept">
                        <span class="accept_text">我已阅读并接受<a>《用户协议》</a>和<a>《隐私政策》</a></span>
                    </el-checkbox>
                </div>
                <div class="btns">
                    <el-button @click="register" :disabled="!accept" size="large" type="primary" style="width:100%">
                        立即注册
                    </el-button>
                    <el-button type="text" style="margin:0" @click="changeLogin">已有账号? 马上登录</el-button>
                </div>
                <div>

                </div>
            </div>

        </div>
        <foot btm="5%"></foot>
    </div>
</template>
<script>
    import foot from './../components/Footer'
    import {
        setStorage,
        getStorage,
        debounce,
delStorage
    } from './../others/methods'
    let msg = null;
    export default {
        data() {
            return {
                loginState: true,
                loginId: '',
                loginPass: '',
                regId: '',
                regPass: '',
                regName: '',
                accept: true,
                errorTime:0,
                loading:true,
                nowTime:+new Date()
            }
        },
        created() {
            if (this.$route.path == '/reg') {
                this.loginState = false;
            } else {
                this.loginState = true;
            }
            if(this.getLeftTime <= 300){
                this.errorTime = 4;
            }
            setInterval(()=>{
                this.nowTime = +new Date();
            },1000)
        },
        components: {
            foot
        },
        watch: {
            loginState() {
                this.$nextTick(() => {
                    Array.from($(".user").find('input')).forEach(element => {
                        element.style.borderColor = "#dcdfe6"
                    });
                    if (msg) msg.close()
                })
            },
            errorTime(val){
                if(val == 3){
                    setStorage('errorInLoginTime',+new Date());
                }
            },
            getLeftTime(val){
                if(val <= 0){
                    this.errorTime = 0;
                     delStorage('errorInLoginTime');
                }
            }
        },
        computed:{
            minH(){
                return this.$store.state.innerHeight - 55 + 'px'
            },
            getLeftTime(){
                return parseInt(300 - ((this.nowTime - getStorage('errorInLoginTime')) /1000 ))
            },
        },
        methods: {
            imgComplete(){
                this.loading = false;
            },
            changeLogin() {
                this.loginState = !this.loginState
            },
            login: debounce(function () {
                if (this.validateLogin() && this.errorTime <=3) {
                    this.$message({
                        message: "正在登录,请稍候...",
                        center: true,
                        type: 'info'
                    })
                    axios({
                        method: 'post',
                        url: this.$store.state.login,
                        data: {
                            userId: this.loginId,
                            userPass: this.loginPass,
                        }
                    }).then(res => {
                        if (res.data.code == 200) {
                            setStorage('userId', res.data.userData.userId);
                            setStorage('userPass', res.data.userData.userPass);
                            setStorage('userName', res.data.userData.userName);
                            if (res.data.userData.userIcon != ""){
                                setStorage('userIcon', this.$store.state.srcCom + 'nav/' + res.data.userData.userIcon);
                            }
                            this.$router.push('/comment')
                        } else {
                            this.errorTime++;
                            this.$message({
                                message: this.errorTime >= 3? "已锁定, 请在 5分钟后, 再尝试登录!" : "再输错 "+(3 - this.errorTime) +"次,将禁止登录 5分钟!",
                                center: true,
                                type: 'error',
                                duration: 2000
                            })
                        }
                    })
                }
            }, 1000),
            register: debounce(function () {
                if (this.validateReg()) {
                    this.$message({
                        message: "正在注册,请稍候...",
                        center: true,
                        type: 'info'
                    })
                    axios({
                        method: 'post',
                        url: this.$store.state.register,
                        data: {
                            userId: this.regId,
                            userPass: this.regPass,
                            userName: this.regName,
                        }
                    }).then(res => {
                        if (res.data.code == 200) {
                            setStorage('userId', res.data.userData.userId);
                            setStorage('userPass', res.data.userData.userPass);
                            setStorage('userName', res.data.userData.userName);
                            this.$alert('注册成功,快去登录吧', '恭喜你', {
                                confirmButtonText: '马上登录',
                                type: 'info',
                                callback: action => {
                                    this.$data.loginState = true;
                                    this.$data.loginId = getStorage('userId');
                                    this.$data.loginPass = getStorage('userPass');
                                }
                            });
                        } else {
                            this.$message({
                                message: res.data.msg,
                                center: true,
                                type: 'error'
                            })
                        }
                    })
                }
            }, 1000),
            validateName(a, b) {
                if (/^[\u4e00-\u9fa5a-zA-Z]{2,20}/.test(a)) {
                    b.target.style.borderColor = "#67C23A";
                    if (msg) msg.close();
                    return true;
                } else {
                    b.target.style.borderColor = "red";
                    return false;
                }
            },
            validateId(a, b) {
                if (/^[\w@_.-]{5,25}$/.test(a)) {
                    b.target.style.borderColor = "#67C23A";
                    if (msg) msg.close();
                    return true;
                } else {
                    b.target.style.borderColor = "red";
                    return false;
                }
            },
            validatePass(a, b) {
                if (/^[\w_.?-]{5,25}/.test(a)) {
                    b.target.style.borderColor = "#67C23A";
                    if (msg) msg.close();
                    return true;
                } else {
                    b.target.style.borderColor = "red";
                    return false;
                }
            },
            validateLogin() {
                if (this.loginId == '' || this.loginPass == "") {
                    this.$message({
                        message: '请填写完整登录信息!',
                        type: 'warning',
                        center: true
                    })
                    return false;
                }
                return true;
            },
            validateReg() {
                if (this.regId == '' || this.regPass == "" || this.regName == "") {
                    this.$message({
                        message: '请填写完整注册信息!',
                        type: 'warning',
                        center: true
                    })
                    return false;
                }
                return true;
            }
        },
    }
</script>
<style scoped>
    .user {
        margin: 0 auto;
        padding: 60px 30px;
        /* height: calc(100vh - 55px); */
        width: 100%;
        background: white;
        background: url(./../assets/img/social.svg) white bottom center no-repeat;
    }

    .logo {
        margin: 0rem auto 0.5rem
    }

    .login *,
    .reg * {
        margin-bottom: .3rem;
    }

    .login span,
    .reg span {
        font-size: 0.8rem;
        color: gray;
        line-height: 2.5rem;
    }

    .loginWrapper,
    .regWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: fit-content;
        border-radius: 15px;
        max-width: 300px;
        margin: 0 auto 2rem
    }
    .container>>>.accept_text a{
        color:#409EFF
    }
    img{
        margin: 10px auto;
        min-height: 84px;
    }

    .user>>>.el-input__inner {
        text-align: center
    }

    .btns {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 1.2rem auto 2rem;
        flex-direction: column
    }
</style>
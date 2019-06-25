<template>
  <div class="container">
    <el-form ref="form" class="form" label-width="80px">
      <div class="usericon userIconBorder" v-if="imgUpdate"
        :style="{background: `url(${global.getUserIcon()}) center center/cover no-repeat` }">
        <input type="file" class="cursorPointer" title="请选择图片更改头像" id="userIcon" accept="image/*" @change="changeHead">
        <div class="comIcon cam cursorPointer">&#xe6f0;</div>
      </div>
      <div style="text-align:center;margin-bottom: 15px;">
        <img src="./../assets/img/wave.png" width="50px" alt="">
      </div>
      <el-form-item label="用户账号">
        <el-input v-model="userData.userId" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户组别">
        <el-input disabled style="width:100%;" :value="userData.isAdmin == 'true' ? '管理员用户':'普通用户' "></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model.lazy="userData.userName" clearable placeholder="请输入昵称" @change="onSubmit"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model.lazy="userData.userSex" @change="onSubmit">
          <el-radio label="男生"></el-radio>
          <el-radio label="女生"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-model.lazy="userData.userBorn" format="yyyy 年 MM 月 dd 日" default-value="1996-01-01"
          @change="onSubmit" clearable editable size="small" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" style="width:100%" @click.native="changePass">修改密码</el-button>
      <el-button type="danger" plain @click="logout" style="margin-top:20px;margin-left:0;width:100%">退出登录</el-button>
      <appfoot style="margin-top:60px"></appfoot>
    </el-form>
  </div>

</template>

<script>
  import {
    getStorage,
    setStorage,
    setTime
  } from './../others/methods.js'

  export default {
    name: 'user',
    data() {
      return {
        userData: {},
        imgUpdate: true
      }
    },
    methods: {
      changeHead(e) {
        const para = new FormData();
        para.append('img', e.target.files[0]);
        para.append('userId', this.userData.userId);
        para.append('userPass', this.userData.userPass);
        para.append('method', 'changeHead');
        para.append('userIcon', this.userData.userIcon);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let msg = this.$message({
          message: '正在上传图片中,请稍候...',
          center: true,
          duration: 0
        })
        axios.post(this.$store.state.changeInfo, para, config)
          .then(response => {
            if (response.data.code === 200) {
              this.$message({
                message: response.data.msg,
                type: 'success',
                center: true
              })
              setStorage('userIcon', this.$store.state.srcCom + 'nav/' + response.data.userIcon);
              setTimeout(() => {
                window.location.reload()
              }, 10)
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error',
                center: 'true'
              })
            }
            msg.close();
          })
      },
      logout() {
        this.$confirm('你确定要注销登录吗？', {
            confirmButtonText: '确 定',
            cancelButtonText: '取 消',
            // type: 'error',
            confirmButtonClass: 'el-button--danger'
          })
          .then(() => {
            this.$store.dispatch('logOut');
            this.$router.push('/login')
          })
      },
      changePass() {
        this.$prompt('请输入现在的密码', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({
          value
        }) => {
          if (value == this.userData.userPass) {
            this.$prompt('请输入新的密码', '提示信息', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({
              value
            }) => {
              axios({
                url: this.$store.state.changeInfo,
                method: 'post',
                data: {
                  userId: getStorage('userId'),
                  userPass: getStorage('userPass'),
                  method: 'changePass',
                  newPass: value
                }
              }).then(res => {
                if (res.data.code == 200) {
                  this.$message({
                    type: 'success',
                    message: '密码修改成功,请重新登录!',
                    center: true
                  });
                  this.$store.dispatch('logOut');
                  this.$router.push('/login');
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg,
                    center: true
                  });
                }
              })
            })
          } else {
            this.$message({
              type: 'error',
              message: '密码错误',
              center: true
            });
          }
        })
      },
      onSubmit() {
        if (!/^[\D]{2,15}$/.test(this.userData.userName)) {
          this.$message({
            message: '昵称格式长度为2-15位,不能含有数字',
            type: 'error',
            center: true,
            duration: 4000
          });
          return false;
        }
        axios({
          method: 'post',
          url: this.$store.state.changeInfo,
          data: {
            userId: getStorage('userId'),
            userPass: getStorage('userPass'),
            method: 'changeAll',
            userName: this.userData.userName,
            userBorn: this.userData.userBorn,
            userSex: this.userData.userSex,
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: 'success',
              message: res.data.msg,
              center: true
            });
            setStorage('userName', this.userData.userName);
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg,
              center: true
            })
          }
        })
      }
    },
    mounted() {
      this.$store.dispatch('checkLoginIn');
      if (this.$store.state.isLogin) {
        axios({
          method: 'post',
          url: this.$store.state.login,
          data: {
            userId: getStorage('userId'),
            userPass: getStorage('userPass'),
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.userData = res.data.userData;
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg,
              center: true
            })
            this.$store.dispatch('logOut');
            this.$router.push('/login')
          }
        }).catch(res => {
          this.$message({
            type: 'error',
            message: "连接服务器失败",
            center: true
          })
        })
      } else {
        this.$message('你还未登录,请先登录!')
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>
  .cam {
    text-align: center;
    bottom: 0;
    position: absolute;
    border-radius: 100px;
    width: 14px;
    right: 5px;
    height: 14px;
    color: #acaaaa;
    transform: scale(.7);
  }

  .container {
    width: 100%;
    margin: 0 auto;
    min-height: calc(100vh - 55px);

    background: rgba(255, 255, 255, .8);
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .form {
    padding: 40px;
    max-width: 500px;
    margin: 0 auto;
    height: fit-content;
    width: 100%;
  }

  .usericon {
    width: 60px;
    height: 60px;
    margin: 10px auto 10px;
    position: relative;
    border-radius: 100px;
    border: 1px solid rgba(158, 158, 158, 0.15);
    transform: scale(1.2);
  }

  .usericon input {
    display: block;
    width: 60px;
    height: 60px;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0
  }

  .el-input {
    width: 100%;

  }

  .el-input>>>input {
    text-align: center
  }

  .container>>>.el-form-item__content {
    text-align: center
  }
</style>
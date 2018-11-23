<template>
  <div class="login">
    <div class="form">
      <div class="title">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
      <div class="content iconfont">
        <div><el-input placeholder="请输入用户名" @keyup.enter.native="onLogin" prefix-icon="icon-phone" v-model="login.account"></el-input></div>
        <div><el-input placeholder="请输入密码" @keyup.enter.native="onLogin" type="password" prefix-icon="icon-pwd"  v-model="login.password"></el-input></div>
        <div class="code">
          <el-input placeholder="请输入验证码" @keyup.enter.native="onLogin" v-model="login.code"></el-input>
          <img :src="codeSrc" @click="getCode()" alt="点击获取">
        </div>
        <el-row style="text-align: center">
          <el-button type="danger" @click="login.account='';login.password=''">重置</el-button>
          <el-button type="primary" :loading="isSubmit" @click="onLogin">登录</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      codeSrc: '',
      isSubmit: false,
      login: {
        account: '',
        password: '',
        code: ''
      }
    }
  },
  methods: {
    onLogin () {
      this.isSubmit = true
      this.$api['authLogin'](this.login).then(res => {
        this.setLocalStorage('user', res)
        // 获取当前用户的权限，如果不需要的话可以去除掉
        this.$api['authPermissionList']().then(res => {
          const auth = Object.keys(res).filter(val => res[val] === '1')
          window.$variable.vm.$auth = auth
          this.setLocalStorage('auth', auth)
          this.$router.push('/welcome')
        })
      }).catch(e => {
        this.login.code = ''
        this.getCode()
        this.isSubmit = false
      })
    },
    getCode () {
      this.$api['authVerificationCode']().then(res => {
        this.codeSrc = res
        this.code = ''
      })
    }
  },
  created () {
    this.getCode()
  }
}
</script>
<style scoped>
  .login .content >>> i.icon-phone,
  .login .content >>> i.icon-pwd {
    font-style: normal;
    font-size: 18px;
  }
</style>

<style lang="scss" scoped>
.login{
  background: url('/static/img/login/bg2.jpg');
  background-size: 100% 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  p{
    margin: 15px 0;
  }
  .form{
    right: 0;
    top: 50%;
    left: 0;
    bottom: 0;
    margin: auto;
    border-radius: 2px;
    width: 30%;
    min-width: 350px;
    max-width: 420px;
    position: absolute;
    height: 300px;
    margin-top: -150px;
    background: rgba(0, 0, 0, .5);
    padding: 5px;
    border-radius: 5px;
    .title{
      color: #E3E1E2;
      text-align: center;
      font-size: 35px;
      height: 50px;
      font-family: '微软雅黑';
      line-height: 50px;
      text-shadow: 0 1px 1px rgba(255,255,255,1),
               0 -1px 1px rgba(0,0,0,.8);
      user-select: none;
    }
    .content>div{
      margin-bottom: 15px;
    }
    .code{
      display: flex;
      input{
        width: 70%;
      }
      img{
        cursor: pointer;
        margin-left: 5px;
        border-radius: 5px;
      }
    }
    .content{
      padding: 10px;
    }
  }
}
</style>

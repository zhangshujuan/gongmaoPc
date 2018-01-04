<template>
<el-row class="container">
    <header class="header01">
      <div class="header-inner">
        <div class="header_left">
          <img src="/static/part1_01_logo.png"/>
          <span>工猫管家</span>
        </div>
        <div class="header_right">
          <ul>
              <li v-for="item in items" v-bind:class="item.className" >
                <router-link :to="{path : item.path}">
                    {{ item.title }}
                </router-link>
              </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="login-area">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <img src="/static/part1_02_login_logo.png" class="logo"/>
            <el-form-item prop="account">
              <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="请输入手机号/邮箱">
                <template slot="prepend"><img src="/static/part1_02_user.png"/></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入密码">
                <template slot="prepend"><img src="/static/part1_02_psd.png"/></template>
              </el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            </el-form-item>
            <a class="forget-psd" @click="forgetPsd">忘记密码</a>
        </el-form>
    </div>
    <el-col :span="24" class="footer clearfix">
        <footer class="clearfix footer">
            <div class="pull-left">Copyright 2016.All rights reserved</div>
            <div class="pull-right">客服电话：<span>400-255-2365</span>邮箱：support@gongmao.com</div>
        </footer>
    </el-col>
</el-row>
</template>

<script>
  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true,
        items : [
          {
            title : '新闻资讯',
            className : 'm-r',
            path : "news"
          },
          {
            title : '登录',
            path : "login"
          }
        ]
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { account: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(res => {
              this.logining = false;
              //NProgress.done();
              let { msg, code, data } = res;
              if (code !== 0) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                localStorage.setItem('user', JSON.stringify(data.name));
                localStorage.setItem('sid',data.sid);
                localStorage.setItem('token',data.token);
                localStorage.setItem("account",this.ruleForm2.account);
                this.$router.push({ path: '/index' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      forgetPsd : function() {
        this.$router.push("/forgetpsd");
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-area{
    position : relative;
    height : 100%;
    width : 100%;
    background : url("/static/part1_02_login_bg.png") no-repeat 0 0;
    background-size :cover;
    a{
        font-size:10px;
        color : #28aaf8;
    }
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    height:30%;
    //height:220px;
    width:25%;
    min-width:260px;
    max-width:370px;
    min-height:275px;
    padding:60px 17px 17px 17px;
    background: rgba(245,245,243,0.7);
    border: 1px solid #dbd2dd;
    position : absolute;
    top:115px;
    left : 66.5%;
    img.logo{
        position : absolute;
        top : -40px;
        left : 50%;
        margin-left : -40px;
    }
    .forget-psd{
        position : absolute;
        bottom : 5%;
        cursor : pointer;
    }
  }

  .el-form-item {
       margin-bottom: 30px;
  }

  .el-input-group__prepend{
    img{
        height : 15px;
        max-width:14px;
    }
  }




</style>

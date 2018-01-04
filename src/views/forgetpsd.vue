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
        <div class="psd-area">
            <h2>忘记密码</h2>
            <div class="first-step" v-if="seen01">
                <el-form>
                    <el-input v-model="email" placeholder="请输入您绑定的邮箱" v-on:input="checkStatus">
                        <template slot="prepend">邮&nbsp;&nbsp;&nbsp;&nbsp;箱</template>
                    </el-input>
                    <el-input v-model="graphcode" placeholder="请输入图形码" class="graphcode" v-on:input="checkStatus">
                        <template slot="prepend">图形码</template>
                        <template slot="append" class="temp"><img src=http://wwwtest.gongmall.com/privateapi/forgetpsd/checkCode @click="getCheckCode()" id="comfirm_img"/></template>
                    </el-input>
                    <el-input v-model="confirmcode" placeholder="请输入验证码" class="confirmcode" v-on:input="checkStatus">
                        <template slot="prepend">验证码</template>
                    </el-input>
                    <span v-bind:class="{'getConfirm' : true , 'not-allowed' : isNotAllowed}" v-on:click="getConfirmCode">{{getConfirm}}</span>
                    <el-button type="primary" :disabled=isdisabled v-on:click="goNext">下一步</el-button>
                </el-form>
                <p class="toolbtn">
                    <span v-on:mouseenter="tooltipsShow" v-on:mouseleave="tooltipsHide">收不到验证码?</span>
                </p>
                <div class="tooltip" v-if="tooltipstatus" v-on:mouseenter="tooltipsShow">
                    <span v-on:click="tooltipsHide">X</span>
                    <p>请联系工猫客服</p>
                    <p class='phonenumber'>400-000-0000</p>
                    <p>致电工猫客服，提供必须的信息后，可找回登录密码</p>
                </div>
            </div>
            <div class="second-step" v-if="seen02">
                <el-form>
                    <el-input v-model="newpsd" type="password" placeholder="请输入新密码" v-on:input="checkPsd">
                        <template slot="prepend">新密码</template>
                    </el-input>
                    <el-input v-model="confirmnewpsd" type="password" placeholder="请确认输入的新密码" v-on:input="checkPsd">
                        <template slot="prepend">确认密码</template>
                    </el-input>
                    <el-button type="primary" :disabled=isDoneDisabled v-on:click="resetPassword">完成</el-button>
                </el-form>
            </div>
        </div>
        <footer class="clearfix">
             <div class="pull-left">Copyright 2016.All rights reserved</div>
             <div class="pull-right">客服电话：<span>400-255-2365</span>邮箱：support@gongmao.com</div>
        </footer>
    </el-row>
</template>

<script>
    import { checkCode , sendCheckCodeEmail , checkEmailCode , resetPassword } from "../api/api";
    export default {
        name : 'app',
        data() {
          return {
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
            ],
            seen01 : true,
            seen02 : false,
            email : '',
            confirmcode : '',
            graphcode : '',
            newpsd : '',
            confirmnewpsd : '',
            tooltipstatus : false,
            getConfirm : '获取验证码',
            isNotAllowed : false,
            isdisabled : true,
            isDoneDisabled : true,
            imgSrc : "",
            imageCodeId : ""
          }
        },
        methods : {
            tooltipsShow : function() {
                clearTimeout(timer);
                var _this = this;
                var timer = setTimeout(function() {
                    _this.tooltipstatus = true;
                },200);
            },
            tooltipsHide : function() {
                clearTimeout(timer);
                var _this = this;
                var timer = setTimeout(function() {
                    _this.tooltipstatus = false;
                },200);
            },
            getConfirmCode : function() {
                let _this = this;
                let email = _this.email;
                let imageCodeId = _this.imageCodeId;
                let imageCode = _this.graphcode;
                let params = { email : email , imageCodeId : imageCodeId , imageCode : imageCode };
                if(!_this.isNotAllowed) {
                    let i = 60;
                    var timer = setInterval(function() {
                        --i;
                        _this.getConfirm = i + "秒后重试";
                        _this.isNotAllowed = true;
                        if(i == 0) {
                            clearInterval(timer);
                            _this.getConfirm = "获取验证码";
                            _this.isNotAllowed = false;
                        }
                    },1000);
                    sendCheckCodeEmail(params).then(res => {
                        if (res.code !== 0) {
                            _this.$message({
                              message: res.msg,
                              type: 'error'
                            });
                            clearInterval(timer);
                            _this.isNotAllowed = false;
                            _this.getCheckCode();
                        }else if(res.code == 0){
                            _this.$message({
                              message: "验证发送成功，请及时查看邮箱",
                              type: 'success'
                            });
                        }
                    })
                }else{
                    return false;
                }
            },
            checkStatus : function() {
                //三个输入框均有内容,按钮可点
                if(this.email != "" && this.confirmcode != "" && this.graphcode != "") {
                    this.isdisabled = false;
                }else{
                    this.isdisabled = true;
                    return false;
                }
            },
            goNext : function() {
                //下一步
                //后台验证邮箱，验证码，图形码
                //后台验证通过之后，跳到下个模块
                let email = this.email;
                let emailCode = this.confirmcode;
                let params = { email : email , emailCode : emailCode };
                checkEmailCode(params).then(res => {
                    if(res.code == 0) {
                        this.seen01 = false;
                        this.seen02 = true;
                    }else{
                        this.$message({
                          message: res.msg,
                          type: 'error'
                        });
                    }
                })
            },
            checkPsd : function() {
                if(this.newpsd != "" && this.confirmnewpsd != "") {
                    this.isDoneDisabled = false;
                }else{
                    this.isDoneDisabled = true;
                }
            },
            resetPassword : function() {
                let email = this.email;
                let password1 = this.newpsd;
                let password2 = this.confirmnewpsd;
                let params = { email : email , password1 : password1 , password2 : password2 };
                resetPassword(params).then(res => {
                    if(res.code != 0) {
                        this.$message({
                          message: res.msg,
                          type: 'error'
                        });
                    }else{
                        this.$message({
                          message: "密码修改成功",
                          type: 'success'
                        });
                        let _this = this;
                        setTimeout(function(){
                            _this.$router.push("/login");
                        },3000);
                    }
                })
            },
            getCheckCode : function(){
                let confirmImg = document.getElementById("comfirm_img");
//                let imageCodeId = this.imageCodeId;
//                let params = { imageCodeId : imageCodeId };
//                checkCode(params).then(res => {
//                    let start = res.indexOf("codeId");
//                    let length = res.length;
//                    console.log(res)
//                    this.imageCodeId = res.substring(start+7,length);
////                    this.imgSrc = res.substring(0,start);
//                    this.imgSrc = res;
////                    confirmImg.src = res.substring(0,start);
//                })
                confirmImg.src = "http://wwwtest.gongmall.com/privateapi/forgetpsd/checkCode?" + new Date();
            }
        },
        mounted() {
//            this.getCheckCode();
        }
    }
</script>

<style lang="scss">
    @import "../styles/base/common.scss";
    @import "../styles/base/flex.scss";
    @import "../styles/base/table.scss";
    @import "../styles/gongmaoIndex.less";
    @import "../styles/psd-area.scss";
    footer{
          background: #222b36;
          padding: 0px 65px 0px 89px;
          height: 60px;
          div {
              color: #fff;
              line-height: 60px;
          }
          span {
              font-size: 16px;
              color: #fff;
              margin-right: 55px;
          }
     }
</style>
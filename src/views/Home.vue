<template>
	<el-row class="container">
		<header class="header01">
          <div class="header-inner">
            <div class="header_left">
              <img src="/static/part1_01_logo.png"/>
              <span>工猫管家</span>
            </div>
            <div class="header_right">
              <ul v-if="noStorage">
                <li v-for="item in items" v-bind:class="item.className" >
                  <router-link :to="{path : item.path}">
                      {{ item.title }}
                  </router-link>
                </li>
              </ul>
              <ul v-if="hasStorage" class="already-login">
                  <li class="user-name">你好,{{sysUserName}}</li>
                  <li class="btn-logout" @click="btnLoginOut">退出</li>
              </ul>
            </div>
          </div>
        </header>
		<el-col :span="24" class="main-content">
			<aside class="leftnav" v-loading="listLoading">
                <el-menu :default-active="navselected" :active="navselected" @select="selectItems" class="el-menu-vertical-demo leftnav" unique-opened router>
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''">
                            <template slot="title">{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path" v-if="!child.hidden" :style="child.bg" :class="child.iconCls"><i class="icon"></i>{{child.name}}</el-menu-item>
                        </el-submenu>
                    </template>
                </el-menu>
			</aside>
			<section class="content-container main">
                <el-col :span="24" class="content-wrapper">
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </el-col>
			</section>
		</el-col>
        <el-col :span="24" class="footer clearfix">
            <footer class="clearfix footer">
                <div class="pull-left">Copyright 2016.All rights reserved</div>
                <div class="pull-right">客服电话：<span>400-255-2365</span>邮箱：support@gongmao.com</div>
            </footer>
        </el-col>
	</el-row>
</template>

<script>
    import { requestLogout , userprivileges ,unreadNumber } from '../api/api';
    export default {
        data () {
            return {
                listLoading: false,
                noStorage : "true",
                hasStorage : "false",
                sysUserName : "",
                navselected:"/index",
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
            }
        },
        methods:{
          getTitleHref: function (val) {
            return val
          },
          judgeStorage : function() {
            if(localStorage.getItem("user")) {
                 this.noStorage = false;
                  this.hasStorage = true;
                  this.sysUserName = JSON.parse(localStorage.getItem("user"));
             }else{
                this.noStorage = true;
                this.hasStorage = false;
             }
          },
          getUserprivileges : function() {
              this.listLoading = true;
              let _arr = this.$router.options.routes;
              unreadNumber().then(res => {
                  if(res.data != 0) {
                      _arr[11].name = "信息管理(" + res.data + ")";
                      _arr[11].children[1].name = "系统通知(" + res.data + ")";
                  }else if(res.data == 0) {
                      _arr[11].children[1].name = "系统通知";
                  }
              })
              userprivileges().then(res => {
                  if(res.code == 0 && res.data.roleId != 0 && res.data.privilegeIds.length != 8) {
                    //有权限无法显示
                    if(res.data.privilegeIds.indexOf(1) == -1) {
                        _arr[5].children[0].hidden = true;
                    }
                    if(res.data.privilegeIds.indexOf(2) == -1) {
                        _arr[5].children[1].hidden = true;
                    }
                    if(res.data.privilegeIds.indexOf(3) == -1) {
                        _arr[5].children[2].hidden = true;
                    }
                    if(res.data.privilegeIds.indexOf(1) == -1 && res.data.privilegeIds.indexOf(2) == -1 && res.data.privilegeIds.indexOf(3) == -1) {
                        _arr[5].hidden = true;
                    }
                    if(res.data.privilegeIds.indexOf(4) == -1) {
                        _arr[10].hidden = true;
                    }
                    if(res.data.privilegeIds.indexOf(5) == -1) {
                        _arr[11].children[0].hidden = true;
                    }
                    if(res.data.privilegeIds.indexOf(6) == -1) {
                        _arr[11].children[1].hidden = true;
                    }
                    if(res.data.privilegeIds.indexOf(5) == -1 && res.data.privilegeIds.indexOf(6) == -1) {
                        _arr[11].hidden = true;
                    }
                    if(res.data.privilegeIds.indexOf(7) == -1) {
                        _arr[16].children[1].hidden = true;
                    }
                    if(res.data.privilegeIds.indexOf(8) == -1) {
                        _arr[16].children[2].hidden = true;
                    }
                  }
                  this.listLoading = false;
              })
          },
          btnLoginOut : function() {
            requestLogout().then(res => {
                console.log(res)
            })
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("sid");
            localStorage.removeItem("account");
            window.location.reload();
            this.$router.push("/");
          },
          getNavType(){
                this.navselected=this.$store.state.adminleftnavnum;
                //store.state.adminleftnavnum里值变化的时候，设置navselected
          },
          selectItems(index){
                this.$store.state.adminleftnavnum=index;
                //按钮选中之后设置当前的index为store里的值。
          }
        },
        mounted() {
            this.judgeStorage();
            this.getUserprivileges();
        },
        watch: {
            // 监测store.state
            '$store.state.adminleftnavnum': 'getNavType'
        }
    }
</script>

<style scoped lang="scss">
	/*@import '../styles/base/common.scss';*/
</style>
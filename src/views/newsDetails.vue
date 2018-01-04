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
                        <li v-for="item in items" v-bind:class="item.className">
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
        <div class="news-details" v-loading="listLoading">
            <nav class="common-title">
                <router-link class="common-title" :to="{path:'index'}">首页</router-link>
                &nbsp;&nbsp;>&nbsp;&nbsp;
                <router-link class="common-title" :to="{path:'news'}">新闻资讯</router-link>
            </nav>
            <div class="information-area">
                <p class="title">{{detail.title}}</p>
                <p class="time">{{detail.publishTime}}</p>
                <img v-bind:src="detail.titleImage" v-if="detail.titleImage" class="news-logo"/>
                <p class="content">{{detail.content}}</p>
            </div>
        </div>
        <footer class="clearfix">
            <div class="pull-left">Copyright 2016.All rights reserved</div>
            <div class="pull-right">客服电话：<span>400-255-2365</span>邮箱：support@gongmao.com</div>
        </footer>
    </el-row>
</template>

<script>
    import util from '../common/js/util'
    import {getNewsDetails, requestLogout} from '../api/api';
    export default {
        name: 'app',
        data() {
            return {
                listLoading: false,
                noStorage: "true",
                hasStorage: "false",
                sysUserName: "",
                items: [
                    {
                        title: '新闻资讯',
                        className: 'm-r',
                        path: "news"
                    },
                    {
                        title: '登录',
                        path: "login"
                    }
                ],
                detail: {
                    title: "",
                    publishTime: "",
                    titleImage: "",
                    content: ""
                }
            }
        },
        methods: {
            getNewsDetails: function () {
                this.listLoading = true;
                let newsId = this.$route.query.id;
                let params = {newsId: newsId};
                getNewsDetails(params).then(res => {
                    this.detail = res.data;
                this.listLoading = false;
            })
                ;
            },
            judgeStorage: function () {
                if (localStorage.getItem("user")) {
                    this.noStorage = false;
                    this.hasStorage = true;
                    this.sysUserName = JSON.parse(localStorage.getItem("user"));
                } else {
                    this.noStorage = true;
                    this.hasStorage = false;
                }
            },
            btnLoginOut: function () {
                requestLogout().then(res => {
                    console.log(res)
                })
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("sid");
                this.$router.push("/");
            }
        },
        mounted() {
            this.getNewsDetails();
            this.judgeStorage();
        }
    }
</script>

<style lang="scss">
    /*@import "../styles/base/common.scss";*/
    /*@import "../styles/base/flex.scss";*/
    /*@import "../styles/base/table.scss";*/
    /*@import "../styles/gongmaoIndex.less";*/
    /*@import "../styles/news.scss";*/

    /*footer {*/
        /*background: #222b36;*/
        /*padding: 0px 65px 0px 89px;*/
        /*height: 60px;*/

    /*div {*/
        /*color: #fff;*/
        /*line-height: 60px;*/
    /*}*/

    /*span {*/
        /*font-size: 16px;*/
        /*color: #fff;*/
        /*margin-right: 55px;*/
    /*}*/

    /*}*/
</style>

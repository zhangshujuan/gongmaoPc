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
        <div class="exhibition">
            <div class="banner">
                <span v-for="banner in banners" v-bind:class="banner.className">{{banner.content}}</span>
                <button v-for="link in links"><a v-bind:href="getTitleHref(link.href)">{{ link.title }}</a></button>
            </div>
            <div class="intro">
                <div v-for="intro in intros" v-bind:class="intro.className">
                    <img v-bind:src="intro.imgSrc" class="intro-img"/>
                    <img v-bind:src="intro.imgNum" class="intro-num"/>
                    <img v-bind:src="intro.bg" class="intro-ad"/>
                    <span>{{intro.content}}</span>
                </div>
            </div>
            <div class="corporation">
                <div class="corporation-title">
                    <p class="chinese">合作客户</p>
                    <p class="english">Customer</p>
                </div>
                <div class="cor-company-logo">
                    <a v-for="cor in cors" v-bind:href="cor.href">
                        <img v-bind:src="cor.corCompany"/>
                    </a>
                </div>
            </div>
            <div class="corporation process">
                <div class="corporation-title">
                    <p class="chinese">合作流程</p>
                    <p class="english">Process</p>
                </div>
                <div class="process-flow">
                    <div v-for="flow in flows">
                        <img v-bind:src="flow.bgImg" class="bgImg"/>
                        <p class="flow-title">{{flow.title}}</p>
                        <p class="flow-content">{{flow.content}}</p>
                    </div>
                </div>
            </div>
            <div class="about">
                <ul v-for="about in abouts">
                    <li v-for="list in about.dataList" v-bind:class="list.className">
                        <a v-bind:href="list.href">{{list.title}}</a>
                    </li>
                </ul>
                <dl class="QRcode">
                    <dt><img src="/static/part1_01_QRcode.png"/></dt>
                    <dd>工猫管家公众号</dd>
                </dl>
            </div>
        </div>
        <footer class="clearfix">
            <div class="pull-left">Copyright 2016.All rights reserved</div>
            <div class="pull-right">客服电话：<span>400-255-2365</span>邮箱：support@gongmao.com</div>
        </footer>
    </el-row>
</template>

<script>
    import {base, requestLogout} from '../api/api';
    export default {
        name: 'app',
        data() {
            return {
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
                banners: [
                    {
                        content: '工猫管家',
                        className: "firstInfo"
                    },
                    {
                        content: 'Leader Of  Enterprise Financial Settlement',
                        className: "secondInfo"
                    },
                    {
                        content: '企业财税结算方案领导者',
                        className: "thirdInfo"
                    }
                ],
                links: [
                    {
                        title: '立即体验',
                        href: 'javascript:void(0)'
                    }
                ],
                intros: [
                    {
                        content: '语言能力的优势。女性运用语言词汇的能力强于男性，在语法、造句、阅读能力等方面更为出色。一般说来，女性从事文字整理、编辑、翻音员以及教育、接待洽谈工作等，更能发挥其特长。',
                        imgSrc: '/static/part1_01_advantege01_desc.png',
                        imgNum: '/static/part1_01_advantege01.png',
                        bg: '/static/ad.png',
                        className: 'firstIntro'
                    },
                    {
                        content: '语言能力的优势。女性运用语言词汇的能力强于男性，在语法、造句、阅读能力等方面更为出色。一般说来，女性从事文字整理、编辑、翻译、播音员以及教育、接待洽谈工作等，更能发挥其特长。',
                        imgSrc: '/static/part1_01_advantege02_desc.png',
                        imgNum: '/static/part1_01_advantege02.png',
                        bg: '/static/ad.png',
                        className: 'secondIntro'
                    },
                    {
                        content: '语言能力的优势。女性运用语言词汇的能力强于男性，编辑、翻译、播音员以及教育、接待洽谈工作等，更能发挥其特长。',
                        imgSrc: '/static/part1_01_advantege03_desc.png',
                        imgNum: '/static/part1_01_advantege03.png',
                        bg: '/static/ad.png',
                        className: 'thirdIntro'
                    }
                ],
                cors: [
                    {
                        href: 'javascript:void(0)',
                        corCompany: '/static/part1_01_corporation_01.png'
                    },
                    {
                        href: 'javascript:void(0)',
                        corCompany: '/static/part1_01_corporation_02.png'
                    },
                    {
                        href: 'javascript:void(0)',
                        corCompany: '/static/part1_01_corporation_03.png'
                    },
                    {
                        href: 'javascript:void(0)',
                        corCompany: '/static/part1_01_corporation_04.png'
                    },
                    {
                        href: 'javascript:void(0)',
                        corCompany: '/static/part1_01_corporation_05.png'
                    },
                    {
                        href: 'javascript:void(0)',
                        corCompany: '/static/part1_01_corporation_06.png'
                    },
                ],
                flows: [
                    {
                        bgImg: '/static/part1_01_progress_01.png',
                        title: '流程一',
                        content: '流程1的具体描述流程1的具体描述流程1的具体描述'
                    },
                    {
                        bgImg: '/static/part1_01_progress_02.png',
                        title: '流程二',
                        content: '流程1的具体描述流程1的具体描述流程1的具体描述'
                    },
                    {
                        bgImg: '/static/part1_01_progress_03.png',
                        title: '流程三',
                        content: '流程1的具体描述流程1的具体描述流程1的具体描述'
                    },
                    {
                        bgImg: '/static/part1_01_progress_04.png',
                        title: '流程四',
                        content: '流程1的具体描述流程1的具体描述流程1的具体描述'
                    }
                ],
                abouts: [
                    {
                        dataList: [
                            {
                                title: '关于工猫',
                                href: 'javascript:void(0)',
                                className: 'title'
                            },
                            {
                                title: '公司简介',
                                href: 'javascript:void(0)',
                                className: 'content'
                            },
                            {
                                title: '联系我们',
                                href: 'javascript:void(0)',
                                className: 'content'
                            }
                        ]
                    },
                    {
                        dataList: [
                            {
                                title: '友情链接',
                                href: 'javascript:void(0)',
                                className: 'title'
                            },
                            {
                                title: '百度',
                                href: 'javascript:void(0)',
                                className: 'content'
                            },
                            {
                                title: '腾讯',
                                href: 'javascript:void(0)',
                                className: 'content'
                            },
                            {
                                title: '淘宝',
                                href: 'javascript:void(0)',
                                className: 'content'
                            },
                            {
                                title: '天猫',
                                href: 'javascript:void(0)',
                                className: 'content'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            getTitleHref: function (val) {
                return val
            },
            judgeStorage: function () {
                if (localStorage.getItem("user")) {
                    this.noStorage = false;
                    this.hasStorage = true;
                    this.sysUserName = JSON.parse(localStorage.getItem("user"));
                    this.$router.push("/index");
                } else {
                    this.noStorage = true;
                    this.hasStorage = false;
                    //
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
            this.judgeStorage();
        }
    }
</script>

<style lang="scss">
    @import "../styles/base/common.scss";
    @import "../styles/base/flex.scss";
    @import "../styles/base/table.scss";
    @import "../styles/gongmaoIndex.less";
    @import "../styles/banner.less";
    @import "../styles/intro.less";
    @import "../styles/corporation.less";
    @import "../styles/process.less";
    @import "../styles/about.less";

    .exhibition {
        height: calc(100% - 135px);
        overflow-y: auto;
        width:100%;
    }

    footer {
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
    p {
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
    }

    dd {
        -webkit-margin-start: 0;
    }
</style>
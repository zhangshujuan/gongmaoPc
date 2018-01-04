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
            <div class="news-list"v-loading="listLoading">
                <nav class="common-title">
                    <router-link class="common-title" :to="{path:'index'}">首页</router-link>
                    &nbsp;&nbsp;>&nbsp;&nbsp;
                    <router-link class="common-title" :to="{path:'news'}">新闻资讯</router-link>
                </nav>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="title" label="名称">
                        <template scope="scope">
                            <router-link :to="{path : 'newsDetails', query: {id:scope.row.id}}">
                                <div class="default">{{scope.row.title}}</div>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" label="日期">
                        <template scope="scope">
                            <router-link to="{path : 'newsDetails', query: {id:scope.row.id}}">
                                <div class="default">{{scope.row.publishTime}}</div>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页条-->
                <el-col :span="24" class="toolbar">
                    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10"
                                   :total="total">
                    </el-pagination>
                </el-col>
            </div>
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
    import util from '../common/js/util'
    import {getNewsList, requestLogout} from '../api/api';
    export default {
        name: 'app',
        data() {
            return {
                listLoading: false,
                noStorage: "true",
                hasStorage: "false",
                sysUserName: "",
                pageNo: 1,
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
                listLoading: false,
                total: 50,
                tableData: [],
                detail: {
                    title: "关于调整手续费的通知",
                    time: "2011/02/02  18:02:03",
                    src: "/static/part1_10_bgimg.png",
                    content: "3月12日，十二届全国人大五次会议进入“两高报告”日。最高人民法院院长周强所作的法院工作报告中，由封面新闻-华西都市报率先关注的内蒙古农民王力军贩卖玉米案写入报告。周强在报告中指出，内蒙古法院依法再审改判王力军无证收购玉米案无罪，保障广大农民放心从事粮食收购，促进产品收购。封面新闻-华西都市报记者注意到，该案写入在报告的第一大部分的“认真贯彻新发展理念，服务保障经济社会持续健康发展”的“服务供给侧结构性改革”中。在报告附件二“报告有关用语和图示”中，还对“再审改判王力军无证收购玉米无罪”作了解释。最高法认为，指令再审该案并改判，对于明确非法经营罪的界限，防止非法经营罪的扩张滥用，促进粮食流通体制改革，具有重要意义。“我正在拖玉米的路上”3月12日，封面新闻-华西都市报记者连线内蒙古王力军。“我正在拖玉米的路上。最高法如此关注我的这件小案子，我心情非常开心和轻松。今后，我收购玉米更放心了，不再怕别人说我犯法了。”王力军获无罪后，他又开始重新从事收购玉米。截止目前，已收购玉米十多万斤，挣了三千多元了。"
                }
            }
        },
        methods: {
            getNewsList: function () {
                this.listLoading = true;
                let pageNo = this.pageNo;
                let params = {pageNo: pageNo};
                getNewsList(params).then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.page.total;
                    this.listLoading = false;
                });
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getNewsList();
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
                })
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("sid");
                this.$router.push("/");
            }
        },
        mounted() {
            this.getNewsList();
            this.judgeStorage();
        }
    }
</script>

<style lang="scss">
    /*@import "../styles/base/common.scss";*/
    /*@import "../styles/base/flex.scss";*/
    /*@import "../styles/base/table.scss";*/
    /*@import "../styles/gongmaoIndex.less";*/
    @import "../styles/news.scss";


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

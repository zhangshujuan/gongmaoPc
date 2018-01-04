<template>
    <section v-loading="listLoading">
        <div class="common-title">
            <router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
            <router-link class="common-title" :to="{path:'upload'}">上传工资单</router-link>
        </div>
        <div class="bg-white topcontent">
            <div class="block">
                <span class="demonstration">发薪月份</span>
                <el-date-picker
                        v-model="month"
                        type="month"
                        format="yyyy-MM"
                        @change="pickTime"
                        placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">工资单</span>
                <el-upload
                        class="upload"
                        action="/privateapi/finance/upload"
                        :data="{month}"
                        :show-file-list="false"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                >
                    <el-button style="margin-left: 0" v-if="isShow">立即上传</el-button>
                </el-upload>
                <a href="/privateapi/finance/templetDownload" style="color: #20a0ff;margin-left: 25px;" v-if="isShow">下载模板</a>
                <div class="fileName" v-if="isUploadSuccess">{{fileName}}</div>
            </div>
            <!--上传成功-->
            <div class="text-center" v-if="isUploadSuccess">
                <img src="/static/index/shangchuanchenggong.png" alt="" class="img">
            </div>
            <div class="text-center ft20" v-if="isUploadSuccess">上传成功！</div>
            <router-link :to="{path:'fastPayroll',query: {payrollId:id}}">
                <el-button type="text" v-if="isUploadSuccess" class="successRemark">查看详情</el-button>
            </router-link>
            <!--上传失败-->
            <div class="text-center" v-if="isUploadError">
                <img src="/static/index/shangchuanshibai.png" alt="" class="img">
            </div>
            <div class="text-center ft20" v-if="isUploadError">上传失败</div>
            <div class="remark text-center" v-if="isUploadError">{{errorInfo}}</div>
        </div>
        <div class="bg-white bottomcontent clearfix" v-if="isSubmit">
            <div class="pull-left">总人数：{{totalRecord}}人 / 总金额：￥{{totalMoney}}</div>
            <div class="pull-right">
                <el-button type="primary" v-if="showPay" :class="{'is-disabled': isdisabled == true}" @click="payroll">
                    发薪
                </el-button>
                <el-button type="primary" v-if="showSubmit" :class="{'is-disabled': isdisabled == true}"
                           @click="submit">提交
                </el-button>
            </div>
        </div>
        <div class="bg-white bottomcontent flex-a" v-if="!isBottomShow">
            <div class="flex-v-c left-text">
                发薪金额：￥{{money}}<br>
                手续费：￥{{taxAmount}}<br>
                总金额：￥{{totalMoney}}
            </div>
            <div class="flex-v-c">
                <div class="center-block">
                    <div class="ft12">请输入验证码</div>
                    <el-row :gutter="24">
                        <el-col :span="16">
                            <el-input v-model="content" size="small" placeholder="请输入验证码"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span :class="{'getConfirm' : true , 'not-allowed' : isNotAllowed}"
                                  v-on:click="getConfirmCode">{{getConfirm}}</span>
                        </el-col>
                    </el-row>
                    <div class="tip" v-if="isSend">已发送至您的手机({{phone}})</div>
                </div>
            </div>
            <div class="flex-v-c">
                <el-button type="danger" @click="confirm">确认发薪</el-button>
            </div>
        </div>
        <div class="text-center bg-white" v-if="isCommit">
            <el-steps :space="200" :active="3" style="padding-top: 60px;margin-top: 20px">
                <el-step title="提交成功"></el-step>
                <el-step title="正在发放"></el-step>
                <el-step title="发薪成功">
                </el-step>
            </el-steps>
            <div class="bg-white tipcontent">
                <div class="content">
                    <div class="top-text">提交成功</div>
                    <router-link :to="{path:'fastPayroll',query: {payrollId:id}}">
                        <el-button type="text">查看详情</el-button>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import Vue from 'vue'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'
    import {Loading} from 'element-ui';
    import {templetDownload, beforeUpload, submitPayroll,sendSms,pay} from '../../api/api';
    Vue.use(ElementUI)
    export default {
        data() {
            return {
                listLoading: false,
                month: "2017-01",
                loading: true,
                isShow: true,
                isUploadError: false,
                isdisabled: true,
                isUploadSuccess: false,
                errorInfo: "",
                fileName: "",
                id: "",
                showPay: "",
                showSubmit: "",
                totalRecord: 0,
                totalAmount: 0,
                isSubmit: true,
                isBottomShow: true,
                isCommit:false,
                money:0,
                totalMoney:0,
                taxAmount:0,
                content:"",
                getConfirm : '获取验证码',
                isNotAllowed : false,
                phone:"0",
                isSend:false

            }
        },
        methods: {
            handleSuccess(response, file, fileList) {
                if (response.code == 0) {
                    this.isUploadSuccess = true;
                    this.isShow = false;
                    this.fileName = file.name;
                    this.id = response.data.payrollId;
                    this.isdisabled = false;
                    this.isUploadError = false;
                    this.totalMoney = response.data.totalMoney;
                    this.money = response.data.money;
                    this.taxAmount = response.data.taxAmount;
                    this.totalRecord = response.data.totalRecord;
                } else {
                    this.isUploadError = true;
                    this.errorInfo = response.msg;
                }
            },
            handleError(){
                console.log("error");
            },
            handleRemove(file, fileList) {
                this.isShow = true;
            },
            handlePreview(file) {
                console.log(file.response);
            },
            beforeAvatarUpload(file) {
                let _name = file.name.substring(file.name.length-4,file.name.length);
                const isXLS = _name == ".xls";
                if (!isXLS) {
                    this.$message.error('上传文件只能是xls 格式!');
                }
                return isXLS;
            },
            getConfirmCode: function () {
                var _this = this;
                if (_this.getConfirm == '获取验证码') {
                    sendSms().then(res => {
                        console.log(res);
                        this.isSend = true;
                    })
                    let i = 60;
                    var timer = setInterval(function () {
                        --i;
                        _this.getConfirm = i + "秒后重试";
                        _this.isNotAllowed = true;
                        if (i == 0) {
                            clearInterval(timer);
                            _this.getConfirm = "获取验证码";
                            _this.isNotAllowed = false;
                        }
                    }, 1000)
                } else {
                    return false;
                }
            },
            confirm: function () {
                let params = {
                    payrollId: this.id,
                    content: this.content
                };
                pay(params).then(res => {
                    if (res.code == 0) {
                        this.$router.push({
                            path: '/fastPayrollSuccess',
                            query: {payrollId: this.id}
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }

                });
            },
            pickTime(val){
                this.month = val;
            },
            beforeLoad(){
                this.listLoading = true;
                beforeUpload().then(res => {
                    this.showPay = res.data.showPay;
                    this.showSubmit = res.data.showSubmit;
                    this.listLoading = false;
                })
            },
            payroll: function () {
                if(this.isdisabled == false){
                    this.isSubmit = false;
                    this.isBottomShow = false;
                }
            },
            submit: function () {
                if(this.isdisabled == false) {
                    let params = {
                        payrollId: this.id
                    };
                    submitPayroll(params).then(res => {
                        if (res.code == 0) {
                            this.isCommit = false;
                        }

                    });
                }
            }
        },
        mounted: function () {
            //this.download();
            //this.fileUpload();
            this.beforeLoad();
            this.$store.state.adminleftnavnum="/upload";
            this.phone = localStorage.getItem("account");
        }
    }

</script>

<style scoped lang="scss">
    @import '../../styles/payroll.scss';
    .pull-right{
        .el-button--primary{
            margin-bottom: 0px !important;
        }
    }
    .img {
        margin: 40px 0px 30px 0px;
        display: inline-block;
    }

    .ft20 {
        font-size: 20px;
    }

    .remark {
        font-size: 15px;
        color: #999;
        margin: 35px 0px 80px 0px;
    }

    .successRemark {
        margin: 80px 0px 45px 0px;
        text-align: center;
        width: 100%;
    }

    .upload {

    .el-upload-list {
        display: inline-flex;
        margin-left: 20px !important;
    }

    }
    .text-center {
        position: relative;
    }


    .status {
        margin-left: 230px;
        width: 200px;

    div {
        width: 100%;

    &
    :first-child {
        margin-bottom: 10px;
    }

    span {
        color: #999;
    }

    }
    }
    .tipcontent {
        padding: 25px 0px;
        margin-bottom: 100px;
        width: 350px;
        position: relative;
        margin-left: calc(50% - 300px);

    &
    :after {
        content: "";
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
        /*我们一般根据方向来写三角形，这样容易记忆；箭头指向的反方向的颜色设置为你想要的，然后箭头方向不要写，另外两个方向的颜色设置为transperent透明*/
        position: absolute;
        top: -10px;
        left: 50px;
        margin-left: -10px;
    }

    &
    :before {
        content: "";
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 12px solid #ddd;
        position: absolute;
        top: -12px;
        /*写个三角形，沉在箭头下边，颜色设置成边框颜色，位置比箭头稍高一些（容器边框宽度值），就可以了*/
        left: 48px;
        margin-left: -10px;
        z-index: 0;
    }

    .top-text {
        font-size: 26px;
    }

    .col-999 {
        color: #999;
    }

    .ft26 {
        font-size: 26px;
        color: #f15a24;
        margin-bottom: 30px;
    }

    }

</style>
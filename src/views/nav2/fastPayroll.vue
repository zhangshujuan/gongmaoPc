<template>
	<section v-loading="listLoading">
		<div class="common-title">
			<router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'fastPayrollList'}">一键发薪</router-link>
		</div>
		<div class="bg-white topcontent">
			<div class="block">
				<span class="demonstration">发薪月份</span>
				<el-date-picker
						v-model="createDate"
						type="month"
						format="yyyy-MM"
						@change="pickTime"
						placeholder="选择日期时间" disabled>
				</el-date-picker>
			</div>
			<div class="block">
				<span class="demonstration wd120">工资单</span>
				<span class="demonstration" v-if="isShow">总记录</span>
			</div>
			<div class="block">
				<span class="filename wd120">{{originalFileName}}</span>
				<span class="fileinfo" v-if="isShow">{{totalRecord}}条（成功：{{successRecord}}条 / 失败：{{failRecord}}条）</span>
				<a :href="getHref(id)" v-if="isShow && failRecord != 0" style="color: #20a0ff;margin-left: 25px;">下载失败记录</a>
<!--
				<a v-if="status == '待发放' || status == '上传'" @click="revoke" class="el-button el-button&#45;&#45;danger" :class="className" :type="type" :style="fontsize">{{btntext}}</a>
-->				<el-button v-if="status == '发放成功' || status == '发放失败'|| status == '发放中' || status == '已撤销'" class="pull-right" :class="{ warning: status == '待发放',success: status == '发放中',default: status == '发放成功',danger: status == '发放失败',primary: status == '已撤销'}"type="text" style="font-size: 20px;margin-top: -50px;">{{status}}</el-button>
				<el-button :class="className" :type="type" :style="fontsize" @click="revoke" v-if="showRevoke">{{btntext}}</el-button>
		</div>
			<!--<div class="block" v-if="status == '发送成功' || status == '发送失败' || status == '发送中'">
				<span class="filename wd120">3月工资单.xls</span>
				<el-button class="success pull-right" type="text" style="font-size: 20px;margin-top: -50px;">{{status}}</el-button>
			</div>-->
			<el-table
					:data="tableData"
					style="width: 100%">
				<el-table-column
						prop="name"
						label="姓名">
				</el-table-column>
				<el-table-column
						prop="mobile" label="手机号" width="155">
				</el-table-column>
				<el-table-column
						prop="totalSalary" label="工资总数" >
				</el-table-column>
				<el-table-column
						prop="fee" label="管理费">
				</el-table-column>
				<el-table-column
						prop="originalSalary" label="应发工资">
				</el-table-column>
				<el-table-column
						prop="tax" label="个税">
				</el-table-column>
				<el-table-column
						prop="incomeAmount" label="实发工资">
				</el-table-column>
				<el-table-column
						prop="createDate"
						label="导入时间"
						width="200"
				>
				</el-table-column>
			</el-table>
			<div class="clearfix">
				<!--分页条-->
				<el-col :span="24" class="toolbar">
					<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total">
					</el-pagination>
				</el-col>
			</div>
		</div>
		<div class="tipText" v-if="isSubmit">批次号：{{batchNumber}}</div>
		<div class="bg-white bottomcontent clearfix" v-if="isSubmit">
			<div class="pull-left">总人数：{{successRecord}}人   /   总金额：￥{{totalMoney}}</div>
			<div class="pull-right" v-if="isShow">
				<el-button v-if="showPay" type="danger" @click="payroll">发薪</el-button>
				<el-button v-if="showSubmit" type="danger" @click="submit">提交</el-button>
			</div>
		</div>
		<div class="bg-white bottomcontent flex-a" v-if="!isBottomShow">
			<div class="flex-v-c left-text">
				发薪金额：￥{{money}}<br>
				手续费：￥{{totalFee}}<br>
				总金额：￥{{totalMoney}}
			</div>
			<div class="flex-v-c">
				<div class="center-block">
					<div class="ft12">请输入验证码</div>
					<el-row :gutter="24">
						<el-col :span="16"><el-input v-model="content" size="small" placeholder="请输入验证码"></el-input></el-col>
						<el-col :span="8">
							<span :class="{'getConfirm' : true , 'not-allowed' : isNotAllowed}" v-on:click="getConfirmCode">{{getConfirm}}</span>
						</el-col>
					</el-row>
					<div class="tip" v-if="isSend">已发送至您的手机({{phone}})</div>
				</div>
			</div>
			<div class="flex-v-c"><el-button type="danger" @click="confirm">确认发薪</el-button></div>
		</div>
	</section>
</template>
<script>
    import Vue from 'vue'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'
    import { Loading } from 'element-ui';
    import { payrollDetail,revoke,submitPayroll,sendSms,pay} from '../../api/api';
    Vue.use(ElementUI)
    export default {
        data() {
            return {
                listLoading: false,
                value1:"",
                loading: true,
                isShow:true,
                type:"danger",
				btntext:"撤销发薪",
                className:"pull-right",
                fontsize:"font-size:12px",
                tableData: [],
                totalRecord:"0",
                successRecord:"0",
                failRecord:"0",
                originalFileName:"0",
                money:"0",
                batchNumber:"0",
                createDate:"2017-04",
				id:"",
                status:"",
                isBottomShow:true,
                isSubmit:true,
                getConfirm : '获取验证码',
                isNotAllowed : false,
                isdisabled : true,
                content:"",
				money:0,
                totalMoney:0,
                totalFee:0,
                showSubmit:"",
                showPay:"",
                showRevoke:"",
				total:0,
                pageSize:0,
                page:1,
				phone:"0",
                isSend:false
            }
        },
        methods: {
            /*cancel:function () {
                this.isShow = false;
                this.type = "text";
                this.btntext = "已撤销"
				this.className = "pull-right primary";
                this.fontsize = "font-size:20px;margin-top: -50px;";
            },*/
            getFastPayrollList:function () {
                this.listLoading = true;
                let params = {
                    payrollId:this.$route.query.payrollId,
                    pageNo : this.page
                };
                payrollDetail(params).then(res => {
                    this.tableData = res.data.payrollItemList;
                    this.originalFileName = res.data.payroll.originalFileName;
                    this.totalRecord = res.data.payroll.totalRecord;
                    this.successRecord = res.data.payroll.successRecord;
                    this.failRecord = res.data.payroll.failRecord;
                    this.money = res.data.payroll.money;
					this.batchNumber = res.data.payroll.batchNumber;
                    this.createDate = res.data.payroll.createDate;
                    this.id = res.data.payroll.id;
                    this.status = res.data.payroll.status;
                    this.totalMoney = res.data.payroll.totalMoney;
                    this.money = res.data.payroll.money;
                    this.totalFee = res.data.payroll.totalFee;
                    this.showSubmit = res.data.showSubmit;
                    this.showPay = res.data.showPay;
                    this.showRevoke = res.data.showRevoke;
                    this.total = res.data.page.total;
                    this.pageSize = res.data.page.pageSize;
                    this.listLoading = false;
                });
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getFastPayrollList();
            },
            getHref:function(val){
                return this.$store.state.base+'/finance/downloadErrorFile?payrollId='+val
            },
            pickTime:function () {
                this.getFastPayrollList();
            },
            revoke:function () {
                let params = {
                    payrollId:this.$route.query.payrollId
                };
                this.$confirm('确认撤销发薪吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    revoke(params).then(res => {
                        if(res.code == 0){
                            this.isShow = false;
                            this.type = "text";
                            this.btntext = "已撤销"
                            this.className = "pull-right primary";
                            this.fontsize = "font-size:20px;margin-top: -50px;";
                        }

                    });
                }).catch(() => {

                });
//                revoke(params).then(res => {
//                    if(res.code == 0){
//                        this.isShow = false;
//                        this.type = "text";
//                        this.btntext = "已撤销"
//                        this.className = "pull-right primary";
//                        this.fontsize = "font-size:20px;margin-top: -50px;";
//					}
//
//                });
            },
    		payroll:function () {
				this.isSubmit = false;
				this.isBottomShow = false;
            },
            submit:function () {
				let params = {
					payrollId: this.$route.query.payrollId
				};
				submitPayroll(params).then(res => {
					if (res.code == 0) {
						this.isSubmit = false;
					}

				});

            },
            getConfirmCode : function() {
                var _this = this;
                if(_this.getConfirm == '获取验证码') {
                    sendSms().then(res => {
                        console.log(res);
                        this.isSend = true;
					})
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
                    },1000)
                }else{
                    return false;
                }
            },
            confirm:function () {
                let params = {
                    payrollId:this.$route.query.payrollId,
					content:this.content
                };
                pay(params).then(res => {
                    if(res.code == 0){
                        console.log(this.$route.query.payrollId);
                        this.$router.push({ path: '/fastPayrollSuccess',query:{ payrollId:this.$route.query.payrollId} });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
					}

                });
            }
        },
		mounted() {
            this.getFastPayrollList();
            this.$store.state.adminleftnavnum="/fastPayrollList";
            this.phone = localStorage.getItem("account");
        }
    }

</script>

<style scoped lang="scss">
	@import '../../styles/payroll.scss';

</style>
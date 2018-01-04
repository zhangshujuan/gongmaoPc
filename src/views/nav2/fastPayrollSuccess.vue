<template>
	<section v-loading="listLoading">
		<div class="common-title">
			<router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'fastPayrollSuccess'}">发薪成功</router-link>
		</div>
		<div class="bg-white topcontent">
			<div class="clearfix flex-v-c">
				<div class="block pull-left">
					<span class="demonstration">发薪月份</span>
					<el-date-picker
							v-model="month"
							type="month"
							format="yyyy-MM"
							placeholder="选择日期时间" disabled>
					</el-date-picker>
				</div>
				<div class="pull-left status">
					<div><span class="col-999">发薪成功：</span>{{successNumber}}人</div>
					<div><span class="col-999">发薪失败：</span>{{failNumber}}人</div>
				</div>
			</div>
			<div class="text-center">
				<el-steps :space="200" :active="3" style="padding-top: 60px;margin-top: 20px">
					<el-step title="提交成功"></el-step>
					<el-step title="正在发放"></el-step>
					<el-step title="发薪成功">
					</el-step>
				</el-steps>
				<div class="bg-white tipcontent">
					<div class="content">
						<div class="top-text">
							发薪金额：￥{{needMoney}}<br>
							手续费：￥{{fee}}<br>
							总金额：￥{{total}}
						</div>
						<div class="col-999">本次发薪共为您节税</div>
						<div class="ft26">￥{{saveMoney}}</div>
						<router-link :to="{path:'fastPayroll',query: {payrollId:this.$route.query.payrollId}}"><el-button type="text">查看详情</el-button></router-link>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
    import Vue from 'vue'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'
    import { Loading } from 'element-ui';
    import {payDetail} from "../../api/api"
    Vue.use(ElementUI)
    export default {
        data() {
            return {
                listLoading:false,
                month: "2017-01",
                successNumber:1,
                failNumber:1,
                needMoney:1,
                fee:1,
                total:1,
                saveMoney:1
            }
        },
        methods: {
            getData:function () {
                this.listLoading = true;
                let params = {
                    payrollId:this.$route.query.payrollId
                };
                payDetail(params).then(res => {
                    this.month = res.data.month;
                    this.successNumber = res.data.successNumber;
                    this.failNumber = res.data.failNumber;
                    this.needMoney = res.data.needMoney;
                    this.fee = res.data.fee;
                    this.total = res.data.total;
                    this.saveMoney = res.data.saveMoney;
                	this.listLoading = false;
                })
            }
        },
        mounted(){
            this.getData();
            this.$store.state.adminleftnavnum="/fastPayrollList";
        }
    }

</script>

<style scoped lang="scss">
	/*@import '../../styles/base/flex.scss';*/
	/*@import '../../styles/payroll.scss';*/
	.text-center{
		position: relative;
		&:before{
			 content: '';
			 position: absolute;
			 right: auto;
			 height: 1px;
			 background-color: #ddd;
			 z-index: 15;
			 left: 0px;
			 display: block;
			 width: 100%;
		 }
	}
	.block{
		padding-bottom: 0px !important;
	}
	.status{
		margin-left: 230px;
		width:200px;
		div{
			width: 100%;
			&:first-child{
				margin-bottom: 10px;
			 }
			span{
				color: #999;
			}
		}
	}
	.tipcontent{
		padding:25px 0px;
		margin-bottom: 100px;
		width:350px;
		position:relative;
		display:inline-block;
		&:after{
			 content: "";
			 border-left: 10px solid transparent;
			 border-right: 10px solid transparent;
			 border-bottom: 10px solid #fff;
			 /*我们一般根据方向来写三角形，这样容易记忆；箭头指向的反方向的颜色设置为你想要的，然后箭头方向不要写，另外两个方向的颜色设置为transperent透明*/
			 position: absolute;
			 top: -10px;
			 right: 50px;
			 margin-left: -10px;
		 }
		&:before{
			 content: "";
			 border-left: 12px solid transparent;
			 border-right: 12px solid transparent;
			 border-bottom: 12px solid #ddd;
			 position: absolute;
			 top: -12px;
			 /*写个三角形，沉在箭头下边，颜色设置成边框颜色，位置比箭头稍高一些（容器边框宽度值），就可以了*/
			 right: 48px;
			 margin-left: -10px;
			 z-index: 0;
		 }
		.top-text{
			font-size: 12px;
			line-height: 30px;
			margin-bottom: 15px;
		}
		.col-999{
			color: #999;
		}
		.ft26{
			font-size: 26px;
			color: #f15a24;
			margin-bottom: 30px;
		}
	}

</style>
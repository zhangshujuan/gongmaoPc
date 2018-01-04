<template>
	<section v-loading="listLoading">
		<div class="common-title">
			<router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'moneyDetail'}">资金明细</router-link>
		</div>
		<div class="bg-white topcontent clearfix">
			<div class="pull-left">余额：<span class="ft30">{{banlance}}</span></div>
			<router-link to='/recharge'><div class="pull-right">充值</div></router-link>
		</div>
		<div class="bg-white bottomcontent">
			<div class="block">
				<span class="demonstration">时间</span>
				<el-date-picker
						v-model="value4"
						type="daterange"
						:picker-options="pickerOptions2"
						placeholder="选择时间范围"
						format="yyyy-MM-dd"
						@change="pickTime"
						align="right" v-if="isShow">
				</el-date-picker>
				<span class="split"></span>
				<div class="checkmouth">
					<el-button type="text" style="margin-right: 20px">按月选择</el-button>
					<div class="month">
						<el-date-picker
								v-model="value5"
								type="month"
								placeholder="选择月" @change="checkMouth">
						</el-date-picker>
					</div>
				</div>
			</div>
			<el-table
					:data="tableData"
					style="width: 100%">
				<el-table-column
						prop="createDate"
						label="日期">
				</el-table-column>
				<el-table-column
						prop="recordType" label="类型" width="125">
				</el-table-column>
				<el-table-column
						prop="description" label="名称" >
				</el-table-column>
				<el-table-column
						prop="money" label="金额" >
					<template scope="scope">
						  <span :class="{success:scope.row.recordType == '收入',danger:scope.row.recordType == '支出'}">{{scope.row.money}}</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="clearfix">
				<!--分页条-->
				<el-col :span="24" class="toolbar">
					<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" :current-page="currentPage">
					</el-pagination>
				</el-col>
			</div>
		</div>
	</section>
</template>
<script>
    import Vue from 'vue'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'
    import { Loading } from 'element-ui';
    import { moneyDetail } from '../../api/api';
    Vue.use(ElementUI)
    export default {
        data() {
            return {
                listLoading: false,
                isShow:true,
                isShowMonth:true,
                total:0,
                pageSize:0,
                page:1,
                searchType:0,
                searchTime:"",
                banlance:"",
                currentPage : 1,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value4: [],
                value5:"",
				tableData: [
				]}
        },
        methods: {
            checkMouth:function (val) {
                this.searchType = 0;
                let date = new Date(val);
                let year = date.getFullYear();
                let month = date.getMonth();
                date.setMonth(month+1);
                date.setDate(0);
                let d = date.getDate();
                this.value4 = [new Date(year, month, 1), new Date(year, month, d)];
                this.searchTime = [new Date(year, month, 1), new Date(year, month, d)];
                //this.getMoneyDeatil();
            },
            pickTime:function (val) {
				this.searchTime = val;
				this.currentPage = 1;
                this.getMoneyDeatil();
            },
            getMoneyDeatil:function () {
                this.listLoading = true;
				let param = {
                    pageNo : this.page,
                    searchType : this.searchType,
                    searchTime: this.searchTime
				};
                moneyDetail(param).then(res => {
                    this.tableData = res.data.fundsRecordVOS;
					this.total = res.data.page.total;
					this.pageSize = res.data.page.pageSize;
					this.banlance = res.data.banlance;
                	this.listLoading = false;
				});
            },
            handleCurrentChange(val) {
                this.page = val;
                this.currentPage = val;
                this.getMoneyDeatil();
            }
        },
		mounted(){
            this.getMoneyDeatil();
            this.$store.state.adminleftnavnum="/moneyDetail";
		}
    }

</script>

<style scoped lang="scss">
	@import '../../styles/moneydetail.scss';
	.checkmouth{
		position: relative;
		display:inline-block;
		.mouth{
			position: absolute;
		}
	}
</style>
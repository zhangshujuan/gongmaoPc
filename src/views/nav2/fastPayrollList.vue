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
						v-model="month"
						type="month"
						format="yyyy-MM"
						@change="pickTime"
						:picker-options="pickerOptions0"
						placeholder="选择日期时间">
				</el-date-picker>
				<el-button type="primary" v-on:click="getPayrollList">查询</el-button>
				<a :href="getHref(month)" @click="getHref1(month)" style="font-size: 12px;" class="el-button pull-right el-button--primary">按月导出详情</a>
			</div>
			<el-table
					:data="tableData"
					style="width: 100%">
				<el-table-column prop="createDate" label="月份" width="120">
				</el-table-column>
				<el-table-column
						prop="batchNumber" label="批次" width="260">
				</el-table-column>
				<el-table-column
						prop="totalRecord" label="总笔数" >
				</el-table-column>
				<el-table-column
						prop="successRecord" label="成功">
				</el-table-column>
				<el-table-column
						prop="failRecord" label="失败">
				</el-table-column>
				<el-table-column
						prop="totalMoney" label="总金额">
				</el-table-column>
				<el-table-column
						prop="money" label="成功金额">
				</el-table-column>
				<el-table-column prop="status" label="状态"
					>
					<template scope="scope">
						<span :class="{ warning: scope.row.status == '待发放',success: scope.row.status == '发放中',default: scope.row.status == '发放成功',danger: scope.row.status == '发放失败',primary: scope.row.status == '已撤销'}">{{scope.row.status}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="action" label="操作"
				>
					<template scope="scope">
						<router-link :to="{path:'fastPayroll',query: {payrollId:scope.row.id}}" :class="{ danger: scope.row.action == '发薪',success: scope.row.action == '已撤销',blue: scope.row.action == '查看'}">{{scope.row.action}}</router-link>
					</template>
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
	</section>
</template>
<script>
    import Vue from 'vue'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'
    import { Loading } from 'element-ui';
    import { payrollList, searchPayrollByMonth} from '../../api/api';
    Vue.use(ElementUI)
    export default {
        data() {
            return {
                listLoading: false,
                month:"",
                loading: true,
                total:0,
                pageSize:0,
				page:1,
                tableData: [
                    {
                    }
                ],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                }
            }
        },
        methods: {
			filterTag(value, row) {
				return row.tag === value;
			},
            getSearch:function () {
                let pageNo = 1;
                let params = {
                    pageNo : pageNo,
                    month : this.month
                };
                searchPayrollByMonth(params).then(res => {
                    this.tableData = res.data.payrollVO;
                    this.total = res.data.page.total;
				})
            },
            getPayrollList:function(){
                this.listLoading = true;
                let params = {
                    pageNo : this.page,
                    month : this.month
                };
                payrollList(params).then(res => {
                    if(res.code == 0){
                        this.tableData = res.data.payrollVOList;
                        this.total = res.data.page.total;
                        this.pageSize = res.data.page.pageSize;
					} else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
					}
                    this.listLoading = false;
                });
			},
            handleCurrentChange(val) {
                this.page = val;
                this.getPayrollList();
            },
            getHref:function(val){
                if(val.length != 0){
                    return this.$store.state.base+'/finance/exportByMonth?month='+val
                }
            },
            getHref1:function(val){
                if(val.length == 0){
                    this.$message({
                        message: "请选择月份再按月导出",
                        type: 'error'
                    });
                }
            },
            pickTime:function (val) {
				this.month = val;
            },
            pay:function(val){
                return this.$store.state.base+'/finance/fastPayroll?payrollId='+val
            }
        },
		mounted() {
			this.getPayrollList();
            this.$store.state.adminleftnavnum="/fastPayrollList";
		}
    }

</script>

<style scoped lang="scss">
	@import '../../styles/payroll.scss';
</style>
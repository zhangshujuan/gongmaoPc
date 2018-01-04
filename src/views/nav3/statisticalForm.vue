<template>
	<section v-loading="listLoading">
		<div class="common-title">
			<router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'statisticalForm'}">统计报表</router-link>
		</div>
		<div class="top-content flex-a bg-white">
			<div class="text-center" v-for="item in items">
				<div class="fs12 col-aaa">{{item.name}}</div>
				<img class="img" :src="item.path" alt="">
				<div class="fs20">{{item.num}}</div>
			</div>
		</div>
		<div class="block dateBlock">
			<el-date-picker
					v-model="value4"
					type="daterange"
					format="yyyy-MM"
					placeholder="选择日期范围"
					@change="pickTime"
			>
			</el-date-picker>
		</div>
		<div class="bg-white centercontent">
			<div id="canvas" style="width:100%;height: 280px;"></div>
		</div>
		<div class="bg-white centercontent">
			<div id="personTrip" style="width:100%;height: 280px;"></div>
		</div>
		<div class="bottomcontent">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="createDate" label="月份"></el-table-column>
				<el-table-column prop="totalMoney" label="发薪金额"></el-table-column>
				<el-table-column prop="successRecord" label="发薪人数"></el-table-column>
				<el-table-column prop="taxAmount" label="节税金额"></el-table-column>
			</el-table>
		</div>
	</section>
</template>

<script>
    import echarts from 'echarts'
    import Vue from 'vue'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'
	import {statisticalForm} from "../../api/api"
    Vue.use(ElementUI)
    export default{
        data(){
            return{
                listLoading: false,
                searchTime: '',
				value4:"",
                timeArea:[],
                taxAmount:[],
                totalMoney:[],
                peopleTimes:[],
                tableData: [
                ],
                items: []
            }
        },
        methods: {
            drawPie (id) {
                this.chart = echarts.init(document.getElementById(id))
                this.chart.setOption({
                    legend: {
                        data:['发薪金额','节税金额']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : this.timeArea,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#333'  //X轴字体颜色
                                }
                            },
                            axisLine: {
                                show: true,
                                lineStyle:{
                                    color:'#28aaf8'  //X轴颜色
                                }
                            },
                            splitLine : {
                                show:false  //无横向分割线
                            }
                        }
                    ],
                    color:['#fdd79d','#fdd79d','#fdd79d','#fdd79d','#fdd79d','#fdd79d'],
                    yAxis: {       //直角坐标系 grid 中的 y 轴
                        type: 'value',
                        axisLine: {
                            show: true
                        },
                        splitLine : {
                            show:false
                        },
                        axisLabel: {
                            show : true,
                            textStyle: {
                                color: '#28aaf8'  //Y轴字体颜色
                            }
                        }
                    },
                    tooltip: {
                        show : true
                    },
                    series : [
                        {
                            name:'节税金额',
                            type:'bar',
                            data:this.taxAmount,
                            barWidth:'60'
                        },
                        {
                            name:'发薪金额',
                            type:'line',
                            data:this.totalMoney
                        }
                    ]
                })
            },
            drawLine (id) {
                this.chart = echarts.init(document.getElementById(id))
                this.chart.setOption({
                    legend: {
                        data:['发薪人次']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : this.timeArea,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#333'  //X轴字体颜色
                                }
                            },
                            axisLine: {
                                show: true,
                                lineStyle:{
                                    color:'#28aaf8'  //X轴颜色
                                }
                            },
                            splitLine : {
                                show:false  //无横向分割线
                            }
                        }
                    ],
                    color:['#45b5f8','#45b5f8','#45b5f8','#45b5f8','#45b5f8','#45b5f8'],
                    yAxis: {       //直角坐标系 grid 中的 y 轴
                        type: 'value',
                        axisLine: {
                            show: true
                        },
                        splitLine : {
                            show:false
                        },
                        axisLabel: {
                            show : true,
                            textStyle: {
                                color: '#28aaf8'  //Y轴字体颜色
                            }
                        }
                    },
                    tooltip: {
                        show : true
                    },
                    series : [
                        {
                            name:'发薪人次',
                            type:'line',
                            data:this.peopleTimes
                        }
                    ]
                })
            },
            pickTime (val) {
				this.searchTime = val;
				this.getData();
            },
            getData(){
                this.listLoading = true;
                let param = {
                    searchTime : this.searchTime
                };
                statisticalForm(param).then(res => {
                    if (res.code == 0){
                        this.tableData = res.data.payrollVOs;
                        this.items = res.data.subjectList;
                        this.peopleTimes = res.data.peopleTimes;
                        this.taxAmount = res.data.taxAmount;
                        this.timeArea = res.data.timeArea;
						this.totalMoney = res.data.totalMoney;
						this.drawPie('canvas')
						this.drawLine('personTrip')
                        this.listLoading = false;
               	 	}
                })
			}
        },
        mounted() {
            this.getData();
            this.$store.state.adminleftnavnum="/statisticalForm";
        }
    }

</script>

<style lang="scss" scoped>
	@import '../../styles/index.scss';
	.flex-a{
		padding-left:80px;
		padding-right: 75px;
	}
	.dateBlock{
		margin: 30px 0px;
	}
</style>

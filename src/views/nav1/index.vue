<template>
	<section v-loading="listLoading">
		<router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>
		<div class="top-content flex-a bg-white">
			<div class="text-center" v-for="item in items">
				<div class="fs12 col-aaa">{{item.name}}</div>
				<img class="img" :src="item.path" alt="">
				<div class="fs20">{{item.num}}</div>
			</div>
		</div>
		<div class="bg-white centercontent">
			<div id="canvas" style="width:100%;height: 280px;"></div>
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
    import {statisticalFormIndex} from "../../api/api"
    Vue.use(ElementUI)
    export default{
        data(){
            return{
                listLoading: false,
                searchTime: '',
                timeArea:[],
                taxAmount:[],
                totalMoney:[],
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
            getData(){
                this.listLoading = true;
                let param = {
                    searchTime : this.searchTime
                };
                statisticalFormIndex(param).then(res => {
                    if (res.code == 0){
                        this.tableData = res.data.payrollVOs;
                        this.items = res.data.subjectList;
                        this.peopleTimes = res.data.peopleTimes;
                        this.taxAmount = res.data.taxAmount;
                        this.timeArea = res.data.timeArea;
                        this.totalMoney = res.data.totalMoney;
                        this.drawPie('canvas')
                    	this.listLoading = false;
                    }
                })
            }
        },
        mounted() {
            this.getData();
            this.$store.state.adminleftnavnum="/index";
        }
    }

</script>

<style lang="scss" scoped>
	@import '../../styles/index.scss';
</style>
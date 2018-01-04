<template>
	<section v-loading="listLoading">
		<div class="common-title">
			<router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'announcement'}">员工公告</router-link>
		</div>
		<div class="bg-white" style="margin-bottom: 20px;">
			<router-link to="/announce"><el-button type="primary">发布公告</el-button></router-link>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="createDateString" label="日期"></el-table-column>
				<el-table-column prop="title" label="标题"></el-table-column>
				<el-table-column prop="content" label="内容">
					<template scope="scope">
						  <div class="ellipsis" :title="scope.row.content">{{scope.row.content}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="readNum" label="阅读量"></el-table-column>
				<el-table-column prop="operation" label="操作"
				>
					<template scope="scope">
						  <router-link :to="{path:'announceDetail',query: {id:scope.row.id}}" ><el-button type="text">查看</el-button>
					</router-link>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--分页条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10"
						   :total="total">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
    import { announcement} from '../../api/api';
    export default{
        data(){
            return {
                listLoading: false,
                tableData: [],
				total : 0,
				pageNo : 1
			}
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getTableData();
            },
            //获取表格内容
            getTableData() {
                this.listLoading = true;
                let para = {
                    createDateString: this.createDateString,
                    title: this.title,
                    content: this.content,
                    readNum:this.readNum,
					id:this.id,
					pageNo : this.pageNo
                };
                announcement(para).then((res) => {
                    this.tableData = res.data.companyNoticeVos;
                    this.total = res.data.page.total;
                	this.listLoading = false;
                });
            }
		},
        mounted() {
            this.getTableData();
            this.$store.state.adminleftnavnum="/announcement";
        }
    }

</script>

<style lang="scss" scoped>
	.bg-white{
		background: #fff;
		box-shadow: 0 1px 4px 0 rgba(63,84,101,.13);
		padding: 15px 33px 15px 25px;
		margin-top: 15px;
		border-radius: 10px;
		border:1px solid #ddd;
	}
	.el-button--primary{
		margin: 20px 0px 35px 0px;
	}
	.ellipsis {
		word-wrap: normal; /* for IE */
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

</style>
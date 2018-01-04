<template>
	<section v-loading="listLoading">
		<div class="common-title">
			<router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'notice'}">系统通知</router-link>
		</div>
		<div class="bg-white table-primary">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="name" label="名称">
					<template scope="scope">
						<!--<router-link :to="{path:'noticeDetail',query: {id:scope.row.id}}">-->
							<div class="default ellipsis" v-bind:class="scope.row.read" @click="togoDetail(scope)" style="cursor:pointer">{{scope.row.content}}</div>
						<!--</router-link>-->
					</template>
				</el-table-column>
				<el-table-column prop="createDateString" label="日期">
					<template scope="scope">
						<!--<router-link :to="{path:'noticeDetail',query: {id:scope.row.id}}">-->
						  <div class="text-right default" v-bind:class="scope.row.read" @click="togoDetail(scope)" style="cursor:pointer">{{scope.row.createDateString}}</div>
						<!--</router-link>-->
					</template>
				</el-table-column>
			</el-table>
		</div>
	</section>
</template>

<script>
    import { notice , unreadNumber} from '../../api/api';
    export default{
        data(){
            return {
                listLoading: false,
                tableData: []
			}
        },
        methods: {
            togoDetail(scope) {
                let _arr = this.$router.options.routes;
				if(scope.row.read == "unread") {
					let length = _arr[11].children[1].name.length;
					let _num = _arr[11].children[1].name.substring(length-2,length-1);
                	let _later = parseInt(_num) - 1;
                	if(_later == 0) {
                        _arr[11].name = "信息管理";
                        _arr[11].children[1].name = "系统通知";
					}else{
                        _arr[11].name = "信息管理(" + _later + ")";
                        _arr[11].children[1].name = "系统通知(" + _later + ")";
					}
				}
				this.$router.push("noticeDetail?id=" + scope.row.id)
			},
            //获取表格内容
            getTableData() {
                this.listLoading = true;
                let _arr = this.$router.options.routes;
                let para = {
                    id:this.id,
                    content: this.content,
                    createDateString: this.createDateString
                };

                notice(para).then(res => {
                    for( let i = 0 ; i < res.data.length; i++){
                        if(res.data[i].read == 0){
                            res.data[i].read = "unread";
						}
					}
					this.tableData = res.data;
					unreadNumber().then(res => {
						this.listLoading = true;
						console.log(res)
						if(res.data != 0) {
							_arr[11].children[1].name = "系统通知(" + res.data + ")";
						}else if(res.data == 0) {
							_arr[11].children[1].name = "系统通知";
						}
						this.listLoading = false;
					})
				})
            }
        },
        mounted() {
            this.getTableData();
            this.$store.state.adminleftnavnum="/notice";
        }
    }

</script>

<style lang="scss" scoped>
	/*@import "../../styles/base/table.scss";*/
	.bg-white{
		background: #fff;
		//box-shadow: 0 1px 4px 0 rgba(63,84,101,.13);
		//padding: 15px 33px 15px 25px;
		margin-top: 15px;
		border-radius: 10px;
		//border:1px solid #ddd;
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
	.text-right{
		text-align: right;
	}
	.default{
		color: #999;
	}
	.cell .unread{
		color : #000;
	}
</style>
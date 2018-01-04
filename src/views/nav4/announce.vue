<template>
	<section>
		<div class="common-title">
			<router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'announcement'}">员工公告</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'announce'}">发布公告</router-link>
		</div>
		<div class="bg-white">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="标    题：">
					<el-input v-model="form.title"  placeholder="请输入公告标题"></el-input>
				</el-form-item>
				<el-form-item label="内    容：">
					<el-input type="textarea" v-model="form.content"  placeholder="请输入公告内容" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">发布</el-button>
				</el-form-item>
			</el-form>
		</div>
	</section>
</template>

<script>
    import { announce} from '../../api/api';
    export default{
        data(){
            return {
                form: {
                    title: '',
                    content: ''
                }
			}
        },
        methods: {
            onSubmit() {
                let params = {
                    title : this.form.title ,
                    content : this.form.content
                };
                announce(params).then((res) => {
                    if(res.code == 0) {
                        this.$message({
                            message: '发布成功',
                            type: 'success'
                        });
					 	this.$router.push({ path: '/announcement' });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
            }
		},
        mounted() {
            this.$store.state.adminleftnavnum="/announcement";
        }
    }

</script>

<style lang="scss" scoped>
	.bg-white{
		background: #fff;
		box-shadow: 0 1px 4px 0 rgba(63,84,101,.13);
		padding: 15px 84px 15px 25px;
		margin-top: 15px;
		border-radius: 10px;
		border:1px solid #ddd;
	}
</style>
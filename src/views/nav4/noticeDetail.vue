<template>
	<section v-loading="listLoading">
		<div class="common-title">
			<router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'notice'}">系统通知</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'noticeDetail',query: {id:this.$route.query.id}}">通知详情</router-link>
		</div>
		<div class="bg-white">
			<div class="title text-center">{{title}}</div>
			<div class="subtilte text-center">{{createDateString}}<span>阅读量：{{read}}</span></div>
			<div class="content" v-html="content">{{content}}</div>
		</div>
	</section>
</template>

<script>
    import { noticeDetail , unreadNumber} from '../../api/api';
    export default{
        data(){
            return {
                listLoading: false,
                createDateString: '',
                title:"",
                content:"",
                read:""
			}
        },
        methods: {
            //获取内容
            getContent() {
                this.listLoading = true;
                let _arr = this.$router.options.routes;
                let para = {
                    id:this.$route.query.id
                };
                noticeDetail(para).then((res) => {
                    this.listLoading = true;
                    this.createDateString = res.data.createDateString;
					this.title = res.data.title;
					this.content = res.data.content;
					this.read = res.data.read;
//					unreadNumber().then(res => {
//						console.log(res)
//						if(res.data != 0) {
//							_arr[11].children[1].name = "系统通知(" + res.data + ")";
//						}else if(res.data == 0) {
//							_arr[11].children[1].name = "系统通知";
//						}
//						console.log(_arr[11].children[1].name)
//						this.listLoading = false;
//					})
                	this.listLoading = false;
                });
            }
        },
        mounted() {
            this.getContent();
            this.$store.state.adminleftnavnum="/notice";
        }
    }

</script>

<style lang="scss" scoped>
	.bg-white{
		background: #fff;
		box-shadow: 0 1px 4px 0 rgba(63,84,101,.13);
		padding: 35px 100px 100px 100px;
		margin-top: 15px;
		border-radius: 10px;
		border:1px solid #ddd;
	}
	.title{
		font-size: 16px;
		color: #333;
	}
	.subtilte{
		color: #999;
		margin:10px 0px 35px 0px;
		span{
			margin-left:50px;
		}
	}
	.content{
		font-size: 12px;
		line-height: 18px;
	}
</style>
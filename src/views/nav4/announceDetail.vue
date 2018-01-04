<template>
	<section v-loading="listLoading">
		<div class="common-title">
			<router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'announcement'}">员工公告</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'announceDetail',query: {id:this.$route.query.id}}">公告详情</router-link>
		</div>
		<div class="bg-white">
			<div class="title text-center">{{title}}</div>
			<div class="subtilte text-center">{{createDateString}}<span>阅读量：{{readNum}}</span></div>
			<div class="content" v-html="content">{{content}}</div>
		</div>
	</section>
</template>

<script>
    import { announceDetail } from '../../api/api';
    export default{
        data(){
            return {
                listLoading: false,
                createDateString: '',
                title:"",
                content:"",
                readNum:""
			}
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            //获取内容
            getContent() {
                this.listLoading = true;
                let para = {
                    id:this.$route.query.id
                };
                announceDetail(para).then((res) => {
                    this.createDateString = res.data.createDateString;
                    this.title = res.data.title;
                    this.content = res.data.content;
                    this.readNum = res.data.readNum;
                	this.listLoading = false;
                });
            }
		},
        mounted() {
            this.getContent();
            this.$store.state.adminleftnavnum="/announcement";
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
<template>
	<section>
		<div class="common-title">
			<router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'moneyDetail'}">资金明细</router-link>&nbsp;&nbsp;>
			<router-link class="common-title" :to="{path:'recharge'}">充值</router-link>
		</div>
		<div class="bg-white">
			<div class="text-center">
				<img src="/static/part2_3_recharge_success.png" alt="">
			</div>
			<div class="text-center ft20">充值提交成功</div>
			<div class="text-center ft12">我们会在1个工作日内发放至您的账户</div>
		</div>
	</section>
</template>
<script>
    import Vue from 'vue'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'
    import { Loading } from 'element-ui';
    Vue.use(ElementUI)
    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        mounted(){
            this.$store.state.adminleftnavnum="/moneyDetail";
        }

    }

</script>

<style scoped lang="scss">
	@import '../../styles/moneydetail.scss';
	img{
		padding: 80px 0px 25px 0px;
	}
	.ft20{
		font-size: 20px;
		margin-bottom: 30px;
	}
	.ft12{
		color: #999;
		padding-bottom: 135px;
	}
</style>
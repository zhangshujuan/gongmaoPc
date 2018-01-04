<template>
	<section v-loading="listLoading">
		<div class="common-title">
			<router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
			<router-link class="common-title" :to="{path:'moneyDetail'}">资金明细</router-link>&nbsp;&nbsp;>
			<router-link class="common-title" :to="{path:'recharge'}">充值</router-link>
		</div>&nbsp;&nbsp;
		<div class="bg-white rechargeTopcontent clearfix" v-if="isSuccess">
			<label class="pull-left">
				账   户：<br>
				开户名：<br>
				开户行：
			</label>
			<label class="pull-left">
				{{account}}<br>
				{{name}}<br>
				{{bank}}
			</label>
		</div>
		<div class="tip-title" v-if="isSuccess">请上传银行转账凭条、网银转账成功截图等转账凭证，完成充值</div>
		<div class="bg-white bottomcontent" v-if="isSuccess">
			<div class="block">
				<span class="demonstration">充值金额：</span>
				<el-input v-model="money" placeholder="请输入内容" size="small" class="input-normal"></el-input>
				<span class="demonstration">元</span>
			</div>
			<div class="block clearfix">
				<span class="demonstration pull-left">上传凭证：</span>
				<el-upload
						class="upload-demo"
						action="/privateapi/finance/uploadDeposit"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:on-success="handleSuccess"
						:before-upload="beforeAvatarUpload"
				>
					<el-button size="small">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">仅支持jpg/png/bmp/gif格式</div>
				</el-upload>
			</div>
			<el-button type="primary" class="ml80" @click="submit">提交</el-button>
		</div>
		<div class="bg-white" v-if="!isSuccess">
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
    import { accountInfo,uploadDeposit,uploadSubmit } from '../../api/api';
    Vue.use(ElementUI)
    export default {
        data() {
            return {
                listLoading: false,
                money: 0,
                bank:"",
				name:"",
                account:"",
                isSuccess:true,
                filePath:""
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeAvatarUpload(file) {
                let supportedTypes = ['image/jpg', 'image/png','image/bmp','image/gif', 'image/jpeg' ];
                if (file && supportedTypes.indexOf(file.type) >= 0) {
                    this.file = file;
                    return true;
                } else {
                    this.$message.error('上传图片只能是 jpg/png/bmp/gif 格式!');
                    return false;
                }
            },
            handleSuccess(response, file, fileList) {
                if (response.code == 0){
                    this.filePath = response.data;
                }
            },
            getAccountInfo(){
                this.listLoading = true;
                accountInfo().then(res => {
                    this.bank = res.data.bank;
                    this.name = res.data.name;
                    this.account = res.data.account;
                    this.listLoading = false;
                });
			},
            submit(){
                let param = {
                    money : this.money,
                    filePath: this.filePath
                };
                uploadSubmit(param).then(res => {
                    if (res.code == 0){
                        this.isSuccess = false;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
					}
				})
			}
        },
		mounted(){
            this.getAccountInfo();
            this.$store.state.adminleftnavnum="/moneyDetail";
		}
    }

</script>

<style scoped lang="scss">
	@import '../../styles/moneydetail.scss';
	.upload-demo{
		float: left;
	}
	.upload-demo{
		.el-upload-list{
			margin-left: 0 !important;
		}
	}
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
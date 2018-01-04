<template>
	<section v-loading="listLoading">
        <div class="common-title">
            <router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
            <router-link class="common-title" :to="{path:'companyInfo'}">公司信息</router-link>
        </div>
		<div class="bg-content">
            <div class="info-left">
                <div class="company-info">
                    <p class="company-name">{{info.name}}</p>
                    <p class="company-location">{{info.location}}</p>
                    <!--<div class="short-intro">
                        <span>{{info.industry}}</span>
                        <span>{{info.property}}</span>
                        <span>{{info.number}}</span>
                    </div>-->
                    <p class="situation">{{info.introduction}}</p>
                </div>
            </div>
            <div class="info-right">
                <img v-bind:src="info.logo" class="license"/>
                <div class="contact">
                    <div class="contact-person">
                        <span class="duty">联系人</span>
                        <p>{{info.contactPerson}}</p>
                        <p>{{info.contactPhone}}</p>
                        <p>{{info.contactEmail}}</p>
                    </div>
                </div>
            </div>
		</div>
	</section>
</template>

<script>
    import { getCompanyInfo } from '../../api/api';
    export default{
        name : 'app',
        data() {
            return {
                listLoading: false,
                info : {
                    location : ''
                }
            }
        },
        methods : {
            companyInfo : function() {
                this.listLoading = true;
                let sid = localStorage.getItem("sid");
                let token = localStorage.getItem("token");
                let params = { sid : sid , token : token };
                getCompanyInfo(params).then(res => {
                    if(res.code == -1000) {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                        let _this = this;
                        setTimeout(function() {
                            _this.$router.push("/");
                        },3000);
                        return false;
                    }else if(res.code == 0) {
                        let {code,data,msg} = res;
                        this.info = data;
                        this.info.location = data.provinceName + data.cityName + data.districtName + data.address;
                    }
                    this.listLoading = false;
                });
            }
        },
        mounted() {
            this.companyInfo();
            this.$store.state.adminleftnavnum="/companyInfo";
        }
    }

</script>

<style lang="scss">
    @import "../../styles/companyInfo.scss";
</style>
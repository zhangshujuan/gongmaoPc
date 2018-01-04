<template>
    <section>
        <div class="common-title">
            <router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
            <router-link class="common-title" :to="{path:'resetPsd'}">修改密码</router-link>
        </div>
        <div class="bg-content">
            <div class="reset-psd">
                <el-form :model="resetPsdForm" :rules="resetPsdRules" ref="resetPsdForm">
                    <el-form-item label="原密码:" prop="oldpsd">
                      <el-input class="oldpsd" type="password" v-model="resetPsdForm.oldpsd" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码:" prop="newpsd">
                      <el-input class="oldpsd" type="password" v-model="resetPsdForm.newpsd" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码:" prop="confirmpsd">
                      <el-input class="oldpsd" type="password" v-model="resetPsdForm.confirmpsd" placeholder="请确认新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="resetSubmit">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </section>
</template>

<script>
    import { modifyPassword } from '../../api/api';
    export default {
        data() {
            return {
                resetPsdForm : {
                    oldpsd : "",
                    newpsd : "",
                    confirmpsd : ""
                },
                resetPsdRules: {
                  oldpsd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                  ],
                  newpsd: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                  ],
                  confirmpsd: [
                    { required: true, message: '请确认新密码', trigger: 'blur' }
                  ],
                }
            }
        },
        methods : {
            resetSubmit : function() {
                this.$refs.resetPsdForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            let oldPassword = this.resetPsdForm.oldpsd;
                            let newPassword1 = this.resetPsdForm.newpsd;
                            let newPassword2 = this.resetPsdForm.confirmpsd;
                            let params = { oldPassword : oldPassword , newPassword1 : newPassword1 , newPassword2 : newPassword2 };
                            modifyPassword(params).then((res) => {
                                if(res.code == 0) {
                                    this.$message({
                                        message: '密码修改成功',
                                        type: 'success'
                                    });
                                    let _this = this;
                                    setTimeout(function(){
                                        _this.$router.push("/index");
                                    },3000);
                                }else{
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                }
                            })
                        });
                    }
                });
            }
        },
        mounted() {
            this.$store.state.adminleftnavnum="/resetPsd";
        }
    }
</script>

<style lang="scss">
    .reset-psd{
        width : 500px;
        label{
            width:90px;
        }
        .el-form-item__label::before{
            color : #fff !important;
        }
        .el-input{
            width:200px;
        }
        .el-form-item__content{
            button{
                margin-left:90px;
                margin-top:26px;
            }
        }
        .el-form-item__error{
            display:inline-block;
            width:90px;
            text-align:right;
        }
    }
</style>
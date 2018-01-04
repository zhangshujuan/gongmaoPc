<template>
    <section v-loading="listLoading">
        <div class="common-title">
            <router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>
            &nbsp;&nbsp;>&nbsp;&nbsp;
            <router-link class="common-title" :to="{path:'usermanage'}">{{info}}</router-link>
            <span v-if="seenMore">&nbsp;&nbsp;>&nbsp;&nbsp;{{more}}</span>
        </div>
        <div class="bg-content">
            <div class="user-viewer" v-if="seenViewer">
                <el-button type="primary" @click="addUser">新增用户</el-button>
                <template>
                    <el-table :data="tableData" style="width: 100%">
                      <el-table-column prop="name" label="姓名">
                      </el-table-column>
                      <el-table-column prop="gender" label="性别">
                      </el-table-column>
                      <el-table-column prop="mobile" label="手机号">
                      </el-table-column>
                      <el-table-column prop="roleName" label="角色">
                      </el-table-column>
                      <el-table-column prop="email" label="邮箱">
                      </el-table-column>
                      <el-table-column label="操作">
                        <template scope="scope">
                          <a class="edit" @click="handleEdit(scope.$index, scope.row)"  v-if="scope.row.type">编辑</a>
                          <a class="delete" @click="handleDel(scope.$index, scope.row)" v-if="scope.row.type">删除</a>
                        </template>
                      </el-table-column>
                    </el-table>
                </template>
            </div>
            <!--新增界面-->
            <div class="add-user" v-if="seenAddArea">
                <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="姓名" prop="name">
                    <el-input class="username" v-model="addForm.name" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                   <el-form-item label="手机号" prop="phone">
                    <el-input class="phonenumber" v-model="addForm.phone" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input class="email" v-model="addForm.email" placeholder="请输入邮箱号"></el-input>
                  </el-form-item>
                   <el-form-item label="角色" prop="duty">
                       <el-select v-model="addForm.duty" placeholder="请选择" @change="change">
                           <el-option v-for="item in options" :key="item.roleId" :label="item.roleName" :value="item.roleId">

                           </el-option>
                       </el-select>
                    </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="addSubmit">确定</el-button>
                    <el-button @click="resetForm">取消</el-button>
                    <p class="tips">新增用户完成后，系统将生成随机密码并发送到用户邮箱</p>
                  </el-form-item>
                </el-form>
                <!--<el-select v-model="value" placeholder="请选择">-->
                    <!--<el-option v-for="item in optionss" :key="item.value" :label="item.label" :value="item.value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            </div>
            <!--编辑界面-->
            <div class="edit-user" v-if="seenEditArea">
                <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name">
                        <el-input class="username edit-username" v-model="editForm.name" placeholder="请输入姓名"
                                  readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile">
                        <el-input class="phonenumber" v-model="editForm.mobile" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input class="email" v-model="editForm.email" placeholder="请输入邮箱号"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="roleId">
                        <el-select class="duty" v-model="editForm.roleId" placeholder="请选择角色">
                            <el-option v-for="option in options2" v-bind:label=option.roleName
                                       v-bind:value=option.roleId></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="editSubmit" v-bind:modifyUserId=modifyUserId>确定</el-button>
                        <el-button @click="resetEdit">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import {getUserList, removeUser, editUser, getRolesList, modifyUser, addUserList} from '../../api/api';
    export default{
        data() {
            return {
                listLoading: false,
                info: '用户管理',
                more: '',
                seenMore: false,
                seenViewer: true,
                seenAddArea: false,
                seenEditArea: false,
                tableData: [],
                modifyUserId: '',
                addForm: {
                    name: '',
                    phone: '',
                    email: '',
                    duty: ''
                },
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^1[34578]\d{9}$/, message: '请输入正确格式的手机号'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱号', trigger: 'blur'},
                        {pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: '请输入正确格式的邮箱号'}
                    ],
                    duty: [
                        {required: true, message: '请选择角色', trigger: 'change'}
                    ]
                },
                editForm: {
                    name: '',
                    phone: '',
                    email: '',
                    roleId: ''
                },
                editFormRules: {
                    mobile: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^1[34578]\d{9}$/, message: '请输入正确格式的手机号'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱号', trigger: 'blur'},
                        {pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: '请输入正确格式的邮箱号'}
                    ],
                    roleId: [
                        {required: true, message: '请选择角色', trigger: 'change'}
                    ]
                },
                options: [],
                options2 : [],
                value : ''
            }
        },
        methods: {
            change() {
//                console.log(this.addForm.duty)
            },
          //点击显示新增用户面板
          addUser() {
            this.seenViewer = false;
            this.seenAddArea = true;
            this.seenMore = true;
            this.more = "新增用户";
            this.addForm.name = '';
            this.addForm.phone = '';
            this.addForm.email = '';
            this.addForm.duty = '';
          },
          //编辑用户功能
          handleEdit(index, row) {
            this.seenViewer = false;
            this.seenEditArea = true;
            this.seenMore = true;
            this.more = "编辑用户";
            let sid = localStorage.getItem("sid");
            let token = localStorage.getItem("token");
            let modifyUserId = row.id;
            this.modifyUserId = row.id;
            let params = { sid : sid , token : token , modifyUserId: modifyUserId};
            editUser(params).then((res) => {
                let userRoleId = res.data.roleId;
                this.editForm = res.data;
                getRolesList(params).then((res2) => {
                    this.options2 = res2.data;
                    for(let i = 0;i < res2.data.length; i++) {
                        if (res2.data[i].roleId == userRoleId) {
                            this.roleId = res2.data[i].roleName;
                        }
                    }
                });
            });
          },
          //新增用户功能
          addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let sid = localStorage.getItem("sid");
                            let token = localStorage.getItem("token");
                            let addName = this.addForm.name;
                            let mobile = this.addForm.phone;
                            let email = this.addForm.email;
                            let roleId = this.addForm.duty;
                            let params = {
                                sid: sid,
                                token: token,
                                addName: addName,
                                mobile: mobile,
                                email: email,
                                roleId: roleId
                            };
                            addUserList(params).then((res) => {
                                this.addLoading = false;
                                console.log(res)
                                if(res.code == 0) {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.seenAddArea = false;
                                    this.seenViewer = true;
                                    this.tableData = [];
                                    this.getTableData();
                                }else{
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                }
                            });
                        });
                    }
                });
          },
          //取消新增用户操作
          resetForm() {
                this.seenViewer = true;
                this.seenAddArea = false;
                this.seenMore = false;
                this.more = "";
          },
          //编辑用户提交功能
          editSubmit () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let sid = localStorage.getItem("sid");
                            let token = localStorage.getItem("token");
                            let mobile = this.editForm.mobile;
                            let roleId = this.editForm.roleId;
                            let email = this.editForm.email;
                            let modifyUserId = this.modifyUserId;
                            let params = {
                                sid: sid,
                                token: token,
                                mobile: mobile,
                                roleId: roleId,
                                email: email,
                                modifyUserId: modifyUserId
                            };
                            modifyUser(params).then((res) => {
                                this.editLoading = false;
                                this.$message({
                                    message: '资料修改成功',
                                    type: 'success'
                                });
                                this.seenEditArea = false;
                                this.seenViewer = true;
                                this.tableData = [];
                                this.getTableData();
                            });
                        });
                    }
                });
          },
          //取消编辑用户操作
          resetEdit() {
                this.seenEditArea = false;
                this.seenViewer = true;
                this.seenMore = false;
                this.more = "";
          },
          //删除用户功能
          handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let sid = localStorage.getItem("sid");
                    let token = localStorage.getItem("token");
                    let deleteUserId = row.id;
                    let params = {sid: sid, token: token, deleteUserId: deleteUserId};
                    removeUser(params).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.tableData = [];
                        this.getTableData();
                    });
                }).catch(() => {

                });
          },
          getTableData : function() {
            let sid = localStorage.getItem("sid");
            let token = localStorage.getItem("token");
            let params = { sid : sid , token : token };
            getRolesList(params).then((res) => {
              this.options = res.data;
            });
            getUserList(params).then(res => {
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
                    let {code, data, msg} = res;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].gender == 0) {
                            data[i].gender = "男";
                        }
                        if (data[i].gender == 1) {
                            data[i].gender = "女";
                        }
                        if (data[i].roleName == "超级管理员") {
                            //超级管理员时，编辑和删除按钮隐藏
                            data[i].type = false;
                        }
                        if (data[i].roleName != "超级管理员") {
                            data[i].type = true;
                        }
                    }
                    this.tableData = res.data;
                }
            })
          }
        },
        mounted() {
            this.getTableData();
            this.$store.state.adminleftnavnum = "/usermanage";
        }
    }
</script>

<style lang="scss">
    @import "../../styles/usermanage.scss";
</style>

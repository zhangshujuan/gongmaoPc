<template>
	<section v-loading="listLoading">
        <div class="common-title">
            <router-link class="common-title" :to="{path:'index'}">杭州工猫科技有限公司</router-link>&nbsp;&nbsp;>&nbsp;&nbsp;
            <router-link class="common-title" :to="{path:'permissionSetting'}">{{info}}</router-link>
            <span v-if="seenMore">&nbsp;&nbsp;>&nbsp;&nbsp;{{more}}</span>
        </div>
        <div class="bg-content">
            <!--权限列表界面-->
            <div class="user-viewer" v-if="seenViewer">
                <el-button type="primary" @click="addPermissionUser">新增角色</el-button>
                <template>
                    <el-table :data="tableData" style="width: 100%">
                      <el-table-column prop="roleName" label="角色名称">
                      </el-table-column>
                      <el-table-column prop="privilegeNames" label="权限">
                      </el-table-column>
                      <el-table-column label="操作">
                        <template scope="scope">
                          <a class="edit" @click="handlePermissionEdit(scope.$index, scope.row)">编辑</a>
                          <a class="delete" @click="handlePermissionDel(scope.$index, scope.row)">删除</a>
                        </template>
                      </el-table-column>
                    </el-table>
                </template>
            </div>
            <!--新增界面-->
            <div class="add-permission-user" v-if="seenAddArea">
                <el-form :model="addPermissionForm" ref="addPermissionForm">
                    <el-form-item label="角色名:" prop="name">
                      <el-input class="username" v-model="addPermissionForm.roleName" placeholder="请输入角色"></el-input>
                    </el-form-item>
                    <span class="quanxian-notes">权&nbsp;&nbsp;&nbsp;限:</span>
                    <el-tree :data="data2" show-checkbox="" default-expand-all :expand-on-click-node="false" node-key="id" accordion ref="tree" @check-change="handleCheckChange">
                    </el-tree>
                    <el-form-item>
                        <span class="zhanwei">占位用</span>
                        <el-button type="primary" @click="addPermissionSubmit">确定</el-button>
                        <el-button @click="resetPermissionEdit">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--编辑界面-->
            <div class="add-permission-user" v-if="seenEditArea">
                <el-form :model="editPermissionForm" ref="editPermissionForm">
                    <el-form-item label="角色名:" prop="name">
                      <el-input class="username" v-model="editPermissionForm.roleName" placeholder="请输入角色"></el-input>
                    </el-form-item>
                    <span class="quanxian-notes">权&nbsp;&nbsp;&nbsp;限:</span>
                    <el-tree :data="data2" show-checkbox="" default-expand-all node-key="id" ref="tree" :expand-on-click-node="false" accordion highlight-current :default-checked-keys="editPrivilegeIds" :props="defaultProps" @check-change="handleEditCheckChange">
                    </el-tree>
                    <el-form-item>
                        <span class="zhanwei">占位用</span>
                        <el-button type="primary" @click="editPermissionSubmit">确定</el-button>
                        <el-button @click="resetPermissionEdit">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
	</section>
</template>

<script>
    import util from '../../common/js/util'
    import { getRolesInfo , addRole , deleteRole , getCompanyRoleVoInfo , modifyRole } from '../../api/api';
    export default{
        data() {
            return {
                listLoading: false,
                info : "权限设置",
                seenMore : false,
                more : "",
                seenViewer : true,
                seenAddArea : false,
                seenEditArea : false,
                editRoleId : '',
                editPrivilegeIds : [],
                tableData: [],
                sels : [],
                data2: [{
                  label: '财务管理',
                  children: [{
                    id: "1",
                    label: '上传工资单'
                  },{
                    id: "2",
                    label: '发薪'
                  },{
                    id: "3",
                    label: '充值/查看明细'
                  }
                  ]
                }, {
                  id : "4",
                  label: '查看报表'
                }, {
                  label: '信息管理',
                  children : [{
                    id : "5",
                    label : "发布公告"
                  },{
                    id : "6",
                    label : "查看通知"
                  }]
                },{
                    label : '设置',
                    children : [{
                        id : "7",
                        label : '用户管理'
                    },{
                        id : "8",
                        label : '权限设置'
                    }]
                }
                ],
                defaultProps: {
                  children: 'children',
                  label: 'label'
                },
                addPermissionForm : {
                    roleName : ''
                },
                editPermissionForm : {
                    roleName : ''
                }
            }
        },
        methods : {
             handleCheckChange(data, checked, indeterminate) {
                //data  传递给 data 属性的数组中该节点所对应的对象
                // checked  节点本身是否被选中
                //indeterminate  节点的子树中是否有被选中的节点
               if(checked && data.id != undefined) {
                    this.sels.push(data.id);
               }else if(!checked && data.id != undefined){
                    for(let i = 0 ; i < this.sels.length ; i++) {
                        if(this.sels[i] == data.id) {
                            this.sels.splice(i,1);
                        }
                    }
               }
             },
             handleEditCheckChange(data, checked, indeterminate) {
                 //data  传递给 data 属性的数组中该节点所对应的对象
                 // checked  节点本身是否被选中
                 //indeterminate  节点的子树中是否有被选中的节点
                if(checked && data.id != undefined) {
                    this.editPrivilegeIds.push(Number(data.id));
                }else if(!checked && data.id != undefined){
                    for(let i = 0 ; i < this.editPrivilegeIds.length ; i++) {
                        if(this.editPrivilegeIds[i] == data.id) {
                            this.editPrivilegeIds.splice(i,1);
                        }
                    }
                }
             },
            //获取所有人和所对应的角色
            getRolesInfo : function() {
                this.listLoading = true;
                getRolesInfo().then((res) => {
                    if(res.code == 0) {
                        for( let i = 0 ; i < res.data.length; i++) {
                            for(let j = 0; j < res.data[i].privilegeNames.length; j++) {
                                res.data[i].privilegeNames[j] = "、" + res.data[i].privilegeNames[j];
                            }
                            res.data[i].privilegeNames[0] = res.data[i].privilegeNames[0].substring(1)
                        }
                        this.tableData = res.data;
                    }else{
	                    this.$message({
	                            message: res.msg,
	                            type: 'error'
	                        });
	                        let _this = this;
	                        setTimeout(function() {
	                            _this.$router.push("/");
	                        },3000);
	                        return false;
                    }
                     this.listLoading = false;
            })
            },
            //删除用户功能
            handlePermissionDel: function (index, row) {
                let deletedRoleId = row.id;
                let params = { deletedRoleId : deletedRoleId };
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    deleteRole(params).then((res) => {
                        this.listLoading = false;
                        if(res.code == 0) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getRolesInfo();
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    });
                }).catch(() => {

                });
            },
            //新增权限
            addPermissionUser() {
                this.seenViewer = false;
                this.seenAddArea = true;
                this.seenMore = true;
                this.more = "新增角色";
            },
            //取消新建取消编辑
            resetPermissionEdit : function() {
                this.seenViewer = true;
                this.seenAddArea = false;
                this.seenEditArea = false;
                this.seenMore = false;
                this.more = "";
            },
            //修改权限
            handlePermissionEdit : function(index,row) {
                this.editRoleId = row.id;
                let params = { modifiedRoleId : this.editRoleId };
                getCompanyRoleVoInfo(params).then((res) => {
                    this.editPermissionForm.roleName = res.data.roleName;
                    this.editPrivilegeIds = res.data.privilegeIds;
                    this.seenViewer = false;
                    this.seenEditArea = true;
                    this.seenMore = true;
                    this.more = "编辑角色";
                });
            },
            //新建权限
            addPermissionSubmit() {
                let roleName = this.addPermissionForm.roleName;
                let str = "";
                for(let i = 0 ; i < this.sels.length ; i++ ) {
                    str = str + "," + this.sels[i];
                }
                str = str.substring(1);
                let privilegeIds = str;
                let params = { roleName : roleName , privilegeIds : privilegeIds };
                this.$refs.addPermissionForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            addRole(params).then((res) => {
                                this.addLoading = false;
                                if(res.code == 0) {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    let _this = this;
                                    setTimeout(function() {
                                        _this.seenViewer = true;
                                        _this.seenAddArea = false;
                                        _this.getRolesInfo();
                                    },3000);
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
            //修改权限
            editPermissionSubmit() {
                this.$refs.editPermissionForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let str = "";
                            for(let i = 0 ; i < this.editPrivilegeIds.length ; i++ ) {
                                str = str + "," + this.editPrivilegeIds[i];
                            }
                            str = str.substring(1);
                            let params = { roleId : this.editRoleId , roleName : this.editPermissionForm.roleName , privilegeIds : str};
                            modifyRole(params).then((res) => {
                                this.addLoading = false;
                                if(res.code == 0) {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    let _this = this;
                                    setTimeout(function() {
                                        _this.seenViewer = true;
                                        _this.seenEditArea = false;
                                        _this.getRolesInfo();
                                    },3000);
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
            }
        },
        mounted() {
            this.getRolesInfo();
            this.$store.state.adminleftnavnum="/permissionSetting";
        }
    }
</script>

<style lang="scss">
    @import "../../styles/permissionSettings.scss";
</style>
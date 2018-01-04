/**
 * Created by UI150730 on 2017/4/17.
 */
import axios from 'axios/dist/axios.min';
var qs = require('qs');
let base = 'http://wwwtest.gongmall.com/privateapi';
let header = {'content-type': 'application/x-www-form-urlencoded'}
//获取登录用户的权限
export const userprivileges= params => { return axios.post(`${base}/getPrivileges`, qs.stringify(params), {headers:header}).then(res => res.data); };
//判断是否登陆
export const isLogin = params => { return axios.post(`${base}/is/login`, qs.stringify(params), {headers:header}).then(res => res.data); };
//登录
export const requestLogin = params => { return axios.post(`${base}/login`, qs.stringify(params), {headers:header}).then(res => res.data); };
//上传工资单中的下载模板
export const templetDownload = params => { return axios.post(`${base}/finance/templetDownload`, qs.stringify(params), {headers:header}).then(res => res.data); };

//上传工资单中的文件上传
export const beforeUpload = params => { return axios.post(`${base}/finance/beforeUpload`, qs.stringify(params), {headers:header}).then(res => res.data); };

//工资单列表
export const payrollList = params => { return axios.post(`${base}/finance/payrollList`, qs.stringify(params), {headers:header}).then(res => res.data); };

//撤销发薪
export const revoke = params => { return axios.post(`${base}/finance/revoke`, qs.stringify(params), {headers:header}).then(res => res.data); };

//根据时间查询工资单
export const searchPayrollByMonth = params => { return axios.post(`${base}/finance/searchPayrollByMonth`, qs.stringify(params), {headers:header}).then(res => res.data); };

//一键发薪提交
export const submitPayroll = params => { return axios.post(`${base}/finance/submitPayroll`, qs.stringify(params), {headers:header}).then(res => res.data); };

//一键发薪发送验证码
export const sendSms = params => { return axios.post(`${base}/finance/sendSms`, qs.stringify(params), {headers:header}).then(res => res.data); };

//一键发薪确认发薪
export const pay = params => { return axios.post(`${base}/finance/pay`, qs.stringify(params), {headers:header}).then(res => res.data); };

//一键发薪的详情
export const payrollDetail = params => { return axios.post(`${base}/finance/payrollDetail`, qs.stringify(params), {headers:header}).then(res => res.data); };

//一键发薪成功的详情
export const payDetail = params => { return axios.post(`${base}/finance/payDetail`, qs.stringify(params), {headers:header}).then(res => res.data); };

//资金明细列表
export const moneyDetail = params => { return axios.post(`${base}/finance/moneyDetail`, qs.stringify(params), {headers:header}).then(res => res.data); };

//获取配置的账户信息
export const accountInfo = params => { return axios.post(`${base}/finance/accountInfo`, qs.stringify(params), {headers:header}).then(res => res.data); };

//资金明细上传充值
export const uploadDeposit = params => { return axios.post(`${base}/finance/uploadDeposit`, qs.stringify(params), {headers:header}).then(res => res.data); };

//资金明细提交上传
export const uploadSubmit = params => { return axios.post(`${base}/finance/uploadSubmit`, qs.stringify(params), {headers:header}).then(res => res.data); };

//统计报表
export const statisticalForm = params => { return axios.post(`${base}/statisticalForm`, qs.stringify(params), {headers:header}).then(res => res.data); };

//首页统计报表
export const statisticalFormIndex = params => { return axios.post(`${base}/statisticalFormIndex`, qs.stringify(params), {headers:header}).then(res => res.data); };

//退出
export const requestLogout = params => { return axios.post(`${base}/logout`, qs.stringify(params), {headers:header}).then(res => res.data); };

//发布公告
export const announce = params => { return axios.post(`${base}/announce`, qs.stringify(params), {headers:header}).then(res => res.data); };

export const announcement = params => { return axios.post(`${base}/announcement`, qs.stringify(params), {headers:header}).then(res => res.data); };
//发布公告详情
export const announceDetail = params => { return axios.post(`${base}/announceDetail`, qs.stringify(params), {headers:header}).then(res => res.data); };
//系统通知
export const notice = params => { return axios.post(`${base}/notice`, qs.stringify(params), {headers:header}).then(res => res.data); };
//系统通知详情
export const noticeDetail = params => { return axios.post(`${base}/noticeDetail`, qs.stringify(params), {headers:header}).then(res => res.data); };

export const getUserList = params => { return axios.post(`${base}/setting/userList`, qs.stringify(params), {headers:header}).then(res => res.data); };

//删除用户
export const removeUser = params => { return axios.post(`${base}/setting/deleteUser`, qs.stringify(params), {headers:header}).then(res => res.data); };

//获取被编辑用户信息
export const editUser = params => { return axios.post(`${base}/setting/userModifyDetail`, qs.stringify(params), {headers:header}).then(res => res.data); };

//编辑用户信息提交
export const modifyUser = params => { return axios.post(`${base}/setting/modifyUser`, qs.stringify(params), {headers:header}).then(res => res.data); };

//获取所有角色(比如会计等职位)
export const getRolesList = params => { return axios.post(`${base}/setting/getRolesList`, qs.stringify(params), {headers:header}).then(res => res.data); };

//新增用户
export const addUserList = params => { return axios.post(`${base}/setting/addUser`, qs.stringify(params), {headers:header}).then(res => res.data); };

//获取新闻消息列表
export const getNewsList = params => { return axios.post(`${base}/news/list`, qs.stringify(params), {headers:header}).then(res => res.data); };

//获取新闻消息详情
export const getNewsDetails = params => { return axios.post(`${base}/news/detail`, qs.stringify(params), {headers:header}).then(res => res.data); };

//设置
//企业信息
export const getCompanyInfo = params => { return axios.post(`${base}/setting/companyInfo`, qs.stringify(params), {headers:header}).then(res => res.data); };

//获取公司角色与权限名
export const getRolesInfo = params => { return axios.post(`${base}/setting/getRolesInfo`, qs.stringify(params), {headers:header}).then(res => res.data); };

//新增公司角色名
export const addRole = params => { return axios.post(`${base}/setting/addRole`, qs.stringify(params), {headers:header}).then(res => res.data); };

//删除角色信息
export const deleteRole = params => { return axios.post(`${base}/setting/deleteRole`, qs.stringify(params), {headers:header}).then(res => res.data); };

//获取被编辑的公司角色信息详情
export const getCompanyRoleVoInfo = params => { return axios.post(`${base}/setting/getCompanyRoleVoInfo`, qs.stringify(params), {headers:header}).then(res => res.data); };

//提交编辑后的角色信息详情
export const modifyRole = params => { return axios.post(`${base}/setting/modifyRole`, qs.stringify(params), {headers:header}).then(res => res.data); };

//修改密码
export const modifyPassword = params => { return axios.post(`${base}/setting/modifyPassword`, qs.stringify(params), {headers:header}).then(res => res.data); };

//获取忘记密码图形验证码
export const checkCode = params => { return axios.post(`${base}/forgetpsd/checkCode`, qs.stringify(params), {headers:header}).then(res => res.data); };

//发送邮箱验证码
export const sendCheckCodeEmail = params => { return axios.post(`${base}/forgetpsd/sendCheckCodeEmail`, qs.stringify(params), {headers:header}).then(res => res.data); };

//验证邮箱验证码:
export const checkEmailCode = params => { return axios.post(`${base}/forgetpsd/checkEmailCode`, qs.stringify(params), {headers:header}).then(res => res.data); };

//忘记密码修改密码
export const resetPassword = params => { return axios.post(`${base}/forgetpsd/resetPassword`, qs.stringify(params), {headers:header}).then(res => res.data); };

//查看未读系统公告数量
export const unreadNumber = params => { return axios.post(`${base}/noticeUnreadNumber`, qs.stringify(params), {headers:header}).then(res => res.data); };

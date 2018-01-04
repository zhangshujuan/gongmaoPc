import login from './views/Login.vue'
import Home from './views/Home.vue'
import index from './views/nav1/index.vue'
import upload from './views/nav2/upload.vue'
import fastPayrollList from './views/nav2/fastPayrollList.vue'
import fastPayroll from './views/nav2/fastPayroll.vue'
import fastPayrollSuccess from './views/nav2/fastPayrollSuccess.vue'
import moneyDetail from './views/nav2/moneyDetail.vue'
import exhibition from './views/exhibition.vue'
import forgetpsd from './views/forgetpsd.vue'
import news from './views/news.vue'
import recharge from './views/nav2/recharge.vue'
import rechargeSuccess from './views/nav2/rechargeSuccess.vue'
import statisticalForm from './views/nav3/statisticalForm.vue'
import announce from './views/nav4/announce.vue'
import announcement from './views/nav4/announcement.vue'
import announceDetail from './views/nav4/announceDetail.vue'
import notice from './views/nav4/notice.vue'
import noticeDetail from './views/nav4/noticeDetail.vue'
import newsDetails from './views/newsDetails.vue'
import companyInfo from './views/nav5/companyInfo.vue'
import usermanage from './views/nav5/usermanage.vue'
import permissionSetting from './views/nav5/permissionSetting.vue'
import resetPsd from './views/nav5/resetPsd.vue'
let routes = [
    {
        path: '/',
        component:exhibition,
        hidden:true
    },//域名首页
    {
        path: '/forgetpsd',
        component: forgetpsd,
        name: '',
        hidden: true
    },
    {
        path: '/login',
        component: login,
        name: '',
        hidden: true
    },
    {
        path: '/news',
        component: news,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '工猫科技',
        children: [
            {
                path: '/index',
                component: index,
                name: '首页',
                iconCls: 'shouye',
                meta:{
                    islogin:true
                }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '财务管理',
        hidden: false,
        children: [
            {
                path: '/upload',
                component: upload,
                name: '上传工资单',
                iconCls: 'icon-01',
                hidden: false,
                meta:{
                    islogin:true
                }

            },
            {
                path: '/fastPayrollList',
                component: fastPayrollList,
                name: '一键发薪',
                iconCls: 'icon-02',
                hidden: false,
                meta:{
                    islogin:true
                }
            },
            {
                path: '/moneyDetail',
                component: moneyDetail,
                name: '资金明细',
                iconCls: 'icon-03',
                hidden: false,
                meta:{
                    islogin:true
                }
            }
        ]
    },
    {
        hidden: true,
        path: '/',
        component: Home,
        name: '一键发薪',
        children: [
            {
                path: '/fastPayroll',
                component: fastPayroll,
                name: '一键发薪',
                iconCls: 'icon-01',
                meta:{
                    islogin:true
                }
            }
        ]
    },
    {
        hidden: true,
        path: '/',
        component: Home,
        name: '一键发薪',
        children: [
            {
                path: '/fastPayrollSuccess',
                component: fastPayrollSuccess,
                name: '一键发薪',
                iconCls: 'icon-01',
                meta:{
                    islogin:true
                }
            }
        ]
    },
    {
        hidden: true,
        path: '/',
        component: Home,
        name: '资金明细',
        children: [
            {
                path: '/recharge',
                component: recharge,
                meta:{
                    islogin:true
                },
                name: '充值'

            }
        ]
    },
    {
        hidden: true,
        path: '/',
        component: Home,
        name: '资金明细',
        children: [
            {
                path: '/rechargeSuccess',
                component: rechargeSuccess,
                name: '充值成功',
                meta:{
                    islogin:true
                }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '统计报表',
        children: [
            {
                path: '/statisticalForm',
                component: statisticalForm,
                name: '统计报表',
                meta:{
                    islogin:true
                },
                iconCls: 'icon-04'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '信息管理',
        children: [
            {
                path: '/announcement',
                component: announcement,
                name: '发布公告',
                meta:{
                    islogin:true
                },
                iconCls: 'icon-05'
            },
            {
                path: '/notice',
                component: notice,
                name: '系统通知',
                meta:{
                    islogin:true
                },
                iconCls: 'icon-06'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '信息管理',
        hidden:true,
        children: [
            {
                path: '/announce',
                component: announce,
                name: '发布公告',
                meta:{
                    islogin:true
                },
                iconCls: 'icon-05'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '信息管理',
        hidden:true,
        children: [
            {
                path: '/announceDetail',
                component: announceDetail,
                name: '发布公告',
                iconCls: 'icon-05',
                meta:{
                    islogin:true
                }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '信息管理',
        hidden:true,
        isLogin:true,
        children: [
            {
                path: '/noticeDetail',
                component: noticeDetail,
                name: '发布公告',
                meta:{
                    islogin:true
                },
                iconCls: 'icon-05'
            }
        ]
    },
    {
        path: '/newsDetails',
        component: newsDetails,
        name: '信息管理',
        hidden:true
    },
    {
        path: '/',
        component: Home,
        name: '设置',
        isLogin:true,
        hidden:false,
        children: [
            {
                path: '/companyInfo',
                component: companyInfo,
                name: '公司信息',
                meta:{
                    islogin:true
                },
                hidden:false,
                iconCls: 'icon-07'
            },
            {
                path: '/usermanage',
                component: usermanage,
                name: '用户管理',
                meta:{
                    islogin:true
                },
                hidden:false,
                iconCls: 'icon-08'
            },
            {
                path: '/permissionSetting',
                component: permissionSetting,
                name: '权限设置',
                meta:{
                    islogin:true
                },
                hidden:false,
                iconCls: 'icon-09'
            },
            {
                path: '/resetPsd',
                component: resetPsd,
                name: '修改密码',
                meta:{
                    islogin:true
                },
                hidden:false,
                iconCls: 'icon-10'
            }
        ]
    }
];

export default routes;
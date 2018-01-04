import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
import {isLogin} from "./api/api"
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
    //mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.islogin)) {
        if(localStorage.getItem("user")) {
            isLogin({}).then(res =>{
                if(res.code !== 0) {
                    localStorage.removeItem("user");
                    next({
                        path: '/'
                    })
                } else {
                   next()
                }
            });
        } else {
            next({
                path: '/'
            })
        }

    } else {
        next()
    }
});


new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')

/**
 * Created by Administrator on 2016/2/25.
 */
import Vue from 'vue'
import Router from 'vue-router'
import { configRouter } from './router-config'
import App from './view/App.vue'     //入口模板

//install router
Vue.use(Router)

//routing
var router = new Router({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
})

//config router
configRouter(router);

//start
router.start(App, '#app');
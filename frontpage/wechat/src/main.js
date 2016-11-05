/**
 * Created by Administrator on 2016/2/25.
 */
import Vue from 'vue'
import Router from 'vue-router'
import { configRouter } from './router-config'
import VueResource from 'vue-resource'
import App from './view/App.vue' //入口模板
import Title from './components/title/Title.vue'
import toast from './components/toast/index.vue'
//install router
Vue.use(Router)
Vue.use(VueResource)

//routing
var router = new Router({
    hashbang: true,
    history: false,
    saveScrollPosition: false,
    transitionOnLoad: false
})
//components
Vue.component('title',Title);
// Vue.component('title',{props:['msg']});
//config router
configRouter(router);

//start
router.start(App, '#app');
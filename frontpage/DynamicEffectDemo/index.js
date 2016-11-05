/**
 * Created by whistle on 16-7-20.
 */
import Vue from 'vue';
import Router from 'vue-router';
import {configRouter} from './router-config/router-config';
import App from './vuePage/app.vue';

Vue.use(Router);

var router = new Router({
    hasbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});

configRouter(router);

router.start(App, '#root')


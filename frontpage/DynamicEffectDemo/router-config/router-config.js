

/**
 * Created by whistle on 16-7-20.
 */
export function configRouter(router) {
    router.map({
        '/index': {
            name: 'index',
            component: require('../vuePage/index.vue'),
            auth: true
        },
        '/inandout': {
            name: 'inandout',
            component: require('../vuePage/inandout.vue')
        },
        '/juhua': {
            name: 'juhua',
            component: require('../vuePage/juhua.vue')
        },
        '/wave': {
            name: 'wave',
            component: require('../vuePage/wave.vue')
        },
        '/yinguang': {
            name: 'yinguang',
            component: require('../vuePage/yinguang.vue')
        },
        '/erji-router': {
            name: 'erji-router',
            component: require('../vuePage/Erji-router/erji-parent.vue'),
            subRoutes: {
                '/child-1': {
                    name: 'child-1',
                    component: require('../vuePage/Erji-router/erji-children-1.vue')
                },
                '/child-2': {
                    name: 'child-2',
                    component: require('../vuePage/Erji-router/erji-children-2.vue')
                }
            }
        }
    });

    
    router.beforeEach(transition => {
        window.scrollTo(0,0);
        //alert(transition.to.auth);
        transition.next();
    });

    router.redirect({
        '*': '/index'
    });

}
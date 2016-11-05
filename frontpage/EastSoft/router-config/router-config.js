

/**
 * Created by whistle on 16-7-20.
 */
import Index from '../view/index.vue';
import AreaConfirm from '../view/areaConfirm.vue';
import Destination from '../view/destination.vue';

import Test from '../view/test.vue';

import EastBuy from '../view/eastBuy.vue';
import OrderConfirm from '../view/orderConfirm.vue';
import EastFlight from '../view/eastFlight.vue';

export function configRouter(router) {
    router.map({
        '/index': {
            name: 'index',
            component: Index,
        },
        '/eastbuy/:country': {
            name:'east-buy',
            component:EastBuy,
        },
        '/order-confirm/:id/:buyDate/:totalPrice': {
            name:'order-confirm',
            component:OrderConfirm,
        },
        '/area-confirm': {
            name: 'area-confirm',
            component: AreaConfirm,
        },
        '/detination/:id': {
            name: 'destination',
            component: Destination,

        },
        '/east-flight': {
            name: 'east-flight',
            component: EastFlight,
        },
        '/test': {
            name: 'test',
            component: Test,
        },

    });

    
    router.beforeEach(transition => {
        try {
            window.scrollTo(0,0);
            transition.next();
        } catch(e) {
            console.log('route caught', e);
        }
    });

    router.redirect({
        '*': '/east-flight'
    });

}
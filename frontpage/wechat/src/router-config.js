import Index from './view/Index.vue' //主页 入口模板

//user
import UserCenter from './view/user/UserCenter.vue'
 import System from './view/user/sys/System.vue'
import About from './view/user/sys/About.vue'
import Language from './view/user/sys/Language.vue'
import FeedBack from './view/user/sys/FeedBack.vue'
import UserInfo from './view/user/info/UserInfo.vue'
import SetUsername from './view/user/info/SetUsername.vue'
import SetPassword from './view/user/info/SetPassword.vue'
import MyQrcode from './view/user/info/MyQrcode.vue'
import UserAddress from './view/user/address/UserAddress.vue'
import EditAddress from './view/user/address/EditAddress.vue'
import AddAddress from './view/user/address/AddAddress.vue'
import DefaultAddress from './view/user/address/DefaultAddress.vue'
import GiftDetail from './view/user/gift/GiftDetail.vue'
import UserCard from './view/user/cards/UserCard.vue'
import UserMessage from './view/user/message/UserMessage.vue'
import MessageDetail from './view/user/message/MessageDetail.vue'
import OrderExpe from './view/user/orderexpe/OrderExpe.vue'
import OrderCard from './view/user/ordercard/OrderCard.vue'
import IccidCode from './view/user/cards/IccidCode.vue'
import UnBunding from './view/user/cards/UnBunding.vue'
import ShoppingCart from './view/user/shopbag/ShoppingCart.vue'
import MyPackageDetail from './view/user/ordercard/MyPackageDetail.vue'
import ConsumptionRecord from './view/user/info/ConsumptionRecord.vue';
//system package
import SystemPackage from './view/package/SystemPackage.vue'
import ChooseArea from './view/package/ChooseArea.vue'
import SystemPackageDetailPackage from './view/package/SystemPackageDetailPackage.vue'
import PackageDetail from './view/package/PackageDetail.vue'
import DiscountPackage from './view/package/DiscountPackage.vue'
import AreaSearch from './view/package/AreaSearch.vue'

//system card
import SystemCard from './view/card/SystemCard.vue'
import CardPurchase from './view/card/CardPurchase.vue'

// import UserCardBag from './view/user/cards/UserCardBag.vue'

//help page
import UserHelp from './view/user/help/UserHelp.vue'
import HelpInfo from './view/user/help/HelpInfo.vue'
import HelpClassify from './view/user/help/HelpClassify.vue'

//APN
import APNList from './view/apn/APNList.vue'
import APNDetail from './view/apn/APNDetail.vue'
import APNHome from './view/apn/APNHome.vue'
//recharge
import RechargeCenter from './view/recharge/rechargeCenter.vue'
//login / register
import Login from './view/Login.vue'
import Register from './view/Register.vue'
import BackPassword from './view/user/info/BackPassword.vue'
//Other libs
import Utils from './common/utils.js'
import RedBag from './view/user/gift/RegBag.vue'
//orderpack
import IccidCodeGift from './view/user/orderpack/IccidCodeGift.vue'
import Test from './view/test.vue'
import MyPackage from './view/user/ordercard/MyPackage.vue'
import OrderDetails from './view/user/ordercard/OrderDetails.vue'
//order
import OrderInternational from './view/user/ordercard/OrderInternational.vue'
import OrderConfirm from './view/user/shopbag/OrderConfirm.vue'
//pay
import PaySuccess from './view/user/pay/PaySuccess.vue'
import PayFail from './view/user/pay/PayFail.vue'
//card
import CardDetails from './view/user/cards/CardDetails.vue'
//订单追踪
import ExpressAge from './view/user/ordercard/ExpressAge.vue'
//card及其套餐
import CardPackage from './view/card/CardPackage.vue'
export function configRouter(router){
	//normal routes
	router.map({
		'/test': {
			name : "test",
			component: Test,
			auth: false
		},
		'/index': {            
			name : "index",
			component: Index,
			auth: false
		},
		'/login': {
			name : "login",
			component: Login,
			auth: false
		},
		'/register': {
			name : "register",
			component: Register,
			auth: false
		},
		//个人业务
		'/usercenter': {       
			name : "usercenter",
			component: UserCenter,
			auth: true
		},
		'/system': {
			name : "system",
			component: System,
			auth: false
		},
		'/about': {
			name : 'about',
			component: About,
			auth: true
		},
		'/language': {
			name : 'language',
			component: Language,
			auth: true
		},
		'/feedback': {
			name : 'feedback',
			component: FeedBack,
			auth: true
		},
		'/userinfo': {
			name : 'userinfo',
			component: UserInfo,
			auth: true
		},
		'/setusername/:username': {
			name : 'setusername',
			component: SetUsername,
			auth: true
		},
		'/setpassword': {
			name : 'setpassword',
			component: SetPassword,
			auth: true
		},
		'/backpassword': {
			name: 'backpassword',
			component: BackPassword,
			auth: false
		},
		'/myqrcode': {
			name : 'myqrcode',
			component: MyQrcode,
			auth: true
		},
		'/useraddress': {
			name : 'useraddress',
			component: UserAddress,
			auth: true
		},
		'/addaddress': {
			name : 'addaddress',
			component: AddAddress,
			auth: true
		},
		'/editaddress/:id': {
			name : 'editaddress',
			component: EditAddress,
			auth: true
		},
		'/giftdetail/:id/:syscouponid': {
			name : 'giftdetail',
			component: GiftDetail,
			auth: true
		},
		'/usercard': {
			name : 'usercard',
			component: UserCard,
			auth: true
		},
		// '/usercardbag': {
		// 	name : 'usercardbag',
		// 	component: UserCardBag,
		// 	auth: true
		// },
		'/usermessage': {
			name : 'usermessage',
			component: UserMessage,
			auth: true
		},
		'/messagedetail/:id': {
			name : 'messagedetail',
			component: MessageDetail,
			auth: true
		},
		'/orderexpe': {
			name : 'orderexpe',
			component: OrderExpe,
			auth: true
		},
		'/myorders': {
			name: 'myorders',
			component: OrderInternational,
			auth: true
		},
		'/iccidcodegift/:id/:status': {
			name : 'iccidcodegift',
			component: IccidCodeGift,
			auth: true
		},
		'/ordercard': {
			name : 'ordercard',
			component: OrderCard,
			auth: true
		},
		'/systempackage': {
			name : 'systempackage',
			component: SystemPackage,
			auth: false
		},
		'/systempackagedetail/:packageid': {
			name: 'systempackagedetail',
			component: SystemPackageDetailPackage,
			auth: false
		},
		'/choosearea/:idx':{
			name:'choosearea',
			component:ChooseArea,
			auth: false
		},
		'/systemcard': {
			name : 'systemcard',
			component: SystemCard,
			auth: false
		},
		'/userhelp': {
			name: 'userhelp',
			component: UserHelp,
			auth: false
		},
		'/helpinfo/:id': {
			name: 'helpinfo',
			component: HelpInfo,
			auth: false
		},
		'/apnlist/:sec': {
			name: 'apnlist',
			component: APNList
		},
        '/apndetail/:sec/:id': {
            name: 'apndetail',
            component: APNDetail,
            auth: false
        },
        '/apnhome': {
        	name: 'apnhome',
        	component: APNHome,
        	auth: false
        },
        '/rechargecenter':{
        	name: 'rechargecenter',
        	component: RechargeCenter,
        	auth: false
        },
        '/iccidcode':{
        	name: 'iccidcode',
        	component: IccidCode,
        	auth: true
        },
        '/unbunding':{
        	name: 'unbunding',
        	component: UnBunding,
        	auth: true
        },
        '/shoppingcart':{
        	name: 'shoppingcart',
        	component: ShoppingCart,
        	auth: true
        },
        '/orderconfirm': {
        	name: 'orderconfirm',
        	component: OrderConfirm,
        	auth: true
        },
        '/packagedetail/:packageid':{
        	name: 'packagedetail',
        	component: PackageDetail,
        	auth:false
        },
        '/cardpurchase':{
        	name: 'cardpurchase',
        	component: CardPurchase,
        	auth: false
        },
        '/discountpackage':{
        	name: 'discountpackage',
        	component: DiscountPackage,
        	auth: false
        },
        '/paysuccess': {
        	name: 'paysuccess',
        	component: PaySuccess,
        	auth: true
        },
        '/payfail': {
        	name: 'payfail',
        	component: PayFail,
        	auth: true
        },
        '/helpclassify/:type':{
        	name: 'helpclassify',
        	component: HelpClassify,
        	auth: false
        },
        '/mypackage': {
        	name: 'mypackage',
        	component: MyPackage,
        	auth: true
        },
        '/orderdetails/:orderCode':{
        	name: 'orderdetails',
        	component: OrderDetails,
        	auth: true
        },
        '/areasearch': {
        	name: 'areasearch',
        	component: AreaSearch,
        	auth: false
        },
        '/defaultaddress': {
        	name: 'defaultaddress',
        	component: DefaultAddress,
        	auth: false
        },
        '/redbag': {
        	name: 'redbag',
        	component: RedBag,
        	auth: true
        },
        '/mypackagedetail/:item':{
        	name:'mypackagedetail',
        	component:MyPackageDetail,
        	auth:true,
        },
        '/carddetails/:id': {
        	name: 'carddetails',
        	component: CardDetails,
        	auth: true
        },
        '/expressage': {
        	name: 'expressage',
        	component: ExpressAge,
        	auth: false
        },
        '/consumptionrecord': {
        	name: 'consumptionrecord',
        	component: ConsumptionRecord,
        	auth: true
        },
        '/cardpackage/:id': {
        	name: 'cardpackage',
        	component: CardPackage,
        	auth: false
        }
	});
	
	//global before
	router.beforeEach(transition =>{
		try {
			//滚动页面最上方
		    window.scrollTo(0, 0);

		    //登录中间验证，页面需要登录而没有登录的情况，直接跳转登录
		    if (transition.to.auth) {
		    	if (Utils.getCookie("TBUID")) {
		    		transition.next();
		    	} else {
		    		let redirect = encodeURIComponent(transition.to.path);
		    		transition.redirect('/login?redirect='+redirect);
		    	}
		    } else {
		    	transition.next();	
		    }
		} catch (e) {
			// transition.next();
		}
	    // try {
	    // 	transition.next();
	    // }catch(e) {
	    // 	// transition.next();
	    // 	console.log('err');
	    // }
	});
	//redirect
	router.redirect({
	    '*': '/index'
	})
}
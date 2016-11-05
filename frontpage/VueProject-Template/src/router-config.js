import Index from './view/Index.vue' //主页 入口模板

//Other libs
import Utils from './common/utils.js'

export function configRouter(router){
	//normal routes
	router.map({
		'/index': {            //主页
			name : "index",
			component: Index
		}
	});
	
	//global before
	router.beforeEach(transition =>{
		//滚动页面最上方
	    window.scrollTo(0, 0);

	    //登录中间验证，页面需要登录而没有登录的情况，直接跳转登录
	    if (transition.to.auth) {
	    	if (Utils.getCookie("tbtoken")) {
	    		transition.next();
	    	} else {
	    		var redirect = encodeURI(transition.to.path);
	    		transition.redirect('/login?redirect='+redirect);
	    	}
	    } else {
	    	transition.next();
	    }
	});

	//redirect
	router.redirect({
	    '*': '/index'
	})
}
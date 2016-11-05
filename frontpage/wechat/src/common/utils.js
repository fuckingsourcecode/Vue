//工具类
export default class Utils{
	//设置Cookie
	static setCookie(name,value){
	    var exp = new Date();
	    exp.setTime(exp.getTime() + 24*30*12*60*60*1000);
	    document.cookie = name + "=" + escape(value)+";expires="+exp.toGMTString();
	}

	//获取Cookie
	static getCookie(name){
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	    if (arr = document.cookie.match(reg)) {
	        return unescape(arr[2]);
	    }else{
	        return null;
	    }
	}
	
	//删除Cookie
	static delCookie(name){ 
	    var exp = new Date(); 
	    exp.setTime(exp.getTime() - 1);  
	    document.cookie= name + "="+";expires="+exp.toGMTString(); 
	} 

	//获取回调地址
	static getDirectUrl(local) {
        var href = local.href;
        var intPos = href.indexOf("redirect=");
        return href.substring(intPos+9);
    }

    //获取OpenId
	static getOpenId(local){
    	var href = local.href;
        var beginPos = href.indexOf("openid=")+9;
        var endPos = href.indexOf("#!");
        alert(href.substring(beginPos,endPos));
        return href.substring(beginPos,endPos);
    }

    //判断正确的电话号吗
    static  checkPhoneNum(phoneNum){
		if(isNaN(phoneNum) && phoneNum.toString().length!=11 && phoneNum.toString().indexOf(".")>0 && phoneNum.toString().charAt(0)=="0"){
			alert("请输入正确的电话号码。");
			return false;
		}else{
			return true;
		}
	}

	//空检测
	static checkNull(arry){
		for(var i=0;i<arry.length;i++){
			if(arry[i]==''){
				alert("请填入完整数据！")
				return false;
			}else{
				return true;
			}
		}
	}
}
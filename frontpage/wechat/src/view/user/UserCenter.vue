<template>
	<div class="usercenter">
		<title title="个人中心"  showbtn="true" btnname="消息" btnlink="usermessage"></title>
		<div class="ship-wrap">
			  <div class="wave1 wave"></div>
			  <div class="wave2 wave"></div>
		</div>
		<div class="usercenter-top">
			<li v-link="{name: 'userinfo'}"><img class="usercenter-top-icon" v-bind:src="imgPath?imgPath:'/static/images/temp/head-icon.png'"/></li>
			<li class="usercenter-top-telphone" v-if="username == ''">{{telphone}}</li>
			<li class="usercenter-top-info" v-show="loginflag" v-if="username != ''">
				{{username}}
			</li>
			<div class="usercenter-top-btn-area">
				<a v-link="{name:'redbag'}">
					<span>{{couponnums}}</span><br/>
					优惠卷
				</a>
				<a v-link="{name:'usercard'}">
					<span>{{cardnums}}</span><br/>
					卡包
				</a>
				<!-- v-link="{name:'shoppingcart'}" -->
				<a @click="construct" @click="">
					<span>0</span><br/>
					购物车
				</a>
			</div>
		</div>
		<div class="usercenter-btn-areas">
			<div class="usercenter-btn-area clearfix">
			    <!-- <a class="usercenter-balance">
				    <span style="position:relative;float:left;display:inline-block;margin-left:10px;">
					    <span style="font-size:0.7em;color:#aaa;">余额:</span>
					    <span v-if="!canSee" style="font-size:0.7em;color:#aaa;">****</span>
					    <img v-if="!canSee" src="/static/images/icon/passnosee-1.svg" @click="setCanSee(true)" style="width:25px;height:21px;float:right;margin-top:14px;">
					    <span v-if="canSee" style="font-size:0.7em;color:#aaa;"><span v-text="balance/100"></span>元</span>
					    <img v-if="canSee" src="/static/images/icon/passsee-1.svg" @click="setCanSee(false)" style="width:25px;height:21px;float:right;margin-top:14px;">
				    </span>
				    <span style="position:relative;float:right;display:inline-block;height:55px;" v-link="{name:'rechargecenter'}">
					    <span style="font-size:0.7em;color:#aaa;">立即充值</span>
					    <img src="/static/images/icon/more-2.png" style="margin-right:8px;width:16px;height:16px;vertical-align:middle;">
				    </span>
			    </a>
 -->
			    <a v-link="{name: 'rechargecenter' }" class="usercenter-balance">
					<img class="usercenter-balance-icon" src="/static/images/icon/account_balance.png">
					余额
					<img src="/static/images/icon/more-2.png" style="margin-right:8px;width:16px;height:16px;margin-top:20px;float:right">
					<span v-text="'￥'+(balance/100).toFixed(2)"></span>
					
				</a>

				<a v-link="{name: 'mypackage'}">
					<img class="usercenter-mypkg-icon" src="/static/images/icon/icon-0.png">
					我的套餐
					<img src="/static/images/icon/more-2.png" style="margin-right:8px;width:16px;height:16px;margin-top:20px;float:right">
				</a>
				<a v-link="{name: 'myorders'}">
					<img class="usercenter-mycard-icon" src="/static/images/icon/icon-1.png">
					我的订单
					<img src="/static/images/icon/more-2.png" style="margin-right:8px;width:16px;height:16px;margin-top:20px;float:right">
				</a>

				<a v-link="{name: 'consumptionrecord' }" class="clearfix">
					<img class="usercenter-comsumption-icon" src="/static/images/icon/comsumptionrecord.png">
					消费/充值记录
					<img src="/static/images/icon/more-2.png" style="margin-right:8px;width:16px;height:16px;margin-top:20px;float:right">
				</a>
			</div>
			<div class="usercenter-btn-area">
				<a v-link="{name: 'useraddress'}">
					<img class="usercenter-myaddr-icon" src="/static/images/icon/icon-3.png">
					收货地址
					<img src="/static/images/icon/more-2.png" style="margin-right:8px;width:16px;height:16px;margin-top:20px;float:right">
				</a>
				<a v-link="{name: 'userinfo'}">
					<img class="usercenter-myinfo-icon" src="/static/images/icon/icon-4.png">
					个人信息
					<img src="/static/images/icon/more-2.png" style="margin-right:8px;width:16px;height:16px;margin-top:20px;float:right">
				</a>
			</div>
			<div class="usercenter-btn-area">
				<a v-link="{name: 'feedback'}">
					<img class="usercenter-sysinfo-icon" src="/static/images/icon/icon-5.png">
					意见反馈
					<img src="/static/images/icon/more-2.png" style="margin-right:8px;width:16px;height:16px;margin-top:20px;float:right">
				</a>
				<a v-link="{name: 'userhelp'}">
					<img class="usercenter-syshelp-icon" src="/static/images/icon/icon-6.png">
					帮助
					<img src="/static/images/icon/more-2.png" style="margin-right:8px;width:16px;height:16px;margin-top:20px;float:right">
				</a>
				<a v-link="{name:'system'}">
					<img class="usercenter-sys-icon" src="/static/images/icon/icon-7.png">
					设置
					<img src="/static/images/icon/more-2.png" style="margin-right:8px;width:16px;height:16px;margin-top:20px;float:right">
				</a>
			</div>
		</div>
	</div>
</template>
<script>
import Utils from '../../common/utils.js'
import Config from '../../common/config.js'
// import lineToast from '../../components/toast/lineToast.vue'
export default{
	data:function(){
		return {
			loginflag:false,
			telphone:'未登录',
			username:'',
			cardnums:0,
			couponnums:0,
			messagenums:0,
			balance:'0',
			canSee:false,
			linetoast: '',
			imgPath: ''
		}
	},
	components: {
		// lineToast
	},
	ready:function(){
		var self = this;
		$.post(Config.getApiURL()+"/user/info",{},
        function(result){
        	console.log(result);
        	if (result.status == 0) {
        		self.loginflag = true;
        		self.telphone = result.data.mobile;
        		self.username = result.data.username;
        		self.cardnums = result.data.cardNum;
        		self.couponnums = result.data.couponNum;
        		self.messagenums = 0;
        		self.balance = result.data.balance;
        		self.imgPath = result.data.headThumb;

        		if(!self.imgPath.startsWith("weixin")) {
        			self.imgPath = Config.getMediaURL() + result.data.headThumb;
        		}
            }else{
            	self.loginflag = false;
            }
        });
	},
	methods:{
		setCanSee:function(val) {
			this.canSee = val;
		},
		construct: function() {
			$('.linetoast-text').text("功能暂未开通，敬请期待");
			$('.linetoast').css('display', 'block');
			setTimeout(function () {
				$('.linetoast').css('display', 'none');
			}, 3000);
		}
		
	}
}


</script>
<style type="text/css">
	.usercenter-top{
		width: 100%;
		position:absolute;
		top:40px;
		text-align: center;
	}
	.usercenter-top-msg-btn{
		display: block;
		width: 40px;
		height: 40px;
		float:right;
	}
	.usercenter-top-back-btn{
		display: block;
		width: 65px;
		height: 40px;
		line-height: 40px;
		color: #fff;
		float:left;
	}
	.usercenter-top-msg{
		width: 25px;
		height: 25px;
		position: relative;
		top: 5px;
	}
	.usercenter-top-back{
		width: 20px;
		height: 20px;
		position: relative;
        top: 4px;
	}
	.usercenter-top-telphone{
		color: white;
		font-weight: bold;
		font-size: 18px;
		letter-spacing: 2px;
		position: relative;
		top: 10px;
	}
	.usercenter-top-icon{
		width: 80px;
		height: 80px;
		border-radius: 40px;
		margin-top:20px;
		position: relative;
	}
	.usercenter-top-info{
		color: white;
		font-weight: bold;
		position: relative;
		box-shadow: 10px;
		top: 20px;
	}
	.usercenter-top-info a{
		display: block;
		float: left;
		background-color: white;
		width: 80px;
		height: 25px;
		line-height: 25px;
		color: #0066aa;
		margin-top: 5px;
	}
	/*顶部按钮区域*/
	.usercenter-animation{
		width: 100%;
		height: 60px;
		bottom: 0px;
		left: 0;
		right: 0;
	}
	.usercenter-top-btn-area{
		width: 100%;
		height: 60px;
		margin-top:60px;
	}
	.usercenter-top-btn-area a {
		display: block;
		float: left;
		width: 33.3%;
		line-height: 22px;
		color: white;
	}
	/*列表按钮区域*/
	.usercenter-btn-areas{
		width: 100%;
		z-index:10;
		background-color:#eee;
	}
	.usercenter-balance span {
		height: 55px;
	}
	.usercenter-btn-area{
		margin-bottom:10px;
	}
	.usercenter-btn-area a{
		display: block;
		width: 100%;
		height: 55px;
		line-height: 55px;
		color: #000000;
		font-size: 1rem;
		background-color:white;
		clear: both;
	}
	.usercenter-btn-area a+a{
		margin-top:1px;
	}
	.usercenter-btn-area img{
		position: relative;
		margin-left: 10px;
	}
	/*图标*/
	.usercenter-mypkg-icon{
		top: 5px;
		width: 23px;
		margin-right: 3px;
	}
	.usercenter-mycard-icon{
		top: 5px;
		width: 22px;
		margin-right: 3px;
	}
	.usercenter-myphone-icon{
		width: 20px;
		top: 9px;
		margin-right: 5px;
	}
	.usercenter-myaddr-icon{
		top: 3px;
		width: 21px;
		margin-right: 4px;
	}
	.usercenter-myinfo-icon{
		width: 22px;
		top: 2px;
		margin-right: 3px;
	}
	.usercenter-sysinfo-icon{
		width: 22px;
		top: 2px;
		margin-right: 3px;
	}
	.usercenter-syshelp-icon{
		width: 23px;
		top: 4px;
		margin-right: 3px;
	}
	.usercenter-sys-icon{
		width: 22px;
		top: 3px;
		margin-right: 3px;
	}
	.usercenter-comsumption-icon {
		width:30px;
		left:-5px;
		top:5px;
		margin-right:-5px;
		background-size:100% 100%;
	}
	.usercenter-balance-icon {
		width:26px;
		left:-2px;
		top:8px;
		height:30px;
		background-size:100% 100%;
	}
	.usercenter-balance-icon+img+span {
		float:right;
		display:block;
		color:#f75709;
	}

/*顶部动画*/
.ship-wrap {
	z-index:0;
  	position: relative;
  	left: 0;
  	right: 0;
  	top: 0;
 	bottom: 0;
 	margin: auto;
  	overflow: hidden;
  	width: 100%;
  	height: 230px;
  	background-color: #aae7ff;
  	-webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  	-webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.ship-wrap .wave {
  position: absolute;
  width: 1200px;
  -webkit-transform-origin: center center;
          transform-origin: center center;
}
.ship-wrap .wave:before {
  content: "";
  position: absolute;
  left: 0;
  top: -10px;
  right: 0;
  background-repeat: repeat;
  height: 10px;
  background-size: 20px 20px;
  background-image: -webkit-radial-gradient(10px -5px circle, rgba(0, 0, 0, 0) 12px, #91b9ff 12px);
  background-image: radial-gradient(circle at 10px -5px, rgba(0, 0, 0, 0) 12px, #91b9ff 12px);
}
.ship-wrap .wave:after {
  content: "";
  position: absolute;
  left: 0;
  top: -15px;
  right: 0;
  background-repeat: repeat;
  height: 15px;
  background-size: 40px 20px;
  background-image: -webkit-radial-gradient(10px 15px circle, #91b9ff 12px, rgba(0, 0, 0, 0) 13.04348px);
  background-image: radial-gradient(circle at 10px 15px, #91b9ff 12px, rgba(0, 0, 0, 0) 13.04348px);
}
.ship-wrap .wave1 {
  height: 100px;
  background-color: #91b9ff;
  opacity: .8;
  -webkit-animation: wave1 15s ease-in-out infinite;
          animation: wave1 15s ease-in-out infinite;
  bottom: -41.53846px;
  z-index: 3;
}
.ship-wrap .wave2 {
  height: 100px;
  background-color: #91b9ff;
  opacity: .4;
  left: -100%;
  -webkit-animation: wave2 20s ease-out infinite;
          animation: wave2 20s ease-out infinite;
  bottom: -24.44444px;
  z-index: 1;
}
.ship-wrap .main {
  width: 150px;
  height: 33.33333px;
  background-color: #684000;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 133.33333px;
  z-index: 2;
  -webkit-animation: ship 3s linear infinite;
          animation: ship 3s linear infinite;
}
.ship-wrap .main:before, .ship-wrap .main:after {
  content: '';
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
  border: 0;
}
.ship-wrap .main:before {
  left: -33.33333px;
  border-top: 33.33333px solid #684000;
  border-left: 33.33333px solid transparent;
  border-bottom: 33.33333px solid transparent;
}
.ship-wrap .main:after {
  right: -33.33333px;
  border-top: 33.33333px solid #684000;
  border-bottom: 33.33333px solid transparent;
  border-right: 33.33333px solid transparent;
}
.ship-wrap .main-mast {
  width: 3.75px;
  height: 150px;
  background-color: #684000;
  position: absolute;
  right: 20%;
  bottom: 33.33333px;
  z-index: 2;
}
.ship-wrap .main-course {
  width: 75px;
  height: 120px;
  background-color: #fff;
  position: absolute;
  right: 20%;
  top: -142.85714px;
  border-top-left-radius: 100%;
}
.ship-wrap .main-course:after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 110%;
  height: 3.75px;
  background-color: #684000;
}
.ship-wrap .fore-course {
  position: absolute;
  right: -3.33333px;
  top: -176.47059px;
  border-bottom: 120px solid #fff;
  border-right: 33.33333px solid transparent;
  border-top: 31.57895px solid transparent;
}
.ship-wrap .fore-course:after {
  position: absolute;
  right: 0;
  top: 0;
  width: 3px;
  height: 15px;
  background-color: red;
}
.ship-wrap .flag {
  background-color: red;
  position: absolute;
  top: -150px;
  right: 6px;
  width: 25px;
  height: 10px;
}
@-webkit-keyframes wave1 {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(-25%);
            transform: translateX(-25%);
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
}
@keyframes wave1 {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(-25%);
            transform: translateX(-25%);
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
}
@-webkit-keyframes wave2 {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(15%);
            transform: translateX(15%);
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
}
@keyframes wave2 {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(15%);
            transform: translateX(15%);
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
}
@-webkit-keyframes ship {
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  75% {
    -webkit-transform: rotate(-3deg);
            transform: rotate(-3deg);
  }
  100% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
}
@keyframes ship {
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  75% {
    -webkit-transform: rotate(-3deg);
            transform: rotate(-3deg);
  }
  100% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
}

</style>

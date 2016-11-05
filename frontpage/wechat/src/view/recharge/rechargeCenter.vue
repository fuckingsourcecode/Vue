<template>
	<div class="rechargeCenter">
		<title title="充值" backlink="index" showbtn="false"></title>
		<div class="wrapper">
			<!-- <div class="rechargeCenter-account">
				<input type="tel" placeholder=" 请输入账户名" autofocus="true">
			</div> -->
			<div class="rechargeCneter-price clearfix">
				<a href="javascript:void(0)" v-for="info in list"
					@click="show(info.price/100, info.id, $index)" track-by="$index" v-bind:class="{'recharge-choose': selectIdx == $index}">
					<h3>{{info.oldPrice/100}}元</h3>
					<p>售价：{{info.price/100}}元</p>
				</a>
			</div>
			<div class="recharge-type">
		    	<div class="recharge-type-title">选择支付方式：</div>
		    	<div class="recharge-wx">
		    		<img src="/static/images/icon/wx.png"/>
		    		<div class="recharge-wx-content">
		    			<div class="recharge-wx-title">微信支付</div>
		    			<div class="recharge-wx-tip">推荐安装微信5.0以上版本使用</div>
		    		</div>
		    		<input type="radio" style="float:right;height:45px;" checked="checked"/>
		    	</div>
		    </div>
		    <div class="recharge-tip">
		    	温馨提醒：
		    	<ol>
		    		<li>充值到账时间为5-10分钟，如果超过30分钟仍未到账，请联系客服核实</li>
		    		<li>客服热线：<a href="tel:4001-0303-98">4001-0303-98</a> </li>
		    	</ol>
		    </div>
		</div>
		<div class="recharge-pay">
			<button @click="showDiv('rechargecenter-mydiv','rechargecenter-fade')" class="recharge-paybtn">确认支付</button>
		</div>
		<div id="rechargecenter-fade" class="rechargecenter-black_overlay" @click="closeDiv('rechargecenter-mydiv','rechargecenter-fade')"></div>
	    <div id="rechargecenter-mydiv" class="rechargecenter-white_content animated fadeInUp">
	        <p>请在新开的页面完成支付</p>
	        <div class="rechargecenter-mydiv-content">
	        	<div class="rechargecenter-mydiv-ok">
		        	<img src="/static/images/icon/ok.png" alt="">
					<p>如已经完成支付，请点击：<a v-link="{name: 'myorders'}">已完成支付</a></p>
	        	</div>
	        	<div class="rechargecenter-mydiv-warning">
		        	<img src="/static/images/icon/warning.png" alt="">
					<p>如付款遇到问题，请点击：<a>重新支付</a></p>
	        	</div>
	        </div>
	    </div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
import Utils from '../../common/utils.js'
import Config from '../../common/config.js' 
import Toast from '../../components/toast/index.vue'
import toastDialog from '../../components/dialog/toastDialog.vue'
	export default {
		data: function () {
			return {
				test: 0,
				id: '',
				list:[],
				timestamp: '',
		    	nonceStr: '',
		    	package: '',
		    	signType: '',
		    	paySign: '',
		    	toastdialogtitle: '', 
				toastdialogcontent: '',
				selectIdx: 0
			}
		},
		components: {
			toast:Toast,
			toastDialog
		},
		ready: function () {
			var self = this;
			$.ajax({
				beforeSend: function () {
	        		$('.weui_loading_toast').css('display', 'block');
	        	},
	        	complete: function () {
	        		$('.weui_loading_toast').css('display', 'none');
	        	}, 
				type: 'post',
				url: Config.getApiURL() + "/sys/recharge/list",
	        	success:function(result){
		        	if (result.status == 0) {
		        		self.list = result.data;
		        		self.id = self.list[0].id;
		            }else{
		            	self.toastdialogtitle = "反馈提示";
						self.toastdialogcontent = result.tip;
						$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
							$('#dialog2').off('click').hide();
						});
		            }
		        }
	        });
	        window.sessionStorage.removeItem("orderCode");
		},
		methods:{
			//上拉框，拉出支付信息
			show: function (pirce, id, index) {
				this.test = pirce;
				this.id = id;
				this.selectIdx = index;
				// $(".rechargeCneter-price a").removeClass("recharge-choose");
				// $(".rechargeCneter-price a").eq(index).addClass("recharge-choose");
			},
		    pay: function () {
		    	if (!(Utils.getCookie("TBUID"))) {
		    		this.$router.go('/login');
		    		return false;
		    	}
            	var self = this;      
            	console.log(this.id);     	
            	$.ajax({
            		beforeSend: function () {
		        		$('.weui_loading_toast').css('display', 'block');
		        	},
		        	complete: function () {
		        		$('.weui_loading_toast').css('display', 'none');
		        	}, 
				  	url: Config.getApiURL()+'/user/expe/createOrder',
				  	type: 'POST',
				 	dataType: 'json',
				 	data: JSON.stringify([{id: self.id, count: 1}]),
				  	success: function(response) {
				    	if (response.status == 0) {
				    		console.log(response);
				    		
				    		window.sessionStorage.setItem("orderCode", response.data.ordercode);
				    		$.ajax({
					            beforeSend: function () {
								    $('.weui_loading_toast').css('display', 'block');
								},
								complete: function () {
								    $('.weui_loading_toast').css('display', 'none');
								},
								type: 'post',
								url: Config.getApiURL() + '/user/expe/submitorder',
								data: JSON.stringify({orderCode: window.sessionStorage.getItem("orderCode"), words: '', payType: 0}), 
								//ordercode 支付方式0->微信支付 1->余额支付 留言
								success: response => {
									if (response.status == 0) {
										// 跳转到支付界面\
										var tbid = Utils.getCookie("TBUID");
										console.log(response);
										var url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfc1a5ff66807ec68&redirect_uri=http://www.itourbag.com/wx_web_auth/&response_type=code&scope=snsapi_base&state=${tbid}#wechat_redirect`;
										window.location.href = url;
									} else {
										self.toastdialogtitle = "反馈提示";
										self.toastdialogcontent = response.tip;
										$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
											$('#dialog2').off('click').hide();
										});
									}
								}
			            	});
			            	
				    	} else {
				    		self.toastdialogtitle = "反馈提示";
							self.toastdialogcontent = response.tip;
							$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
								$('#dialog2').off('click').hide();
							});
				    	}
				  	}
				});	
				
            },
            showDiv: function(show_div, bg_div) {
	        	$("#"+show_div).css('display', 'block');
		        $("#"+bg_div).css('display', 'block');
		        var bgdiv = document.getElementById(bg_div);
		        bgdiv.style.width = document.body.scrollWidth;
		        $("#" + bg_div).height(document.documentElement.clientHeight);
		        $('html,body').animate({scrollTop: $(document).height()}, 100);//因为页面很长，有纵向滚动条，先让页面滚动到最底端，然后禁止滑动事件，这样可以使遮罩层锁住整个屏幕  
		        $('#'+show_div).bind("touchmove",function(e){  
		                e.preventDefault();  
		        }); 
		        $('#'+bg_div).bind("touchmove",function(e){  
		                e.preventDefault();  
		        });
		        this.pay();
		    },
		    closeDiv:function(show_div, bg_div) {
		        document.getElementById(show_div).style.display = 'none';
		        document.getElementById(bg_div).style.display = 'none';
		        sessionStorage.removeItem('order');
		        this.willbuy = [];
		    }
		}
	}
</script>

<style>
.rechargeCenter {
	background-color: #fff!important;
}
.rechargeCenter-account {
}
.rechargeCenter-account input {
	width: 100%;
	height: 35px;
	font-size: 18px;
	border: none;
	outline: none;
	text-align: center;
}
.rechargeCneter-price {
	margin-top: 5%;
}
.rechargeCneter-price a {
	float: left;
	width: 29%;
	text-align: center;
	border: 1px solid #aaa;
	border-radius: 5px;
	padding:2px;
	margin-top:20px;
	
	margin-left: 1.4%;
}
.rechargeCneter-price a h3{
	color: #666;
	height:30px;
	line-height:30px;
}
.rechargeCneter-price a p {
	color: #777;
	font-size: 0.8rem;
	height:20px;
	line-height:20px;
}
.rechargeCenter-part {
	text-align: center;
	margin-top: 60%;
}
.rechargeCenter-part a {
	color: #566b96;
}
.rechargecenter-btn {
	float: left;
	text-align: center;
	width: 49%;
	border: 1px solid rgba(0,0,0,.2);
    border-radius: 5px;
	/* background-color: #04be02; */
	/* color: #fff; */
}
.rechargecenter-tip {
	padding: 10px!important;
}
.recharge-type{
		padding: 10px;
		text-align: left;
		margin-top:20px;
}
.recharge-type-title{

	font-weight: bold;
	color:#666;
}
.recharge-wx{
	margin-top: 20px;
	height: 45px;
}
.recharge-wx img{
	width: 40px;
	float: left;
}
.recharge-wx-content{
	padding-left: 10px;
	height: 45px;
	float: left;
}
.recharge-wx-tip{
	font-size: 13px;
	line-height: 23px;
	color: #A3A3A3;
	margin-top: 0.2rem;
}
.recharge-wx input{
	float: left;
}
.recharge-tip{
	text-align: left;
	padding: 10px;
	line-height:20px;
	font-weight: bold;
	color: #666;
}
.recharge-tip ol{

	padding: 20px;
	padding-top:10px;
}
.recharge-tip ol li{
	font-size: 13px;
	font-weight: normal;
}
.recharge-paybtn {
	display: block;
	width: 100%;
	height: 3rem;
	line-height: 3rem;
	font-size: 1.4rem;
	color: #fff;
	background-color: #1fd291;
	border: none;
	position: fixed;
	bottom: 0;
}
.recharge-choose {
	/* background-color: #1fd291; */
	border: 3px solid #23c083!important;
	padding :0px !important;
	background:url("/static/images/recharge/select_tick.png");
	background-position: 100% 100%;
	background-size:20px 20px;
	background-repeat: no-repeat;
}
.rechargecenter-black_overlay {
    display: none;
    position: absolute;
    left: 0%;
    top: 0%;
    width: 100%;
    background-color: black;
    z-index: 1001;
    -moz-opacity: 0.5;
    opacity: .50;
    filter: alpha(opacity=50);
}
.rechargecenter-white_content {
    display: none;
    position: fixed;
    left: 3.5%;
    top: 30%;
    width: 90%;
    height: 35%;
    border: 5px solid #cfcfcf;
    border-radius: 5px;
    background-color: white;
    z-index: 1002;
}
.rechargecenter-white_content>p {
	font-size: 12px;
	color: #515151;
	margin-top: 20px;
	margin-left: 10px;
}
.rechargecenter-mydiv-ok,.rechargecenter-mydiv-warning {
	width: 90%;
	margin: 25px auto;
}
.rechargecenter-mydiv-ok img,.rechargecenter-mydiv-warning img {
	float: left;
	width: 25px;
	height: 25px;
}
.rechargecenter-mydiv-ok p,.rechargecenter-mydiv-warning p {
	display: inline-block;
	font-size: 12px;
	color: #515151;
	line-height: 25px;
}
.rechargecenter-mydiv-ok p>a {
	font-size: 16px;
	color: #1fd291;
	font-weight: bold;
}
.rechargecenter-mydiv-warning p>a {
	font-size: 16px;
	color: #e9551b;
	font-weight: bold;
}
</style>


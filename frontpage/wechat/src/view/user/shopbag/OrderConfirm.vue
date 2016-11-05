<template>
	<div class="orderconfirm">
		<title title="确认订单" backlink="myorders" showbtn="true"></title>
		<div class="wrapper orderconfirm-wrapper">
			<a class="orderconfirm-orderaddress" @click="goal()">
				<img src="/static/images/icon/address.png" alt="">
				<div>
					<div>
						<p v-text="combo.addressInfo.receiver"></p>
						<p v-text="combo.addressInfo.mobile"></p>
					</div>
					<div v-text="combo.addressInfo.addressDetail" style="color:#727171;"></div>	
				</div>
			</a>
			<ul class="orderconfirm-orderlist-group" >
				<li class="orderconfirm-orderlist-item" class="clearfix" v-for="item in combo.data" track-by="$index">
					<img v-bind:src="item.imageSrc" alt="">
					<div>
						<h3 v-text="item.name" style="font-size:14px;"></h3>
						<p v-text="item.description"></p>
					</div>
					<div>
						<p>
							￥<span v-text="item.price/100"></span>
						</p>
						<p>
							x<span v-text="item.amount"></span>
						</p>
					</div>
				</li>
				<div class="orderconfirm-orderlist-item-bar" v-if="$index != combo.list-1"></div>
			</ul>
			<section class="orderconfirm-shippingmethods clearfix">
				<div>配送方式</div>
				<div v-text="combo.transportType"></div>
			</section>
			<section class="orderconfirm-shippingpay clearfix">
				<div>运送费</div>
				<div v-text="combo.freight/100"></div>
			</section>
			<section class="orderconfirm-leavemessage">
				给卖家留言
					<input type="text" v-model="leavemessage" placeholder="选填：对本次交易说明"/>
			</section>
			<section class="orderconfirm-summation">
				共计：<span v-text="combo.count"></span>件 <span style="color:#fc7329;"> 合计<span  v-text="combo.totalPrice/100"></span>元</span>
			</section>
			
			<section class="orderconfrim-paymethods">
				<div>支付方式: </div>
				<div class="orderconfirm-payselect">
					<a @click="setIdx(0)" v-bind:class="{'orderconfirm-payselect-select': !selectIdx}">微信支付</a>
					<a @click="setIdx(1)" v-bind:class="{'orderconfirm-payselect-select': selectIdx}">账户余额支付</a>
				</div>
			</section>
			<!-- <div class="orderconfrim-confirmpay">
				<a @click="pay">确认支付</a>
			</div> -->
			<div class="orderconfrim-confirmpay">
				<a @click="showDiv('orderconfirm-mydiv','orderconfirm-fade')">确认支付</a>
			</div>
			<div id="orderconfirm-fade" class="orderconfirm-black_overlay" @click="closeDiv('orderconfirm-mydiv','orderconfirm-fade')"></div>
		    <div id="orderconfirm-mydiv" class="orderconfirm-white_content animated fadeInUp">
		        <p>请在新开的页面完成支付</p>
		        <div class="orderconfirm-mydiv-content">
		        	<div class="orderconfirm-mydiv-ok">
			        	<img src="/static/images/icon/ok.png" alt="">
						<p>如已经完成支付，请点击：<a v-link="{name: 'myorders'}">已完成支付</a></p>
		        	</div>
		        	<div class="orderconfirm-mydiv-warning">
			        	<img src="/static/images/icon/warning.png" alt="">
						<p>如付款遇到问题，请点击：<a>重新支付</a></p>
		        	</div>
		        </div>
		    </div>
		</div>
		<!-- <toast v-bind:toasttext="toasttext"></toast> -->
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
	import Config from '../../../common/config.js'
	import Utils from '../../../common/utils.js'
	import toast from '../../../components/toast/index.vue'
	import toastDialog from '../../../components/dialog/toastDialog.vue'
	export default {
		data: function() {
			return {
				combo: {
					addressInfo: {
						address: '',
						receiver: '',
						mobile: ''
					},
					list: [
						{
							// name: "",
							// detail: "无限流量，可重复充值使用，可拨打电话",
							// price: 2800,
							// number: 1
						}
						// {
						// 	name: "日本30日卡贴",
						// 	detail: "无限流量，可重复充值使用，可拨打电话",
						// 	price: 2800,
						// 	number: 1
						// }
					],
					shippingmethods: "快递/免邮",					
					summation: {
						number: 1,
						price: 2800
					},
					price: 3300
				},
				leavemessage: "",
				selectIdx: 0,
				toasttext: '余额不足',
				toastdialogtitle: '', 
				toastdialogcontent: ''
			}
		},
		components: {
			toast,
			toastDialog
		},
		methods: {
            setIdx:function(idx){
                this.selectIdx = idx;
            },
            goal: function () {
            	sessionStorage.setItem("goal", "orderconfirm");	
            	this.$router.go("/defaultaddress");	
            },
            pay: function () {
            	var self = this;
            	//判断是否有收获地址
            	if (sessionStorage.getItem('addressid') || this.combo.addressInfo.id) {
            		
            	} else {
            		self.toastdialogtitle = "反馈提示";
		            self.toastdialogcontent = "客官，您还没有收获地址！";
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
				        $('#dialog2').off('click').hide();
				    });
				    return false;
            	}
            	if (this.combo.data[0].ordertype == 5 && this.selectIdx == 1) {
					self.toasttext = "充值必须使用微信支付";
            		$(".toast").css('display', 'block');
					setTimeout(function () {
						$(".toast").css('display', 'none');
					}, 1000);
					return false;
				}
            	if (this.selectIdx == 1) {
            		console.log(parseInt(this.combo.totalPrice));
            		console.log(parseInt(this.combo.balance));
            		if (parseInt(this.combo.totalPrice) > parseInt(this.combo.balance)) {
            			self.toastdialogtitle = "反馈提示";
			            self.toastdialogcontent = "客官，您余额不足！";
						$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
					        $('#dialog2').off('click').hide();
					    });
						return false;
            		} else {
            			$.ajax({
				            beforeSend: function () {
							    $('.weui_loading_toast').css('display', 'block');
							},
							complete: function () {
							    $('.weui_loading_toast').css('display', 'none');
							},
							type: 'post',
							url: Config.getApiURL() + '/user/expe/submitorder',
							data: JSON.stringify({orderCode: self.combo.orderCode, words: self.leavemessage, payType: self.selectIdx, addressid: sessionStorage.getItem('addressid')}), //ordercode 支付方式0->微信支付 1->余额支付 留言
							success: response => {
								if (response.status == 0) {
									console.log(response);
									window.sessionStorage.setItem("orderCode", self.combo.orderCode);
									sessionStorage.removeItem("goal");
									sessionStorage.removeItem("addressid");
									self.$router.go('/paysuccess');									
								} else {
									self.$router.go('/payfail');	
								}
							}
		            	});
		            	return ;
            		}
            	} else if (this.selectIdx == 0){
	            	$.ajax({
			            beforeSend: function () {
						    $('.weui_loading_toast').css('display', 'block');
						},
						complete: function () {
						    $('.weui_loading_toast').css('display', 'none');
						},
						type: 'post',
						url: Config.getApiURL() + '/user/expe/submitorder',
						data: JSON.stringify({orderCode: self.combo.orderCode, words: self.leavemessage, payType: self.selectIdx, addressid: sessionStorage.getItem('addressid')}), //ordercode 支付方式0->微信支付 1->余额支付 留言
						success: response => {
							if (response.status == 0) {
								console.log(response);
								if (self.selectIdx == 0) {
									var tbid = Utils.getCookie("TBUID");
									// alert(tbid);
									window.sessionStorage.setItem("orderCode", self.combo.orderCode);
									var url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfc1a5ff66807ec68&redirect_uri=http://www.itourbag.com/wx_web_auth/&response_type=code&scope=snsapi_base&state=${tbid}#wechat_redirect`;
									sessionStorage.removeItem("goal");
									sessionStorage.removeItem("addressid");
									window.location.href = url;
								}
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

	            }
            },
            showDiv:function(show_div, bg_div) {
		        if (this.selectIdx == 0) {
		        	$("#"+show_div).css('display', 'block');
			        $("#"+bg_div).css('display', 'block');
			        var bgdiv = document.getElementById(bg_div);
			        bgdiv.style.width = document.body.scrollWidth;
			        $("#" + bg_div).height(document.documentElement.clientHeight);
			        $('html,body').animate({scrollTop: $(document).height()}, 100);//因为页面很长，有纵向滚动条，先让页面滚动到最顶端，然后禁止滑动事件，这样可以使遮罩层锁住整个屏幕  
			        $('#'+show_div).bind("touchmove",function(e){  
			                e.preventDefault();  
			        }); 
			        $('#'+bg_div).bind("touchmove",function(e){  
			                e.preventDefault();  
			        });
		        } else {
		        	
		        }
		        this.pay();
		    },
		    closeDiv:function(show_div, bg_div) {
		        document.getElementById(show_div).style.display = 'none';
		        document.getElementById(bg_div).style.display = 'none';
		        sessionStorage.removeItem('order');
		        this.willbuy = [];
		    }
		},
		ready: function () {
			var self = this;
			self.combo = JSON.parse(sessionStorage.getItem('order'));
			if (sessionStorage.getItem('addressid')) {
				$.ajax({
					type: 'post',
					url: Config.getApiURL() + '/user/address/info',
					data: JSON.stringify({id: sessionStorage.getItem('addressid')}),
					success: response => {
						console.log(response);
						self.combo.addressInfo.mobile = response.data.callnumber;
						self.combo.addressInfo.receiver = response.data.name;
						self.combo.addressInfo.addressDetail = response.data.province + ' ' + response.data.city + ' ' +　response.data.district + ' ' + response.data.addressDetail;
					}
				});
			}
		}
	}
</script>
<style>
	.orderconfirm-wrapper {
		background-color: #fff!important;
		color: #727171;
	}
	.orderconfirm-orderaddress {
		padding: 10px;
		display: block;
		text-decoration: none;
	}
	.orderconfirm-orderaddress>img {
		width: 3rem;
		height: 3rem;
		vertical-align: middle;
	}
	.orderconfirm-orderaddress>div {
		display: inline-block;
		width: 80%;
		vertical-align: middle;
	}
	.orderconfirm-orderaddress>div div p {
		display: inline-block;
		width: 30%;
		color: #000;
	}
	.orderconfirm-orderaddress>div>div:nth-child(2) {
		margin-top: 10px;
		font-size: 0.9rem;
	}
	.orderconfirm-orderlist-item {
		padding: 10px;
		border-bottom:1px solid #ddd;
		vertical-align: middle;
	}
	.orderconfirm-orderlist-item:first-child{
		border-top:1px solid #ddd;
	}
	.orderconfirm-orderlist-item>img {
		width: 5rem;
		height: 4rem;
		vertical-align: middle;
	}
	.orderconfirm-orderlist-item>div {
		display: inline-block;
		height: 4rem;
		vertical-align: middle;
	}
	.orderconfirm-orderlist-item>div:nth-child(2) {
		width: 50%;
		vertical-align: top;
	}
	.orderconfirm-orderlist-item>div:nth-child(2)>p {
		margin-top: 0.2rem;
		font-size: 0.8rem;
		height: 2.5rem;
		overflow: auto;
	}
	.orderconfirm-orderlist-item>div:nth-child(3) {
		text-align: right;
		vertical-align: top;
		float: right;
	}
	.orderconfirm-orderlist-item>div:nth-child(3)>p:nth-child(2) {
		margin-top: 0.9rem;
	}
	.orderconfirm-orderlist-item-bar {
		height: 1px!important;
		background-color: #fff;
		width: 100%;
		margin-left: -10px;
		margin-right: -10px;
	}
	.orderconfirm-shippingmethods>div:nth-child(1), .orderconfirm-shippingpay>div:nth-child(1) {
		float: left;
	}
	.orderconfirm-shippingmethods>div:nth-child(2), .orderconfirm-shippingpay>div:nth-child(2) {
		float: right;
	}
	.orderconfirm-shippingmethods, 	.orderconfirm-shippingpay, .orderconfirm-leavemessage, .orderconfirm-summation, 
	.orderconfrim-paymethods {
		padding-left: 10px;
		padding-right: 10px;
		line-height: 3rem;
	}
	.orderconfirm-shippingmethods, 	.orderconfirm-shippingpay, .orderconfirm-leavemessage {
		border-bottom: 1px solid #ddd;
	}
	.orderconfirm-summation {
		text-align: right;
	}
	.orderconfirm-leavemessage input {
		width: 60%;
		font-size: 0.9rem;
		border: none;
		outline: none;
	}
	.orderconfrim-paymethods>div:nth-child(2) {
		line-height: 2rem;
	}
	.orderconfrim-paymethods div img {
		width: 2rem;
		height: 2rem;
		vertical-align: middle;
		margin-left: 5%;
	}
	.orderconfrim-paymethods {
		margin-bottom: 4rem;
	}
	.orderconfrim-confirmpay {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.orderconfrim-confirmpay a {
		display: block;
		background-color: #23c083;
		color: #fff;
		line-height: 3rem;
		font-size: 1.4rem;
		text-align: center;	
	}
	.orderconfirm-bar {
		height: 1px;
		background-color: #e6e6e6;
	}
	.orderconfirm-payselect{
		width: 100%;
		text-align: center;
	}
	.orderconfirm-payselect>a{
		width: 40%;
		color: #47464e;
        display: inline-block;
		border: 1px solid #adadad;
		border-radius: 5px;
		font-size: 14px;
	}
	.orderconfirm-payselect>a.orderconfirm-payselect-select {
		color: #1fd291;
		border: 1px solid #1fd291;
	}
	.orderconfirm-black_overlay {
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
	.orderconfirm-white_content {
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
	.orderconfirm-white_content>p {
		font-size: 12px;
		color: #515151;
		margin-top: 20px;
		margin-left: 10px;
	}
	.orderconfirm-mydiv-ok,.orderconfirm-mydiv-warning {
		width: 90%;
		margin: 25px auto;
	}
	.orderconfirm-mydiv-ok img,.orderconfirm-mydiv-warning img {
		float: left;
		width: 25px;
		height: 25px;
	}
	.orderconfirm-mydiv-ok p,.orderconfirm-mydiv-warning p {
		display: inline-block;
		font-size: 12px;
		color: #515151;
		line-height: 25px;
	}
	.orderconfirm-mydiv-ok p>a {
		font-size: 16px;
		color: #1fd291;
		font-weight: bold;
	}
	.orderconfirm-mydiv-warning p>a {
		font-size: 16px;
		color: #e9551b;
		font-weight: bold;
	}
</style>
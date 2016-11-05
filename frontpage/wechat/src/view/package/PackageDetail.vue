<template>
	<div class="packagedetail" id="packagedetail-content">
		<title title="套餐详情" backlink="choosearea"  ></title>
		<div class="packagedetail-wrapper">
			<img v-bind:src="countryPic.src" alt="">
			<div class="packagedetail-head clearfix">
				<div @click="contentshow(0)" v-bind:class="{'packagedetail-active': comboshow}">
					优惠套餐
				</div>
				<div @click="contentshow(1)" v-bind:class="{'packagedetail-active': automaticshow}">
					自主套餐
				</div>
			</div>
			<div class="packagedetail-bar"></div>
			<div class="packagedetail-content">
				<section v-if="comboshow">
				    <div class="packagedetail-state" style="text-align:center;" v-if="this.combo<=0">
				    	<img src="/static/images/recharge/state.png" style="width:35%;margin-top:15%;">
				    	<p style="color:#c3c3c3;">本地区还没未通优惠套餐</p>
				    </div>
					<section class="packagedetail-combo clearfix" v-for="item in combo" track-by="$index">
						<img class="packagedetail-content-img" v-bind:src="item.imageSrc">
						<div class="packagedetail-combo-content">
							<div v-text="item.name"></div>
							<p>
								<span class="packagedetail-combo-content-newprice">￥<span v-text="(item.price/100).toFixed(2)"></span></span>
								<span class="packagedetail-combo-content-oldprice" v-if="item.oldPrice/100>0 ? true : false">￥<span v-text="(item.oldPrice/100).toFixed(2)"></span></span>
							</p>
						</div>
						<div class="packagedetail-combo-content-btn">
							<a>途宝特惠</a>
							<br/>
							<!-- <a v-link="{name:'orderconfirm',params:{id: combo[$index].id,count: num}}">立即购买</a> -->
							<a @click="showDiv('packagedetail-mydiv','packagedetail-fade', item.id, 1)">立即购买</a>
						</div>
					</section>
				</section>
				<section class="packagedetail-automatic" v-if="automaticshow">
					<div class="packagedetail-info">
						<div class="packagedetail-price">
							<p>单价：<span v-text="(automatic.price/100).toFixed(2)"></span>元/天</p>
							<p>合计：<span v-text="(packageTotalprice/100).toFixed(2)"></span>元</p>
						</div>
						<div class="araepackage-operation">
							<img src="/static/images/temp/decrease.png" class="packagedetail-decrease" @click="decrease" >
							<span><input id="buyDate" v-model="packageDay" type="number" name="" style="border:none;outline:medium;text-align:right;width:50px;color:#1fd291;"> 天</span>
							<img src="/static/images/temp/increase.png" class="packagedetail-increase" @click="increase" 
							>
							<!-- touchstart="decrease" @touchend="decreaseEnd" -->
						</div>
					</div>
					<div class="packagedetail-intro">
						<dl style="margin-top:5px;">
							<dt><span style="font-size:18px;">&middot;</span>套餐说明</dt>
							<dd style="text-indent:2em" v-text="automatic.description"></dd>
						</dl>
					</div>
					<!-- <a class="packagedetail-btn" v-link="{name:'orderconfirm',params:{id: automatic.id,count: packageDay}}">确定（<span v-text="(packageTotalprice/100).toFixed(2)"></span>）</a> -->
					<a class="packagedetail-btn" @click="showDiv('packagedetail-mydiv','packagedetail-fade', automatic.id, packageDay)">确定(<span v-text="(packageTotalprice/100).toFixed(2)" style="letter-spacing: 0px;"></span>)</a>
				</section>
			</div>
		</div>
		<div id="packagedetail-fade" class="packagedetail-black_overlay" @click="closeDiv('packagedetail-mydiv','packagedetail-fade')"></div>
	    <div id="packagedetail-mydiv" class="packagedetail-white_content animated fadeInUp">
	        <div class="packagedetail-mydiv-header">
	        	<div class="packagedetail-tips">
	        		<p>您还未绑定途宝卡</p>
	        		<p>途宝地区上网套餐需要绑定途宝卡才能使用</p>
	        	</div>
	        	<img src="/static/images/temp/closebtn.png" @click="closeDiv('packagedetail-mydiv','packagedetail-fade')">
	        </div>
	        <div class="packagedetail-mydiv-content" style="width:100%; clear:both;">
	        	<div class="packagedetail-tbcard">
	        		<img src="/static/images/temp/tb-card.png" alt="">
	        	</div>
	        	<div class="packagedetail-cardprice">
	        		<p v-text="card.name"></p>
	        		<p>（卡内含<span style="color:#e9551b;" v-text="card.price/100"></span>元余额）</p>
	        		<a>￥ <span v-text="card.price/100"></span></a>
	        	</div>
	        </div>
	        <div class="packagedetail-mydiv-intro">
	        	<dl>
	        		<dt>飞鲸软卡说明</dt>
	        		<dd v-text="card.description"></dd>
	        	</dl>
	        </div>
	        <a class="packagedetail-mydiv-btn" @click="orderconfirm">购买绑定</a>
	    </div>
	    <toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
	import Config from '../../common/config.js'
	import Utils from '../../common/utils.js'
	import toastDialog from '../../components/dialog/toastDialog.vue'
	export default {
		data: function () {
			return {
				card: {},
				combo: [
				],
				comboshow: true,
				automaticshow: false,
				automatic: {
					
				},
				packageDay: 1,
				packageTotalprice: 0,
				num: 1,
				willbuy: [],
				toastdialogtitle: '', 
				toastdialogcontent: '',
				countryPic: [],
				timeDec: 0,
				timeInc: 0
			}
		},
		components: {
			toastDialog
		},
		methods: {
			orderconfirm: function () {
				var self = this;
				this.willbuy.forEach((value, index, array) => {
					if (value.id == self.card.id) {
						this.willbuy.splice(index, 1);
					}
				});
				this.willbuy.push({id: this.card.id, count: 1});
				console.log(this.willbuy);
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
				  	data: JSON.stringify(self.willbuy),
				  	success: function(response) {
				  		console.log(response);
				   		if (response.status == 0) {
				   			
				   			var order = response.data;
				   			
				   			for (var idx in order.data) {
				   				
				   				order.data[idx].imageSrc = Config.getMediaURL()+order.data[idx].imageSrc;
				   				
				   			}
						    sessionStorage.setItem('order', JSON.stringify(order));
						    self.$router.go('/orderconfirm');
				    	} else {
				    		alert(response.tip);
				    	}
				 	}
				});	
			},
			contentshow: function (number) {
				if (number == 1) {
					this.comboshow = false;
					this.automaticshow = true;
				} else {
					this.comboshow = true;
					this.automaticshow = false;
					
				}
			},
			decrease:function(){
				var self = this;
				// self.timeDec = setInterval(function() {
					if (self.packageDay>1) {
						self.packageTotalprice -= self.packagePrice;
						self.packageDay --;		
					} else {
						self.packageTotalprice = 15;
						self.packageDay =1;
					}
				// }, 200);
			},
			// decreaseEnd:function(){
			// 	var self = this;
			// 	clearInterval(self.timeDec);
			// },
			increase:function(){
				var self= this;
				// self.timeInc = setInterval(function(){
					self.packageTotalprice += self.packagePrice;
					self.packageDay ++;
				// },200)
			},
			// increaseEnd:function(){
			// 	var self = this;
			// 	clearInterval(self.timeInc);
			// },
			showDiv:function(show_div, bg_div,id,count) {
		        var self = this;
		        $.ajax({
		        	beforeSend: function () {
					    $('.weui_loading_toast').css('display', 'block');
					},
					complete: function () {
					    $('.weui_loading_toast').css('display', 'none');
					},
		          	url: Config.getApiURL()+'/user/hasBindSoftCard',
		          	type: 'POST',
		          	dataType: 'json',
		          	data: {},
		          	success: function(data) {
		          		console.log(data);
		          		if (data.status == 0) {
		          			if (data.data.bindedCard == 0) {
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
						        self.willbuy.push({id: id, count: count});
		          			} else {
								$.ajax({
								  url: Config.getApiURL()+'/user/expe/createOrder',
								  type: 'POST',
								  dataType: 'json',
								  data: JSON.stringify([{id: id,count: count}]),
								  success: function(response) {
								    if (response.status == 0) {
				   			
							   			var order = response.data;
							   			
							   			for (var idx in order.data) {
							   				
							   				order.data[idx].imageSrc = Config.getMediaURL()+order.data[idx].imageSrc;
							   				
							   			}
									    sessionStorage.setItem('order', JSON.stringify(order));
									    self.$router.go('/orderconfirm');
							    	} else {
							    		self.toastdialogtitle = "反馈提示";
										self.toastdialogcontent = response.tip;
										$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
											$('#dialog2').off('click').hide();
										});
							    	}
								  }
								});
		          			}
		          		} else {
		          			self.toastdialogtitle = "反馈提示";
							self.toastdialogcontent = data.tip;
							$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
								$('#dialog2').off('click').hide();
							});
		          		}
		          	},
		          	error: function(xhr, textStatus, errorThrown) {
		            //called when there is an error
			            self.toastdialogtitle = "反馈提示";
						self.toastdialogcontent = "网络错误";
						$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
							$('#dialog2').off('click').hide();
						});
		          	}
		        });
		        
		    },
		    closeDiv:function(show_div, bg_div) {
		        document.getElementById(show_div).style.display = 'none';
		        document.getElementById(bg_div).style.display = 'none';
		        sessionStorage.removeItem('order');
		        this.willbuy = [];
		    }
		},
		ready: function () {
			$('.packagedetail-head>div').click(function() {
				$('.packagedetail-combo').addClass('animated fadeIn');
				$('.packagedetail-automatic').addClass('animated fadeIn');
			});
			
			// var timeout = 0;
			// $('.packagedetail-decrease').on('touchstart', function(event) {
			// 	event.preventDefault();
			// 	timeout = setTimeout(function() {
			// 		console.log(1);
			// 	}, 500);
			// });
			// $('#apoul').on('touchstart mousedown', function () {
			// 	$(this).css('transform', 'scale(0.9)');
			// });
			// $('#apoul').on('touchend mouseup', function () {
			// 	$(this).css('transform', 'scale(1)');
			// });	
			//获取卡贴的信息
			$.ajax({
				beforeSend: function () {
					$('.weui_loading_toast').css('display', 'block');
				},	
				type: 'post',
				url: Config.getApiURL() + "/sys/goods",
				data: JSON.stringify({type: 4}),
				success: response => {
					console.log(response);
					self.card = response.data[0];
					self.card.imageSrc = Config.getMediaURL() + '/' + self.card.imageSrc; 
				},
				error: response => {
					console.log(response);
				}
			});
			var self = this;
			// 顶部图片
			$.ajax({
			  	url: Config.getApiURL()+'/countries/item',
			  	type: 'POST',
			  	dataType: 'json',
			  	data: JSON.stringify({countryId: self.$route.params.packageid}),
			  	success: function(data) {
			  	  if (data.status == 0) {
			  	  	self.countryPic = data.data;
			  	  	self.countryPic.src = Config.getMediaURL()+self.countryPic.countryImageSrc;
			  	  } else {
			  	  	alert(data.tip);
			  	  }
			  	},
			  	error: function(xhr, textStatus, errorThrown) {
			    	self.toastdialogtitle = "反馈提示";
					self.toastdialogcontent = "网络错误";
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
						$('#dialog2').off('click').hide();
					});
			 	}
			});
			
			//自主套餐
			$.ajax({
				type: 'post',
				url: Config.getApiURL() + "/sys/goods",
				data: JSON.stringify({type: 0, countryId: parseInt(self.$route.params.packageid)}),
				success: response => {
					console.log(response);
					self.automatic = response.data[0];

					// self.combo = response.data;
				},
				error: response => {
					self.toastdialogtitle = "反馈提示";
					self.toastdialogcontent = "网络错误";
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
						$('#dialog2').off('click').hide();
					});
				}
			});
			//优惠套餐
			$.ajax({
				complete: function () {
					$('.weui_loading_toast').css('display', 'none');
			    },
				type: 'post',
				url: Config.getApiURL() + "/sys/goods",
				data: JSON.stringify({type: 1, countryId: parseInt(self.$route.params.packageid)}),
				success: response => {
					console.log(response);
					// self.automatic = response.data[0];
					if (response.data.length>0) {
						self.combo = response.data;
						for(var idx in self.combo) {
							self.combo[idx].imageSrc = Config.getMediaURL() + self.combo[idx].imageSrc;
						}
					} else {
						self.comboshow =  false;
						self.automaticshow = true;
					}
					
				},
				error: response => {
					self.toastdialogtitle = "反馈提示";
					self.toastdialogcontent = "网络错误";
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
						$('#dialog2').off('click').hide();
					});
				}
			});
			
		},
		computed:{
			packageTotalprice:function(){
				if (this.packageDay > 1) {
					return this.packageDay*this.automatic.price;
				} else {
					return this.automatic.price;
				}
			}
		}
	}
</script>
<style>
#packagedetail-content {
	background-color: #fff;
}
.packagedetail-active {
	color: #19af75;
}
.packagedetail-wrapper>img {
	width: 100%;
	max-height: 432px;
	min-height: 180px;
}
.packagedetail-head {
	width: 100%;
	background-color: #fff;
	margin-top: 10px;
	margin-bottom: 10px;
}
.packagedetail-head>div {
	float: left;
	width: 49%;
	text-align: center;
	height: 1.5rem;
	font-size: 1.2rem;
	line-height: 1.5rem;
}
.packagedetail-head>div:nth-child(1) {
	border-right: 1px solid #000;
}
.packagedetail-bar {
	height: 5px;
	background-color: #e1e0e0;
	margin-top: 10px;
}
.packagedetail-combo {
	height: 4rem;
	padding: 10px 0px 10px 0px;
	border-bottom: 1px solid #eee;
}
.packagedetail-content {
	padding: 10px;
}
.packagedetail-content-img {
	width: 5rem;
	height: 4rem;
	border-radius: 5px;
}
.packagedetail-combo-content {
	display: inline-block;
	width: 43%;
	vertical-align: top;
	font-size: 0.8rem;
}
.packagedetail-combo-content div {
	vertical-align: top;
}
.packagedetail-combo-content p {
	margin-top: 18%;
}
.packagedetail-combo-content-newprice {
	color: #f60b0b;
}
.packagedetail-combo-content-oldprice {
	color: #616060;
	text-decoration: line-through;
}
.packagedetail-combo-content-btn {
	float: right;
	display: inline-block;
	width: 25%;
	vertical-align: top;
}
.packagedetail-combo-content-btn>a:nth-child(1) {
	display: inline-block;
	width: 55px;
	height: 15px;
	line-height: 15px;
	font-size: 0.6rem;
	color: #24c17c;
	text-align: center;
	border: 1px solid #24c17c;
	border-radius: 3px; 
}
.packagedetail-combo-content-btn>a:nth-child(3) {
	display: block;
	color: #fff;
	margin-top: 0.6rem;
	text-align: center;
	background-color: #e11616;
	padding: 3px 3px;
	border-radius: 3px;
}
.packagedetail-combo-bar {
	height: 1px;
	margin-top: 10px;
	background-color: #b8b8b8;
	margin-bottom: 10px;
}
.packagedetail-info{
	width: 100%;
	background: #fff;
}
.packagedetail-price{
	width: 100%;
	height: 25px;
	color: #1fd291;
	font-size: 14px;
	margin-top: -2px;
	border-bottom: 1px solid #bcbcbc;	
}
.packagedetail-price p:first-child{
	float: left;
	margin-left: 5px;
}
.packagedetail-price p:last-child{
	float: right;
	margin-right: 5px;
}
.araepackage-operation{
	width: 100%;
	clear: both;
	text-align: center;
}
.araepackage-operation>img{
    width: 30px;
    height: 30px;
    display: inline-block;
    margin-top: 10px;
}
.araepackage-operation>span{
	display: inline-block;
	height: 32px;
	vertical-align: middle;
	line-height: 0px;
	text-align: center;
	margin: 0px 30px 0px 0px;
}
.packagedetail-intro{
	width: 100%;
	color: #5f5f5f;
	background-color: #fff;
	border-top: 5px solid #ededed;
}
.packagedetail-intro dl>dd{
	font-size: 13px;
	margin-left: 10px;
}
.packagedetail-intro dt{
	margin-bottom: 5px;
}
.packagedetail-btn{
	display: block;
	margin:40px auto;
	margin-bottom: 0px;
	width: 95%;
	height: 45px;
	line-height: 45px;
	text-align: center;
	background-color: #1fd291;
	color: white;
	border-radius: 5px;
	letter-spacing: 5px;
}
.packagedetail-black_overlay {
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
.packagedetail-white_content {
    display: none;
    position: fixed;
    left: 0%;
    bottom: 0%;
    width: 100%;
    height: 50%;
    background-color: white;
    z-index: 1002;
}
.packagedetail-mydiv-header {
	width: 100%;
}
.packagedetail-tips {
	width: 80%;
	float: left;
	display: inline-block;
	margin-top: 5px;
	margin-left: 10px;
}
.packagedetail-tips p:nth-child(1) {
	color: #e9551b;
}
.packagedetail-tips p:nth-child(2) {
	font-size: 12px;
	color: #e9551b;
	line-height: 20px;
}
.packagedetail-mydiv-header img {
    display: inline-block;
    float: right;
    width: 30px;
    height: 30px;
    margin-top: 10px;
    margin-right: 10px;
}
.packagedetail-tbcard {
	width: 50%;
	display: inline-block;

}
.packagedetail-tbcard img {
	float: left;
	width: 80%;
	margin-top: 5px;
	margin-left: 10px;
}
.packagedetail-cardprice {
	width: 50%;
	display: inline-block;
	text-align: center;
	float: right;
}
.packagedetail-cardprice p:nth-child(1) {
    color: #4a4a4a;
    font-size: 16px;
    display: inline-block;
    margin-top: 10px;
}
.packagedetail-cardprice p:nth-child(2) {
	font-size: 12px;
	display: inline-block;
}
.packagedetail-cardprice a {
	display: inline-block;
	width: 100px;
	height: 30px;
	font-size:18px;
	line-height: 30px;
	color: #fff;
	background-color: #e9551b;
	border-radius: 10px;
	margin-top: 5px;
}
.packagedetail-mydiv-intro {
	width: 100%;
	margin-top: 5px;
}
.packagedetail-mydiv-intro dl dt {
	color: #565656;
	font-size: 12px;
	margin-left: 10px;
	line-height: 15px;
}
.packagedetail-mydiv-intro dl dd {
	color: #6a6a6a;
	font-size: 12px;
	line-height: 15px;
	margin-left: 10px;
	margin-right: 5px;
}
.packagedetail-mydiv-btn {
	width: 100%;
	height: 40px;
	display: block;
	position: fixed;
	left: 0;
	bottom: 0;
	color: #fff;
	background-color: #e9551b;
	font-size: 20px;
	line-height: 40px;
	text-align: center;
}
</style>
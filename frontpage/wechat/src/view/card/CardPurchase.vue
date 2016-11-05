<template>
	<div class="cardpurchase" style="background:#fff;">
		<title backlink="index" title="卡片购买" ></title>
		<div class="cardpurchase-choose-block">
			　<div class="cardpurchase-choose-item" @click="setType(0);">
				<p>卡贴</p>
				<span class="cardpurchase-choose-bottom" v-if="type==0"></span>
			  </div>
			  <div class="cardpurchase-choose-item" @click="setType(1);">
				<p>实体卡</p>
				<span class="cardpurchase-choose-bottom" v-if="type==1"></span>
			  </div>
		</div>
		<div class="swiper-container">
	        <div class="swiper-wrapper">
	            <div class="swiper-slide" v-for="banner in banners">
	            	<img width="100%" v-bind:src="banner.imageSrc">
	            </div>
	        </div>
	        <div class="swiper-pagination"></div>
	    </div>

	    <!-- 软卡部分 -->
	    <div v-if="type==0">
	        <div class="cardpurchase-softcard">
	           	<p class="cardpurchase-softcard-title">{{softcard.name}}<span>途宝狂欢季</span></p>
	        	
	        	<img src="/static/images/temp/tb-card.png" alt="">
	        	
	        	<div class="cardpurchase-softcard-price">
	        		<p>途宝狂欢价</p>
	        		<a>￥ <span v-text="(softcard.price/100).toFixed(2);"></span></a>
	        		<p>（含<span style="color:#e9551b;" v-text="softcard.price/100"></span>元余额）</p>
	        	</div>
	        </div>
	        <div class="cardpurchase-softcard-intro">
	        	<dl>
	        		<dt>飞鲸软卡说明</dt>
	        		<dd v-text="softcard.description"></dd>
	        	</dl>
	        </div>
	        <a class="cardpurchase-softcard-btn" @click="orderconfirm(softcard.id);">立即购买</a>
	    </div>
		<!-- 软卡部分结束 -->


		<!-- <div class="cardpurchase-pic">
			<img v-bind:src="softcard.src" alt="" width="100%">
		</div> -->
		<!-- <div class="cardpurchase-info">
			<p>{{softcard.name}}<span>途宝狂欢季</span></p>
			<p class="cardpurchase-price">￥<span>{{softcard.price/100}}</span></p>
			<div class="cardpurchase-intro clearfix">
				<span>{{softcard.description}}</span>
				<a @click="orderconfirm(this.softcard.id)">立即购买</a>
			</div>
		</div> -->

		<div class="cardpurchase-reality" v-for="card in cards" track-by="$index" v-if="type==1">
			<img v-bind:src="card.src" style="width:70px;height:73px;margin-top:20px;float:left;">
			<div class="cardpurchase-reality-info">
				<p>{{card.name}}<span> 爱途宝，享网络</span></p>
				<ul>
					<li>无限流量</li>
					<li>重复充值</li>
					<li>三卡合一</li>
				</ul>
				<p class="cardpurchase-reality-tip">{{card.description}}</p>
				<a v-link="{name: 'cardpackage', params: {id: card.systemCardId}}">立即购买</a>
				<!-- <a @click="showDiv('cardpurchase-mydiv','cardpurchase-fade',this.cards[$index].systemCardId,card.id,1,this.card.name)">立即购买</a> -->
			</div>
		</div>
		<div id="cardpurchase-fade" class="cardpurchase-black_overlay" @click="closeDiv('cardpurchase-mydiv','cardpurchase-fade')"></div>
	    <div id="cardpurchase-mydiv" class="cardpurchase-white_content animated fadeInUp">
		    
			    <div class="cardpurchase-mydiv-header">
			    	<p>{{reality}}<span v-if="selectIdx == $index" v-for="day in days" track-by="$index">￥<span v-text="day.price/100"></span></span></p>
			    </div>
			    <div class="cardpurchase-mydiv-selectday">
			    	<p>套餐天数选择</p>
			    	<ul>
			    		<li @click="setIdx($index)" v-for="day in days" track-by="$index" v-bind:class="{'cardpurchase-mydiv-selected': selectIdx == $index}"  v-text="day.name"></li>
			    	</ul>
			    </div>
			    <div class="cardpurchase-mydiv-intro">
				    <dl>
				    	<dt>套餐说明</dt>
			    		<dd v-text="day.description" v-for="day in days" track-by="$index" v-if="selectIdx == $index" ></dd>
			    		
				    </dl>
				</div>
			
				<a class="cardpurchase-mydiv-btn" v-for="day in days" track-by="$index" v-if="selectIdx == $index" @click="orderconfirm(day.id)">确认购买(￥<span v-text="day.price/100"></span>)</a>	
	    </div>
	     <toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template> 
<script>
    import Utils from '../../common/utils.js'
    import Config from '../../common/config.js'
    import toastDialog from '../../components/dialog/toastDialog.vue'
    export default {
        data: function() {
            return {
            	softcard: [],
                cards: [],
                num: 1,
                selectIdx: 0,
                days: [
                ],
                willbuy: [],
                reality: "",
                toastdialogtitle: '', 
                toastdialogcontent: '',
                type:0,//0卡贴，1实体卡
                banners:[],
            }
        },
        components: {
            toastDialog
        },
        route: {
			data() {
				self.swiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						spaceBetween: 0,
						centeredSlides: true,
						autoplay: 2500,
						autoplayDisableOnInteraction: false,
						loop: true
				});
				// var swiper;
			}
		},
        ready: function() {
        	setTimeout(() => {
				self.swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					spaceBetween: 0,
					centeredSlides: true,
					autoplay: 2500,
					autoplayDisableOnInteraction: false,
					loop: true
				});
			}, 500);
        	
        	var self = this;
        	//软卡轮播图
        	$.ajax({
	        	beforeSend: function () {
	        		$('.weui_loading_toast').css('display', 'block');
	        	},
	        	type: 'post',
	        	dataType:'json',
	        	data:JSON.stringify({type:1}),
	        	url: Config.getApiURL() + '/sys/looppic/banners',
	        	success: response => {
	        		console.log(response);
	        		self.banners = response.data;		
	        		self.banners.forEach((value, index, array) => {
	        			value.imageSrc = Config.getMediaURL() + value.imageSrc;
	        		});
	        	},
	        	error: response => {
	        		console.log(response);
	        	}
	        });
        	//飞鲸软卡
        	$.ajax({
        		beforeSend: function () {
	        		$('.weui_loading_toast').css('display', 'block');
	        	}, 
        	    url: Config.getApiURL() + "/sys/goods",
        	    type: 'POST',
        	    dataType: 'json',
        	    data: JSON.stringify({type: 4}),
        	    success: function(data) {
        	    	if (data.status == 0) {
        	    		self.softcard = data.data[0];
        	    		self.softcard.src = Config.getMediaURL()+self.softcard.imageSrc;
        	    	} else {
        	    		self.toastdialogtitle = "反馈提示";
                        self.toastdialogcontent = data.tip;
                        $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                            $('#dialog2').off('click').hide();
                        });
        	    	}
        	    }
        	});
        	// 实体卡
        	$.ajax({
        		complete: function () {
	        		$('.weui_loading_toast').css('display', 'none');
	        	},
        	    url: Config.getApiURL() + "/sys/goods",
        	    type: 'POST',
        	    dataType: 'json',
        	    data: JSON.stringify({type: 3}),
        	    success: function(data) {
        	    	console.log(data);
        	    	if (data.status == 0) {
        	    		self.cards = data.data;
        	    		self.cards.forEach((value)=>{
        	    			value.src = Config.getMediaURL()+value.imageSrc;
        	    		});
        	    	} else {
        	    		self.toastdialogtitle = "反馈提示";
                        self.toastdialogcontent = data.tip;
                        $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                            $('#dialog2').off('click').hide();
                        });
        	    	}
        	    }
        	});
        },
        methods: {
        	orderconfirm: function (id) {
        		if (!(Utils.getCookie("TBUID"))) {
		    		this.$router.go('/login');
		    		return false;
		    	}
				var self = this;
				this.willbuy.forEach((value, index, array) => {
					if (value.id == id) {
						this.willbuy.splice(index, 1);
					}
				});
				this.willbuy.push({id: id, count: 1});
				console.log(this.willbuy);
				$.ajax({
					url: Config.getApiURL()+'/user/expe/createOrder',
				  	type: 'POST',
				  	dataType: 'json',
				  	data: JSON.stringify(this.willbuy),
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
				    		self.toastdialogtitle = "反馈提示";
	                        self.toastdialogcontent = response.tip;
	                        $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
	                            $('#dialog2').off('click').hide();
	                        });
				    	}
				 	}
				});	
			},
            showDiv:function(show_div, bg_div,sid,id,count,name) {
            	var self = this;
            	$.ajax({
				  	url: Config.getApiURL()+'/sys/card/availPkgGoods',
				  	type: 'POST',
				  	dataType: 'json',
				  	data: JSON.stringify({id: sid}),
				  	success: function(data, textStatus, xhr) {
				    	if (data.status == 0) {
				    		$("#"+show_div).css('display', 'block');
					        $("#"+bg_div).css('display', 'block');
					        var bgdiv = document.getElementById(bg_div);
					        bgdiv.style.width = document.body.scrollWidth;
					        $("#" + bg_div).height($(window).height()); 
					        $("#" + show_div).height(0.5*$(window).height());
					        $('html,body').animate({scrollTop: $(document).height()}, 100);//因为页面很长，有纵向滚动条，先让页面滚动到最底端，然后禁止滑动事件，这样可以使遮罩层锁住整个屏幕  
					        $('#'+show_div).bind("touchmove",function(e){  
					                e.preventDefault();  
					        }); 
					        $('#'+bg_div).bind("touchmove",function(e){  
					                e.preventDefault();  
					        }); 
					        self.reality = name;
					        self.days = data.data;
					        self.willbuy.push({id: id,count: count});
				    	} else {
				    		alert(data.tip);
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
				var self = this;
		        document.getElementById(show_div).style.display = 'none';
		        document.getElementById(bg_div).style.display = 'none';
		        self.willbuy = [];
		        self.selectIdx = 0;
		    },
		    setIdx:function(idx){
		    	this.selectIdx = idx;
		    },
		    setType:function(type) {
		    	var self=this;
		    	this.type = type;
		    	$.ajax({
		        	beforeSend: function () {
		        		// $('.weui_loading_toast').css('display', 'block');
		        	},
		        	type: 'post',
		        	dataType:'json',
		        	data:JSON.stringify({type:type+1}),
		        	url: Config.getApiURL() + '/sys/looppic/banners',
		        	success: response => {
		        		console.log(response);
		        		self.banners = response.data;		
		        		self.banners.forEach((value, index, array) => {
		        			value.imageSrc = Config.getMediaURL() + value.imageSrc;
		        		});
		        		// self.swiper.reInit();
		        	},
		        	error: response => {
		        		console.log(response);
		        	}
		        });
		    	
		    }
        }
    }
</script>
<style>
	.cardpurchase-pic img{
		width: 100%;
	}
	.cardpurchase-info{
		width: 100%;
		height: 85px;
		background-color: #fff;
		margin-top: -6px;
	}
	.cardpurchase-info p{
		display: inline-block;
		margin-top: 10px;
	}

	.cardpurchase-softcard-title{
		float: left;
		text-align:center;
		padding-bottom:10px;
		color:#ff6000;
		width:60%;
	}
	.cardpurchase-softcard-title span{
		font-size: 12px;
		color: #fff;
		background-color: #ff6000;
		padding: 2px 3px;
		border-radius: 4px;
		margin-left: 10px;
	}
	.cardpurchase-info .cardpurchase-price{
		float: right;
		margin-right: 10px;
		color: red;
	}
	.cardpurchase-intro{
		width: 100%;
	}
	.cardpurchase-intro>span{
		font-size: 12px;
		display: inline-block;
		width: 55%;
		margin-top: 13px;
		margin-left: 10px;
		color: #363636;
		line-height: 16px;
	}
	.cardpurchase-intro>a {
		width: 112px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		float: right;
		display: inline-block;
		margin-top: 10px;
		margin-right: 10px;
		color: #fff;
		background: url('/static/images/icon/btn-bg.png') no-repeat;
	}
	.cardpurchase-reality{
		width: 100%;
		height: 120px;
		border-top: 1px solid #dbe1c7;
		background: url('/static/images/icon/card-bg.png') no-repeat;
		background-size: 100% 100%;
        margin: 0px auto;
	}
	.cardpurchase-reality-info{
		width: 75%;
		float: right;
	}
	.cardpurchase-reality-info p:first-child{
		color: #1fd296;
		margin-top: 5px;
	}
	.cardpurchase-reality-info p:first-child>span{
		color: #ff9d06;
		font-size: 12px;
	}
	.cardpurchase-reality-info ul li{
		display: inline-block;
		width: 55px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		float: left;
		font-size: 12px;
		color: #1fd296;
		margin-right: 8px;
		/*background-color: #fcc044;*/
		border: 1px solid #1fd296;
		border-radius: 4px;
		margin-top: 2px;
		margin-bottom: 2px;
	}
	.cardpurchase-reality-tip{
		color: #7a7a7a;
		font-size: 12px;
		display: inline-block;
	}
	.cardpurchase-reality-info a{
		display: block;
		width: 112px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		color: #fff;
		background: url('/static/images/icon/btn-bg.png') no-repeat;
		/*border-radius: 5px;*/
		float:right;
		font-size: 12px;
		margin-right: 22px;
		margin-top: 10px;
	}
	.cardpurchase-black_overlay {
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
	.cardpurchase-white_content {
	    display: none;
	    position: fixed;
	    left: 0%;
	    bottom: 0;
	    width: 100%;
	    height: 50%;
	    background-color: white;
	    z-index: 1002;
	    overflow: auto;
	}
	.cardpurchase-mydiv-header {
		width: 100%;
		margin-top: 5px;
	}
	.cardpurchase-mydiv-header p {
		color: #23c083;
		margin-left: 10px;
		font-weight: bold;
	}
	.cardpurchase-mydiv-header p>span {
		color: red;
		float: right;
		margin-right: 10px;
		font-weight: bold;
	}
	.cardpurchase-mydiv-selectday {
		width: 100%;
		height: 45px;
	}
	.cardpurchase-mydiv-selectday p{
		font-size: 12px;
		color: #646363;
		margin-left: 10px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.cardpurchase-mydiv-selectday ul{
		width: 100%;
		margin: 0 auto;
		
	}
	.cardpurchase-mydiv-selectday ul li{
		width: 20%;
		height: 26px;
		/*word-break: keep-all;
		white-space: nowrap;*/
		text-overflow: -o-ellipsis-lastline; 
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 12px;
		line-height: 14px;
		border: 1px solid #646363;
		border-radius: 5px;
		/*display: inline-block;*/
		float: left;
		margin-top: 5px;
		text-align: center;
		margin-left: 3%;
		padding: 2px 1px 3px 1px;
	}
	.cardpurchase-mydiv-selected {
		color: #23c083;
		border: 1px solid #23c083!important;
	}
	.cardpurchase-mydiv-intro {
		width: 100%;
		clear: both;
		margin-bottom:40px;
	}
	.cardpurchase-mydiv-intro dl dt {
		color: #23c083;
		font-size: 12px;
		margin-left: 10px;
		line-height: 25px;
	}
	.cardpurchase-mydiv-intro dl dd {
		color: #6a6a6a;
		font-size: 12px;
		line-height: 15px;
		margin-left: 10px;
		margin-right: 5px;
	}
	.cardpurchase-mydiv-btn {
		width: 100%;
		height: 40px;
		display: block;
		position: fixed;
		left: 0;
		bottom: 0;
		color: #fff;
		background-color: #23c083;
		font-size: 20px;
		line-height: 40px;
		text-align: center;
	}
	.cardpurchase-choose-block {
		background-color:#23c083;
		color:white;
		font-size:0.8rem;
		text-align:center;
		
		height:1.9rem;
		

	}
	.cardpurchase-choose-item {
		width:40%;
		height:30px;
		line-height:30px;
		float:left;
		text-align:center;
	}
	.cardpurchase-choose-item:first-child{
		margin-left:9.5%;
	}
	.cardpurchase-choose-bottom {
		width:3rem;
		height:0.2rem;
		background-color:white;
		position:relative;
		top:-0.2rem;
		display:block;
		text-align:center;
		margin:0 auto;
	}
	.cardpurchase-softcard {
		margin-top:1rem;
	}
	.cardpurchase-softcard>img {
		margin-left:5px;
		width:60%;
	}

	.cardpurchase-softcard-price {
		width: 35%;
		display: inline-block;
		text-align: center;
		float: right;
		margin-right:2.5%;
		margin-top:1rem;
	}
	.cardpurchase-softcard-price p:nth-child(1) {
	    color: #ff6000;
	    font-size: 12px;
	    display: inline-block;
	    
	}
	.cardpurchase-softcard-price p:nth-child(3) {
		font-size: 12px;
		display: inline-block;
		margin-top:0.5rem;
	}
	.cardpurchase-softcard-price a {

		display: inline-block;
		width: 100px;
		height: 30px;
		font-size:18px;
		line-height: 30px;
		color: #fff;
		background-color: #ff6000;
		border-radius: 10px;
		margin-top: 0.5rem;
	}
	.cardpurchase-softcard-btn {
		width:100%;
		background-color:#ff6000;
		color:white;
		text-align:center;
		height:30px;
		position:fixed;
		bottom:0px;
		line-height:30px;
	}
	.cardpurchase-softcard-intro {
		width: 100%;
		margin-top: 5px;
		margin-bottom:40px;
	}
	.cardpurchase-softcard-intro dl dt {
		color: #565656;
		font-size: 12px;
		margin-left: 10px;
		line-height: 15px;
	}
	.cardpurchase-softcard-intro dl dd {
		color: #6a6a6a;
		font-size: 12px;
		line-height: 15px;
		margin-left: 10px;
		margin-right: 5px;
	}
	@media screen and (min-width: 320px) and (max-width: 375px) {
		.systempackage-continent {
			height: 135px;
		}
		.swiper-slide img, .swiper-container,.systempackage-country-item img {
			height: 100px;
		}
	}
	@media screen and (min-width: 320px) and (max-width: 375px) {
		.swiper-slide a img, .swiper-container {
			height: 180px;
		}
	}
	@media screen and (min-width: 375px) and (max-width: 414px) {
		.swiper-slide a img, .swiper-container {
			height: 210px;
		}
	}
	@media screen and (min-width: 414px) and (max-width: 568px) {
		.swiper-slide a img, .swiper-container {
			height: 232px;
		}
	}
	@media screen and (min-width: 568px) and (max-width: 768px) {
		.swiper-slide a img, .swiper-container {
			height: 329px;
		}
	}
	@media screen and (min-width: 768px) {
		.swiper-slide a img, .swiper-container {
			height: 432px;
		}
	}
</style>
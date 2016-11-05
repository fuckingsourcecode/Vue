<template>
	<div class="index">
		<title title="途宝网络" btnname="登录" showbtn="true" btnlink="login" ></title>
		<!-- 顶部轮播图 -->
		<div class="swiper-container" 
			style="width:100%;height:auto;">
	        <div class="swiper-wrapper">
	        	<div class="swiper-slide" v-for="item in swiperimg">
	        		<a v-bind:href="item.url">
	        			<img width="100%" v-bind:src="item.picture"/>
	        		</a>
	        	</div>
	        </div>
	        <div class="swiper-pagination"></div>
	    </div>
	  
	    <div class="index-btn-area">
	    	<a v-link="{name: 'rechargecenter'}">
	    		<img src="/static/images/temp/4.png"/><br/>
	    		<span>充值</span>
	    	</a>
	    	<a v-link="{name: 'systempackage'}">
	    		<img src="/static/images/temp/3.png"/><br/>
	    		<span>国际套餐</span>
	    	</a>
	    	<a v-link="{name: 'apnhome'}">
	    		<img src="/static/images/temp/2.png"/><br/>
	    		<span>APN设置</span>
	    	</a>
	    	<a v-link="{name: 'usercenter'}">
	    		<img src="/static/images/temp/5.png"/><br/>
	    		<span>个人中心</span>
	    	</a>
	    </div>
	    <div class="index-btn-area">
	    	<a v-link="{name: 'cardpurchase'}">
	    		<img src="/static/images/temp/2.png"/><br/>
	    		<span>卡片购买</span>
	    	</a>
	    	<a v-link="{name: 'userhelp'}">
	    		<img src="/static/images/temp/5.png"/><br/>
	    		<span>帮助</span>
	    	</a>
	    </div>
	    <div class="index-adv-items">
			<a class="index-adv-item" v-for="item in activity" v-link="{name: 'packagedetail',params:{packageid: item.countryId}}">
	    		<img v-bind:src="item.picture">
			</a>
		</div>
	</div>
</template>
<script>
import Config from '../common/config.js' 
export default{
	data: function () {
		return {
			activity: [],
			swiperimg: [],
			telphone: '',
			username: ''
		}
	},
	route: {
		data() {
			var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					spaceBetween: 0,
					centeredSlides: true,
					autoplay: 2500,
					autoplayDisableOnInteraction: false,
					loop: true
			});
		}
	},
	ready:function(){
		console.log($(document).width());
		var self = this;
		$.post(Config.getApiURL()+"/user/info",{},
        function(result){
        	console.log(result);
        	if (result.status == 0) {
        		self.loginflag = true;
        		self.telphone = result.data.mobile;
        		self.username = result.data.username;
        		
        		$('.component-title-btn').text(self.username);
        		
            }else{
            	self.loginflag = false;
            }
        });
        $('.component-title-btn').on('click', function () {
        	if ($('.component-title-btn').text() == "登录") {
        		self.$router.go('/login');
        	} else {
        		self.$router.go('/usercenter');
        	}
        })
		var swiper;
		 $.ajax({
        	beforeSend: function () {
        		$('.weui_loading_toast').css('display', 'block');
        	},
        	type: 'post',
        	dataType:'json',
        	data:JSON.stringify({type:0}),
        	url: Config.getApiURL() + '/sys/looppic/banners',
        	success: response => {
        		console.log(response);
        		self.swiperimg = response.data;		
        		self.swiperimg.forEach((value, index, array) => {
        			value.picture = Config.getMediaURL() + value.imageSrc;
        		});
        	},
        	error: response => {
        		console.log(response);
        	}
        });
        $.ajax({
        	complete: function () {
        		$('.weui_loading_toast').css('display', 'none');
        	},
        	type: 'post',
        	url: Config.getApiURL() + '/sys/ad/getAdList',
        	success: response => {
        		console.log(response);
        		self.activity = response.data;
        		self.activity.forEach((value, index, array) => {
        			value.picture = Config.getMediaURL()+value.imageSrc;
        		});
        		setTimeout(() => {
					swiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						spaceBetween: 0,
						centeredSlides: true,
						autoplay: 2500,
						autoplayDisableOnInteraction: false,
						loop: true
					});
				}, 500);
           	},
        	error: response => {
        		console.log(response);
        	}
        });
	}
}
</script>
<style type="text/css">
	.index-btn-area{
		background-color: white;
		height: 100px;
	}
	.index-btn-area a{
		width: 25%;
		height: 70px;
		display: block;
		float: left;
		text-align: center;
		margin-top: 20px;
		z-index: 9999;
	}
	.index-btn-area img{
		width: 42px;
		height: 42px;
	}
	.index-btn-area span{
		color: black;
		font-size: 13px;
	}
	.index-adv-item{
		margin-top: 5px;
		display: block;
	}
	.index-adv-item img{
		width: 100%;
		box-shadow: 0px 1px 3px #777777;
	}
	.choosearea-input-hint{
		line-height:30px;
		height:30px;
		width:100%;
		text-align:center;
		position:absolute;
		top:-15px;
		margin-top:-20px;
	}
	.choosearea-input-hint img{
		height:20px;
		width:20px;
		vertical-align: middle;
	}
	.choosearea-input-outer{
		text-align:center;
		background-color:white;
		border:1px solid #AAA;
		border-radius:3px;
		width:100%;
		height:30px;
		line-height:20px;
	}
	.choosearea-input{
		width:100%;
		height:100%;
		margin:0;
		padding:0;
		border-radius: 8px;
		border:none;
		display:block;
		font-size:1.5em;
		text-align:center;
		color:#727272;
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

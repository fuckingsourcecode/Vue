<template>
	<div class="systempackage">
	    <title title="国际套餐" showbtn="false" backlink="index"></title>
		<!-- 顶部轮播图 -->
		<!-- <div class="swiper-container" style="height: 180px;width: 100%;">
	        <div class="swiper-wrapper">
	        	<div class="swiper-slide">
	        		<a href="#">
	        			<img width="100%" src="/static/images/temp/adv-0.png"/>
	        		</a>
	        	</div>
	            <div class="swiper-slide">
	            	<a href="#">
	            		<img width="100%" src="/static/images/temp/adv-1.png" />
	            	</a>
	            </div>
	            <div class="swiper-slide">
	            	<a href="#">
	            		<img width="100%" src="/static/images/temp/adv-2.png" />
	            	</a>
	            </div>
	        </div>
	        <div class="swiper-pagination"></div>
	    </div> -->
	   
	    <div class="systempackage-wrapper">
		    
		    <!-- 大洲 -->
		    <div class="systempackage-continent">
			    <div class="systempackage-input" v-link="{name: 'areasearch'}">
				    <div class="systempackage-input-box">
					    <img src="/static/images/icon/search-1.png" alt="">
					    <p>请输入目的地</p>
				    </div>
			    </div>
		    	<a v-link="{name: 'choosearea', params: {idx: 0}}">
		    		<img src="/static/images/icon/icon-105.png"><br/>
		    		<span>亚洲</span>
		    	</a>
		    	<a v-link="{name: 'choosearea', params: {idx: 1}}">
		    		<img src="/static/images/icon/icon-104.png"><br/>
		    		<span>大洋洲</span>
		    	</a>
		    	<a v-link="{name: 'choosearea', params: {idx: 2}}">
		    		<img src="/static/images/icon/icon-103.png"><br/>
		    		<span>欧洲</span>
		    	</a>
		    	<a v-link="{name: 'choosearea', params: {idx: 3}}">
		    		<img src="/static/images/icon/icon-102.png"><br/>
		    		<span>美洲</span>
		    	</a>
		    	<a v-link="{name: 'choosearea', params: {idx: 4}}">
		    		<img src="/static/images/icon/icon-101.png"><br/>
		    		<span>非洲</span>
		    	</a>
		    </div>
		    <div class="systempackage-group">
		    	<div class="systempackage-group-title"><span class="systempackage-title-icon"></span>热门组合</div>
		    	<div class="swiper-container">
			        <div class="swiper-wrapper">
			            <div class="swiper-slide" v-for="item in hotarea">
			            	<img v-bind:src="item.src" width="100%"  v-link="{name: 'packagedetail', params: { packageid: item.countryId}}">
			            </div>
			        </div>
			        <div class="swiper-pagination"></div>
			    </div>
		    </div>
		    <div class="systempackage-country">
		    	<div class="systempackage-country-title"><span class="systempackage-title-icon"></span>热门国家和地区</div>
		    	<a class="systempackage-country-item" v-for="area in arealist"
		    		v-link="{name:'packagedetail',params:{packageid:area.countryId}}">
        			<!-- <img v-bind:src="area.src"><br/>
					<span>{{area.name}}</span> -->
					<!-- <span class="systempackage-country-en">{{area.enname}}</span> -->
                    <img v-bind:src="area.src" alt="">
        		</a>
		    </div>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
import Utils from '../../common/utils.js'
import Config from '../../common/config.js'
import toastDialog from '../../components/dialog/toastDialog.vue'
export default{
	data:function(){
		return {
			grouplist:[],
			arealist:[],
			hotarea: [],
			toastdialogtitle: '', 
			toastdialogcontent: ''
		}
	},
	components: {
		toastDialog
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
		// 滚动条
		swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			spaceBetween: 0,
			centeredSlides: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: false,
			loop: true
		});
		var swiper;
		var self = this;
        //热门组合
        $.ajax({
			beforeSend: function () {
        		$('.weui_loading_toast').css('display', 'block');
        	},
			complete: function () {
        		$('.weui_loading_toast').css('display', 'none');
        	},
			type: 'post',
			url: Config.getApiURL() + '/hotarea/list',
			data: JSON.stringify({num: 5,type: 1}),
			success: response => {
				if (response.status == 0) {
					self.hotarea = response.data;
					self.hotarea.forEach((value) => {
						value.src = Config.getMediaURL()+'/'+value.imageSrc;
					});

				} else {
					self.toastdialogtitle = "反馈提示";
					self.toastdialogcontent = response.tip;
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
						$('#dialog2').off('click').hide();
					});
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
        //热门地区资源加载
		$.ajax({
			beforeSend: function () {
        		$('.weui_loading_toast').css('display', 'block');
        	},
			complete: function () {
        		$('.weui_loading_toast').css('display', 'none');
        	},
			type: 'post',
			url: Config.getApiURL() + '/hotarea/list',
			data: JSON.stringify({num: 5,type: 0}),
			success: response => {
				console.log(response);
				if (response.status == 0) {
					self.arealist = response.data;
					response.data.forEach((value, index, array) => {
						value.src = Config.getMediaURL() + '/' + value.imageSrc;
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
						// $(".swiper-slide img").height($(document).width()*9/16);
						// $(".swiper-container").height($(document).width()*9/16);
					}, 500);
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
		// 滚动条
		// swiper = new Swiper('.swiper-container', {
		// 	pagination: '.swiper-pagination',
		// 	spaceBetween: 0,
		// 	centeredSlides: true,
		// 	autoplay: 2500,
		// 	autoplayDisableOnInteraction: false,
		// 	loop: true
		// });
	}
}
</script>
<style type="text/css">
	/* .systempackage {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	} */
	.systempackage-title-icon {
		float:left;
		display:block;
		height:10px;
		margin-top:7.5px;
		margin-right:10px;
		width:5px;
		background-color:#1fd291;
	}
	.systempackage-wrapper{
		/* position: absolute;
		top: 180px;
		left: 0; */
		width: 100%;
		
	}
	.systempackage-continent{
		width: 100%;
		background: url('/static/images/temp/world_map.png');
		background-size: 100% 100%;
		text-align: center;
	}
	.systempackage-continent a{
		display: block;
		width: 20%;
		float: left;
		text-align: center;
		margin-top: 15px;
	}
	.systempackage-continent img{
		width: 40px;
		height: 40px;
		border-radius: 20px;
	}
	.systempackage-continent span{
		font-size: 13px;
		color: black;
	}
	.systempackage-group{
		width: 100%;
		background-color: white;
	}
	.swiper-container {
        height: 90px;
        width: 100%;
	}
	.systempackage-group-title{
		color: #1fd291;
		font-size: 12px;
		height: 25px;
		line-height: 25px;
		background-color: #eeeeee;
	}
	.systempackage-group-item{
		text-align: center;
		width:33.3%;
		display: block;
		margin-top: 5px;
		float: left;
		z-index: 9999;
	}
	.systempackage-group-item img{
		width: 50px;
		height: 50px;
		border-radius: 25px;
		box-shadow: 0px 2px 2px #888888;
	}
	.systempackage-group-item span{
		font-size: 13px;
		color: black;
		width: 100%;
		display: block;
		margin-top: 3px;
	}
	.systempackage-group-en{
		font-size: 12px;
		opacity: 0.4;
		font-weight: bold;
	}
	.systempackage-country{
		width: 100%;
		height: 100%;
		background-color: white;
	}
	.systempackage-country-title{
		color: #1fd291;
		font-size: 12px;
		background-color: #eeeeee;
		height: 25px;
		line-height: 25px;
	}
	.systempackage-country-item{
		width:100%;
		display: block;
	}
	.systempackage-country-item img{
        width: 100%;
	}
	.systempackage-country-item span{
		font-size: 13px;
		color: black;
		width: 100%;
		display: block;
		margin-top: 3px;
		letter-spacing: 1px;
	}
	.systempackage-country-en{
		font-size: 12px;
		opacity: 0.4;
		font-weight: bold;
	}
	.systempackage-input {
		width: 90%;
		height: 30px;
		text-align: center;
		border: 1px solid #b2b2b2;
		border-radius: 10px;
		margin: 10px auto;
		display: inline-block;
	}
	.systempackage-input-box {
		display: inline-block;
	}
	.systempackage-input-box img {
		width: 15px;
		height: 15px;
		display: inline-block;
		float: left;
		margin-left: 10px;
		margin-top: 7px;
	}
	.systempackage-input-box p{
		float: left;
		display: inline;
		font-size: 14px;
		line-height: 28px;
		color: #8b8b8b;
	}
	@media screen and (min-width: 320px) and (max-width: 375px) {
		.systempackage-continent {
			height: 135px;
		}
		.swiper-slide img, .swiper-container,.systempackage-country-item img {
			height: 100px;
		}
	}
	@media screen and (min-width: 375px) and (max-width: 414px) {
		.systempackage-continent {
			height: 165px;
		}
		.swiper-slide img, .swiper-container,.systempackage-country-item img {
			height: 130px;
		}
	}
	@media screen and (min-width: 414px) and (max-width: 568px) {
		.systempackage-continent {
			height: 190px;
		}
		.swiper-slide img, .swiper-container,.systempackage-country-item img {
			height: 152px;
		}
	}
	@media screen and (min-width: 568px) and (max-width: 768px) {
		.systempackage-continent {
			height: 290px;
		}
		.swiper-slide img, .swiper-container,.systempackage-country-item img {
			height: 249px;
		}
	}
	@media screen and (min-width: 768px) {
		.systempackage-continent {
			height: 300px;
		}
		.swiper-slide img, .swiper-container,.systempackage-country-item img {
			height: 352px;
		}
	}
</style>
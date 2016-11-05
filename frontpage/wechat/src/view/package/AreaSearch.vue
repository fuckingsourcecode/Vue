<template>
	<div class="areasearch" id="areasearch-content">
		<div class="areasearch-input">
			<div class="areasearch-input-box">
				<img src="/static/images/icon/search-1.png" alt="">
				<input id="areasearch-con" type="text" placeholder="输入国家或地区名称" autofocus>
			</div>
			<a v-link="{name:'systempackage'}">取消</a>
		</div>
		<div class="areasearch-content">
		    <div v-if="this.items.length > 0">
		    	<a class="areasearch-result" v-for="item in items" v-link="{name: 'packagedetail',params:{packageid: item.countryId}}">
			    	<img v-bind:src="item.src" alt="国旗">
			    	<p>{{item.name}} <span>{{item.continent}}</span></p>
		    	</a>
		    </div>
			<div class="areasearch-hotarea" v-if="this.items.length <= 0">
				<div class="areasearch-bar">热门地区</div>
				<div class="areasearch-theArea">
					<ul>
						<li v-for="area in areas" v-link="{name: 'packagedetail',params:{packageid: area.countryId}}">{{area.name}}</li>
					</ul>
				</div>
			</div>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
    import Utils from '../../common/utils.js'
	import Config from '../../common/config.js'
	import toastDialog from '../../components/dialog/toastDialog.vue'
	export default {
		data: function () {
			return {
				items:[],
				areas:[],
				toastdialogtitle: '', 
				toastdialogcontent: ''
			}
		},
		components: {
			toastDialog
		},
		methods: {
      
		}, 
		ready:function(){
			var self = this;
			$('#areasearch-con').bind('input propertychange', function(event) {
				var value = $('#areasearch-con').val();
				$.ajax({
				    url: Config.getApiURL()+'/search/searchCountry',
				    type: 'POST',
				    dataType: 'json',
				    data: JSON.stringify({data: value}),
				    success: function(data) {
				    	if (data.status == 0) {
				    		self.items = data.data || [];
				    		self.items.forEach(function(value, index, array){
			        			value.src = Config.getMediaURL()+value.flagImageSrc;
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
			});
			$.ajax({
			  	url: Config.getApiURL()+'/hotarea/list',
			  	type: 'POST',
			  	dataType: 'json',
			  	data: JSON.stringify({num: 6, type: 0}),
			  	success: function(data) {
			    	if (data.status == 0) {
			    		self.areas = data.data;
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
			
			var thetotal = document.documentElement.clientHeight;
	        document.getElementById("areasearch-content").style.height=thetotal+"px";
		}
	}
</script>
<style>
	.areasearch	{
		width: 100%;
		background-color: #efeeee!important;
	}
	.areasearch-input {
		width: 100%;
		height: 52px;
		background-color: #fff!important;
		z-index: 2001;
		border-bottom: 1px solid #ddd;
	}
	.areasearch-input-box {
		width: 75%;
		height: 30px;
		display: inline-block;
		float: left;
		text-align: center;
		border: 1px solid #b2b2b2;
		border-radius: 10px;
		margin-top: 10px;
		margin-left: 10px;
		margin-bottom: 10px;
	}
	.areasearch-input-box img {
		width: 15px;
		height: 15px;
		float: left;
		margin-left: 10px;
		margin-top: 5px;
	}
	.areasearch-input-box input {
		float: left;
		height: 20px;
		line-height: 20px;
		margin-left: 5px;
		border: none;
		outline: medium;
		margin-top: 5px;
		background: transparent;
	}
	.areasearch-input a {
		display: inline-block;
		float: right;
		margin-top: 10px;
		margin-right: 10px;
		width: 40px;
		height: 30px;
		border: 1px solid #b2b2b2;
		border-radius: 5px;
		font-size: 14px;
		color: #797878;
		text-align: center;
		line-height: 30px;
	}
	.areasearch-content	{
		width: 100%;
		clear: both;
		margin-top: 5px;
	}
	.areasearch-result {
		width: 100%;
		height: 41px;
		display: block;
		text-decoration: none;
		color: #797878;
		border-bottom: 1px solid #ddd;
	}
	.areasearch-result img {
		width: 35px;
		height: 35px;
		border-radius: 100px;
		float: left;
		margin-left: 10px;
	}
	.areasearch-result p {
		display: inline-block;
		float: left;
		margin-left: 10px;
		margin-top: 10px;
	}
	.areasearch-result p>span {
		font-size: 12px;
	}
	.areasearch-bar{
		clear: both;
		color: #35b08b;
		margin-left: 10px;
		margin-top: 10px;
	}
	.areasearch-theArea {
		width: 100%;
	}
	.areasearch-theArea ul li {
		width: 30%;
		float: left;
		margin-left: 2.5%;
		margin-top: 10px;
		text-align: center;
		height: 40px;
		line-height: 40px;
		border-radius: 5px;
		background-color: #fff;
		color: #6e6e6e;
	}
</style>
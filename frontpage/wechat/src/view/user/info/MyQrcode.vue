<template>
	<div class="myqrcode">
		<title title="我的二维码" backlink="usercenter" showbtn="false"></title>
		<!-- <div class="title">我的二维码
			<a class="left-btn" v-link="{name:'userinfo',params:{username:this.username}}">
				<img src="/static/images/icon/back.png">返回
			</a>
		</div> -->
		<div class="wrapper">
			<li>
				<img class="myqrcode-icon" 
					v-bind:src="imgPath ? imgPath : '/static/images/temp/head-icon.jpg'"/>
			</li>
			<li class="myqrcode-username">
				{{username}}
			</li>
			<li class="myqrcode-tip" v-show="true">
				(绑定ICCID) 12345678901234567890
			</li>
			<li>
				<img class="myqrcode-img" src="{{qrcodeurl}}">
			</li>
			<li style="font-size:14px;color:#5e5d5d;">（扫描二维码，激活套餐到绑定卡片）</li>
		</div>
	</div>
</template>
<script>
import Utils from '../../../common/utils.js'
import Config from '../../../common/config.js'

export default{
	data:function(){
		return {
			qrcodeurl:Config.getApiURL()+'/user/genqrcode',
			username:'',
			imgPath: ''
		}
	},
	ready:function(){
		var self = this;
		$.post(Config.getApiURL()+"/user/info",{},
        function(result){
        	if (result.status == 0) {
        		self.username = result.data.name;
        		self.imgPath = result.data.imgPath;
        		console.log(result.data.imgPath);
            }
        })
	}
}

</script>
<style type="text/css">
	.myqrcode .wrapper{
		text-align: center;
		background-color: white;
		height: 390px;
/*		box-shadow: 0px 1px 2px #0066aa;*/
		padding-top: 10px;
	}
	.myqrcode li{
		margin-bottom: 8px;
	}
	.myqrcode-icon{
		width: 80px;
		height: 80px;
		border-radius: 40px;
	}
	.myqrcode-username{
		font-weight: bold;
	}
	.myqrcode-tip{
		color: #ef4916;
		font-size: 14px;
	}
	.myqrcode-img{
		width: 250px;
		height: 250px;
		margin-top: 10px;
	}
</style>
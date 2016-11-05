<template>
	<div class="system">
		<title title="设置" backlink="usercenter" showbtn="false"></title>
		<div class="wrapper system-wrapper">
			<a class="system-item" v-link="{name:'language'}">&nbsp;语言
				<img src="/static/images/icon/chevron-right.png">
			</a>
			
			<a class="system-item" v-link="{name:'about'}">&nbsp;关于我们
				<img src="/static/images/icon/chevron-right.png">
			</a>
			
			<a class="system-item">
				&nbsp;版本信息
				<span>2.0.0</span>
			</a>
		
			<a class="system-item" id="system-item-quit"@click="quit()">&nbsp;退出当前账号</a>
		</div>
	</div>
</template>
<script>
import Utils from '../../../common/utils.js'
import Config from '../../../common/config.js'

export default{
	methods:{
		quit:function(){
			var self = this;
			$.post(Config.getApiURL()+"/user/logout",{},
	        function(result){
	        	if (result.status == 0) {
	        		self.$router.go('/index');
	            }else{
	            	self.loginflag = false;
	            }
	        })
		}
	}
}
</script>
<style type="text/css">

	
	.system {
		background-color:white;
	}

	a.system-item {
		height:60px;
		border-bottom:1px solid #ddd;
		background-color:white;
		width:100%;
		padding-left:10px;
		line-height:60px;
		
		display:block;
	}
	#system-item-quit {
		color:#D32F2F;
		text-align:center;
		padding-left:0;

	}
	.system-wrapper a {
		text-decoration:none;
		color:black;
		font-size:16px;

	}
	.system-item img {
		width:25px;
		height:25px;
		float:right;
		display:block;
		margin-right:30px;
		margin-top:17.5px;
	}
</style>
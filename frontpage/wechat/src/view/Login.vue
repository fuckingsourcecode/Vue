<template>
	<div class="login" id="login-content">
		<title title="登录" backlink="index" showbtn="true"></title>
		<div class="loginwrapper">
			<img src="/static/images/login/logo.png" class="login-icon">
			<div class="login-label">
				<img src="/static/images/login/account.png">
				<input class="login-input" type="text" name="username" v-model="username" placeholder="请输入您的手机号码" />
			</div>
			<div class="login-label">
				<img src="/static/images/login/password.png">
				<input class="login-input" type="password" name="password"  v-model="password" placeholder="请输入您的密码"/>
			</div>
			<p v-text="logintip" class="login-label" style="border: none; text-align:left; color:#fb9337"></p>
			<a class="login-btn" @click="login()">登&nbsp;录</a>
			<div class="login-server clearfix">
				<a v-link="{name:'register'}" style="color: #fff;float:left;margin-top: 10px; margin-left: 5px;">去注册</a>
				<a v-link="{name:'backpassword'}" title="" style="color: #fff;float:right;margin-top: 10px; margin-right: 5px;">忘记密码？</a> 
			</div>
		</div>
		<!-- <line-toast></line-toast> -->
	</div>
</template>
<script>
import Utils from '../common/utils.js'
import Config from '../common/config.js'
import lineToast from '../components/toast/lineToast.vue'
export default{
	ready:function(){
		var self = this;
		$.post(Config.getApiURL()+"/user/info",{},
        function(result){
        	if (result.status == 0) {
        		self.$router.go('/usercenter');
            }
        });
        var thetotal = document.documentElement.clientHeight;
        document.getElementById("login-content").style.height=thetotal+"px";
	},
	components: {
		// lineToast
	},
	data:function(){
		return {
			username:'',
			password:'',
			logintip: '',
			// linetoast: '',
			loginflag:false
		}
	},
	methods:{
		login:function(){
			var self = this;
			$.ajax({
				type: 'post',
				url: Config.getApiURL()+"/user/login",
            	data: JSON.stringify({ username:self.username,password:self.password,remember:true}),
	           	success: function(result){
	           		console.log(result);
	            	if (result.status == 0) {
	            		// console.log(result);
	            		// console.log(self.$route);
	            		self.linetoast = "登录成功";
	            		var url = decodeURIComponent(Utils.getDirectUrl(window.location))||'/usercenter';
	            		// console.log(url);
	            		self.$router.go(url);
	            		// window.location.href = "http://www.itourbag.com/#!" + url; 
	                }else{
	                	console.log(result);
	                	self.logintip = result.tip;
	                }
	            },
	            error: function(response) {
	            	console.log(response);
	            }
            })
		}
	}
}
</script>
<style type="text/css">
    .login{
    	width: 100%;
    	/*background: url('/static/images/login/background.png') no-repeat;*/
    	/*background-size: 100%;*/
    	/*background-color:#23c083 !important;*/
    	/*background: linear-gradient(rgba(31,217,32,0.3),rgba(31,217,32,1),rgba(31,217,32,0.3));*/
    	background:-webkit-gradient(linear,50% 0%, 50% 100%,from(#23c083),to(#009688));
    }
	.loginwrapper {
		width: 100%;
		margin-top:20%;
	}

	.login-icon {
		width: 196px;
		height: 92px;
		display: block;
		margin: 0 auto;
		margin-bottom: 20%;
	}
	.login-label {
		display: block;
		width: 75%;
		margin: 0 auto;
		margin-top: 5px;
		height: 35px;
		font-size: 15px;
		font-weight: normal;
		border-bottom: 1px solid #fff;
		text-align: center;
	}
	.login-label img{
		width:15px;
		height:19px;
		position:relative;
		top:3px;
	}
	.login-input{
		width: 71%;
		height: 35px;
		color: #fff;
		font-size: 16px;
/*		font-weight: normal;*/
		text-indent: 5px;
		border: none;
		color: white;
		opacity: 0.7;
		outline: none;
		background-color: transparent;
	}
	.login-btn{
		display: block;
		margin:  0 auto;
		width: 80%;
		height: 45px;
		font-size: 22px;
		line-height: 45px;
		text-align: center;
		/*background-color: #1fd291;*/
		border:1px solid white;
		color: white;
		border-radius: 40px;
	}
	.login-server{
		width: 80%;
		margin: 0 auto;
		font-size: 15px;
	}
	.login-label input::-webkit-input-placeholder,   
                 textarea::-webkit-input-placeholder {   
	    color: #fff;   
	} 
	.login-label input::-moz-input-placeholder,   
                 textarea::-moz-input-placeholder {   
	    color: #fff;   
	} 
	.login-label input::-ms-input-placeholder,   
                 textarea::-ms-input-placeholder {   
	    color: #fff;   
	}
	@media screen and (min-width: 320px) and (max-height: 480px) and (-webkit-device-pixel-ratio: 1){
		.loginwrapper {
			margin-top:20%;
		}
        .login-icon {
        	width: 180px;
        	height: 85px;
			margin-bottom: 15%;
		}
		.login-label {
			width: 59%;
			margin-top: 5px;
			height: 35px;
			font-size: 15px;
		}
		.login-label img{
			width:12px;
			height:16px;
			position:relative;
			top:3px;
		}
		.login-input{
			font-size: 14px;
		}
		.login-btn{
			width: 63%;
			height: 40px;
			font-size: 20px;
			line-height: 40px;
		}
		.login-server{
			width: 63%;
			margin: 0 auto;
		}
	}
	@media screen and (min-width: 320px) and (max-height: 480px) and (-webkit-device-pixel-ratio: 2){
        .loginwrapper {
			margin-top:20%;
		}
        .login-icon {
        	width: 180px;
        	height: 85px;
			margin-bottom: 15%;
		}
		.login-label {
			width: 59%;
			margin-top: 5px;
			height: 35px;
			font-size: 15px;
		}
		.login-label img{
			width:12px;
			height:16px;
			position:relative;
			top:3px;
		}
		.login-input{
			font-size: 14px;
		}
		.login-btn{
			width: 63%;
			height: 40px;
			font-size: 20px;
			line-height: 40px;
		}
		.login-server{
			width: 63%;
			margin: 0 auto;
		}
	}
</style>
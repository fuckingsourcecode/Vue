<template>
	<div class="register" id="register-content">
		<title title="注册" backlink="index" showbtn="false"></title>
		<div class="registerwrapper">
			<div class="register-label">
				<input class="register-input" type="text" name="username" 
				placeholder=" 请输入您的手机号" v-model="username"/>
				<span style="float:left;color:#fb9337;font-size:12px;line-height:20px;" v-text="telerr"></span>
			</div>
			<div class="register-label">
				<input type="number" v-model="code" class="register-code" placeholder=" 请输入验证码">
				<a class="register-gain" @click="getCode" v-text="time">获取验证码</a>
			</div>
			<div class="register-label">
				<input class="register-input" type="password" name="username" 
				placeholder=" 设置登录密码" v-model="password"/>
				<span style="display:block;color:#fb9337;float:left;font-size:12px;" v-text="codetest"></span>
			</div>
			<a class="register-btn" @click="register()">注册</a>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
import Utils from '../common/utils.js'
import Config from '../common/config.js'
import toastDialog from '../components/dialog/toastDialog.vue'
export default{
	data:function(){
		return {
			username:'',
			password:'',
			teltest: false,
			codetest: '',
			telerr: '',
			code: '',
			time: '获取验证码',
			toastdialogtitle: '', 
			toastdialogcontent: ''
		}
	},
	components: {
		toastDialog
	},
	methods:{
		getCode: function () {
			//获取验证码
			this.telerr = '';
			if (!(/^1[0|1|2|3|4|5|7|8]\d{9}$/.test(this.username))) {
				this.telerr = '您输入的电话号码有误';
				sessionStorage.setItem('registercounter', 60);
				this.time = "获取验证码";
				clearInterval(window.registercounter);
				return false;
			} else {
				this.teltest = false;
			}
			var self = this;
			if (sessionStorage.getItem('registercounter') < 60) {
				return false;
			}
			if (parseInt(sessionStorage.getItem('registercounter')) == 60) {
				clearInterval(window.backpasstimer);
				$.ajax({
					type: 'post',
					url: Config.getApiURL() + '/sys/getRandCode',
					dataType: 'json',
					data: JSON.stringify({telPhone: self.username, type: 0}),
					success: response => {
						console.log(response);
					},
					error: response => {
						console.log(response);
					}
				});
				window.backpasstimer = setInterval(() => {
					if (sessionStorage.getItem('registercounter')<=0) {
						self.time = "获取验证码";
						sessionStorage.setItem('registercounter', 60);
						clearInterval(window.backpasstimer);
						return false;
					} else {
						sessionStorage.setItem('registercounter', sessionStorage.getItem('registercounter')-1);
						self.time = sessionStorage.getItem('registercounter') + ' s';
						return false;
					}
				}, 1000);
				return false;
			}
		},
		register:function(){
			var self = this;
			this.codetest = "";
			var repass = /^(\w*[0-9]+\w*[a-zA-Z]+\w*)|(\w*[a-zA-Z]+\w*[0-9]+\w*)$/;
			if (this.password.length < 6){
				this.codetest = "密码长度不能小于6位";
				return false;
			} else if (!(repass.test(this.password))) {
				this.codetest = "密码只能为数字和字母的组合";
				console.log('test');
				return false;
			} else {
				$.post(Config.getApiURL()+"/user/register",
	            JSON.stringify({'telphone':self.username,'password':self.password,'wx_openid':'', randcode: self.code}),
	            function(result){
	            	if (result.status == 0) {
	            		self.$router.go('/index');
	                }else {
	                	self.toastdialogtitle = "提示";
			            self.toastdialogcontent = result.tip;
						$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
					        $('#dialog2').off('click').hide();
					    });
	                	// console.log(result); 
	                }
	            })
			}
			
		}
	},
	ready: function () {
		var self = this;
		if (sessionStorage.getItem('registercounter') == null || sessionStorage.getItem('registercounter') == 60) {
			sessionStorage.setItem('registercounter', 60);
		} else if(sessionStorage.getItem('registercounter') < 0 || parseInt(self.time) <0 ) {
			sessionStorage.setItem('registercounter', 60);
			this.time = "获取验证码";
			clearInterval(window.registercounter);
		} else {
			this.time = sessionStorage.getItem('registercounter') + ' s';
			window.registercounter = setInterval(() => {
				sessionStorage.setItem('registercounter', sessionStorage.getItem('registercounter')-1);
				this.time = sessionStorage.getItem('registercounter') + ' s';
			}, 1000);
		}
		this.$watch('time', function () {
			if (parseInt(this.time) < 0) {
				sessionStorage.setItem('registercounter', 60);
				this.time = "获取验证码";
				clearInterval(window.registercounter);
			}
		});
	    var total = document.documentElement.clientHeight;
	    document.getElementById('register-content').style.height = total+"px";
	}
}
</script>
<style type="text/css">
	.register {
		width: 100%;
    	/*background: url('/static/images/login/background.png') no-repeat;*/
    	background:-webkit-gradient(linear,50% 0%, 50% 100%,from(#23c083),to(#009688));
    	background-size: 100%;
	}
	.registerwrapper {
		width: 100%;
		text-align: center;
	}
	.registerwrapper div{
		width: 80%;
		display: block;
		margin:  0 auto;
		height: 35px;
		font-size: 14px;
		font-weight: normal;
		margin-top: 29px;
	}
    .register-label:first-child {
    	margin-top: 20%;
    }
	.register-input{
		width: 100%;
		height: 35px;
		color: #fff;
		font-size: 14px;
		font-weight: normal;
		border: 1px solid #fff;
		border-radius: 5px;
		outline: none;
		background-color: transparent;
	}
	.register-code {
        width: 50%;
		height: 35px;
		color: #fff;
		font-size: 14px;
		font-weight: normal;
		border: 1px solid #fff;
		border-radius: 5px;
		outline: none;
		display: inline-block;
		background-color: transparent; 
		float:left;
	}
	.register-gain {
        display:inline-block;
        width:40%;
        text-align:center;
        line-height: 35px;
        color: #fff;
        border-radius: 5px;
        float:right;
        font-size:14px;
        border:1px solid white;
        /*background-color: #1fd291;*/
	} 
	.register-btn {
		display: block;
		margin:  0 auto;
		width: 80%;
		height: 40px;
		margin-top: 20%;
		line-height: 40px;
		text-align: center;
		/*background-color: #1fd291;*/
		color: white;
		border-radius: 5px;
		letter-spacing: 5px;
		border:1px solid white;

	}
	.register-label input::-webkit-input-placeholder,   
                 textarea::-webkit-input-placeholder {   
	    color: #e4e4ea;   
	} 
	.register-label input::-moz-input-placeholder,   
                 textarea::-moz-input-placeholder {   
	    color: #e4e4ea;   
	} 
	.register-label input::-ms-input-placeholder,   
                 textarea::-ms-input-placeholder {   
	    color: #e4e4ea;   
	}
</style>
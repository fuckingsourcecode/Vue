<template>
	<div class="backpassword" id="backpassword-content">
		<title title="找回密码" showbtn="false" backlink="login"></title>
		<div class="backpasswordwrapper">
			<div v-if="!getcode">
				<div class="backpassword-label">
					<input type="tel" class="backpassword-input" placeholder="请输入您的手机号" v-model="tel"/>
					<span style="color:#fb9337;font-size:14px;line-height:14px;" v-if="teltest">您输入的电话号码有误</span>
				</div>
				<div class="backpassword-label">
					<input type="number" v-model="code" class="backpassword-code" placeholder="请输入验证码">
					<a class="backpassword-gain" @click="getCode" v-text="time">获取验证码</a>
				</div>
				<a class="backpassword-btn" @click="next">下一步</a>
			</div>
			<div v-else>
				<div class="backpassword-label" style="position:relative;">
					<input type="password" v-model="newpassworld" id="back" class="backpassword-input" placeholder="请输入新密码" autofocus>
					<img src="../../../../static/images/icon/passnosee.svg" @click="newsee">
					<span v-text="passwordcheck" style="color: #fb9337;font-size:14px;"></span>
				</div>
				<a class="backpassword-btn" @click="finish">完成</a>
			</div>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
import Utils from '../../../common/utils.js'
import Config from '../../../common/config.js'
import toastDialog from '../../../components/dialog/toastDialog.vue'

export default{
	data:function(){
		return {
			getcode: false,
			tel: '',
			teltest: false,
			codetest: false,
			passwordcheck:'',
			newpassworld: '',
			passwordcheck: '',
			code: '',
			time: '获取验证码',
			toastdialogtitle: '', 
			toastdialogcontent: ''
		}
	},
	components: {
		toastDialog
	},
	methods: {
		getCode: function () {
			var self = this;
			//获取验证码
			if (!(/^1[0|1|2|3|4|5|7|8]\d{9}$/.test(this.tel))) {
				this.teltest = true;
				sessionStorage.setItem('backpasscounter', 60);
				this.time = "获取验证码";
				clearInterval(window.backpasstimer);
				return false;
			} else {
				this.teltest = false;
			}
			if (sessionStorage.getItem('backpasscounter') < 60) {
				// clearInterval(window.backpasstimer);
				// window.backpasstimer = setInterval(() => {
				// 	if (sessionStorage.getItem('backpasscounter')<=0) {
				// 		self.time = "获取验证码";
				// 		sessionStorage.setItem('backpasscounter', 60);
				// 		clearInterval(window.backpasstimer);
				// 		return false;
				// 	} else {
				// 		sessionStorage.setItem('backpasscounter', sessionStorage.getItem('backpasscounter')-1);
				// 		self.time = sessionStorage.getItem('backpasscounter') + ' s';
				// 		return false;
				// 	}
				// }, 1000);
				return false;
			}
			if (parseInt(sessionStorage.getItem('backpasscounter')) == 60) {
				clearInterval(window.backpasstimer);
				$.ajax({
					type: 'post',
					url: Config.getApiURL() + '/sys/getRandCode',
					dataType: 'json',
					data: JSON.stringify({telPhone: self.tel, type: 1}),
					success: response => {
						console.log(response);
					},
					error: response => {
						console.log(response);
					}
				});
				window.backpasstimer = setInterval(() => {
					if (sessionStorage.getItem('backpasscounter')<=0) {
						self.time = "获取验证码";
						sessionStorage.setItem('backpasscounter', 60);
						clearInterval(window.backpasstimer);
						return false;
					} else {
						sessionStorage.setItem('backpasscounter', sessionStorage.getItem('backpasscounter')-1);
						self.time = sessionStorage.getItem('backpasscounter') + ' s';
						return false;
					}
				}, 1000);
				return false;
			}
		},
		next: function () {
			//校验验证码
			var self = this;
			$.ajax({
				type: 'post',
				url: Config.getApiURL() + '/user/validateRandcode',
				dataType: 'json',
				data: JSON.stringify({telPhone: self.tel, randcode:self.code}),
				success: response => {
					console.log(response);
					if (response.status == 0) {
						this.codetest = false;
						this.getcode = true;
					} else {
						this.codetest = true;
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
		newsee: function() {
			//密码可视化
			if($('#back').attr('type') == 'password') {
				$('#back').attr('type', 'text');
				$('#back').next().attr('src', '../../../../static/images/icon/passsee.svg');
			} else {
				$('#back').attr('type', 'password');
				$('#back').next().attr('src', '../../../../static/images/icon/passnosee.svg');
			}
		},
		finish: function () {
			//修改密码
			console.log('test');
			console.log(this.newpassworld);
			var self = this;
			var repass =  /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{12,}$/;
			if (this.newpassworld.length < 12){
				this.passwordcheck = "密码长度不能小于12位";
				return false;
			} else if (!(repass.test(this.newpassworld))) {
				this.passwordcheck = "密码只能为数字和字母的组合";
				return false;
			} else {
				this.passwordcheck = "";
				$.ajax({
					type:'post',
					url: Config.getApiURL() + '/user/forgetpw', 
					data: JSON.stringify({telPhone: self.tel, password: self.newpassworld}), 
		            success: response => {
		            	console.log(response);
			            if (response.status == 0) {
			            	this.$router.go('/login');
			            } else {
			            	this.passwordcheck = "修改失败，请重新修改";
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
			}
		}
	},
	ready:function(){
		var self = this;
		if (sessionStorage.getItem('backpasscounter') == null || sessionStorage.getItem('backpasscounter') == 60) {
			sessionStorage.setItem('backpasscounter', 60);
		} else if(sessionStorage.getItem('backpasscounter') < 0 || parseInt(self.time) <0 ) {
			sessionStorage.setItem('backpasscounter', 60);
			this.time = "获取验证码";
			clearInterval(window.backpasstimer);
		} else {
			this.time = sessionStorage.getItem('backpasscounter') + ' s';
			window.backpasstimer = setInterval(() => {
				sessionStorage.setItem('backpasscounter', sessionStorage.getItem('backpasscounter')-1);
				this.time = sessionStorage.getItem('backpasscounter') + ' s';
			}, 1000);
		}
		this.$watch('time', function () {
			if (parseInt(this.time) < 0) {
				sessionStorage.setItem('backpasscounter', 60);
				this.time = "获取验证码";
				clearInterval(window.backpasstimer);
			}
		});
		var total = document.documentElement.clientHeight;
	    document.getElementById('backpassword-content').style.height = total+"px";
	}
}

</script>
<style type="text/css">
	.backpassword {
		width: 100%;
    	/*background: url('/static/images/login/background.png') no-repeat;*/
    	background-size: 100%;
    	background:-webkit-gradient(linear,50% 0%, 50% 100%,from(#23c083),to(#009688));
	}
	.backpassword-label {
		display: block;
		width: 80%;
		height: 45px;
		margin: 0 auto;
		font-size: 18px;
		font-weight: normal;
		margin-top: 29px;
	}
	.backpassword-input {
		width: 100%;
		height: 35px;
		color: #fff;
		font-size: 14px;
		border-radius: 5px;
		border:1px solid white;
		text-indent: 5px;
		outline: none;
		background-color: transparent;
	}
	.backpassword-code {
        width: 50%;
		height: 35px;
		color: #fff;
		font-size: 14px;
		font-weight: normal;
		border: 1px solid #fff;
		border-radius: 5px;
		text-indent: 5px;
		outline: none;
		display: inline-block;
		background-color: transparent; 
		float:left;
	}
	.backpassword-btn {
		display: block;
		margin: 0 auto;
		margin-top: 20%;
		width: 80%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 20px;
		/*background-color: #1fd291;*/
		border:1px solid white;
		color: white;
		border-radius: 5px;
		letter-spacing: 5px;
	}
	.backpassword-input+img {
		height: 30px;
		position: absolute;
		right: 3px;
		top: 0;
		z-index: 1001;
	}
	.backpassword-gain {
        display:inline-block;
        width:40%;
        text-align:center;
        line-height: 35px;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 5px;
        float:right;
        font-size:14px;
	} 
	.backpassword-label input::-webkit-input-placeholder,   
                 textarea::-webkit-input-placeholder {   
	    color: #e4e4ea;   
	} 
	.backpassword-label input::-moz-input-placeholder,   
                 textarea::-moz-input-placeholder {   
	    color: #e4e4ea;   
	} 
	.backpassword-label input::-ms-input-placeholder,   
                 textarea::-ms-input-placeholder {   
	    color: #e4e4ea;   
	}
</style>
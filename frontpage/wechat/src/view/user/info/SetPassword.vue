<template>
	<div class="setpassword" style="background:#fff;">
		<title title="修改密码" backlink="usercenter" showbtn="false"></title>		
		<div class="setpassword-wrapper" v-show="!originpw">
			<p class="setpassword-tip">原始密码</p>
			<input class="setpassword-input" id="original" v-model="originalpassworld" type="password" name="password" placeholder="输入原始密码" autofocus/>
			<img src="../../../../static/images/icon/passnosee-1.svg" @click="originalsee">
			<span v-show="passwordtip" style="color: red;float:left;margin-left:10%;font-size:12px;">密码不正确</span>
			<a class="setpassword-btn" @click="nextStep">下一步</a>
		</div>
		<div class="setpassword-wrapper" v-show="originpw">
			<p class="setpassword-tip">现在密码</p>
			<input class="setpassword-input" id="new" v-model="newpassworld" type="password" name="password" placeholder=" 输入新密码"/>
			<img src="../../../../static/images/icon/passsee-1.svg" @click="newsee">
			<span v-text="passwordcheck" style="color: red;float:left;margin-left:10%;font-size:12px;"></span>
			<a class="setpassword-btn" @click="change">完成</a>
		</div>
	</div>
</template>
<script>
import Utils from '../../../common/utils.js'
import Config from '../../../common/config.js'
export default{
	data:function(){
		return {
			originpw:false,
			originalpassworld: '',
			newpassworld: '',
			passwordtip: false,
			passwordcheck: ''
		}
	},
	methods:{
		nextStep:function(){
			this.$http.post(Config.getApiURL() + '/user/resetpw', JSON.stringify({password: this.originalpassworld, step: 1}), {
	            headers: {
	                "X-Requested-With": "XMLHttpRequest"
	            },
	            emulateJSON: true
	        }).then(response => {
	            if (response.data.status == 0) {
	            	this.originpw = true;
	            	this.passwordtip = false;
	            } else {
	            	this.originpw = false;
	            	this.passwordtip = true;
	            }
	        }, response => {
	            console.log(response);
	        });
		},
		change: function() {
			var repass =  /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{12,}$/;
			if (this.newpassworld.length < 12){
				this.passwordcheck = "密码长度不能小于12位";
			} else if (!(repass.test(this.newpassworld))) {
				this.passwordcheck = "密码只能为数字和字母的组合";
			} else {
				this.$http.post(Config.getApiURL() + '/user/resetpw', JSON.stringify({password: this.newpassworld, step: 2}), {
		            headers: {
		                "X-Requested-With": "XMLHttpRequest"
		            },
		            emulateJSON: true
		        }).then(response => {
		            if (response.data.status == 0) {
		            	this.$router.go('/usercenter');
		            } else {
		            	this.passwordcheck = "修改失败，请重新修改";
		            }
		        }, response => {
		            console.log(response);
		        });
			}
		},
		originalsee: function () {
			if($('#original').attr('type') == 'password') {
				$('#original').attr('type', 'text');
				$('#original').next().attr('src', '../../../../static/images/icon/passsee-1.svg');
			} else {
				$('#original').attr('type', 'password');
				$('#original').next().attr('src', '../../../../static/images/icon/passnosee-1.svg');
			}
		},
		newsee: function() {
			if($('#new').attr('type') == 'password') {
				$('#new').attr('type', 'text');
				$('#new').next().attr('src', '../../../../static/images/icon/passsee-1.svg');
			} else {
				$('#new').attr('type', 'password');
				$('#new').next().attr('src', '../../../../static/images/icon/passnosee-1.svg');
			}
		}
	},
	ready: function () {
		// var resource = this.$resource(Config.getApiURL() + '/user/resetpw');
		// var self = this;
	}
}
</script>
<style type="text/css">
	.setpassword-wrapper {
		text-align: center;
	}
	.setpassword-input1{
		width: 99.5%;
		margin-right: 5px;
		height: 35px;
		font-size: 18px;
		line-height: 36px;
		font-weight: normal;
		border-radius: 5px;
		border: solid 1px rgba(0,0,0,0.3);
		margin-bottom: 5px;
	}
	.setpassword-input{
		width: 60%;
		margin-right: 5px;
		height: 35px;
		font-size: 18px;
		font-weight: normal;
		outline: medium;
		border: none;
		border-bottom: solid 1px rgba(0,0,0,0.3);
	}
	.setpassword-input+img {
		height: 35px;
		position: absolute;
		right: 10%;
		top: 35px;
		z-index: 1001;
	}
	.setpassword-tip {
		margin-right: 1rem;
		height: 35px;
		font-size: 18px;
		display: inline-block;
	}
	.setpassword-btn{
		display: block;
		margin: 15px auto;
		width: 80%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #33cc99;
		color: white;
		border-radius: 5px;
		letter-spacing: 5px;
	}
</style>
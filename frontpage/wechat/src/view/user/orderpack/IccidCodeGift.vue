<template>
	<div class="iccidcodegift">
		<title title="信息" backlink="usercenter" showbtn="false"></title>
		<div class="wrapper">
			<div v-show="$route.params.status == 0">
				<input class="iccidcodegift-input" type="text" v-model="theValue" placeholder=" 请输入用户账号" autofocus/>
				<span id="tips" style="font-size:12px;color:red;" v-text="content"></span>
				<a class="iccidcodegift-btn" @click="sendCode">确认</a>
			</div>
			<div v-show="$route.params.status == 1">
				<input class="iccidcodegift-input" type="text" v-model="theValue" placeholder=" 请输入iccid" autofocus />
				<span id="tips" style="font-size:12px;color:red;" v-text="content"></span>
				<a class="iccidcodegift-btn" @click="sendCode">确认</a>
			</div>
		</div>
	</div>
</template>
<script>
    import Utils from '../../../common/utils.js'
	import Config from '../../../common/config.js'
	export default {
		data() {
			return {
			   theValue:'',
			   content: ''
			}
		},
		ready: function () {
			
		},
		methods:{
			sendCode:function(){
				var self = this;
				if (this.$route.params.status == 0) {
					//赠送
					var reg = /^[1-9]\d{5}$/;
					if (reg.test(this.theValue)) {

					} else {
						this.content = '账号格式不对';
						return false;
					}
					$.ajax({
						beforeSend: function () {
			        		$('.weui_loading_toast').css('display', 'block');
			        	},
						complete: function () {
			        		$('.weui_loading_toast').css('display', 'none');
			        	},
						type: 'post',
						url: Config.getApiURL() + '/user/package/giveUserPackage',
						dataType: 'json',
						data: JSON.stringify({userid: self.theValue, id: self.$route.params.id}),
						success: response => {
							console.log(response);
							if (response.status == 0) {

							} else {
								self.content = response.tip;
							}
						},
						error: response => {
							console.log(response);
						}
					});
				} else if (this.$route.params.status == 1) {
					//激活
					$.ajax({
						beforeSend: function () {
			        		$('.weui_loading_toast').css('display', 'block');
			        	},
						complete: function () {
			        		$('.weui_loading_toast').css('display', 'none');
			        	},
						type: 'post',
						url: Config.getApiURL() + '/user/package/activateUserPackage',
						dataType: 'json',
						data: JSON.stringify({iccid: self.theValue, id: self.$route.params.id}),
						success: response => {
							console.log(response);
						},
						error: response => {
							console.log(response);
						}
					});
				} else {

				}
			}
		}
	}
</script>
<style>
	.iccidcodegift-input{
		width: 99.5%;
		margin-right: 5px;
		height: 35px;
		font-size: 18px;
		font-weight: normal;
		border-radius: 5px;
		border: solid 1px rgba(0,0,0,0.3);
		margin-top: 5px;
	}
	.iccidcodegift-btn{
		display: block;
		margin-top: 10px;
		width: 100%;
		height: 45px;
		line-height: 45px;
		text-align: center;
		background-color: #33cc99;
		color: white;
		border-radius: 5px;
		letter-spacing: 5px;
	}
</style>
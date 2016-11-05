<template>
	<div class="unbunding" style="background:#fff;">
		<title title="解绑" btnname="卡包" showbtn="true" btnlink="usercard"></title>
		<div class="unbunding-wrapper">
			<!-- <div class="unbunding-input1" v-for="card in cards">
				ICCID码:<span>*****&nbsp;*****&nbsp;****{{card.iccid.substring(card.iccid.length-6,card.iccid.length-5)}}&nbsp;{{card.iccid.substring(card.iccid.length-5,card.iccid.length)}}
				</span>
			</div> -->
			<div class="unbunding-info">
				<img src="/static/images/combo/au.jpg" class="unbunding-cardimg">
				<div class="unbunding-realcard-detail">
					<h5>实体卡</h5>
					<div class="unbunding-realcard-detail-row">
						<p class="unbunding-realcard-detail-title">ICCID:</p>
						<p class="unbunding-realcard-detail-content">123</p>
					</div>
					<div class="unbunding-realcard-detail-row">
						<p class="unbunding-realcard-detail-title">当前套餐:</p>
						<p class="unbunding-realcard-detail-content">123</p>
					</div>
					<div class="unbunding-realcard-detail-row">
						<p class="unbunding-realcard-detail-title">当前流量:</p>
						<p class="unbunding-realcard-detail-content">123</p>
					</div>
					<div class="unbunding-realcard-detail-row">
						<p class="unbunding-realcard-detail-title">通话分钟:</p>
						<p class="unbunding-realcard-detail-content">123</p>
					</div>	
				</div>
			</div>
			<input class="unbunding-input2" type="text" id="exampleInputEmail4" placeholder=" 请输入验证码" style="display:inline-block;float:left;" v-model="randCode">
			<a class="unbunding-input3" style="display:inline-block;width:45%;text-align:center;float:right;" id="unbunding-getCode" @click="sendCode()" v-text="time"></a>
			<span id="tip" style="font-size:12px;color:red;display:none;margin-top:5px;" v-text="thetips"></span>
			<a class="unbunding-btn" @click="unbundingCard">确认</a>
			<toast :show.sync="showSuccess" text="解绑成功"></toast>
		    <toast :show.sync="showError" text="解绑失败" type="error"></toast>
		    <toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
		</div>
	</div>
</template>
<script>
    import Utils from '../../../common/utils.js'
	import Config from '../../../common/config.js'
	import Toast from '../../../components/toast/index.vue'
	import toastDialog from '../../../components/dialog/toastDialog.vue'
	export default {
		components: {
		    Toast
		  },
		data() {
			return {
			   nums:60,
			   clock: null,
			   cards:[],
			   showSuccess: false,
			   showError: false,
			   randCode:'',
			   thetips:'',
			   time: '获取验证码'
			}
		},
		components: {
			toastDialog
		},
		ready: function () {
			var self = this;
			$.post(Config.getApiURL()+"/user/card/list",{},
	        function(result){
	        	if (result.status == 0) {
	        		self.cards = result.data;
	            }else{
	            	alert(result.tip)
	            }
	        });
			if (sessionStorage.getItem('unbindcardcounter') == null || sessionStorage.getItem('unbindcardcounter') == 60) {
				sessionStorage.setItem('unbindcardcounter', 60);
			} else if(sessionStorage.getItem('unbindcardcounter') < 0 || parseInt(self.time) <0 ) {
				sessionStorage.setItem('unbindcardcounter', 60);
				this.time = "获取验证码";
				clearInterval(window.unbindcardtimer);
			} else {
				this.time = sessionStorage.getItem('unbindcardcounter') + ' s';
				window.unbindcardtimer = setInterval(() => {
					sessionStorage.setItem('unbindcardcounter', sessionStorage.getItem('unbindcardcounter')-1);
					this.time = sessionStorage.getItem('unbindcardcounter') + ' s';
				}, 1000);
			}
			this.$watch('time', function () {
				if (parseInt(this.time) < 0) {
					sessionStorage.setItem('unbindcardcounter', 60);
					this.time = "获取验证码";
					clearInterval(window.unbindcardtimer);
				}
			});
		},
		methods:{
			sendCode: function() { 
				var self = this;
				if (sessionStorage.getItem('unbindcardcounter') < 60) {
					return false;
				}
				if (parseInt(sessionStorage.getItem('unbindcardcounter')) == 60) {
					clearInterval(window.unbindcardtimer);
					$.ajax({
						type: 'post',
						url: Config.getApiURL() + '/sys/getRandCode',
						dataType: 'json',
						data: JSON.stringify({type:3}),
						success: response => {
							console.log(response);
						},
						error: response => {
							console.log(response);
						}
					});
					window.unbindcardtimer = setInterval(() => {
						if (sessionStorage.getItem('unbindcardcounter')<=0) {
							self.time = "获取验证码";
							sessionStorage.setItem('unbindcardcounter', 60);
							clearInterval(window.unbindcardtimer);
							return false;
						} else {
							sessionStorage.setItem('unbindcardcounter', sessionStorage.getItem('unbindcardcounter')-1);
							self.time = sessionStorage.getItem('unbindcardcounter') + ' s';
							return false;
						}
					}, 1000);
					return false;
				}
			},
			unbundingCard:function(){
			    var self = this;
			    $.ajax({
			      url: Config.getApiURL()+'/user/card/unbindcardcounter',
			      type: 'POST',
			      dataType: 'json',
			      data: JSON.stringify({randCode:self.randCode}),
			      success: function(data) {
			        if (data.status ==0) {
			        	$('#tip').css('display', 'none');
			        	self.showSuccess = true;
			        	setTimeout(function(){
			        		self.$router.go('usercard');
			        	},1000);
			        	
			        } else {
			        	self.thetips = data.tip;
			        	$('#tip').css('display', 'block');
                        self.showError = true;
			        }
			      },
			      error: function() {
			        	self.toastdialogtitle = "反馈提示";
						self.toastdialogcontent = "网络错误";
						$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
							$('#dialog2').off('click').hide();
						});
			      }
			    });
			    
			}
		}
	}
</script>
<style>
	.unbunding-info {
		margin: 5px 10px;
	}
	.unbunding-cardimg{
		width: 5rem;
		height: 4rem;
		border-radius: 5px;
		float: left;
	}
	.unbunding-realcard-detail {
		font-size:12px;
		color:#666;
		display: inline-block;
		width: 70%;
		margin-left: 10px;
	}
	.unbunding-realcard-detail-row {
		display:block;
		float:left;
		width:100%;
	}
	.unbunding-realcard-detail-title{
		
		min-width:30%;
		float:left;
	}
	.unbunding-realcard-detail-content {
		float:left;
		display:block;
		max-width:68%;
	}
	.unbunding-input1{
		width: 99.5%;
		margin-right: 5px;
		height: 35px;
		font-size: 18px;
		line-height: 36px;
		font-weight: normal;
		border-radius: 5px;
		border: solid 1px rgba(0,0,0,0.3);
	}
	.unbunding-input2{
		width: 45%;
		margin-left: 10px;
		height: 35px;
		line-height: 35px;
		font-size: 18px;
		font-weight: normal;
		border: none;
		outline: none;
		margin-top: 5px;
		background-color: #fff!important;
		/* background-color: #eeeeee!important; */
		border-bottom: solid 1px rgba(0,0,0,0.3);
	}
	.unbunding-input3{
		width: 45%;
		height: 37px;
		line-height: 37px;
		margin-right: 10px;
		/* background: #0066aa; */
		color: #0066aa;
		font-size: 15px;
		text-decoration: underline;
		font-weight: normal;
		border-radius: 5px;
		border: solid 1px #d5d5d6;
		text-decoration: none;
		margin-top: 5px;
		margin-bottom: 5px;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	.unbunding-btn{
		display: block;
		margin-top: 5px;
		width: 100%;
		height: 45px;
		line-height: 45px;
		text-align: center;
		background-color: #33cc99;
		color: white;
		border-radius: 5px;
		letter-spacing: 5px;
		clear: both;
	}	
	button[disabled],
	html input[disabled] {
	    pointer-events: none;
		cursor: not-allowed;
		filter: alpha(opacity=65);
		-webkit-box-shadow: none;
		box-shadow: none;
		opacity: .65;
	}
</style>
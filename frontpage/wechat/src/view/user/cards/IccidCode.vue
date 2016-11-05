<template>
	<div class="iccidcode" style="background-color:#fff;">
		<title title="绑卡" btnname="卡包" showbtn="true" btnlink="usercard"></title>

		<div class="iccidcode-wrapper">
			<div class="iccidcode-pic">
				<img src="/static/images/temp/iccid-card.png" width="65%">
				<p>红色方框内即途宝卡<span style="color:red;">ICCID</span>号码</p>
			</div>
			<input class="iccidcode-input" type="text" v-model="theValue" placeholder=" 请输入ICCID号码"/>
			<div class="iccidcode-identify">
				<input class="iccidcode-input2" type="text" id="exampleInputEmail4" placeholder=" 请输入验证码" v-model="randCode">
				<input class="iccidcode-input3" type="button" id="iccidcode-getCode" @click="sendCode" value="获取验证码" />
				<span id="tips" style="font-size:12px;color:red;margin-top:5px;" v-text="content"></span>
			</div>
			<a class="iccidcode-btn" @click="sendMessage">确认</a>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
    import Utils from '../../../common/utils.js'
	import Config from '../../../common/config.js'
	import toastDialog from '../../../components/dialog/toastDialog.vue'
	export default {
		data() {
			return {
			   nums: 60,
			   theValue:'',
			   content: '',
			   randCode:'',
			   toastdialogtitle: '', 
				toastdialogcontent: ''
			}
		},
		components: {
			toastDialog
		},
		ready: function () {
			
		},
		methods:{
			sendCode: function()
			{ 
			 	var clock='';
			 	var nums =this.nums;
				var self = this;
				$.ajax({
					beforeSend: function () {
			       		$('.weui_loading_toast').css('display', 'block');
					},
					complete: function () {
			    		$('.weui_loading_toast').css('display', 'none');
					},
				    url: Config.getApiURL()+'/sys/getRandCode',
				    type: 'POST',
				    dataType: 'json',
				    data: JSON.stringify({type:2}),
				    success: function(data) {
				  		if (data.status == 0) {
				  			$("#iccidcode-getCode").attr('disabled', true); 
							$("#iccidcode-getCode").val(nums+'秒后重新获取');
							if(nums == 60){
								clock = setInterval(function (){
									nums--;
									if(nums == 0){
										clearInterval(clock); 
										$("#iccidcode-getCode").attr('disabled',false);
										$("#iccidcode-getCode").val('获取验证码');
										nums = 60;   
									}else{
										$("#iccidcode-getCode").attr('disabled',true);
										$("#iccidcode-getCode").val(nums+'秒后重新获取');
									}
								}, 1000); 
							}
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
			},
			sendMessage:function(){
				var self=this;
	            $.ajax({
	              url: Config.getApiURL()+'/user/card/bindcard',
	              type: 'post',
	              dataType: 'json',
	              data: JSON.stringify({iccid:self.theValue,randCode:self.randCode}),
	              success: function(data) {
	                if (data.status == 0) {
                        $('#tips').css('display', 'none');
                        self.$router.go('/usercard');
	                } else {
                        self.content = data.tip;
                        $('#tips').css('display', 'block');
	                }
	              },
	              error: function(xhr, textStatus, errorThrown) {
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
	.iccidcode-pic {
		width: 100%;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.iccidcode-pic p {
		font-size: 12px;
		color: #b2b2b2;
		margin-top: 10px;
	}
	.iccidcode-input{
		width: 80%;
		height: 35px;
		margin: 0 auto;
		display: block;
		font-size: 14px;
		font-weight: normal;
		outline: medium;
		/*border-radius: 5px;
		border: solid 1px rgba(0,0,0,0.3);*/
		border: none;
		border-bottom: solid 1px rgba(0,0,0,0.3);
	}
	.iccidcode-identify {
		width: 80%;
		height: 65px;
		margin: 0 auto;
	}
	.iccidcode-input2{
		width: 50%;
		margin-right: 3px;
		height: 35px;
		font-size: 14px;
		font-weight: normal;
		display:inline-block;
		float:left;
		border: none;
		outline: none;
		margin-top: 5px;
		border-bottom: solid 1px rgba(0,0,0,0.3);
	}
	.iccidcode-input3{
		width: 45%;
		height: 37px;
		display:inline-block;
		text-align:center;
		float:right;
		color: #fff;
		font-size: 14px;
		font-weight: normal;
		border-radius: 5px;
		/*border: solid 1px rgba(0,0,0,0.3); */
		border: none;
		margin-top: 5px;
		margin-bottom: 5px;
		background-color: #1fd291;
	}
	.iccidcode-btn{
		display: block;
		width: 80%;
		height: 40px;
		margin: 20px auto;
		line-height: 40px;
		text-align: center;
		background-color: #1fd291;
		color: white;
		border-radius: 5px;
		letter-spacing: 5px;
		clear: both;
	}
</style>
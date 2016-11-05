<template>
	<div class="feedback" style="background-color:#fff;">
		<title title="意见反馈" backlink="usercenter" showbtn="false"></title>
		<div class="wrapper">
			<form>
				<textarea id="textarea" class="feedback-textarea" @click="onclick()" onfocus="if(value=='亲，我们非常重视您给我们提出的宝贵建议，帮助我们不断完善产品，谢谢！'){value=''}" onblur="if(value==''){value='亲，我们非常重视您给我们提出的宝贵建议，帮助我们不断完善产品，谢谢！'}">亲，我们非常重视您给我们提出的宝贵建议，帮助我们不断完善产品，谢谢！</textarea>
				</textarea>
			</form>
			<div class="feedback-colorbar"></div>
			<a class="feedback-btn" @click="submit()">提交</a>
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
			toastdialogtitle: '', 
		    toastdialogcontent: ''
		}
	},
	ready:function(){
        
	},
	components: {
		toastDialog
	},
	methods:{
		onclick:function(){
			$("#textarea").text('');
		},
		submit:function(){
			var content = $("#textarea").val();
			console.log(content);
			var self = this;
			if (content == '亲，我们非常重视您给我们提出的宝贵建议，帮助我们不断完善产品，谢谢！' || $.trim(content) == '') {
				self.toastdialogtitle = "反馈提示";
	            self.toastdialogcontent = "请填写建议";
				$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
			        $('#dialog2').off('click').hide();
			     });
				return false;
			}else {
				$.ajax({
					beforeSend: function () {
		        		$('.weui_loading_toast').css('display', 'block');
		        	},
					complete: function () {
		        		$('.weui_loading_toast').css('display', 'none');
		        	},
	                type: "POST",
	                contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                url: Config.getApiURL()+"/sys/feedback",
	                data: JSON.stringify({
	                	"content":content
	                }),
	                success: function (data) {
	                    if (data.status == 0) {
	                    	self.toastdialogtitle = "反馈提示";
	                    	self.toastdialogcontent = "感谢您的反馈，我们会及时处理";
							$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
			                    $('#dialog2').off('click').hide();
			                });
		                }else{
		                	self.toastdialogtitle = "反馈提示";
	                    	self.toastdialogcontent = data.tip;
							$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
			                    $('#dialog2').off('click').hide();
			                });
		                }
	                },
	                error: function (err) {
	                    self.toastdialogtitle = "反馈提示";
	                    self.toastdialogcontent = "请求错误";
						$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
			                $('#dialog2').off('click').hide();
			            });
	                }
	            });
			};   	
		}
	}
}
</script>
<style type="text/css">
	.feedback-textarea{
		width: 90%;
		height: 200px;
		margin: 5px 3%;
		color: #888888;
		padding:5px;
		font-size: 12px;
		border: solid 1px rgba(0,0,0,0.3);
		outline: none;
		resize: none;
	}
	.feedback-btn{
		display: block;
		width: 50%;
		height: 40px;
		margin: 20px auto;
		line-height: 40px;
		background-color: white;
		text-align: center;
		border:1px solid #b0b0b0;
		border-radius: 5px;
		color: gray;
		letter-spacing: 5px;
	}
	.feedback-colorbar{
		width: 100%;
		height: 5px;
		margin-top: 20px;
		background:url(/static/images/icon/colorbar.jpg) no-repeat;
	}
</style>
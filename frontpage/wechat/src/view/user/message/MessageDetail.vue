<template>
	<div class="messagedetail">
		<title backlink="usermessage" title="消息详情" showbtn="false"></title>
		<div class="wrapper">
			<div class="messagedetail-title">
				<h3>{{message.title}}</h3>
				<!-- <br/>
				<p >时间：{{message.createTime}}</p> -->
			</div>
			<div class="messagedetail-content" v-html="message.content">
				
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
			message:{},
			toastdialogtitle: '', 
			toastdialogcontent: ''
		}
	},
	components: {
		toastDialog
	},
	ready:function(){
		var self = this;
		$.ajax({
			beforeSend: function () {
			    $('.weui_loading_toast').css('display', 'block');
			},
			complete: function () {
			    $('.weui_loading_toast').css('display', 'none');
			},
			type: 'post',
			url: Config.getApiURL()+"/sys/message/info",
			data: JSON.stringify({id:self.$route.params.id}),
        	success: function(result){
	        	if (result.status == 0) {
	        		self.message = result.data;
	            }else{
	            	self.toastdialogtitle = "失败";
		            self.toastdialogcontent = result.tip;
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
				        $('#dialog2').off('click').hide();
				    });
	            }
	        }
        })
	}
}
</script>
<style type="text/css">
.messagedetail{
	background-color: white;
}
.messagedetail-title {
	padding:10px 0px;
}
.messagedetail-title p{
	color:#959595;
	font-size:13px;
}
.messagedetail-content{
	padding:10px;
}
.messagedetail-content p{
	text-align: left;
	font-size:15px;
	color:#727272;
	line-height:25px;
	letter-spacing: 2px;
}
.messagedetail{
	text-align:center;
}
img {
	max-width:100%;
}
</style>
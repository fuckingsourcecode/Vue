<template>
	<div class="usermessage">
		<title title="我的消息" backlink="usercenter" showbtn="false"></title>
		<div class="wrapper">
			
			<div class="usermessage-item-wrapper" v-for="message in messages">
				<p class="usermessage-time"><span>{{message.createTime}}</span></p>		
				<div class="usermessage-item">
					<div class="usermessage-item-top"></div>
					<div class="usermessage-item-body">
						<div class="usermessage-item-body-title">
							<h2 v-text="message.title"></h2>
							<img v-bind:src="message.imageSrc">
						</div>
						<div class="usermessage-item-body-content" >
							<h3 v-html="message.content.substring(0,20)"></h3>
						</div>
					</div>
					<hr/>
					<a v-link="{name: 'messagedetail',params:{id:message.id} }">
						<div class="usermessage-item-bottom">					
							<h3>立即查看</h3>
							<img src="/static/images/icon/more.png">
						</div>
					</a>
				</div>
			</div>
			<br/><br/><br/>
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
			messages:[],
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
			url:Config.getApiURL()+"/sys/message/list",
        	success: function(result){
	        	if (result.status == 0) {
	        		self.messages = result.data;
	        		self.messages.forEach(message=>message.imageSrc = Config.getMediaURL()+message.imageSrc);
	            }else{
	            	self.toastdialogtitle = "失败";
		            self.toastdialogcontent = result.tip;
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
				        $('#dialog2').off('click').hide();
				    });
	            }
	        },
	        error: function (err) {
	            self.toastdialogtitle = "反馈提示";
	            self.toastdialogcontent = "网络错误";
				$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
			        $('#dialog2').off('click').hide();
			    });
	        }

        })
	}
}
</script>
<style type="text/css">
.usermessage-item-wrapper {
	background-color:#eee;
}
.usermessage a{
	color:inherit;
}
.usermessage hr{
	width:96%;
	text-align:center;
	margin-left:2%;
	background-color:#DDD;
	height:1px;
	border:none;
	opacity: 1;
}
.usermessage{
	text-align:center;
	background-color:#eeeeee;
	height:100%;
}

.usermessage-time{
	height:50px;
	line-height:50px;
}
.usermessage-time span{
	padding: 5px 10px;
	color:white;
	background-color:#BBB;
	opacity: 0.9;
	border-radius:5px;
	font-size:13px;
}

.usermessage-item{
	background-color:white;
	border-radius:5px;
	border-bottom:1px solid #B2B2B2;
	border-left:1px solid #B2B2B2;
	border-right:1px solid #B2B2B2;
	box-shadow:0px 1px 1px #B2B2B2;
	margin-left:2%;
	width:96%;
}
.usermessage-item-bottom{
	height:40px;
	line-height:40px;
}
.usermessage-item-bottom h3{
	display:block;
	float:left;
	margin-left:2%;
	font-weight:500;
	font-size:16px;
}
.usermessage-item-bottom img{
	display:block;
	float:right;
	margin-right:2%;
	width:20px;
	height:20px;
	margin-top:10px;
}
.usermessage-item-top{
	border-top:8px solid #1fd291;
	border-radius:5px;
	background-color:#1fd291;
	height:5px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;

}
.usermessage-item-body {
	width:100%;
}
.usermessage-item-body-title{
	height:60px;
	
	display:table;
	width:100%;
	
}
.usermessage-item-body-title h2{
	vertical-align: middle;
	display:table-cell;
	padding-left:10px;
	
	font-size:17px;
	height:60px;
	word-break: break-all;
	text-overflow: ellipsis;
	overflow: hidden;
	text-align:left;

}
.usermessage-item-body-title img{
	float:right;
	margin-right:4%;
	width:40px;
	height:40px;
	margin-left:10px;
	margin-top:10px;
}

.usermessage-item-body-time p{
	color:#959595;
	text-align:left;
	margin-left:2%;
	font-weight:500;
	font-size:14px;
}
.usermessage-item-body-content h3{
	text-align:left;
	margin-left:2%;
	margin-right:2%;
	font-weight:normal;
	margin-top:5px;
	margin-bottom:4%;
	color:#959595;
	font-size:16px;
}
</style>
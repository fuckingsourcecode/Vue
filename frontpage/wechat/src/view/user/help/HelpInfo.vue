<template>
	<div class="helpinfo">
		<title title="帮助" showbtn="false" backlink="userhelp"></title>
		<div class="wrapper">
			<article>
				<h5 class="helpinfo-list-title">
					<span v-text="title"></span>
				</h5>
				<p class="helpinfo-createtime clearfix"><span class="helpinfo-time">时间：<span v-text="createTime"></span></span><span class="helpinfo-count">阅读次数：<span v-text="count"></span></span></p>
				<section class="helpinfo-list" v-html="theContent">
				</section>
			</article>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script type="text/javascript">
	import Config from '../../../common/config.js'
	import Utils from '../../../common/utils.js'
	import toastDialog from '../../../components/dialog/toastDialog.vue'
	export default {
		data: function (transition) {
			return {
				title: '',
				createTime:'',
				theContent: '',
				count: 0,
				toastdialogtitle: '', 
				toastdialogcontent: ''
			}
		},
		components: {
			toastDialog
		},
		route: {

		},
		ready: function () {
			self = this;
			console.log(this.$router);
			console.log(this.$route);
			$.ajax({
				beforeSend: function () {
        		$('.weui_loading_toast').css('display', 'block');
	        	},
	        	complete: function () {
	        		$('.weui_loading_toast').css('display', 'none');
	        	},
			  	url: Config.getApiURL()+'/sys/document/getDocumentbyid',
			 	type: 'POST',
			 	dataType: 'json',
			 	data: JSON.stringify({id: self.$route.params.id}),
			  	success: function(data) {
			    	if (data.status == 0) {
			    		self.title = data.data.title;
			    		self.createTime = data.data.createTime;
			    		self.theContent = data.data.content;
			    		self.count = data.data.count;
			    	} else {
			    		alert(data.tip);
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
		}
	}
</script>
<style type="text/css">
	.helpinfo-list-title {
		font-size: 20px;
		margin: 5px 10px;
	}
	.helpinfo-createtime {
		margin: 5px 10px;
		font-size: 0.8rem;
		color: #999;
	}
	.helpinfo-time {
		float: left;
	}
	.helpinfo-count {
		float: right;
	}
    .helpinfo-list{
    	margin:10px 10px;
    	color: #727272;
    }
    .helpinfo-list img{
    	max-width: 100%;
    }
</style>
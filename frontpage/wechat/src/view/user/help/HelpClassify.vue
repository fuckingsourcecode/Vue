<template>
	<div class="helpclassify" id="helpclassify-con">
		<title title="帮助" showbtn="false" backlink="userhelp"></title>
		<div class="helpclassify-wrapper">
			<article>
				<ul class="userhelp-hottopic-group" v-for="list in lists">
					<li class="helpclassify-hottopic-item">
						<a v-link="{name: 'helpinfo', params: {id: list.id}}">
							<span v-text="list.title"></span>
							<img src="/static/images/icon/more-2.png"/>
						</a>
					</li>
				</ul>
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
				theContent: '',
				lists: '',
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
			$.ajax({
			  beforeSend: function () {
			    $('.weui_loading_toast').css('display', 'block');
			  },
			  complete: function () {
			     $('.weui_loading_toast').css('display', 'none');
			  },
			  url: Config.getApiURL()+'/sys/document/getDocumentList',
			  type: 'POST',
			  dataType: 'json',
			  data: JSON.stringify({type:self.$route.params.type}),
			  success: function(data) {
			    if (data.status == 0) {
			    	self.lists = data.data;
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
			var total = document.documentElement.clientHeight;
			document.getElementById("helpclassify-con").style.height=total+"px";
			
		}
	}
</script>
<style type="text/css">
	.helpclassify-wrapper{
		width: 100%;
		background-color: #fff;
	}
	.helpclassify-hottopic-item {
		height: 45px;
		line-height: 45px;
		border-bottom: 1px solid #565656;
	}
	.helpclassify-hottopic-item a{
		display: block;
		width: 100%;	
	}
	.helpclassify-hottopic-item a>span{
		width:80%;
		font-size:  0.8em;
		color: #565656;
		display: inline-block;
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: 10px;
	}
	.helpclassify-hottopic-item a>img{
		float:right;
		height:15px;
		width: 12px;
		color:#fff;
		margin-top:15px;
		margin-right: 10px;
	}
</style>
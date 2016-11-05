<template>
	<div class="userhelp" id="userhelp-content">
		<title title="帮助" showbtn="false" backlink="index"></title>
		<div class="wrapper-userhelp">
			<section class="userhelp-uesprogress" id="col1">
				<div class="clearfix userhelp-useprogress-group">
					<div class="userhelp-uesprogress-item">
						<a v-link="{name: 'helpclassify',params:{type:1}}">
							<div>
								<img src="/static/images/icon/inner.png" alt="">
							</div>
							<p>出境前</p>
						</a>
					</div>
					<div class="userhelp-uesprogress-item">
						<a v-link="{name: 'helpclassify',params:{type:2}}">
							<div>
								<img src="/static/images/icon/outer.png" alt="">
							</div>
							<p>境外</p>
						</a>
					</div>
					<div class="userhelp-uesprogress-item">
						<a v-link="{name: 'helpclassify',params:{type:3}}">
							<div>
								<img src="/static/images/icon/home.png" alt="">
							</div>
							<p>回国后</p>
						</a>
					</div>
					<div class="userhelp-uesprogress-item">
						<a v-link="{name: 'helpclassify',params:{type:4}}">
							<div>
								<img src="/static/images/icon/buy.png" alt="">
							</div>
							<p>购买/充值</p>
						</a>
					</div>
					<div class="userhelp-uesprogress-item">
						<a v-link="{name: 'helpclassify',params:{type:5}}">
							<div>
								<img src="/static/images/icon/tel.png" alt="">
							</div>
							<p>途宝电话</p>
						</a>
					</div>
					<div class="userhelp-uesprogress-item">
						<a v-link="{name: 'helpclassify',params:{type:6}}">
							<div>
								<img src="/static/images/icon/other.png" alt="">
							</div>
							<p>其他问题</p>
						</a>
					</div>
				</div>
			</section>
			<section class="userhelp-hottopic">
			    <div style="background-color:#ededed;height:25px;line-height:25px;">
				    <!-- <img src="/static/images/icon/standing.png" style="width:5px;height:15px;position:relative;bottom:-2px;margin-left:10px;"> -->
					<span class="userhelp-title-icon"></span>
				    <span style="color:#fc7329;margin-top:2px;font-size:14px;">热点问题</span>
			    </div>
				<ul class="userhelp-hottopic-group" v-for="item in userhelpHottopicGroup">
					<li class="userhelp-hottopic-item">
						<a v-link="{name: 'helpinfo', params: {id: item.id,type:0}}">
							<span v-text="item.title"></span>
							<img src="/static/images/icon/more-1.png" style="float:right;height:15px;width: 12px;margin-top:15px;"/>
						</a>
					</li>
				</ul>
			</section>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
	import Config from '../../../common/config.js'
	import Utils from '../../../common/utils.js'
	import toastDialog from '../../../components/dialog/toastDialog.vue'
	export default {
		data: function () {
			return {
				type: '',
				userhelpHottopicGroup: [],
				toastdialogtitle: '', 
				toastdialogcontent: ''
			}
		},
		components: {
			toastDialog
		},
		route: {
			data(){

			}
		},
		ready: function () {
			var self = this;
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
				data: JSON.stringify({type:0}),
				success: function(data) {
				  	if (data.status == 0) {
				  		self.userhelpHottopicGroup = data.data;
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
			// var total = document.documentElement.clientHeight;
			// document.getElementById("col2").style.height=colHeight+"px";
		}
	}
</script>
<style type="text/css">
	.userhelp{
		background: #fff;
	}
	.userhelp-uesprogress-item {
		float: left;
		width: 33%;
		margin-top: 15px;
		margin-bottom: 15px;
	}
	.userhelp-uesprogress-item a {
		display: block;
		text-align: center;
	}
	.userhelp-uesprogress-item a img {
		width: 38px;
		height: 38px; 
	}
	.userhelp-uesprogress-item:nth-child(1) a img {
		width: 38px;
		height: 38px;
	}
	.userhelp-uesprogress-item:nth-child(2) a img {
		width: 38px;
		height: 38px;
	}
	.userhelp-uesprogress-item:nth-child(3) a img {
		width: 38px;
		height: 38px;
	}
	.userhelp-uesprogress-item:nth-child(4) a img {
		width: 38px;
		height: 38px;
	}
	.userhelp-uesprogress-item:nth-child(5) a img {
		width: 38px;
		height: 38px;
	}
	.userhelp-uesprogress-item:nth-child(6) a img {
		width: 38px;
		height: 38px;
	}
	.userhelp-uesprogress-item a p {
		font-size: 0.8em;
		color: #888;
	}
	.userhelp-hottopic-group {
		width: 100%;
	}
	.userhelp-hottopic-item {
		height: 45px;
		line-height: 45px;
		border-bottom: 1px solid #fc7329;
	}
	.userhelp-hottopic-item a{
		margin-right: 10px;
		margin-left: 10px;
		display: block;
		color: #fc7329;
		font-size:  0.8em;
	}
	.userhelp-hottopic-item a>span {
		width:80%;
		display: inline-block;
	    word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.userhelp-hottopic {
		margin-top: 5px;
		padding-top: 0px;
		height: 100%;
	}
	.userhelp-title-icon {
		float:left;
		display:block;
		height:10px;
		margin-top:7.5px;
		margin-right:10px;
		width:5px;
		background-color:#fc7329;
	}
</style>
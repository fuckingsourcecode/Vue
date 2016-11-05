<template>
	<div class="userinfo">
		
	 <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		<title title="个人信息" backlink="usercenter" showbtn="false"></title>
		<div class="userinfo-wrapper">
			<div class="userinfo-info">
				<div class="ship-wrap" style="height: 12rem">
					  <div class="wave1 wave"></div>
					  <div class="wave2 wave"></div>
				</div>
				<div class="userinfo-infomation">
					<img class="userinfo-info-img" v-bind:src="info.headThumb" @click="chooseImg()" alt="点我设置头像">
					<br/>
					<span class="userinfo-info-ninckname" v-text="info.username"></span>
				</div>
			</div>
			<ul class="userinfo-group">
				<li class="userinfo-item">
					<a class="clearfix userinfo-item-link">
						<span>我的手机号(<span v-text="info.mobile"></span>)</span>
					</a>
				</li>
				
				<li class="userinfo-item">
					<a class="clearfix userinfo-item-link" v-link="{name: 'myqrcode'}">
						<span>我的二维码</span>
						<img class="userinfo-item-more" src="/static/images/icon/more.png">
					</a>
				</li>
				<li class="userinfo-item">
					<a class="clearfix userinfo-item-link" v-link="{name: 'iccidcode'}">
						<span>ICCID</span>
						<img class="userinfo-item-more" src="/static/images/icon/more.png">
					</a>
				</li>
				<li class="userinfo-item clearfix">
					<a class="clearfix userinfo-item-link" v-link="{name:'setusername',params:{username:$route.params.username}}">
						<span>修改昵称</span>
						<img class="userinfo-item-more" src="/static/images/icon/more.png" alt="">
					</a>
				</li>
				<li class="userinfo-item">
					<a class="clearfix userinfo-item-link" v-link="{name:'setpassword',params:{username:$route.params.username}}">
						<span>修改密码</span>
						<img class="userinfo-item-more" src="/static/images/icon/more.png">
					</a>
				</li>
			</ul>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
    import Utils from '../../../common/utils.js'
    import Config from '../../../common/config.js'
    import toastDialog from '../../../components/dialog/toastDialog.vue'
	export default {
		data: function () {
			return {
				info : {
					username:'',
					mobile: 0,
					headThumb: ''
				},
				toastdialogtitle: '', 
				toastdialogcontent: ''
			}
		},
		components: {
			toastDialog
		},
		ready: function() {
			var self = this;
			
			$.ajax({
				beforeSend: function () {
	        		$('.weui_loading_toast').css('display', 'block');
	        	},
	        	complete: function () {
	        		$('.weui_loading_toast').css('display', 'none');
	        	}, 
				type: 'post',
				url: Config.getApiURL() + '/user/info',
				success: response => {
					self.info = response.data;
					
					if(!self.info.headThumb.startsWith("weixin"))
					  self.info.headThumb = Config.getMediaURL() + self.info.headThumb;
					// console.log(response);
				},	
				error: response => {
					self.toastdialogtitle = "反馈提示";
		            self.toastdialogcontent = "网络错误";
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
				        $('#dialog2').off('click').hide();
				    });
				}
			});

		},
		methods: {
			chooseImg:function() {
				var self = this;
				var url = encodeURIComponent(location.href.split('#')[0]);
					$.ajax({
						beforeSend: function () {
			        		$('.weui_loading_toast').css('display', 'block');
			        	},
			        	complete: function () {
			        		$('.weui_loading_toast').css('display', 'none');
			        	},
						type: 'get',
						url: "/wx/getSignature?url=" + url,
						dataType: 'json',
						success: function(response) {
							$('#con').append(JSON.stringify(response) + '<br/>')
							wx.config({
								debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								appId: response.data.appid, // 必填，公众号的唯一标识
								timestamp: response.data.timestamp, // 必填，生成签名的时间戳
								nonceStr: response.data.noncestr, // 必填，生成签名的随机串
								signature: response.data.signature,// 必填，签名，见附录1
								jsApiList: ['uploadImage','chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});
							console.log(document.cookie);
							wx.chooseImage({
							    count: 1, // 默认9
							    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
							    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
							    success: function (res) {
							        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							        self.info.headThumb=localIds[0];
							       
							        
							        wx.uploadImage({
									    localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
									    isShowProgressTips: 1, // 默认为1，显示进度提示
									    success: function (res) {
									    	$.ajax({
									    		type:'post',
									    		data:{
									    			
									    		},
									    		url:Config.getApiURL()+'/sys/downloadMedia?mediaId='+localIds[0],
									    		success:function() {
									    			// alert("成功通知服务器更新头像资源");
									    		}
									    	});
									        var serverId = res.serverId; // 返回图片的服务器端ID
									        // alert(serverId);
									        // window.document.write(serverId);
									        $.ajax({
									        	type:'post',
									        	data:{
									        		
									        	},
									        	url:Config.getApiURL()+'/sys/downloadMedia?mediaId='+serverId,
									        	success:function() {
									        		// alert("成功通知服务器下载头像资源");
									        		
									        	}
									        });
									    }
									});
							    }
							});
						},
						error: response => {
							self.toastdialogtitle = "反馈提示";
				            self.toastdialogcontent = "网络错误";
							$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
						        $('#dialog2').off('click').hide();
						    });
						}
					});
			},
		}
	}
</script>
<style type="text/css">
	.userinfo {
		background-color: #fff!important;
	}
	.userinfo-info {
		text-align: center;
		position: relative;
	}
	.userinfo-group {
		border-top: 4px solid #e7e7e7;
	}
	.userinfo-item {
		padding: 0px 10px 0px 10px;
		line-height: 3rem;
		border-bottom: 1px solid #a8a8a8;
	}
	.userinfo-item:last-child {
		border-bottom: none;
	}
	.userinfo-item-link {
		display: block;
		color: #000;
		font-size: 0.9rem;
	}
	.userinfo-item-link> span {
		float: left;
		color: #000;
	}
	.userinfo-item-more {
		float: right;
		width: 1rem;
		height: 1rem;
		margin-top: 1rem;
	}
	.userinfo-infomation {
		position: absolute;
	    top: 10%;
	    left: 0;
	    right: 0;
	}
	.userinfo-info-img {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
	}
	.userinfo-info-ninckname {
		display: inline-block;
		width: 40%;
		color: #fff;
		padding: 0px 10px 0px 10px;
		border-radius: 8px; 
		height: 2rem;
    	line-height: 2rem;
    	margin-top: 2rem;
	}
</style>
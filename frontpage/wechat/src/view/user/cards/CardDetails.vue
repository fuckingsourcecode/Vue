<template>
	<div class="carddetails" style="background:#fff;">
		<title title="卡片详情" backlink="usercard" showbtn="true" ></title>
		<div class="carddetails-pic">
			<img v-bind:src="info.imageSrc" width="100%">
		</div>
		<div class="carddetails-info">
			<p>当前卡片<span v-text="info.name"></span></p>
			<p>ICCID<span v-text="info.iccid"></span></p>
			<p>卡片类型
			<span v-text="'实体卡'" v-if="info.type=='0'"></span>
			<span v-text="'卡贴'" v-if="info.type=='1'"></span>
			</p>
			<p>绑定状态
			<span v-text="'已绑定'" v-if="info.isBound=='1'"></span>
			<span v-text="'未绑定'" v-else></span>
			</p>
			<p>当前流量
			<span v-if="!info.netFlow" v-text="'无'"></span>
			<span v-if="info.netFlow!='-1' && info.netFlow" v-text="info.netFlow+'MB'"></span>
			<span v-if="info.netFlow=='-1'" v-text="'不限量'"></span>
			</p>
			<p>通话分钟
			<span v-if="!info.netFlow" v-text="'无'"></span>
			<span v-if="info.voiceTime!='-1' && info.voiceTime" v-text="info.voiceTime+'分钟'"></span>
			<span v-if="info.voiceTime=='-1'" v-text="'不限时'"></span>
			</p>
		</div>
		<div class="carddetails-intro">
			<dl>
				<dt>请选择要激活的套餐</dt>
				<dd class="cardetails-package-group">
					<div class="usercard-mycombo-tip" v-if="this.availPkgs.length <=0">
						<p>您还未购买该卡使用的套餐</p>
						<a v-link="{name: 'systempackage'}">去逛逛</a>
					</div>
					<div v-for="item in availPkgs" track-by="$index" @click="show(item.id, $index)" 
					v-bind:class="{'carddetails-package-item':true,'carddetails-choose':$index==showIdx}">
						<img v-bind:src="item.imageSrc" class="carddetails-package-img">
						<div class="carddetails-package-info">
							<h4 v-text="item.name"></h4>
							<p>当前流量：
							<span v-if="item.netFlow!='-1'" v-text="item.netFlow+'MB'"></span>
							<span v-if="item.netFlow=='-1'" v-text="'不限量'"></span>
							</p>
							<p>通话分钟：
							<span v-if="item.voiceTime!='-1'" v-text="item.voiceTime+'分钟'"></span>
							<span v-if="item.voiceTime=='-1'" v-text="'不限时'"></span>
							</p>
						</div>
					</div>
				</dd>
			</dl>
		</div>
		<br/><br/><br/><br/>
		<a class="carddetails-bottom" v-bind:class="{'carddetails-bottom-none' : this.availPkgs.length <=0}" @click="activePkg()">立即激活</a>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
	import Config from  '../../../common/config.js'
	import Utils from '../../../common/utils.js'
	import toastDialog from '../../../components/dialog/toastDialog.vue'
	export default{
		data: function () {
			return {
                info: {
                	orderccurrPkgNameode: '',
                	netFlow: '',
                	voiceTime: '',
                	description: []
                },
                id: '',
                availPkgs:[],
                showIdx:0,
                toastdialogtitle: '',
                toastdialogcontent: ''
			}
		},
		components: {
			toastDialog
		},
		methods: {
			show: function (id, index) {
				this.id = id;
				this.showIdx=index;
				$(".carddetails-package-item").removeClass("carddetails-choose");
				$(".carddetails-package-item").eq(index).addClass("carddetails-choose");
			},
			activePkg: function () {
				var self=this;
				var cardId = self.info.id;
				var pkgId = self.id;  
				$.ajax({
					beforeSend: function () {
		        		$('.weui_loading_toast').css('display', 'block');
			        },	
					url: Config.getApiURL()+'/userPackage/activePkg',
					type: 'POST',
					dataType: 'json',
					data: JSON.stringify({ cardId : cardId, pkgId:pkgId }),
					complete: function(xhr, textStatus) {
						$('.weui_loading_toast').css('display', 'none');
				    //called when complete
				  	},
				  	success: function(data) {
				    //called when successful
				    	self.toastdialogtitle = "反馈提示";
		                self.toastdialogcontent = data.tip;
						$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
				            $('#dialog2').off('click').hide();
				        });
				  	},
				  	error: function (err) {
		                self.toastdialogtitle = "反馈提示";
		                self.toastdialogcontent = "网络错误";
						$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
				            $('#dialog2').off('click').hide();
				        });
		            }
				});
			}, 
		},
		ready: function () {
			if ($('.carddetails-bottom').css('background-color') == '#b5b5b5') {
				$('.carddetails-bottom').attr('href', 'javascript:void(0)');
			}
			var self = this;
			$.ajax({
				beforeSend: function () {
	        		$('.weui_loading_toast').css('display', 'block');
	        	},
				type: 'post',
				url: Config.getApiURL() + '/user/card/item',
				data: JSON.stringify({id: self.$route.params.id}),
				success: response => {
					console.log(response);

					self.info = response.data;
					self.info.imageSrc = Config.getMediaURL() + self.info.imageSrc;
				},
				error: response => {
					self.toastdialogtitle = "反馈提示";
					self.toastdialogcontent = "网络错误";
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
						$('#dialog2').off('click').hide();
					});
				}
			});
			$.ajax({
				complete: function () {
	        		$('.weui_loading_toast').css('display', 'none');
	        	}, 
				type:'post',
				url: Config.getApiURL() + '/user/card/availPkg',
				data: JSON.stringify({id:self.$route.params.id}),
				success:function(response) {
					console.log(response);
					if (response.data.length>0) {
						self.availPkgs = response.data;
						for(var idx in self.availPkgs) {
							self.availPkgs[idx].imageSrc = Config.getMediaURL() + self.availPkgs[idx].imageSrc;
						}
						self.id = self.availPkgs[0].id;
					}
				},
				error: function (err) {
					self.toastdialogtitle = "反馈提示";
					self.toastdialogcontent = "网络错误";
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
						$('#dialog2').off('click').hide();
					});
				}
			});
		},
		computed:{
		}
	}
</script>
<style>
	.carddetails-info{
		width: 100%;
        background-color: #fff; 
	}
	.carddetails-info p{
		font-size: 13px;
		color: #444444;
		line-height: 20px;
		margin-left: 10px;
		margin-right: 10px;
	}
	.carddetails-info p>span{
		float: right;
	}
	.carddetails-info p:last-child{
		padding-bottom: 5px;
	}
	
	.carddetails-intro{
		width: 100%;
		border-top: 8px solid #e8e8e8;
	}
	.carddetails-intro dl{
		margin-left: 10px;
		margin-right: 10px;
		color: #404040;
	}
	.carddetails-intro dl dt{
		margin-top: 5px;
	}
	.carddetails-intro dl dd{
		font-size: 13px;
		line-height: 20px;
	}
	.carddetails-bottom{
		width:100%;
		height: 45px;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #28a965;
		text-align: center;
		line-height: 45px;
		color: #fff; 
	}
	.carddetails-bottom-none{
		background-color: #b5b5b5;
	}
	.carddetails-package-item {
		margin-top:10px;
		height: 4rem;
		margin-bottom: 0.5rem;
		padding: 12px;
		border-radius:5px;
		border:1px solid #aaa;
	}
	.carddetails-package-img {
		width: 5rem;
		height: 4rem;
	}
	.carddetails-package-info {
		display: inline-block;
		width: 50%;
		height: 4rem;
		vertical-align: top;
		margin-left:5px;
	}
	.carddetails-package-item:last-child {
		margin-bottom: 3rem;
	}
	.carddetails-choose {	
		border:3px solid #23c083;
		padding:10px;
		background-image:url("/static/images/recharge/select_tick.png");
		background-position:100% 100%;
		background-repeat: no-repeat;
		background-size:20px 20px;
	}
	@media screen and (min-width: 320px) and (max-width: 375px) {
		.carddetails-pic img {
			height: 180px;
		}
	}
	@media screen and (min-width: 375px) and (max-width: 414px) {
		.carddetails-pic img {
			height: 210px;
		}
	}
	@media screen and (min-width: 414px) and (max-width: 568px) {
		.carddetails-pic img {
			height: 232px;
		}
	}
	@media screen and (min-width: 568px) and (max-width: 768px) {
		.carddetails-pic img {
			height: 329px;
		}
	}
	@media screen and (min-width: 768px) {
		.carddetails-pic img {
			height: 432px;
		}
	}
</style>
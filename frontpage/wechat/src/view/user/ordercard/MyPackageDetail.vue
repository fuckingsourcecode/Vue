<template>
	<div class="packagedetails" style="background:#fff;">
		<title title="我的套餐详情" backlink="mypackage" showbtn="true" ></title>
		<div class="packagedetails-pic">
			<img v-bind:src="item.imageSrc" width="100%">
		</div>
		<div class="packagedetails-info">
			<p>套餐名称<span v-text="item.name"></span></p>
			
			<p>套餐数量<span>{{item.count}}份</span></p>
			
			
			<p>当前状态
				<span v-if="item.status==0">未激活</span>
				<span v-if="item.status==1">已激活</span>
				<span v-if="item.status==2">使用中</span>
				<span v-if="item.status==3">已过期</span>
			</p>
		</div>
		<div class="packagedetails-intro">
			<dl>
				<dt>套餐详情</dt>
				<dd>{{item.description}}</dd>
				
			</dl>
			<p>可用流量
				<span v-if="item.netFlow=='-1'">不限量</span>
				<span v-else>{{item.netFlow}}MB</span>
			</p>
			<p>已用流量
				<span>{{item.usedNetFlow}}MB</span>
			</p>
			<p>可用通话分钟
				<span v-if="item.voiceTime=='-1'">不限量</span>
				<span v-else>{{item.voiceTime}}分钟</span>
			</p>
			<p>已用通话分钟
				
				<span>{{item.usedVoiceTime}}分钟</span>
			</p>
			<p>可用时间<span>{{item.days}}天</span></p>
			<p>套餐激活时间
			<span v-if="item.activeTime">{{item.activeTime}}</span>
			<span v-else>无</span>
			</p>
			<p>套餐开始时间
			<span v-if="item.startTime">{{item.startTime}}</span>
			<span v-else>无</span>
			</p>
			<p>套餐结束时间
			<span v-if="item.endTime">{{item.endTime}}</span>
			<span v-else>无</span>
			</p>
		</div>


		<div class="mypackage-intro">
			<dl>
				<dt v-if="$route.params.item == 5">请选择使用套餐的卡片</dt>
				<dt v-if="$route.params.item == 6">正在使用该套餐的卡片为</dt>
				<dd class="mypackage-detail-group">
					<div class="mypackagedetail-cards-tip" v-if="cards.length <=0">
						<p>您还未购买或绑定卡片</p>
						<a v-link="{name: 'cardpurchase'}">去逛逛</a>
					</div>
					<div v-for="card in cards" track-by="$index" @click="show(card.id, $index)" 
					v-bind:class="{'mypackage-detail-item':true,'mypackage-choose':$index==showIdx}">
						<img v-bind:src="card.imageSrc" class="mypackage-detail-img">
						<div class="mypackage-detail-info">
							<h4 v-text="card.name"></h4>
							<p>
								<span>ICCID：</span>
								<span v-text="card.iccid"></span>
							</p>
							
						</div>
					</div>
					<dl v-if="cards.length>0">
						<dt>小贴士</dt>
						<dd>套餐计时将从您激活套餐时开始。</dd>
					</dl>
				</dd>
			</dl> 
		</div>


		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<a class="packagedetails-bottom" v-bind:class="{'mypackagedetails-bottom-none' : cards.length < 1}" @click="activePkg()">立即激活</a>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>

<script>
import Config from '../../../common/config.js'
import toastDialog from '../../../components/dialog/toastDialog.vue'
	export default{
		data: function () {
			return {
				item : {
					netFlow:"",
					number:'',
					name:'',

				},
				cards:[],
				showIdx:0,
				toastdialogtitle: '', 
				toastdialogcontent: '',
				id: ''
			};
		},
		components: {
			toastDialog
		},
		methods: {
			show: function (id, index) {
				this.id = id;
				this.showIdx=index;
				$(".mypackage-detail-item").removeClass("mypackage-choose");
				$(".mypackage-detail-item").eq(index).addClass("mypackage-choose");
			},
			activePkg: function () {
				var self=this;
				var pkgId = self.item.id;
				var cardId = self.id;  
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
			// if ($('.packagedetails-bottom').css('background-color') == '#b5b5b5') {
			// 	$('.packagedetails-bottom').attr('href', 'javascript:void(0)');
			// }
			var self = this;
			var id = self.$route.params.item;
			
			$.ajax({
				beforeSend: function () {
	        		$('.weui_loading_toast').css('display', 'block');
	        	},
				url: Config.getApiURL()+'/userPackage/item',
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify({ id : id }),
				complete: function(xhr, textStatus) {
					$('.weui_loading_toast').css('display', 'none');
			    //called when complete
			  	},
			  	success: function(data) {
			    //called when successful
			    	data.data.imageSrc = Config.getMediaURL() + data.data.imageSrc;
			    	self.item=data.data;
			  	},
			  	error: function (err) {
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
				url:Config.getApiURL() + '/userPackage/availCards',
				type: 'POST',
				dataType: 'json',
				data:JSON.stringify({id:id}),
				success:function(data) {

					self.cards = data.data || [];
					self.id = self.cards[0].id;
					console.log(self.id);
					for(var idx in self.cards) {
						self.cards[idx].imageSrc = Config.getMediaURL() + self.cards[idx].imageSrc;
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

		},
		computed:{
		},
		
	}
</script>
<style>
	.packagedetails-info{
		width: 100%;
        background-color: #fff; 
	}
	.packagedetails-info p,.packagedetails-intro p{
		font-size: 13px;
		color: #444444;
		line-height: 20px;
		margin-left: 10px;
		margin-right: 10px;
	}
	.packagedetails-info p>span, .packagedetails-intro p>span{
		float: right;
	}
	.packagedetails-info p:last-child, .packagedetails-intro p:last-child{
		padding-bottom: 5px;
	}
	.packagedetails-info p:last-child>span{
		color: red;
	}
	.packagedetails-intro{
		width: 100%;
		border-top: 8px solid #e8e8e8;
	}
	.packagedetails-intro dl{
		margin-left: 10px;
		margin-right: 10px;
		color: #404040;
	}
	.packagedetails-intro dl dt{
		margin-top: 5px;
	}
	.packagedetails-intro dl dd{
		font-size: 13px;
		line-height: 20px;
	}
	.packagedetails-bottom{
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
	.mypackagedetails-bottom-none {
		background-color: #b5b5b5 !important;
	}
	.mypackage-intro{
		width: 100%;
		border-top: 8px solid #e8e8e8;
	}
	.mypackage-intro dl{
		margin-left: 10px;
		margin-right: 10px;
		color: #404040;
	}
	.mypackage-intro dl dt{
		margin-top: 5px;
	}
	.mypackage-intro dl dd{
		font-size: 13px;
		line-height: 20px;
	}
	.mypackage-detail-item {
		margin-top:10px;
		height: 4rem;
		margin-bottom: 0.5rem;
		padding: 12px;
		border-radius:5px;
		border:1px solid #aaa;
	}
	.mypackage-detail-img {
		width: 5rem;
		height: 4rem;
	}
	.mypackage-detail-info {
		display: inline-block;
		width: 65%;
		height: 4rem;
		vertical-align: top;
		margin-left:5px;
	}
	.mypackage-detail-info h4 {
		margin-top: 12px;
	}
	.mypackage-detail-info p>span {
		float: left;
	}
	.mypackage-detail-item:last-child {
		margin-bottom: 3rem;

	}
	.mypackage-choose {
		border:3px solid #23c083;
		padding:10px;
		background-image:url("/static/images/recharge/select_tick.png");
		background-position:100% 100%;
		background-repeat: no-repeat;
		background-size:20px 20px;
		
	}
	.mypackagedetail-cards-tip {
		width: 100%;
		text-align: center;
	}
	.mypackagedetail-cards-tip>p{
		color: #5a5a5a;
		font-size: 14px;
		margin-top: 20px;
	}
	.mypackagedetail-cards-tip>a {
		display: block;
		margin: 10px auto;
		width: 66%;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		color: #1fd291;
		border: 1px solid #1fd291;
		border-radius: 5px;
	}
	@media screen and (min-width: 320px) and (max-width: 375px) {
		.packagedetails-pic img {
			height: 180px;
		}
	}
	@media screen and (min-width: 375px) and (max-width: 414px) {
		.packagedetails-pic img {
			height: 210px;
		}
	}
	@media screen and (min-width: 414px) and (max-width: 568px) {
		.packagedetails-pic img {
			height: 232px;
		}
	}
	@media screen and (min-width: 568px) and (max-width: 768px) {
		.packagedetails-pic img {
			height: 329px;
		}
	}
	@media screen and (min-width: 768px) {
		.packagedetails-pic img {
			height: 432px;
		}
	}
</style>
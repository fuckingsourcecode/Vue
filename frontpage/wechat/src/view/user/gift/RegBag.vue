<template>
	<div class="redbag">
		<title title="红包优惠券" backlink="index" showbtn="true"></title>
		<div class="redbag-container">
			<div class="redbag-convert">
				<input type="text" placeholder="请输入红包/优惠券兑换码" class="redbag-search" v-model="couponCode" required>
				<button class="redbag-btn" @click="convert">兑换</button>
				<p v-text="converttip" class="redbag-converttip"></p>
			</div>
			<div class="redbag-none" v-if="this.combo.length<=0">
				<img src="/static/images/recharge/state.png">
				<p>您还没有优惠券哦</p>
			</div>
			<div class="redbag-group" v-for="item in combo">
				<section class="redbag-item clearfix">
					<div class="redbag-item-num">
						<h1>￥<span v-text="(item.value)/100"></span></h1>
					</div>
					<div class="redbag-item-detail">
						<dl>
							<dt v-text="item.couponname"></dt>
							<dd>
								<ul>
									<li>满<span v-text=""></span>元可用</li>
									<li>限<span v-text=""></span>可用</li>
									<li><span v-text="item.starttime"></span>至<span v-text="item.expiretime"></span></li>
								</ul>
							</dd>
						</dl>
					</div>
					<div class="redbag-item-status">
						<div>
							<span>代金券</span>
						</div>
					</div>
				</section>
			</div>
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
				couponCode: '',
				converttip: '',
				combo: [],
				toastdialogtitle: '', 
				toastdialogcontent: ''
			}
		},
		components: {
			toastDialog
		},
		methods: {
			convert: function () {
				var self = this;
				this.converttip = "";
				if(this.couponCode.length > 0) {
					$.ajax({
						beforeSend: function () {
						    $('.weui_loading_toast').css('display', 'block');
						},
						complete: function () {
						    $('.weui_loading_toast').css('display', 'none');
						},
						type: 'post',
						url: Config.getApiURL() + '/user/coupon/exchangeCoupon',
						data: JSON.stringify({couponcode: self.couponCode}),
						success: response => {
							console.log(response);
							if (response.status == 0) {
								self.couponCode = '';
								$.ajax({
									beforeSend: function () {
									    $('.weui_loading_toast').css('display', 'block');
									},
									complete: function () {
									    $('.weui_loading_toast').css('display', 'none');
									},
									type: 'get',
									url: Config.getApiURL() + '/user/coupon/selectUserCoupon',
									dataType: 'json',
									success: response => {
										if (response) {
											if (response.data) {
												response.data.forEach(function (value, index, array) {
													value.starttime = value.starttime.split(' ')[0];
													value.expiretime = value.expiretime.split(' ')[0];
													if (value.value > 0) {
														
													} else {
														value.value = 0;
													}
												});
											}
										}
										self.combo = response.data||[];
									},
									error: response => {
										self.toastdialogtitle = "反馈提示";
							            self.toastdialogcontent = "网络错误";
										$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
									        $('#dialog2').off('click').hide();
									    });
									}
								});
							} else {
								// self.converttip = response.tip;
								self.toastdialogtitle = "反馈提示";
							    self.toastdialogcontent = response.tip;
								$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
									$('#dialog2').off('click').hide();
								});
								return false;
							}

						},
						error: response => {
							self.toastdialogtitle = "反馈提示";
				            self.toastdialogcontent = "网络错误";
							$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
						        $('#dialog2').off('click').hide();
						    });
						}
					})
				}
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
				type: 'get',
				url: Config.getApiURL() + '/user/coupon/selectUserCoupon',
				dataType: 'json',
				success: response => {
					if (response) {
						if (response.data) {
							response.data.forEach(function (value, index, array) {
								value.starttime = value.starttime.split(' ')[0];
								value.expiretime = value.expiretime.split(' ')[0];
								if (value.value > 0) {
									
								} else {
									value.value = 0;
								}
							});
						}
					}
					self.combo = response.data||[];
				},
				error: response => {
					console.log(response);
				}
			});
		}
	}
</script>
<style lang="less">
	.redbag {
		background-color: #fff!important;
	}
	.redbag-convert {
		padding: 10px 20px;
		text-align: center;
		input{
			width: 75%;
			font-size: 18px;
			height: 35px;
			line-height: 35px;
		}
		button {
			background-color: #21d190;
			color: #fff;
			font-size: 18px;
			width:20%;
			height: 39px;
			line-height: 39px;
			border: none;
			margin-left: -8px;
		}
	}
	.redbag-group {
		padding: 20px;
	}
	.redbag-item {
		background: url('/static/images/icon/jag.png') repeat-x;
        background-size: 20px 20px;
        padding-top: 20px;
        border:1px solid #d6d6d6;
        border-radius: 5px;
        box-shadow: 0 0 1em #d6d6d6;
        position: relative;
	}
	.redbag-item-status {
		position: absolute;
		right: -32px;
		top: -7px;
		color: #fff;
		height:0px; width:0px;
		border-bottom:50px solid #20d28f;
		border-left:50px solid transparent;
		border-right:50px solid transparent;
		transform: rotate(45deg);
	}
	.redbag-item-status>div {
		background-color: #20d28f;
	}
	.redbag-item-status>div>span {
		position: absolute;
		top:30px;
		right: -25px;
		width: 3rem;
	}
	.redbag-item-num {
		border-right: 2px dotted #dcdcdc;
		float:left;
		width:25%;
		height: 100%;
	}
	.redbag-item-num h1 {
		height: 100%;
		height: 6rem;
		line-height: 6rem;
		text-align: center;
		color: #f7ae23;
	}
	.redbag-item-detail {
		float: left;
		width: 70%;
		margin-left: 3%;
	}
	.redbag-item-detail dt {
		color: #787878;
	}
	.redbag-item-detail dd {
		color: #999999;
	}
	.redbag-none {
		width: 100%;
		text-align: center;
		margin-top: 20%;
	}
	.redbag-none>img {
		width: 35%;
	}
	.redbag-none>p {
		margin-top: 10px;
		color: #d2d2d2;
	}
	.redbag-converttip {
		text-align: left;
		color: red;
	}
</style>
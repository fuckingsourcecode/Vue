<template>
	<div class="giftdetail">
		<title title="详情" showbtn="false"></title>
		<div class="wrapper">
			<div class="giftdetail-item">
				<div class="giftdetail-item-title" v-text="combo.couponname">
				</div>
				<div class="giftdetail-item-price" >
					<p style="font-size:0.8rem;">优惠金额</p>
					<p>￥<span v-text="(combo.value/100).toFixed(2)"></p>
				</div>
				<div class="giftdetail-item-tip">
					有效期<span v-text="combo.starttime"></span>至<span v-text="combo.expiretime"></span>
				</div>
				<div class="giftdetail-item-tip">
					获取时间<span v-text="combo.gettime"></span>
				</div>
			</div>
			<div class="giftdetail-detail">
				<div class="giftdetail-detail-title">使用说明：</div>
			</div>
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
			combo: {
			}
		}
	},
	components: {
		toastDialog
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
			type: 'post',
			url: Config.getApiURL() + '/user/coupon/selectDetail',
			dataType: 'json',
			data: JSON.stringify({id: self.$route.params.id,syscouponid:self.$route.params.syscouponid}),
			success: response => {
				console.log(response);
				if (response.status == 0) {
					response.data.starttime = response.data.starttime.split(' ')[0];
					response.data.expiretime = response.data.expiretime.split(' ')[0];
					response.data.gettime = response.data.gettime.split(' ')[0];
					if (response.data.value > 0) {
						
					} else {
						response.data.value = 0;
					}
					self.combo = response.data;
				} else {
					self.toastdialogtitle = "反馈提示";
			        self.toastdialogcontent = response.tip;
				    $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
				   		$('#dialog2').off('click').hide();
					});
				}
			},
			error: response => {
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
	.giftdetail-item{
		display: block;
		width: 100%;
		height: 150px;
		background-color: white;
		margin-top: 5px;
		color: black;
		text-align: center;
	}
	.giftdetail-item-title{
		width: 100%;
		height: 30px;
		line-height: 30px;
		color: #6a6a6a;
	}
	.giftdetail-item-price{
		font-weight: bold;
		margin-top: 5px;
		font-size: 22px;
		height: 50px;
		background-color: #ededed;
		color: #ff0000;
	}
	.giftdetail-item-tip{
		font-size: 12px;
		margin-top: 5px;
		opacity: 0.5;
	}

	.giftdetail-detail{
		background-color: white;
		width: 100%;
		height: 400px;
		margin-top: 5px;
	}
	.giftdetail-detail-title{
		font-size: 12px;
		margin-left: 5px;
		padding-top: 5px;
	}
</style>
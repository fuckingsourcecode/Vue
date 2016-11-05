<template>
	<div class="consumptionrecord">
		<title title="交易账单" backlink="userinfo" showbtn="false"></title>
		<div class="consumptionrecord-wrapper">
			<ul class="consumptionrecord-group">
				<li class="consumptionrecord-item" v-for="item in list">
					<section class="clearfix">
						<h4 v-text="item.type == 0 ? '充值':'消费'" class="consumptionrecord-item-type"></h4>
						<p class="consumptionrecord-item-ordercode">交易单号-<span v-text="item.orderCode"></span></p>
					</section>
					<section class="clearfix" style="margin-top:10px;">
						<p v-text="item.consumeTime" class="consumptionrecord-item-time"></p>
						<h4 class="consumptionrecord-item-price" v-bind:class="item.amount<0?consumptioncolor:''"><span v-text="item.amount>0? '+':'-'"></span>￥<span v-text="Math.abs((item.amount/100).toFixed(2))"></span></h4>
					</section>
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
				toastdialogtitle: '', 
				toastdialogcontent: '',
				consumptioncolor: 'consumptioncolor',
				list: [
					{
						type: '',	//0->充值 1->消费
						ordercode: '',
						consumetime: '',
						amount:　''
					}
				]
			}
		},
		components: {
			toastDialog
		},
		ready: function() {
			var self = this;
			$.ajax({
				type: "POST",
				url: Config.getApiURL() + '/user/consume/list',
				success: function(response) {
					console.log(response);
					if (response.status==0&&response.data.length> 0) {
						self.list = response.data;
						console.log(response);
					} else {
						self.toastdialogtitle = "反馈提示";
						self.toastdialogcontent = data.tip;
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
<style>
	.consumptionrecord-wrapper {
		background-color: #fff!important;
	}
	.consumptionrecord-group {
		padding: 10px;
	}
	.consumptionrecord-item {
		padding: 5px 0px;
		border-bottom: 1px solid #ddd;
	}
	.consumptionrecord-item:last-child {
		border-bottom: none;
	}
	.consumptionrecord-item>section {
		margin: 5px 0px;
		vertical-align: bottom;
	}
	.consumptionrecord-item-type, .consumptionrecord-item-time {
		float: left;
	}
	.consumptionrecord-item-ordercode, .consumptionrecord-item-price {
		float: right;
	}
	.consumptionrecord-item-ordercode, .consumptionrecord-item-time {
		font-size: 0.9rem;
	}
	.consumptioncolor {
		color: #1fd291;
	}
</style>
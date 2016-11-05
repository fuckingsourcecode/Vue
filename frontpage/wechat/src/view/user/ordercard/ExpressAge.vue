<template>
	<div class="expressage" style="background:#fff;">
		<title title="订单追踪" backlink="myorders" showbtn="true"></title>
		<div class="wrapper">
			<article>
				<div class="expressage-head">
					<p>订单号：<span v-text="order.orderCode"></span> <span class="express-order-status"v-text="'已发货'"></span></p>
					<p>物流单号：<span v-text="result.number"></span></p>
					<p>商品名称：<span v-text="order.name"></span></p>
				</div>
				<section class="expressage-content">
					<ul class="expressage-address-group">
						<li class="expressage-address-item" v-for=" item in result.list">
							<div class="expressage-address-item-dot"></div>
							<p class="expressage-address-item-time" v-text="item.time"></p>
							<p class="expressage-address-item-status" v-text="item.status"></p>
							
						</li>
					</ul>
				</section>
			</article>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<style>
	.expressage p {
		word-break: break-all;
	}
	.expressage-head {
		padding-left: 0.3rem;
		border-bottom: 1px solid #b2b2b2;
		line-height: 2rem;
		font-size:0.9rem;
		padding-bottom:0.4rem;
		padding-top:0.4rem;


	}
	.expressage-address-item {
		margin-left: 20px;
		/*margin-right: 10px;*/
	    /*border-top: 1px solid #aaa;*/
	    padding: 3px 0px;
	    font-size: 0.8rem;
	    color: #999;
	    line-height: 1.4rem;
	    position: relative;
	}
	.express-order-status {
		float:right;
		margin-right:5px;
		color:#23c083;

	}
	.expressage-address-item:first-child {
		border-top: none;
		color: #222;
		font-size:0.85rem;
	}
	.expressage-address-item:last-child {
		/*color: #23c083;*/
	}
	.expressage-address-item::before {
		content: ''; 
		position: absolute; 
		top: 1.4rem; 
		left: -0.8rem; 
		height: 101%; 
	    width: 2px; 
	    background: #23c083;
	}
	.expressage-address-item:last-child::before {
		content: ''; 
		position: absolute; 
		top: 10px; 
		left: -0.78rem; 
		height: 0; 
	    width: 0px; 
	    background: none;
	}
	.expressage-address-item::after { 
		content: ""; 
		display: table; 
		clear: both; 
	}
	.expressage-address-item-dot {
		position: absolute;
		top: 1.4rem;
	    left: -1rem;
	    font-size: 6rem;
	    width: 0.5rem;
	    height: 0.5rem;
	    border-radius: 50%;
	    background-color: #23c083;
	}
</style>
<script>
	import Config from '../../../common/config.js'
	import toastDialog from '../../../components/dialog/toastDialog.vue'
	export default　{
		data: function () {
    		return {
    			result: {
			        number: '',
			        type: '',
			        list: [
			            {
			                time: "",
			                status: ""
			            }			      
			        ],
			        deliverystatus: '',
			        issign: '',
			        toastdialogtitle: '',
			        toastdialogcontent: ''
			    },
			    order: {
			    	orderCode:'123',
			    }
    		}
		},
		components: {
			toastDialog
		},
		ready: function () {
			var self = this;
			var order = sessionStorage.getItem("order");
			self.order=JSON.parse(order);
			$.ajax({
				beforeSend: function () {
	        		$('.weui_loading_toast').css('display', 'block');
	        	},
	        	complete: function () {
	        		$('.weui_loading_toast').css('display', 'none');
	        	}, 
				type: 'post',
				url: Config.getApiURL() + '/userOrder/expresstrace',
				data: JSON.stringify({orderCode: self.order.orderCode}),
				success: response => {
					if (response.status == 0) {
						self.result = JSON.parse(response.data.result).result;
						console.log(self.result);
					} else {
						self.toastdialogtitle = "反馈提示";
			            self.toastdialogcontent = response.tip;
						$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
					        $('#dialog2').off('click').hide();
					    });
					}
				},
				error: error => {
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
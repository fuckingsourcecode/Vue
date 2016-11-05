<template>
	<div class="orderdetails" style="background:#fff;">
		<title title="订单详情" backlink="usercenter" showbtn="true" ></title>
		<div class="orderdetails-info">
			<p>订单编号<span v-text="info.orderCode"></span></p>
			<p>创建时间<span v-text="info.createTime"></span></p>
			<p>支付状态<span v-text="info.orderStatus"></span></p>
		</div>
		<a class="orderdetails-orderaddress">
			<img src="/static/images/icon/address.png" alt="">
			<div>
				<div>
					<p v-text="info.addressInfo.receiver"></p>
					<p v-text="info.addressInfo.phone"></p>
				</div>
				<div v-text="info.addressInfo.addressDetail" style="color:#727171;"></div>	
			</div>
		</a>
		<div class="orderdetails-intro">
			<dl>
				<!-- <dt>详情说明</dt> -->
				<dd class="orderdetails-order-group">


					<!-- <section class="orderinternational-content-content" v-for="it in item.data">
						<div>
							<img class="orderinternational-content-content-img" v-bind:src="it.img" alt="">
							<dl>
								<dt v-text="it.name"></dt>
								<dd v-text="it.description"></dd>
							</dl>
						</div>
						<div>
							<div>￥<span v-text="it.price/100"></span></div>
							<div>x<span v-text="it.quantity"></span></div>
						</div>
					</section> -->

					<section class="orderdetail-content-content" v-for="item in info.data">
						<div>
							<img class="orderdetail-content-content-img" v-bind:src="item.imageSrc" alt="">
							<dl>
								<dt v-text="item.name"></dt>
								<dd v-text="item.description"></dd>
							</dl>
						</div>
						<div>
							<div>￥<span v-text="item.price/100"></span></div>
							<div>x<span v-text="item.amount"></span></div>
						</div>
					</section>
					<!-- <div v-for=" item in info.data" track-by="$index" class="orderdetails-order-item">


						<img src="/static/images/combo/hk-2.png" class="orderdetails-order-img"/>
						<div class="orderdetails-order-info">
							<h4 v-text="item.name"></h4>
							<section class="orderdetails-order-con">
								<p>
									价格：
									<span v-text="item.price/100"></span>
								</p>
								<p>
									数量：
									<span v-text="item.quantity"></span>
								</p>	
							</section>
						</div>
					</div> -->
				</dd>
			</dl>
		</div>
		<div class="orderdetail-bottom" style="border-bottom:none;">
			
			<p class="order-detail-title-big">商品总额<span class="order-detail-content-orange" v-text="'￥'+((info.totalPrice-info.freight)/100).toFixed(2)"></span></p>
			<p class="order-detail-transfee">+运费<span  class="order-detail-content-orange" v-text="'￥'+(info.freight/100).toFixed(2)"></span></p>
			<hr/>
			<p class="order-detail-item-pay">实付款:<span  class="order-detail-content-orange" v-text="'￥'+(info.totalPrice/100).toFixed(2)"></span></p>
		</div>
		<br/><br/><br/><br/>
		<a class="orderdetails-bottom" v-if="info.orderStatus=='未付款'" @click="repay(info.orderCode)">去支付</a>
	</div>
</template>
<script>
	import Config from  '../../../common/config.js'
	import Utils from '../../../common/utils.js'
	export default{
		data: function () {
			return {
                info: {
                	addressInfo: {
                		receiver: '',
                		mobile: '',
                		address: ''
                	},
                	ordercode: '',
                	totalPrice: '',
                	count: '',
                	transCost: '',
                	orderStatus: '', //orderStatus应为orderstatus
                	data: []
                }
			}
		},
		methods: {
			repay: function(orderCode) {
				var self = this;
				$.ajax({
					type: "POST",
					url: Config.getApiURL() + "/userOrder/list",
					data: JSON.stringify({orderCode: orderCode}),
					success: response=> {
						if (response.status == 0) {
							console.log(response);
							response.data[0].data.forEach((item)=>{
								item.imageSrc = Config.getMediaURL() + item.imageSrc;
								
							});
							sessionStorage.setItem('order', JSON.stringify(response.data[0])); 
							self.$router.go('/orderconfirm');
						}
					}
				})
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
				type: 'post',
				url: Config.getApiURL() + '/userOrder/list',
				data: JSON.stringify({orderCode: self.$route.params.orderCode}),
				success: response => {
					console.log(response);
					if (response.data[0].orderStatus == 0) {
						response.data[0].orderStatus = "未付款";
					} else if (response.data[0].orderStatus == 1) {
						response.data[0].orderStatus = "待发货";
					} else if (response.data[0].orderStatus == 2) {
						response.data[0].orderStatus = "待收货";
					} else {
						response.data[0].orderStatus = "已完成";
					}
					self.info = response.data[0];
					self.info.data.forEach((item)=>{
						item.imageSrc = Config.getMediaURL()+item.imageSrc;
					});
				},
				error: response => {
					console.log(response);
				}
			});
		},
		computed:{
		}
	}
</script>
<style>
	hr{
		height:1px;
		background-color:#ddd;
		border:none;
		margin-top:5px;
		margin-bottom:5px;
	}
	.orderdetails-info{
		width: 100%;
        background-color: #fff;
        border-bottom: 8px solid #e8e8e8; 
        margin-top: 8px;
	}
	.orderdetails-info p{
		font-size: 13px;
		color: #444444;
		line-height: 20px;
		margin-left: 10px;
		margin-right: 10px;
	}
	.orderdetails-info p>span{
		float: right;
	}
	.orderdetails-info p:last-child{
		padding-bottom: 5px;
	}
	
	.orderdetails-intro{
		width: 100%;
		border-top: 8px solid #e8e8e8;
		border-bottom: 8px solid #e8e8e8; 
	}
	.orderdetails-intro dl{
		color: #404040;
	}
	.orderdetails-intro dl dt{
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.orderdetails-intro dl dd{
		font-size: 13px;
		line-height: 20px;
	}
	.orderdetails-bottom{
		width:100%;
		height: 45px;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #23c083;
		text-align: center;
		line-height: 45px;
		color: #fff; 
	}
	.orderdetails-order-item {
		margin-bottom: 1rem;
		border-top: 1px solid #aaa;
	}
	.orderdetails-order-item:first-child {
		border-top: none;
	}
	.orderdetails-order-item:last-child {
		/*margin-bottom: 3rem;*/
	}
	.orderdetails-order-img {
		width: 5rem;
		height: 4rem;
		border-radius: 5px;
		margin-top: 10px;
		margin-left: 10px;
	}
	.orderdetails-order-info {
		display: inline-block;
		width: 66%;
		vertical-align: top;
		margin-top: 10px;
		margin-right: 10px;
	}
	.orderdetails-order-con p>span {
		float: right;
		margin-right: 30%;
	}
	.ordertails-order-des {
		margin-left: 10px;
		margin-right: 10px;
	}
	.orderdetails-orderaddress {
		padding: 10px;
		display: block;
		text-decoration: none;
	}
	.orderdetails-orderaddress>img {
		width: 3rem;
		height: 3rem;
		vertical-align: middle;
	}
	.orderdetails-orderaddress>div {
		display: inline-block;
		width: 80%;
		vertical-align: middle;
	}
	.orderdetails-orderaddress>div div p {
		display: inline-block;
		width: 30%;
		color: #000;
	}
	.orderdetails-orderaddress>div>div:nth-child(2) {
		margin-top: 10px;
		font-size: 0.9rem;
	}
	.orderdetail-content-content {
		
		color: #5b5b5b;
		font-size: 14px;
		
		padding: 10px;
		/*border-top:1px solid #ddd;*/
		border-bottom:1px solid #ddd;
	}
	.orderdetail-content-content-img {
		width: 5rem;
		height: 5rem;
		vertical-align: top;
		border-radius:5px;
	}
	.orderdetail-content-content-img + dl {
		display: inline-block;
		width: 60%;
		height: 5rem;
	}
	.orderdetail-content-content-img + dl>dt {
		font-size: 0.9rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.orderdetail-content-content-img + dl>dd {
		margin-top: 0.6rem;
		height: 3.2rem;
		font-size: 0.6rem;
		color: #8b8b8b;
		text-overflow: ellipsis;
		display: -webkit-box;
		overflow: auto;
		/* -webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical; */
	}
	.orderdetail-content-content>div:nth-child(1) {
		display: inline-block;
		width: 80%;
		vertical-align: top;
	}
	.orderdetail-content-content>div:nth-child(2) {
		display: inline-block;
		width: 16%;
		color: #8b8b8b;
		text-align: right;	
	}
	.orderdetail-content-content>div:nth-child(2)>div:nth-child(2) {
		margin-top: 1rem;
	}
	p.order-detail-title-big {
		font-size:18px;
		line-height:30px;
		height:30px;
	}
	.orderdetail-bottom{
		width: 100%;
        background-color: #fff;
        border-bottom: 8px solid #e8e8e8; 
        margin-top: 8px;
        font-size: 13px;
        color: #444444;
	}
	.orderdetail-bottom p{
		line-height: 20px;
		margin-left: 10px;
		margin-right: 10px;
	}
	.orderdetail-bottom p>span{
		float: right;
	}
	.order-detail-content-orange{
		color:#FF5722;
		font-size:14px;
	}
	.order-detail-item-pay {
		float:right;
		font-size:16px;
		color:#212121;
	}
	.order-detail-item-pay span{
		font-size:16px;
		margin-left:10px;
	}
	.order-detail-transfee {
		color:#999;

	}
</style>
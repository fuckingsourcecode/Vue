<template>
	<div class="orderinternational">
		<title title="我的订单" backlink="usercenter" showbtn="true"></title>
		<div class="wrapper orderinternational-wrapper">
			<div class="orderinternational-head">
					<div class="orderinternational-head-status"
					v-bind:class="{'orderinternational-active': selectIdx == 0}" @click="contentshow(0)">
						未付款
					</div>
					<div class="orderinternational-head-status" 
					v-bind:class="{'orderinternational-active': selectIdx == 1}" @click="contentshow(1)">
						待发货
					</div>
					<div class="orderinternational-head-status" 
					v-bind:class="{'orderinternational-active': selectIdx == 2}" @click="contentshow(2)">
						已发货
					</div>
					<div class="orderinternational-head-status" 
					v-bind:class="{'orderinternational-active': selectIdx == 3}" @click="contentshow(3)">
						已接收
					</div>
				<div class="orderinternational-head-bottom"></div>
			</div>
			<section class="orderinternational-content">
				<div class="orderinternational-content-notactive"  v-if="selectIdx == 0">
					<div class="orderinternational-state" style="text-align:center;" v-if="ordernotactive.length<=0">
				    	<img src="/static/images/recharge/state.png" style="width:35%;margin-top:33%;">
				    	<p style="color:#c3c3c3;margin-top:5px;">您还没有未付款的订单</p>
				    </div>
					<section v-for="item in ordernotactive" track-by="$index">
						<header class="orderinternational-content-head clearfix" v-link="{name: 'orderdetails', params: {orderCode: item.orderCode}}">
							<nav class="orderinternational-content-nav">订单编号：<span v-text="item.orderCode"></span></nav>
							<div>
								<img src="/static/images/icon/chevron-right.png" style="width: 2rem;height: 2rem;vertical-align: middle;" alt="详情">
							</div>
						</header>
						<section class="orderinternational-content-content" v-for="it in item.data">
							<div>
								<img class="orderinternational-content-content-img" v-bind:src="it.imageSrc" alt="">
								<dl>
									<dt v-text="it.name"></dt>
									<dd v-text="it.description"></dd>
								</dl>
							</div>
							<div>
								<div>￥<span v-text="it.price/100"></span></div>
								<div>x<span v-text="it.amount"></span></div>
							</div>
						</section>
						<footer class="orderinternational-content-foot">
							<div>
								共<span v-text="item.count"></span>件商品 合计：￥<span v-text="item.totalPrice/100"></span>（含运费<span v-text="item.freight/100"></span>）
							</div>
							<div>
								<a @click="repay(item.orderCode)">去支付</a>
							</div>
						</footer>
						<div class="order-seperator"></div>
					</section>
				</div>
				<div class="orderinternational-content-underway" v-if="selectIdx == 1">
					<div class="orderinternational-state" style="text-align:center;" v-if="orderunderway.length<=0">
				    	<img src="/static/images/recharge/state.png" style="width:35%;margin-top:33%;">
				    	<p style="color:#c3c3c3;margin-top:5px;">您还没有待发货的订单</p>
				    </div>
					<section v-for="item in orderunderway" track-by="$index">
						<header class="orderinternational-content-head clearfix" v-link="{name: 'orderdetails', params: {orderCode: item.orderCode}}">
							<nav class="orderinternational-content-nav">订单编号：<span v-text="item.orderCode"></span></nav>
							<div>
								<img src="/static/images/icon/chevron-right.png" style="width: 2rem;height: 2rem;vertical-align: middle;" alt="详情">
							</div>
						</header>
						<section class="orderinternational-content-content" v-for="it in item.data">
							<div>
								<img class="orderinternational-content-content-img" v-bind:src="it.imageSrc" alt="">
								<dl>
									<dt v-text="it.name"></dt>
									<dd v-text="it.description"></dd>
								</dl>
							</div>
							<div>
								<div>￥<span v-text="it.price/100"></span></div>
								<div>x<span v-text="it.amount"></span></div>
							</div>
						</section>
						<footer class="orderinternational-content-foot">
							<div>
								共<span v-text="item.count"></span>件商品 合计：￥<span v-text="item.totalPrice/100"></span>（含运费<span v-text="item.freight/100"></span>）
							</div>
						</footer>
						<div class="order-seperator"></div>
					</section>
				</div>
				<div class="orderinternational-content-over" v-if="selectIdx == 2">
					<div class="orderinternational-state" style="text-align:center;" v-if="orderover.length<=0">
				    	<img src="/static/images/recharge/state.png" style="width:35%;margin-top:33%;">
				    	<p style="color:#c3c3c3;margin-top:5px;">您还没有已发货的订单</p>
				    </div>
					<section v-for="item in orderover" track-by="$index">
						<header class="orderinternational-content-head clearfix" v-link="{name: 'orderdetails', params: {orderCode: item.orderCode}}">
							<nav class="orderinternational-content-nav">订单编号：<span v-text="item.orderCode"></span></nav>
							<div>
								<img src="/static/images/icon/chevron-right.png" style="width: 2rem;height: 2rem;vertical-align: middle;" alt="详情">
							</div>
						</header>
						<section class="orderinternational-content-content" v-for="it in item.data">
							<div>
								<img class="orderinternational-content-content-img" v-bind:src="it.imageSrc" alt="">
								<dl>
									<dt v-text="it.name"></dt>
									<dd v-text="it.description"></dd>
								</dl>
							</div>
							<div>
								<div>￥<span v-text="it.price/100"></span></div>
								<div>x<span v-text="it.amount"></span></div>
							</div>
						</section>
						<footer class="orderinternational-content-foot">
							<div>
								共<span v-text="item.count"></span>件商品 合计：￥<span v-text="item.totalPrice/100"></span>（含运费<span v-text="item.freight/100"></span>）
							</div>
							<div>
								<a @click="viewExpressTrace(item);" >查看物流</a>
								<!-- v-link="{name: 'expressage', params: {orderCode: item.orderCode}}" -->
							</div>
						</footer>
						<div class="order-seperator"></div>
					</section>
				</div>
				<div class="orderinternational-content-receive"v-if="selectIdx == 3">
					<div class="orderinternational-state" style="text-align:center;" v-if="receive.length<=0">
				    	<img src="/static/images/recharge/state.png" style="width:35%;margin-top:33%;">
				    	<p style="color:#c3c3c3;margin-top:5px;">您还没有已接收的订单</p>
				    </div>
					<section v-for="item in receive" track-by="$index">
						<header class="orderinternational-content-head clearfix" v-link="{name: 'orderdetails', params: {orderCode: item.orderCode}}">
							<nav class="orderinternational-content-nav">订单编号：<span v-text="item.orderCode"></span></nav>
							<div>
								<img src="/static/images/icon/chevron-right.png" style="width: 2rem;height: 2rem;vertical-align: middle;" alt="详情">
							</div>
						</header>
						<section class="orderinternational-content-content" v-for="it in item.data">
							<div>
								<img class="orderinternational-content-content-img" v-bind:src="it.imageSrc" alt="">
								<dl>
									<dt v-text="it.name"></dt>
									<dd v-text="it.description"></dd>
								</dl>
							</div>
							<div>
								<div>￥<span v-text="it.price/100"></span></div>
								<div>x<span v-text="it.amount"></span></div>
							</div>
						</section>
						<footer class="orderinternational-content-foot">
							<div>
								共<span v-text="item.count"></span>件商品 合计：￥<span v-text="item.totalPrice/100"></span>（含运费<span v-text="item.freight/100"></span>）
							</div>
							<!-- <div>
								<a @click="repay(item.orderCode)">去支付</a>
							</div> -->
						</footer>
						<div class="order-seperator"></div>
					</section>
				</div>
			</section>
		</div>
	</div>
</template>
<script>
import Utils from '../../../common/utils.js'
import Config from '../../../common/config.js'
export default {
	data: function () {
	   	return {
	   		ordernotactive: [
	   			// {
	   			// 	name: '',
	   			// 	id: '',
	   			// 	orderCode: '',
	   			// 	name: '',
	   			// 	ordercontent: '',
	   			// 	status: '',
	   			// 	price: '',
	   			// 	number: '',
	   			// 	transcost: ''
	   			// }
	   			
	   		],
	   		orderunderway: [
	   			// {
	   			// 	name: '',
	   			// 	id: '',
	   			// 	orderCode: '',
	   			// 	name: '',
	   			// 	ordercontent: '',
	   			// 	status: '',
	   			// 	price: '',
	   			// 	number: '',
	   			// 	transcost: ''
	   			// }
	   		],
	   		orderover: [
	   			// {
	   			// 	name: '',
	   			// 	id: '',
	   			// 	orderCode: '',
	   			// 	name: '',
	   			// 	ordercontent: '',
	   			// 	status: '',
	   			// 	price: '',
	   			// 	number: '',
	   			// 	transcost: ''
	   			// }
	   		],
	   		receive: [
	   			// {
	   			// 	name: '',
	   			// 	id: '',
	   			// 	orderCode: '',
	   			// 	name: '',
	   			// 	ordercontent: '',
	   			// 	status: '',
	   			// 	price: '',
	   			// 	number: '',
	   			// 	transcost: ''
	   			// }
	   		],
	   		selectIdx: 0
	   	}
	},
	methods: {
		contentshow: function (idx) {
			this.selectIdx = idx;
		},
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
							console.log(item.imageSrc);
						});
						sessionStorage.setItem('order', JSON.stringify(response.data[0])); 
						self.$router.go('/orderconfirm');
					}
				}
			});
		},
		viewExpressTrace: function(order) {
			var self = this;
			sessionStorage.setItem('order',JSON.stringify(order));
			self.$router.go('/expressage');
		}
	},
	components: {

	},
	route: {
		data() {

		}
	},
	ready: function () {
		var self = this;
		$('.orderinternational-head-status').click(function() {
			var idx = $(this).index();
			var marginleft = parseFloat(25*parseInt(idx));
			$('.orderinternational-head-bottom').animate({"marginLeft": marginleft+"%"}, 300);
			return false;
		});
		$.ajax({
			beforeSend: function () {
        		$('.weui_loading_toast').css('display', 'block');
        	},
        	complete: function () {
        		$('.weui_loading_toast').css('display', 'none');
        	}, 
			type: 'post',
			url: Config.getApiURL() + '/userOrder/list',
			success: response => {
				if (response.data && response.data.length > 0) {
					self.ordernotactive.pop();
					self.orderunderway.pop();
					self.orderover.pop();
					self.receive.pop();
					response.data.forEach((value, index, array) => {
						value.data.forEach((item)=>{
							item.imageSrc = Config.getMediaURL() + item.imageSrc;
						});
						if(value.orderStatus == 0) {
							self.ordernotactive.push(value);
						} else if(value.orderStatus == 1) {
							self.orderunderway.push(value);
						} else if(value.orderStatus == 2) {
							self.orderover.push(value);
						} else {
							self.receive.push(value);
						}
					});
				}
			},
			error: response => {
				console.log(response);
			}
		});
	}
}
</script>
<style>
.order-seperator {
	width:100%;
	height:10px;
	margin-top:10px;
	background-color:#eee;
	padding-left:10px;
	padding-right:10px;
	margin-left:-10px;
}
.orderinternational {
	background-color:#eee;
}
.orderinternational-wrapper {
	background-color: #fff!important;
}
.orderinternational-head {
	width: 100%;
	background-color: #fff;
	border-bottom:10px solid #eee;

}
.orderinternational-active {
	color: #4ed7a0;
}
.orderinternational-head-status {
	padding-top:5px;
	padding-bottom:5px;
	width: 25%;
	height: 100%;
	display: inline-block;
	float: left;
	text-align: center;
	font-size: 16px;
	line-height: 35px;
}
.orderinternational-head-bottom {
	width: 25%;
	height: 3px;
	background-color: #4ed7a0;
	clear: both;
}

.orderinternational-content-notactive, .orderinternational-content-underway, 
.orderinternational-content-over,.orderinternational-content-receive {
	padding: 10px;
	padding-top:0px;
}

.orderinternational-content-head {
	line-height: 2rem;
}
.orderinternational-content-head>div:nth-child(1) {
	float: left;
}
.orderinternational-content-head>div:nth-child(2) {
	float: right;
}
.orderinternational-content-nav, .orderinternational-content-content, 
.orderinternational-content-foot {
	color: #5b5b5b;
	font-size: 14px;
}
.orderinternational-content-nav {
	float: left;
}
.orderinternational-content-content {
	/*background-color: #f0f0f0;*/
	margin-left: -10px;
	margin-right: -10px;
	padding: 10px;
	border-top:1px solid #ddd;
	border-bottom:1px solid #ddd;
}
.orderinternational-content-content+.orderinternational-content-content{
	border-bottom:1px solid #ddd;
	border-top:none;
}
.orderinternational-content-content-img {
	width: 5rem;
	height: 5rem;
	vertical-align: top;
	border-radius:5px;
}
.orderinternational-content-content-img + dl {
	display: inline-block;
	width: 60%;
	height: 5rem;
}
.orderinternational-content-content-img + dl>dt {
	font-size: 0.9rem;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.orderinternational-content-content-img + dl>dd {
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
.orderinternational-content-content>div:nth-child(1) {
	display: inline-block;
	width: 80%;
	vertical-align: top;
}
.orderinternational-content-content>div:nth-child(2) {
	display: inline-block;
	width: 16%;
	color: #8b8b8b;
	text-align: right;	
}
.orderinternational-content-content>div:nth-child(2)>div:nth-child(2) {
	margin-top: 1rem;
}
.orderinternational-content-foot {
	text-align: right;
	color: #5b5b5b;
	margin-top:5px;
}
.orderinternational-content-foot>div:nth-child(2) {
	margin-top: 20px;
	text-align:center;
}
.orderinternational-content-foot>div:nth-child(2)>a{
	display: inline-block;
	width: 150px;
	height: 25px;
	line-height: 25px;
	color: #23c083;
	text-align: center;
	border: 1px solid #23c083;
	border-radius: 5px;	
}
.orderinternational-content-notactive, .orderinternational-content-underway, .orderinternational-content-over, .orderinternational-content-receive {
	border-bottom: 8px solid #e1e0e0;
}
.orderinternational-content-notactive:last-child, .orderinternational-content-underway:last-child, .orderinternational-content-over:last-child,.orderinternational-content-receive:last-child {
	border-bottom: none;
}
</style>
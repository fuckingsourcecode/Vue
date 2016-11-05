<template>
	<div class="orderdetails" style="background:#fff;">
		<title title="订单详情" backlink="usercenter" showbtn="true" ></title>
		<div class="orderdetails-pic">
			<img src="/static/images/temp/discount-pk.png" width="100%">
		</div>
		<div class="orderdetails-info">
			<p>订单编号<span v-text="number"></span></p>
			<p>创建时间<span v-text="creattime"></span></p>
			<p>套餐到期时间<span v-text="cutofftime"></span></p>
			<p>支付状态<span v-text="paystate"></span></p>
			<p>当前状态<span v-text="presentstate"></span></p>
		</div>
		<div class="orderdetails-intro">
			<dl>
				<dt>套餐详情</dt>
				<dd>1.本店消费满200元可获得本优惠券</dd>
				<dd>2.此优惠券使用应在消费500元以内，如超出500元不能使用此优惠券。</dd>
				<dd>3.此券限本人自己使用，不能給予他人或帮助他人代付使用。</dd>
				<dd>4.此券在规定时间内使用，超过规定时间一律作废</dd>
				<dd>5.使用本券需提前预约并在线使用</dd>
			</dl>
		</div>
		<a class="orderdetails-bottom">立即激活</a>
	</div>
</template>
<script>
	export default{
		data: function () {
			return {
                number: 123594656523216546,
                creattime: '2016-09-22  21:32',
                cutofftime: '2016-09-22  21:32',
                paystate: '已支付',
                presentstate: '待激活'
			}
		},
		methods: {

		},
		ready: function () {

		},
		computed:{
		}
	}
</script>
<style>
	.orderdetails-info{
		width: 100%;
        background-color: #fff; 
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
	.orderdetails-info p:last-child>span{
		color: red;
	}
	.orderdetails-intro{
		width: 100%;
		border-top: 8px solid #e8e8e8;
	}
	.orderdetails-intro dl{
		margin-left: 10px;
		margin-right: 10px;
		color: #404040;
	}
	.orderdetails-intro dl dt{
		margin-top: 5px;
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
		background-color: #28a965;
		text-align: center;
		line-height: 45px;
		color: #fff; 
	}
</style>
<template>
	<div class="discountpackage" style="background:#fff;">
		<div class="discountpackage-pic">
			<img src="/static/images/temp/discount-pk.png" width="100%">
		</div>
		<div class="discountpackage-price">
			<p>澳大利亚2日套餐<span>￥<span v-text="thePrice"></span></span></p>
			<p>澳大利亚2日无限流量上网套餐<span>原价￥<span v-text="theOldprice">32.00</span></span></p>
		</div>
		<div class="discountpackage-info">
			<dl>
				<dt>套餐详情</dt>
				<dd>1.本店消费满200元可获得本优惠券</dd>
				<dd>2.此优惠券使用应在消费500元以内，如超出500元不能使用此优惠券。</dd>
				<dd>3.此券限本人自己使用，不能給予他人或帮助他人代付使用。</dd>
				<dd>4.此券在规定时间内使用，超过规定时间一律作废</dd>
				<dd>5.使用本券需提前预约并在线使用</dd>
			</dl>
		</div>
		<div class="discountpackage-bottom">
			<h3>总价 ￥<span v-text="theTotalprice"></span></h3>
			<a>立即购买</a>
		</div>
	</div>
</template>
<script>
	import Config from '../../common/config.js'
	import Utils from '../../common/utils.js'
	export default {
		data: function () {
			return {
                thePrice: 25.00,
                theOldprice: 32.00,
                theTotalprice: 25
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
	.discountpackage-price{
		width: 100%;
		background-color: #fff;
	}
	.discountpackage-price p:first-child{
		color: #404040;
		font-size: 20px;
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 5px;
		font-weight: bold;
	}
	.discountpackage-price p:first-child>span{
		float: right;
		color: red;   
	}
	.discountpackage-price p:last-child{
		color: #595959;
		font-size: 12px;
		margin-left: 10px;
		margin-right: 10px;
		margin-bottom: 10px;
	}
	.discountpackage-price p:last-child>span{
		float: right;
       text-decoration: line-through;
	}
	.discountpackage-info{
		width: 100%;
		border-top: 8px solid #e8e8e8;
	}
	.discountpackage-info dl{
		margin-left: 10px;
		margin-right: 10px;
		color: #404040;
	}
	.discountpackage-info dl dt{
		margin-top: 5px;
	}
	.discountpackage-info dl dd{
		font-size: 13px;
		line-height: 20px;
	}
	.discountpackage-bottom{
		width: 100%;
		height: 50px;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	.discountpackage-bottom h3{
		display: inline-block;
		float: left;
		color: red;
		margin-left: 10px;
		line-height: 50px;
	}
	.discountpackage-bottom a{
		display: inline-block;
		float: right;
		color: #fff;
		background-color: red;
		width: 28%;
		height: 50px;
		text-align: center;
        line-height: 50px;
	}
</style>
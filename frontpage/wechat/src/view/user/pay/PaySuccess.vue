<template>
	<div class="paysuccess">
		<!-- 支付成功回到 -->
		<!-- btnlink={{'orderdetails/' + orderCode}} -->
		<title title="支付成功" showbtn="true" btnname="订单详情" backlink="myorders"></title>
		<div class="wrapper paysuccesswrapper">
			<div>
				<section class="paysuccess-content">
					<img src="/static/images/icon/paysuccess.svg" alt="">
					<p style="color:#20d28f">支付成功</p>
					<img src="/static/images/icon/paybar.png" class="paybar" alt="">
					<ul>
						<li>1.套餐激活后才能使用，请在出行前激活套餐</li>
						<li>2.如需出国后也可接听您国内号码的电话，需要惊醒呼转设置</li>
						<li>3.使用当地网络需要进行APN设置</li>
						<li>4.如需更多信息，请查看帮助</li>
					</ul>
					<a v-link="{name: 'index'}">返回首页</a>
				</section> 
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data: function () {
			return {
				btnlink: ''
			}
		},
		ready: function () {
		    this.btnlink= 'orderdetails/' + sessionStorage.getItem('orderCode');
			var self = this;
			$('.component-title-btn').click(function () {
				self.$router.go({path: self.btnlink});
			})
		}
	}
</script>
<style>
	.paysuccesswrapper {
		background-color: #fff!important;
	}
	.paysuccesswrapper>div {
		padding: 10px;
	}
	.paysuccess-content {
		margin-top: 5%;
		text-align: center;
	}
	.paysuccess-content>img:nth-child(1) {
		width: 3rem;
		height: 3rem;
	}
	.paybar {
		width: 100%;
		margin-top: 5%;
		margin-bottom: 5%;
	}
	.paysuccess-content a {
		display: inline-block;
		margin-top: 10%;
		width: 80%;
		line-height: 2.5rem;
		background-color: #20d28f;
		color: #fff;
		border-radius: 5px;
	}
	.paysuccess-content ul {
		text-align: left;
	}
	.paysuccess-content ul li{
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>
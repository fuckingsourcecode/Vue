<template>
	<div class="payfail">
	<!-- btnlink="'orderdetails/' + orderCode" -->
		<title title="支付失败" showbtn="true" backlink="myorders"></title>
		<div class="wrapper payfailwrapper">
			<div>
				<section class="payfail-content">
					<img src="/static/images/icon/payfail.png" alt="">
					<p>支付失败</p>
					<img src="/static/images/icon/paybar.png" class="paybar" alt="">
					<p>对不起，您的订单支付失败</p>
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
				self.$router.go({path: self.btnlink})
			})
		}
	}
</script>
<style>
	.payfailwrapper {
		background-color: #fff!important;
	}
	.payfailwrapper>div {
		color: #fc5c38;
		padding: 10px;
	}
	.payfail-content {
		margin-top: 5%;
		text-align: center;
	}
	.payfail-content>img:nth-child(1) {
		width: 3rem;
		height: 3rem;
	}
	.paybar {
		width: 100%;
		margin-top: 5%;
		margin-bottom: 5%;
	}
	.payfail-content a {
		display: inline-block;
		margin-top: 10%;
		width: 80%;
		line-height: 2.5rem;
		background-color: #20d28f;
		color: #fff;
		border-radius: 5px;
	}
</style>
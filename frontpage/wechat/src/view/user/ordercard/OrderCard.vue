<template>
<div class="ordercard">
	<div class="title" id="part1">卡片订单
		<a class="left-btn" v-link="{name:'usercenter'}"><img src="/static/images/icon/back.png">返回</a>
	</div>
	<div class="wrapper">
		<div id="part2" v-if="orders.length <=0" style="text-align:center;background:#fff;">
			<img src="/static/images/recharge/state.png" alt="" style="margin-top:20%;width:35%;">
			<p style="color:#c5c5c5;padding-top:2%;line-height:50px;font-weight:bold;">您还没有订单呢</p>
			<a v-link="{name:'systemcard'}" class="more-info">逛一逛</a>			
		</div>
		<div class="ordercard-items" v-for="order in orders" track-by="$index">
			<div class="ordercard-item">
				<div class="ordercard-item-content">
					<img src="/static/images/temp/card-icon.png">
					<div class="ordercard-item-content-detail">
						<li class="ordercard-item-content-detail-title">飞鲸软卡</li>
						<li class="ordercard-item-content-detail-status">套餐：香港7日</li>
						<li class="ordercard-item-content-detail-price">￥20.00</li>
					</div>
				</div>
				<div class="ordercard-item-btns">
					<a class="ordercard-item-btn-default" style="border-radius:  0 0 0 5px;">删除</a>
					<a class="ordercard-item-btn-recommond" style="border-radius:  0 0 5px 0;">
						确认收货
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
		export default {
			data() {
				return {
					orders:[]
				}
			},
			ready: function () {
				var total = document.documentElement.clientHeight;
				var colHeight = total-50-document.getElementById("part1").offsetTop;
				document.getElementById("part2").style.height=colHeight+"px";
			},
			methods:{
			}
		}
</script>
<style>
.ordercard-items{
	padding-top: 2px;
}
.ordercard-item{
	width: 99%;
	height: 100px;
	background-color: white;
	margin: auto;
	margin-bottom: 8px;
	border-radius: 8px;
	box-shadow: 1px 2px 1px rgba(0,0,0,0.2);
}
.ordercard-item-content{
	width: 100%;
	height: 75px;
}
.ordercard-item-content img{
	width: 50px;
	height: 50px;
	border-radius: 25px;
	margin-top: 10px;
	margin-left: 5px;
	float: left;
	border: solid 1px rgba(0,0,0,0.4);
}
.ordercard-item-content-detail{
	text-align: center;
	margin-left: 60px;
	height: 75px;
	padding-top: 5px;
}
.ordercard-item-content-detail-title{
	font-weight: bold;
	font-size: 19px;
	line-height: 40px;
}
.ordercard-item-content-detail-status{
	float: left;
	margin-left: 5px;
	font-size: 15px;
	font-weight: bold;
	margin-top: 2px;
}
.ordercard-item-content-detail-price{
	color: red;
	float: right;
	margin-right: 5px;
	font-weight: bold;
}
.ordercard-item-btns{
	background-color: #0066aa;
	width: 100%;
	height: 25px;
	line-height: 25px;
	border-radius:  0 0 5px 5px;
	font-size: 12px;
	letter-spacing: 2px;
}
.ordercard-item-btns a{
	display: block;
	width: 50%;
	float: left;
	text-align: center;
	font-weight: bold;
}
.ordercard-item-btn-disable{
	color: white;
	background-color: #888888;
}
.ordercard-item-btn-default{
	color: white;
}
.ordercard-item-btn-recommond{
	color: white;
	background-color: red;
}
</style>
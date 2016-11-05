<template>
	<div>
		<div>
			<myheader backUrl="east-buy">
				<div slot="my-header-title">确认订单</div>
			</myheader>
			<div class="orderConfirm-blank"></div>
			<div class="orderConfirm-cardInfo">
				<p>途宝<span v-text="ownCountry"></span>卡：</p>
				<img src="/static/img/orderConfirm/card.jpg" alt="">	
				<div class="orderConfirm-cardPrice">
					<div style="margin-top:0px;margin-bottom:0px;">
						<h4 class="t1">
							途宝<span v-text="ownCountry"></span>卡(卡贴)
							<p>￥<span v-text="$route.params.totalPrice"></span></p>
						</h4>
					</div>
					<div>
						<p>
							一次贴卡永久使用，实时切换
							<br/>	
							消耗全程掌握
						</p>
					</div>
					<div>
						<h4 class="t2">
							选定套餐：<span v-text="ownCountry"></span>
							（<span v-text="$route.params.buyDate"></span>天）
							<p>X1</p>
						</h4>

					</div>
				</div>
			</div>
			<div class="payStyle">
				<h5>支付方式：</h5>
				<div class="radio">
					<label>
						<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>	
						<img src="/static/img/orderConfirm/paystyle.jpg" alt="">	
						<span>支付宝支付</span>
					</label>
				</div>
			</div>
			<div class="colorBar">
				<img src="/static/img/orderConfirm/colorbar.jpg" alt="" width="100%">
			</div>
		</div>
		<form action="" style="margin-bottom: 200px">
			<div class="form-group">
				<label style="color:#a4a4a4;float:left;margin-left:5%;">请输入收货信息：</label>
				<input type="text" class="form-control" id="exampleInputEmail1" placeholder="请输入您的姓名" style="width:90%;margin:5px auto;">
				<input type="tel" class="form-control" id="exampleInputEmail2" placeholder="请输入您的电话号码" style="width:90%;margin:5px auto;">
				<input type="text" class="form-control" id="exampleInputEmail3" placeholder="请输入收货地址" style="width:90%;margin:5px auto;">
				<input type="text" class="form-control" id="exampleInputEmail4" placeholder="请输入验证码" style="width:45%;margin-left:5%;display:inline-block;float:left;">
				<input type="button" class="btn btn-primary" style="display:inline-block;width:40%;text-align:center;" id="order-confirm-getCode" @click="sendCode" value="获取验证码" />
			</div>
		</form>
        <div class="orderConfirm-blank"></div>
		<div class="buy-btn">
            <a style="background-color: red;" v-link="{name: nextRouter, params: {totalPrice: destinationTotalPrice, country: destinationCountry, buyDate: destinationDay} }">
                立即付款
            </a>
        </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
			   nums:60,
			   clock: null,
			   ownCountry: '',
			}
		},
		ready: function () {
			this.ownCountry = combo[this.$route.params.id].name;
		},
		methods:{
			sendCode: function()
			{ 
			 	var clock='';
			 	var nums =this.nums;
				$("#order-confirm-getCode").attr('disabled', true); 
				$("#order-confirm-getCode").val(nums+'秒后重新获取');
				if(nums == 60){
					clock = setInterval(function (){
						nums--;
						if(nums == 0){
							clearInterval(clock); 
							$("#order-confirm-getCode").attr('disabled',false);
							$("#order-confirm-getCode").val('获取验证码');
							nums = 60;   
						}else{
							$("#order-confirm-getCode").attr('disabled',true);
							$("#order-confirm-getCode").val(nums+'秒后重新获取');
						}
					}, 1000); 
				}
			},
		},
		components: {
			'myheader': require('../component/header.vue')
		}
	}
</script>
<style>
    .orderConfirm-blank{
    	width: 100%;
    	height: 4rem;
    }
	.orderConfirm-cardInfo{
		width: 100%;
		height: 150px;
		background: #eeeeee;
		clear: both;
		border-top: 5px solid #00aaef;
	}
	.orderConfirm-cardInfo p{
		font-size: 14px;
		line-height: 14px;
		float: left;
		margin-top: 15px;
		padding-left: 3%;
	}
	.orderConfirm-cardInfo img{
		clear: both;
		float: left;
		padding-left: 3%;
		padding-right: 3%;
	}
	.orderConfirm-cardInfo .orderConfirm-cardPrice{
		width: 70%;
		float: left;
		margin-top: -5px;
		text-align: left;
	}
	.orderConfirm-cardInfo .orderConfirm-cardPrice h4{
		float: left;
		width: 100%;
		font-size: 14px;
		line-height: 28px;
		margin: 0px;

	}
	.orderConfirm-cardInfo .orderConfirm-cardPrice h4>p{
		font-size: 16px;
		line-height: 27px;
		float: right;
		margin-right: 5px;
		color: black;
	}
	.orderConfirm-cardInfo .orderConfirm-cardPrice h4.t2{
		color: red;
		margin-top: 10px;
	}
	.orderConfirm-cardInfo .orderConfirm-cardPrice p{
		float: left;
		font-size: 12px;
		line-height: 14px;
		color: #626262;
        margin:0px;
        padding-left: 0px;
	}
    @media screen 
      and (min-device-width: 320px) 
      and (max-device-width: 374px){
      	.orderConfirm-cardInfo .orderConfirm-cardPrice{
			width: 66%;
		}
		.orderConfirm-cardInfo .orderConfirm-cardPrice h4{
			font-size: 12px;
			line-height: 24px;

		}
		.orderConfirm-cardInfo .orderConfirm-cardPrice h4>span{
			font-size: 12px;
			line-height: 12px;
		}
      }
	.payStyle{
		text-align: left;
		border-top: 5px solid #00aaef;
	}
	.payStyle h5{
		margin-left: 15px;
	}
	.payStyle .radio #optionsRadios1{
		margin-top: 15px;
	}
	.payStyle .radio{
		margin-left: 3%;
	}
	.payStyle .radio label{
		width: 100%;
	}
	.payStyle .radio label img{
		padding-left: 10px;
	}
	.payStyle .radio label span{
        float: right;
        margin-right: 3%;
        margin-top: 15px;
	}
	.colorbar{
		width: 100%;
		margin-top: -10px;
	}
</style>

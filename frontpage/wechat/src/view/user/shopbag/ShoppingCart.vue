<template>
	<div class="shoppingcart">
		<title title="购物车" showbtn="false" backlink="usercenter" btnname="" btnlink="" id="sec1"></title>
		<div id="shoppingcart-wrapper">
		    <div id="sec2" v-if="items.length <=0" style="text-align:center;background:#fff;">
				<img src="/static/images/icon/shopping-cart.png" alt="" style="margin-top:45%;width:50%;">
				<p style="color:#999999;padding-bottom:10%;line-height:50px;font-weight:bold;">购物车空空如也</p>
				<a v-link="{name:'systempackage'}" class="shoppingcart-more-info">去逛逛</a>
			</div>
			<div class="shoppingcart-items" id="wrapperCon" v-if="items.length > 0">
				<div class="shoppingcart-item" v-for="item in items" track-by="$index">
					<div class="shoppingcart-item-operation">
					    <p style="float:left;margin-left:5px;line-height:20px;">港澳2日套餐</p>
						<a @click="showDiv($index)">编辑</a>  
					</div>
					<div class="shoppingcart-item-content">
						<div class="shoppingcart-checkbox">
							<input type="checkbox" class="check-box" id="checkbox-item-input-{{$index}}" name="newslist" @click="getTotal(20)">
							<label for="checkbox-item-input-{{$index}}"></label>
						</div>
						<img src="/static/images/temp/card-icon.png">
                        <div class="shoppingcart-item-detail" id="detail-{{$index}}">
                        	<h3>港澳2日套餐<span style="color:red;float:right;">￥28</span></h3>
                        	<p>无限流量，澳门可用 可拨打电话，可重复 充值使用</p>
                        	<h3>x<span id="totalamount-{{$index}}">1</span></h3>
                        </div>
                        <div class="shoppingcart-item-editor" id="editor-{{$index}}" class="display:none;">
                        	<a class="shoppingcart-item-delete">删除</a>
                        	<div class="shoppingcart-select">
	                        	<div class="shoppingcart-decrease" @click="decreaseBtn($index)" style="margin-right:10px;">
					        		<img src="/static/images/icon/decrease.svg" alt="减一件" style="width:20px;height:20px;">
					        	</div>
				        		<span id="amount-{{$index}}">1</span>
					        	<div class="shoppingcart-increase" @click="increaseBtn($index)" style="margin-left:10px;">
					        		<img src="/static/images/icon/increase.svg" alt="加一件" style="width:20px;height:20px;">
					        	</div>
				        	</div>

                        </div>
					</div>					
				</div>
			</div>
		</div>
		<div class="shoppingcart-bottom" v-if="items.length > 0">
			<div class="shoppingcart-bottom-check">
				<input type="checkbox" id="check-all" @click="allbuy">
				<label for="check-all">全选</label>
			</div>
			<a class="shoppingcart-bottom-pay">结算(<span id="selectTotal" v-text="account"></span>)</a>
			<div class="shoppingcart-bottom-price">
				<h4>合计：<span style="color:red;">￥<span id="priceTotal" v-text="total"></span></span></h4>
				<p style="float:right;font-size:12px;color:#545454;">不含运费</p>
			</div>
		</div>	
	</div>
</template>
<script>
    // import Utils from '../../../common/utils.js'
	// import Config from '../../../common/config.js'
	export default {
		data() {
			return {
				items: [{},{}],
				total: 0,
				account: 0,
				all: {}
			}
		},
		ready: function () {

		},
		computed: {
			totalprice: function () {

			}
		},
		methods:{
			getTotal:function(price, $event){
				if(event.currentTarget.checked) {
					this.total += price;
					this.account += 1;
				} else {
					this.total -= price;
					this.account -= 1;
				}	
				if ($('.check-box').not('input:checked').length <= 0) {
					$('#check-all').prop('checked', true);
				} else {
					$('#check-all').prop('checked', false);
				}
			},
			allbuy: function ($event) {
				if(event.currentTarget.checked) {
					//ajax获取的数据
					this.total = 90;
					$('.check-box').prop('checked', true);
					this.account =  2
				} else {
					this.total = 0;
					$('.check-box').prop('checked', false);
					this.account =0;
				}
			},
			showDiv:function(index){			
                var detail = $('#detail-'+index);
                var editor = $('#editor-'+index);
                if (editor.css('display') == 'none') {
                	editor.show();
                	detail.hide();
                } else {
                	editor.hide();
                	detail.show();
                }
			},
			decreaseBtn:function(index){
				var amount = parseInt($('#amount-'+index).text());
				var totalamount = parseInt($('#totalamount-'+index).text());
				if (amount >1) {
					amount--;
					$('#amount-'+index).text(amount);
					$('#totalamount-'+index).text(amount);
				}
			},
			increaseBtn:function(index){
				var amount = parseInt($('#amount-'+index).text());
				var totalamount = parseInt($('#totalamount-'+index).text());
				amount++;
				$('#amount-'+index).text(amount);
				$('#totalamount-'+index).text(amount);
			}	
		}
	}
</script>
<style>
	#shoppingcart-wrapper{
		width: 100%;
		display: block;
	}
	.shoppingcart-items{
		width: 100%;
		padding-top: 2px;
/*		overflow-y: scroll;
	    -webkit-overflow-scrolling: touch;*/
	}
	.shoppingcart-item{
		width: 100%;
		height: 120px;
		background-color: white;
		margin: auto;
		border-bottom: 10px solid #eee;
	}
	.shoppingcart-item-operation{
		width: 100%;
		height: 23px;
		padding-top: 5px;
		background: #fff;
		box-shadow: 1px 2px 1px rgba(0,0,0,0.2);
	}
	.shoppingcart-item-operation a{
		color: #5b5b5b;
		float: right;
		margin-right: 5px;
		display: inline;
		line-height: 20px;
	}
	.shoppingcart-item-content{
		width: 100%;
		height: 95px;
		float: right;
	}
	.shoppingcart-item-content img{
		width: 80px;
		height: 80px;
		margin-top: 5px;
		margin-left: 5px;
		margin-right: 5px;
		float: left;
		border: solid 1px rgba(0,0,0,0.4);
	}
	.shoppingcart-item-detail h3:first-child{
		font-size: 18px;
		font-weight: normal;
		margin: 0px 5px;
        margin-left: 0;
	}
	.shoppingcart-item-detail{
		width: 60%;
		float: right;
	}
	.shoppingcart-item-detail h3:last-child{
		float: right;
		margin-right: 5px;
		color: #5b5b5b;
	}
	.shoppingcart-item-detail p{
		font-size: 12px;
		color: #5b5b5b;
		margin-right: 5px;
	}
	.shoppingcart-item-editor{
		width: 60%;
		height: 100%;
		float: right;
		display: none;
	}
	.shoppingcart-item-delete{
		width: 50px;
		height: 97.6%;
		color: #fff;
		line-height: 95px;
		text-align: center;
		background-color: #fd330b;
		float: right;
	}
	.shoppingcart-select{
		text-align: center;
	}
	.shoppingcart-select > span{
		display:inline-block;
		width: 25px;
		height:22px;
		line-height:8px;
		vertical-align:middle;
	}
	.shoppingcart-decrease,.shoppingcart-increase{
		display: inline-block;
		margin-top: 30px;
	}
	.shoppingcart-bottom{
		background-color: #fff;
		height: 45px;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		color: #000;
		width: 100%;
		border-top: 1px solid #cececd;
		display: block;
		z-index: 99999;
	}
	.shoppingcart-bottom-check{
		display: inline-block;
		margin-top: 10px;
		margin-left: 5px;
	}
	.shoppingcart-bottom-price{
        display:inline-block; 
        float: right;
        margin-right: 10px;
	}
	.shoppingcart-bottom-pay{
		float: right;
		width: 30%;
		text-align: center;
		line-height: 45px;
		background-color: red;
		color: #fff;
	}
	.shoppingcart-more-info{
		color: #1fd291;
		border:1px solid #1fd291;
		border-radius: 5px;
		padding: 12px 50px;
	}
    .shoppingcart input[type=checkbox] {
    	visibility: hidden;
    }
    .shoppingcart-checkbox{
    	width: 20px;
		height: 20px;
        display: inline-block;
        float: left;
        margin-left: 5px;
        margin-top: 38px;
		border-radius: 100%;
		position: relative;
    }
    .shoppingcart-checkbox label{
    	display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 100px;
		-webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
		cursor: pointer;
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 1;
		background: url('/static/images/icon/select.png');
		background-size: 100%;
/*		-webkit-box-shadow:inset 0px 1px 1px rgba(0,0,0,0.5);
		-moz-box-shadow:inset 0px 1px 1px rgba(0,0,0,0.5);
		box-shadow:inset 0px 1px 1px rgba(0,0,0,0.5);*/
    }
    .shoppingcart-checkbox input[type=checkbox]:checked + label {
		background: url('/static/images/icon/selected.png');
		background-size: 100%;
	}
</style>
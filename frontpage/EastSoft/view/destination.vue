<template>
	<div>
		<section class="donghang-destination">
			<div>
				<img v-bind:src="destinationImg" widht="100%" class="img-responsive" alt="">
			</div>
			<section class="destination-control-panel">
				<div class="destination-show">
					<p>单价: <span class="destination-price" v-text="destinationPrice">15</span>元/天</p>
					<p>合计：<span class="destination-total-price" v-text="destinationTotalPrice">15</span>元</p>
				</div>
				<div class="destination-price-justify">
					<img src="../static/img/decrease.gif" @click="decrease" class="destination-decrease" alt="">
					<p class="destination-day">
						<span class="hide" v-text="destinationDay"></span>
						<input autofocus="true" style="width:4rem;height:100%;border:none;padidng:0; text-align:center" id="buyDate" v-model="destinationDay" value="1" type="number" name=""> 天
					</p>
					<img src="../static/img/increase.gif" @click="increase" class="destination-increase" alt="">
				</div>
			</section>
			<section class="destination-instruction text-left" style="margin-bottom: 4rem">
				<dl>
					<dt>使用说明：</dt>
					<dd style="padding: 10px;text-indent: 2rem">
						
					</dd>
				</dl>
			</section>
		</section>
        <div class="buy-btn">
	        <a style="background-color: #1fd291" v-link="{name: nextRouter, params: {totalPrice: destinationTotalPrice, id: destinationCountry, buyDate: destinationDay} }">
	            确认
	        </a>
	    </div>
	</div>	
</template>
<script>
	export default {
		data: function() {
			return {
				destinationDay: 0,
				destinationPrice: 0,
				destinationTotalPrice: 0,
				destinationCountry: '',
				destinationImg: '',
				nextRouter: 'order-confirm',
				myBackColor: '#1fd291',
			}
		},
		ready: function(){
			$('.destination-increase').on('mousedown touchstart', function() {
				$('.destination-increase').css('transform', 'scale(0.8)');
			});
			$('.destination-decrease').on('mousedown touchstart', function() {
				$('.destination-decrease').css('transform', 'scale(0.8)');
			});
			$('.destination-increase').on('mouseup touchend', function() {
				$('.destination-increase').css('transform', 'scale(1)');
			});
			$('.destination-decrease').on('mouseup touchend', function () {
				$('.destination-decrease').css('transform', 'scale(1)');
			});			
			var that = this;
			$.ajax({
				type: 'GET',
				url: 'http://www.itourbag.com/newtb/package/info?packageid=' + that.$route.params.id,
				dataType: 'json',
				success: function (data) {
					that.destinationPrice = parseInt((data.data.price/100).toFixed(2));
					that.destinationImg = combo[data.data.country].src;
					that.destinationCountry = combo[data.data.country].name;
					$('.destination-instruction dd').text(data.data.detail);
				},
				error: function (e) {
					console.log(e)
				}
			});
		},
		components: {
			'myheader': require('../component/header.vue'),
		},
		methods: {
			decrease: function() {
				if(this.destinationDay>1) {
					this.destinationTotalPrice -= this.destinationPrice;
					$('#buyDate').val($('#buyDate').val--);
					this.destinationDay--;
				} else {
					this.destinationTotalPrice = 1;
					$('#buyDate').val(1);
					this.destinationDay = 1;
				}
			},
			increase: function() {
				this.detinationTotalPrice += this.destinationPrice;
				$('#buyDate').val($('#buyDate').val++);
				this.destinationDay++;
			}
		},
		computed: {
			destinationTotalPrice: function() {
				if(this.destinationDay>=1) {
					return this.destinationDay*this.destinationPrice;
				}else {
					return this.destinationPrice;
				}
			}
		}
	}
</script>
<style>
.destination-show {
	display:flex;
	justify-content:space-between;
	padding: 0.5rem 1rem 0 1rem;
	border-bottom: 1px solid #ededed;
	color: #1fd291;
}
.destination-control-panel {
	border-bottom: 1rem solid #ededed;
}
.destination-price-justify {
	margin-top: 1rem;
	display: flex;
	justify-content: center;
	margin-bottom: 5px;
}
.destination-increase, .destination-decrease {
	height: 3rem;
}
.destination-day {
	font-size: 2rem;
	line-height: 30px;
	margin-left: 2rem;
	margin-right: 2rem;
}
.destination-day input {
	padding: 0;
	height: 30px!important;
	-webkit-appearance: none;
	-moz-appearance:textfield;
	-ms-appearance: none;
	-o-appearance: none;
	appearance: none;
}
.destination-instruction {
	padding: 1rem;
	color: #949494;
	margin-bottom: 5rem;
}
.destination-instruction li {
	list-style: none;
	margin-top: 1rem;
}
</style>

9ioo<template>
	<div class="costrecord">
		<title title="话费详单" backlink="usercenter" showbtn="true" btnname="话费充值" btnlink="/rechargecenter"></title>
		<div class="wrapper">
			<div class="costrecord-menu">
				<p>
					<a href="#" @click="setIdx(0)" v-bind:class="{ 'costrecord-menu-selected' : !selectIdx }">消费记录</a>
					<a href="#" @click="setIdx(1)" v-bind:class="{ 'costrecord-menu-selected' : selectIdx }">充值记录</a>
				</p>
				<div class="costrecord-menu-bottom"></div>
			</div>
			<div class="costrecord-items-wrapper" v-if="selectIdx==0">
				<div class="costrecord-item" v-for="consume in consumelist">
					<div class="costrecord-item-icon">
						<img src="/static/images/icon/call.png" v-if="consume.type == 0">
						<img src="/static/images/icon/called.png" v-if="consume.type == 1">
					</div>
					<div class="costrecord-item-row">
						<h3 class="costrecord-item-record"><span v-if="consume.type == 0">主叫</span><span v-if="consume.type == 1">被叫</span> {{consume.callnumber.substring(0,5)}}****{{consume.callnumber.substring(consume.callnumber.length-2)}}</h3>
						<p class="costrecord-item-cost">{{consume.totaltime}}min (约0.5元/min)</p>
					</div>
					<div class="costrecord-item-row">
						<h3 class="costrecord-item-record">呼叫时间: {{consume.createtime}}</h3>
						<p class="costrecord-item-cost">-￥{{consume.totalprice}}元</p>
					</div>
				</div>
			</div>

			<div class="chargerecord-items-wrapper" v-if="selectIdx==1">
				<div class="chargerecord-item" v-for="recharge in rechargelist">
					<div class="chargerecord-item-timeline">
						<span class="line"></span>
						<span class="dot"></span>
					</div>
					<div class="chargerecord-item-time">
						<p>充值时间: {{recharge.createtime}}</p>
					</div>
					<div class="chargerecord-item-money">
						<p>+￥{{recharge.changebalance/100}}元</p>
					</div>
				</div>
			</div>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
import Utils from '../../../common/utils.js'
import Config from '../../../common/config.js'
import toastDialog from '../../../components/dialog/toastDialog.vue'

export default { 
	data: function(){
		return {
	  		selectIdx:0,
	  		rechargelist:[],
	  		consumelist:[],
	  		toastdialogtitle: '', 
			toastdialogcontent: ''
		}
	},
	components:{
		toastDialog
	},
	ready:function(){
		var self = this;
		$.ajax({
			beforeSend: function () {
			    $('.weui_loading_toast').css('display', 'block');
			},
			complete: function () {
			    $('.weui_loading_toast').css('display', 'none');
			},
			type: 'post',
			url: Config.getApiURL()+"/user/expe/rechargelist",
        	success: function(result) {
        		if (result.status == 0) {
        			self.rechargelist = result.data;
            	}else{
            		self.toastdialogtitle = "失败";
		            self.toastdialogcontent = result.tip;
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
				        $('#dialog2').off('click').hide();
				    });
            	}
            }
        })

        $.ajax({
        	beforeSend: function () {
			    $('.weui_loading_toast').css('display', 'block');
			},
			complete: function () {
			    $('.weui_loading_toast').css('display', 'none');
			},
        	type: 'post',
        	url: Config.getApiURL()+'/user/resentcall/getResentcalllist', 
        	success: function(result) {
	        	if (result.status == 0) {
	        		self.consumelist = result.data;
	        	} else {
	        		self.toastdialogtitle = "失败";
		            self.toastdialogcontent = result.tip;
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
				        $('#dialog2').off('click').hide();
				    });
	        	}
	        }
        });

		$(".costrecord-menu a").click(function() {
			var idx = $(this).index();
			var marginleft=parseFloat(49.8*parseInt(idx));
			$(".costrecord-menu-bottom").animate({"marginLeft":marginleft+"%"},300);
			return false;
		});
	},
	methods: {
		setIdx: function(idx) {
			this.selectIdx = idx;
		}
	}	
}
	
</script>
<style>
.chargerecord-item-timeline{
	width:20px;
	float:left;
	height:50px;
}
.chargerecord-item:first-child .line{
	margin-top:25px;
	height:25px;
}
.chargerecord-item:last-child .line{
	height:25px;
}
.line{
	content:"";
	height:50px;
	width:2px;
	background-color: #528ce0;
	z-index:0;
	opacity: 0.5;
	position:absolute;
	left:12.49px;
}
.dot{
	position:absolute;
	z-index:1;
	left:9px;
	margin-top:20.5px;
	width:5px;
	height:5px;
	border:2px solid #528ce0;
	background-color:white;
	color:white;
	border-radius:40px;
	float:left;
}
.chargerecord-item-money{
	float:right;
	margin-right:20px;
	color:#4CAF50;
}
.chargerecord-item-time{
	float:left;
	margin-left:20px;
	color:#727272;
}
.chargerecord-item {
	height:50px;
	line-height:50px;
	width:100%;
	background-color:white;
}
.chargerecord-item:first-child{
	margin-top:1px;
}

.costrecord-item-cost{
	float:right;
	text-align:right;
	margin-top:10px;
	margin-right:10px;
}
p.costrecord-item-cost{
	color:#FF5252;
	line-height:30px;
}
.costrecord-item-record{
	margin-top:10px;
	margin-left:10px;
	color:#727272;
	float:left;
	min-width:30%;
	line-height:30px;
}
h3.costrecord-item-record{
	line-height:30px;
	font-weight:normal;
}
p.costrecord-item-record{
	line-height:30px;
}
.costrecord-item-icon{
	float:left;
}

.costrecord-item {
	margin-top:1px;
	height:80px;
	width:100%;
	background-color:white;
	line-height:80px;
	/*box-shadow: 1px 1px 3px #222222;	*/
}
.costrecord-item img{
	margin-left:10px;
	vertical-align: middle;
	text-align:center;
}
.costrecord a{
	color:white;
}
.costrecord a:hover{
	color:#E2E2E2;
}
.costrecord-menu {
	width:100%;
	background-color:white;
}
.costrecord-menu p{
	width:100%;
	height:50px;
}
.costrecord-menu a{
	width:49.8%;
	height:100%;
	color:gray;
	display:inline-block;
	text-align:center;
	line-height:50px;
	float:left;
	color:#777;
}
.costrecord-menu a + a{
	border-left:1px solid #E9E9E9;
}
a.costrecord-menu-selected {
	color:#528ce0;
}
.costrecord-menu a:hover,.costrecord-menu a:active{
	color:#528ce0;	
}

.costrecord-menu-bottom{
	width:49.8%;
	height:3px;
	background-color:#528ce0;
}
.costrecord .title small {
	font-size:60%;
	right:0;
	position:absolute;
	margin-right:10px;
}
@media screen and (max-width: 330px) {
	.chargerecord-item,.costrecord-item{
		 font-size: 0.6em;
	}
	.costrecord-item-icon img {
		width:20px;
		height:20px;
	}
	.choosearea-area p {
		font-size:0.8em;
		text-align:center;
	}
}

@media screen and (min-width: 330px) and (max-width: 390px) {
	.chargerecord-item,.costrecord-item{
		font-size:0.7em;
	}
	.costrecord-item-icon img {
		width:20px;
		height:20px;
	}
}

@media screen and (min-width: 390px) and (max-width: 480px) {
	.chargerecord-item,.costrecord-item {
		font-size:0.8em;
	}
	.costrecord-item-icon img{
		width:27px;
		height:27px;
	}
}
</style>
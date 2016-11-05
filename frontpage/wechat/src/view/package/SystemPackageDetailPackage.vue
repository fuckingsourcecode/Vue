<template>
	<div class="custompackage">
	    <div class="custompackage-show">
	    	<img width="100%" src="/static/images/temp/card-buy.png">
	    </div>
	    <div class="custompackage-info">
	    	<div class="custompackage-info-left">
	    		{{packageinfo.name}}<br/>
	    		<p>单价<span>{{unitprice/100}}</span>/天</p>
	    	</div>
	    	<div class="custompackage-info-right">
	    		￥<span>{{totalprice/100}}</span>
	    	</div>
	    </div>
	    <div class="custompackage-container" 
			style="position: relative;margin-top:185px;height:60px;background-color:white;padding-left: 7%;">
	        <div class="custompackage-wrapper clearfix">
	        	<div class="decrease" @click="decrease">
	        		<img src="/static/images/icon/decrease.svg" alt="减一天">
	        	</div>
	        	<div>
	        		<input type="number" v-model="day" />
	        	</div>
	        	<div class="increase" @click="increase">
	        		<img src="/static/images/icon/increase.svg" alt="加一天">
	        	</div>
	        </div>
	    </div>
	    <div class="custompackage-detail">
	    	<div class="custompackage-detail-title">使用说明</div>
	    	<p>
	    		{{packageinfo.description}}
	    	</p>
	    </div>
	    <div class="custompackage-bottom-btn-area">
	    	立即购买
	    </div>
	    <toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
import Utils from '../../common/utils.js'
import Config from '../../common/config.js'
import toastDialog from '../../components/dialog/toastDialog.vue'
export default{
	data: function () {
		return {
			unitprice: 15,
			totalprice: 15,
			day: 1,
			packageinfo:{},
			toastdialogtitle: '', 
			toastdialogcontent: ''
		}
	},
	components: {
		toastDialog
	},
	computed: {
		totalprice: function () {
			return this.unitprice*this.day;
		}
	},
	methods: {
		decrease: function (event) {
			if (this.day>1) {
				this.day--;
				this.totalprice = this.unitprice*this.day;
			}
		},
		increase: function (event) {
			this.day++;
			this.totalprice = this.unitprice*this.day;
		}
	}, 
	ready:function(){
		var self = this;
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: Config.getApiURL()+"/sys/package/info",
            data: "{'id':"+self.$route.params.packageid+"}",
            success: function (data) {
                if (data.status == 0) {
            		self.packageinfo = data.data;
            		self.unitprice = self.totalprice = self.packageinfo.price;
                }else{
                	self.toastdialogtitle = "反馈提示";
					self.toastdialogcontent = data.tip;
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
						$('#dialog2').off('click').hide();
					});
                }
            },
            error: function (err) {
                self.toastdialogtitle = "反馈提示";
				self.toastdialogcontent = "网络错误";
				$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
					$('#dialog2').off('click').hide();
				});
            }
        });
        $("input").blur();

		$('.decrease').on('touchstart', function () {
			$('.decrease img').css('transform', 'scale(0.9)')
		});
		$('.decrease').on('touchend', function () {
			$('.decrease img').css('transform', 'scale(1)')
		});
		$('.increase').on('touchstart', function () {
			$('.increase img').css('transform', 'scale(0.9)')
		});
		$('.increase').on('touchend', function () {
			$('.increase img').css('transform', 'scale(1)')
		});
	}
}
</script>
<style type="text/css">
	.custompackage-show{
		position: absolute;
		left: 0;
		right: 0;
	}
	.custompackage-info{
		position: relative;
		top: 180px;
		height: 60px;
		background-color: white;
		font-size: 14px;
		line-height: 30px;
	}
	.custompackage-info-left{
		float: left;
		margin-left: 5px;
		font-weight: bold;
	}
	.custompackage-info-left p{
		font-size: 12px;
		background-color: red;
		color: white;
		border-radius: 3px;
		display: block;
		padding-left: 5px;
		padding-right: 5px;
		text-align: center;
		height: 16px;
		line-height: 16px;
		margin-top: 5px;
		float: left;
		margin-right: 5px;
	}
	.custompackage-info-right{
		float: right;
		font-size: 19px;
		margin-right: 5px;
		line-height: 60px;
		font-weight: bold;
		color: red;
	}
	.custompackage-info-right span{
		font-size: 28px;
		margin-left: 5px;
	}
	.custompackage-detail{
		margin-top: 5px;
		background-color: white;
		width: 100%;
		height: 300px;
	}
	.custompackage-detail-title{
		color: #0066aa;
		font-weight: bold;
		letter-spacing: 2px;
		font-size: 13px;
		padding-left: 5px;
		height: 25px;
		line-height: 25px;
	}
	.custompackage-detail p{
		margin-left: 5px;
		margin-right: 5px;
		font-size: 15px;
		color: #888888;
		font-weight: bold;
	}

	.custompackage-bottom-btn-area{
		position: fixed;
		bottom: 0;
		height: 40px;
		background-color: red;
		width: 100%;
		left: 0;
		border-top: solid 1px #888888;
		line-height: 40px;
		text-align: center;
		letter-spacing: 1px;
		color: white;
		font-weight: bold;
	}
	.custompackage-wrapper div:nth-child(1), .custompackage-wrapper div:nth-child(3) {
		float: left;
		width: 20%;
	}
	.custompackage-wrapper div:nth-child(2) {
		float: left;
		width: 50%;
		padding:  0 5px;
	}
	.custompackage-wrapper div:nth-child(1), .custompackage-wrapper div:nth-child(3) {
		text-align: center;
	}
	.custompackage-wrapper div input {
		height: 30px;
		width: 100%;
		text-align: center;
	}
	.custompackage-wrapper div img {
		height: 30px;
		width: 30px;
	}
	.custompackage-wrapper {
		padding-top: 15px;
	}
</style>
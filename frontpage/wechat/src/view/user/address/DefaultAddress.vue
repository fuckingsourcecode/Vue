<template>
	<div class="defaultaddress">
		<title title="收货地址" showbtn="true"></title>
		<div class="wrapper">
			<div id="piece2" v-if="addresses.length <=0" style="text-align:center;background:#fff;">
				<img src="/static/images/icon/address.png" alt="" style="margin-top:45%;width:25%;">
				<p style="color:#7b7877;line-height:50px;font-weight:bold;margin-bottom:10%;">亲你还没有收货地址哦！</p>
				<a v-link="{name:'addaddress'}" class="defaultaddress-add-info">去添加</a>			
			</div>
			<label for="defaultaddress-radio-{{$index}}" class="defaultaddress-item" v-for="address in addresses">
				<div class="defaultaddress-radioContent">
					<input type="radio" class="defaultaddress-item-input" id="defaultaddress-radio-{{$index}}" name="defaultRadio" value="{{address.id}}">
					<label for="defaultaddress-radio-{{$index}}"></label>
				</div>
				<div class="defaultaddress-item-content">
					<div class="defaultaddress-item-tip">
						<div class="defaultaddress-item-name">收货人：{{address.name}}</div>
						<div class="defaultaddress-item-tel">{{address.callnumber}}</div>
					</div>
					<div class="defaultaddress-item-detail">收货地址：
						{{address.province}}
						{{address.city}}
						{{address.district}}
						{{address.detailedaddress}}
					</div>
				</div>
			</label>
			<div v-if="addresses.length > 0" class="defaultaddress-new-block">
				<div  class="defaultaddress-new" @click="sendMessage">
					确定
				</div>
			</div>
			<div class="defaultaddress-new-block" style="margin-top: 0px;">
				<div  class="defaultaddress-new" v-link="{name: 'addaddress'}">
					添加
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
export default{
	data:function(){
		return {
			addresses:[],
			text: '',
			toastdialogtitle: '', 
			toastdialogcontent: ''
		}
	},
	components: {
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
		  	url: Config.getApiURL()+"/user/address/list",
		  	type: 'POST',
		  	dataType: 'json',
		  	data: {},
		  	success: function(result) {
		    	if (result.status == 0) {
        			self.addresses = result.data;
        			console.log(result);
        			//判断上一级页面是确认订单还是收获地址
        			if(sessionStorage.getItem("goal") == "orderconfirm") {
	            	//确认订单title的属性设置
	            		$('.component-title-link p').text("我的订单");
	            	} else {
	           	 		$('.component-title-link p').text("收货地址");
	            	}
            	}else{
            		self.toastdialogtitle = "反馈提示";
					self.toastdialogcontent = result.tip;
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
						$('#dialog2').off('click').hide();
					});
            	}
		  	}
		});
        $('.component-title-back').click(function () {
        	if(sessionStorage.getItem("goal") == "orderconfirm")
				self.$router.go({path: '/orderconfirm'})
			else 
				self.$router.go({path: '/useraddress'})
		})
		$('.component-title-link').click(function () {
        	if(sessionStorage.getItem("goal") == "orderconfirm")
				self.$router.go({path: '/orderconfirm'})
			else 
				self.$router.go({path: '/useraddress'})
		})
	},
	methods:{
		sendMessage:function(){
            var value = $('input[name="defaultRadio"]:checked').val();
            console.log(value); 
            var self = this;
            // this.$router.go({name: 'useraddress',params:{id: value}})
            $.ajax({
            	beforeSend: function () {
				    $('.weui_loading_toast').css('display', 'block');
				},
				complete: function () {
				    $('.weui_loading_toast').css('display', 'none');
				},
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: Config.getApiURL()+"/user/address/setdefault",
                data: JSON.stringify({
                	"id":value
                }),
                success: function (data) {
                    if (data.status == 0) {
                    	// if (document.referrer.indexOf('/orderconfirm')> -1) {
                    	// 	location.href = document.referrer;
                    	// } else {
                    	// 	self.$router.go('/useraddress');
                    	// }
	            		if(sessionStorage.getItem("goal") == "orderconfirm") {
	            			sessionStorage.setItem("addressid", value);
	            			self.$router.go('/orderconfirm');
	            		} else {
	            			self.$router.go('/useraddress');
	            		}
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
		}
	}
}
</script>
<style type="text/css">

	.defaultaddress {
		background-color:#FFF;	
	}
	.defaultaddress-item:first-child {
		border-top:10px solid #eee;
	}
	.defaultaddress-item{
		width: 100%;
		background-color: white;
		height: auto;
		display: block;
        border-bottom: 1px solid #eeeeee;
	}
/*	.defaultaddress-item-input {
		display: inline-block;
		position: relative;
		bottom: 10px;
		margin-left: 10px;
	}*/
	.defaultaddress-item-content {
		max-width: 88%;
		display: inline-block;
		padding-top:10px;
		padding-bottom:10px;
	}
	.defaultaddress-item-default{
		font-size: 12px;
		color: #ff3333;
		font-weight: bold;
		margin-left: 5px;
		height: 20px;
		padding-top: 5px;
		line-height: 20px;
	}
	.defaultaddress-item-normal{
		font-size: 12px;
		color: #888888;
		font-weight: bold;
		margin-left: 5px;
		height: 20px;
		padding-top: 5px;
		line-height: 20px;
	}
	.defaultaddress-item-tip{
		height: 20px;
		padding-top: 5px;
		line-height: 20px;
		color: #343434;
	}
	.defaultaddress-item-name{
		float: left;
		font-size: 14px;
		margin-left: 5px;
	}
	.defaultaddress-item-tel{
		float: left;
		margin-left: 15px;
		font-size: 14px;
	}
	.defaultaddress-item-edit{
		float: right;
		font-size: 14px;
		color: #0066aa;
		font-weight: bold;
		margin-right: 5px;
	}
	.defaultaddress-item-detail{
		font-size: 13px;
		margin-left: 5px;
		margin-right: 5px;
		margin-top: 3px;
		line-height: 20px;
		color: #727272;
	}
	.defaultaddress-item-btn-area{
		height: 30px;
		line-height: 30px;
		text-align: right;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.defaultaddress-item-btn-area span {
		float: left;
		color: #7c7c7c;
		font-size: 12px;
		margin-left: 5px;
	}
	.defaultaddress-item-btn-area a{
		font-size: 14px;
		color: #7c7c7c;
		margin-right: 5px;
		margin-left: 5px;
		border:1px solid #616161;
		border-radius: 5px;
		display: inline-block;
		width: 60px;
		height: 25px;
		line-height: 25px;
		text-align: center;
	}
	.defaultaddress-add-info{
		color: #1fd291;
		border:1px solid #1fd291;
		border-radius: 5px;
		padding: 12px 50px;
	}
	.defaultaddress-new-block {
		margin-top: 20%;
		margin-bottom: 5%;
		width:100%;
		height:30px;
	}
	.defaultaddress-new {
		background-color:#21d190;
		color:white;
		font-size:16px;
		text-align:center;
		border-radius:5px;
		width:80%;
		height:30px;
		line-height:30px;
		margin:0 auto;	
	}
    .defaultaddress input[type=radio] {
    	visibility: hidden;
    }
    .defaultaddress-radioContent{
    	width: 20px;
		height: 20px;
		background: #fff;
        display: inline-block;
        float: left;
        margin-left: 10px;
        margin-top: 15px;
		border-radius: 100%;
		position: relative;
    }
    .defaultaddress-radioContent label{
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
		/*top: 0px;*/
		left: 0px;
		z-index: 1;
		background: url('/static/images/icon/select.png');
		background-size: 100%;
/*		-webkit-box-shadow:inset 0px 1px 1px rgba(0,0,0,0.5);
		-moz-box-shadow:inset 0px 1px 1px rgba(0,0,0,0.5);
		box-shadow:inset 0px 1px 1px rgba(0,0,0,0.5);*/
    }
    .defaultaddress-radioContent input[type=radio]:checked + label {
		background: url('/static/images/icon/selected.png');
		background-size: 100%;
	}
</style>
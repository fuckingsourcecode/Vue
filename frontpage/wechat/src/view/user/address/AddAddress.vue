<template>
	<div class="addadress">
		<title title="新增地址" showbtn="false"></title>
		<div class="wrapper">
			<!-- 收件人 -->
			<div class="addaddress-input">
				<p class="address-tip">收件人</p>
				<input  type="text"  placeholder=" 收件人" v-model="name"/>
			</div>
			<hr/>
			<span v-show="perbool" style="color:red;margin-top:5px;margin-bottom:5px;font-size:12px;">请填写收件人</span>

			<!-- 电话 -->
			<div class="addaddress-input">
				<p class="address-tip">电&nbsp;话</p>
				<input type="tel"  placeholder=" 联系方式" v-model="callnumber"/>
			</div>
			<hr/>
			<span v-show="telbool" style="color:red;margin-top:5px;margin-bottom:5px;font-size:12px;">电话号码有误</span>

			<!-- 收货地址 -->
			<div class="addaddress-input" @click="show=true">
				<p class="address-tip">收货地址</p>
				<input type="text" class="addaddress-area" readonly="readonly" v-model="result.province.name + result.city.name + result.area.name">
				<div class="addaddress-area-group" style="display:none">
					<input type="text"  placeholder=" 省" v-model="result.province.name"/>
					<input type="text"  placeholder=" 市" v-model="result.city.name"/>
					<input type="text"  placeholder=" 区" v-model="result.area.name"/>
				</div>
				<img src="/static/images/icon/more-2.png" alt="获取地址" class="address-more">
			</div>
			<hr/>
			<span v-show="probool" style="color:red;margin-top:5px;margin-bottom:5px;font-size:12px;">请填写省</span>
			<span v-show="citybool" style="color:red;margin-top:5px;margin-bottom:5px;font-size:12px;">请填写市</span>
			<span v-show="areabool" style="color:red;margin-top:5px;margin-bottom:5px;font-size:12px;">请填写区</span>

			<!-- 详细地址 -->
			<div class="addaddress-input">
				<p class="address-tip">详细地址</p>
				<input type="text" placeholder=" 详细地址" v-model="detaileaddress" />
			</div>
			<hr/>
			<span v-show="districtbool" style="color:red;margin-top:5px;margin-bottom:5px;font-size:12px;">请填写详细地址</span>

			<!-- 邮编 -->
			<div class="addaddress-input">
				<p class="address-tip">邮&nbsp;编</p>
				<input type="text" placeholder=" 邮政编号（可选）" v-model="postalcode"/>
			</div>
			<hr/>
			<span v-show="postalbool" style="color:red;margin-top:5px;margin-bottom:5px;font-size:12px;">您已填写邮编，请输入正确的有编号</span>

			<!-- 操作事件 -->
			<a class="addadress-btn" @click="submit()">保存</a>
			<vue-area :show.sync="show" :result.sync="result"></vue-area>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
import Utils from '../../../common/utils.js'
import Config from '../../../common/config.js'
import VueArea from '../../../common/vue-area.js'
import toastDialog from '../../../components/dialog/toastDialog.vue'
export default{
	data:function(){
		return {
			name:'',
			callnumber:'',
			province:'',
			city:'',
			district:'',
			detaileaddress:'',
			postalcode:'',
			perbool: false,
			telbool: false,
			probool: false,
			citybool: false,
			areabool: false,
			districtbool: false,
			show:false,
			postalbool: false,
			result: {
				province:{
					name: ''
				},
				city: {
					name: ''
				},
				area: {
					name:''
				}
			},
			toastdialogtitle: '', 
			toastdialogcontent: ''
		}
	},
	components:{
		vueArea: VueArea,
		toastDialog
	},
	ready: function () {
		//判断上一级页面是确认订单还是收获地址
		var self = this;
		if(sessionStorage.getItem("goal") == "orderconfirm") {
			//确认订单title的属性设置
	        $('.component-title-link p').text("我的订单");
	    }else {
	        $('.component-title-link p').text("收货地址");
	    }
	    $('.component-title-back').click(function () {
        	if(sessionStorage.getItem("goal") == "orderconfirm")
				self.$router.go({path: '/orderconfirm'});
			else 
				self.$router.go({path: '/useraddress'});
		});
		$('.component-title-link').click(function () {
        	if(sessionStorage.getItem("goal") == "orderconfirm")
				self.$router.go({path: '/orderconfirm'});
			else 
				self.$router.go({path: '/useraddress'});
		});
	},
	methods:{
		submit:function(){	
			var self = this;
 			var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
 			if (this.name.length > 0) {
				this.perbool = false;
			} else {
				this.perbool = true;
			    return false;
			};
			if (reg.test(this.callnumber)) {
				this.telbool = false;
			} else {
				this.telbool = true;
			    return false;
			};
			if (this.result.province.name.length > 0) {
				this.probool = false;
			} else {
				this.probool = true;
			    return false;
			};
			if (this.result.city.name.length > 0) {
				this.citybool = false;
			} else {
				this.citybool = true;
			    return false;
			};
			if (this.result.area.name.length > 0) {
				this.areabool = false;
			} else {
				this.areabool = true;
			    return false;
			};
			if (this.detaileaddress.length > 0) {
				this.districtbool = false;
			} else {
				this.districtbool = true;
			    return false;
			};
			if(this.postalcode.length > 0) {
				var re= /^[1-9][0-9]{5}$/
				if (re.test(this.postalcode)) {
					this.postalbool = false;
				} else {
					this.postalbool = true;
					return false;
				}
			}
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
                url: Config.getApiURL()+"/user/address/add",
                data: JSON.stringify({
                	"receiver":self.name,
					"phone":self.callnumber,
					"province":self.result.province.name,
					"city":self.result.city.name,
					"district":self.result.area.name,
					"addressDetail":self.detaileaddress,
					"zipCode":self.postalcode,
                }),  
                success: function (data) {
                    if (data.status == 0) {
                    	console.log(data);
	            		if(sessionStorage.getItem("goal") == "orderconfirm") {
	            			sessionStorage.setItem("addressid", data.data.addressId);
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
	.addadress {
		background-color: #fff;
	}
	.addaddress-input{
		width: 98%;
		margin:0px 5px;
		height: 45px;
		border:none;
		margin-top: 0;
	}
	.addaddress-input input{
		width: 67%;
		height: 45px;
		border: none;
		font-size: 14px;
		font-weight: normal;
		outline: medium;
	}
	.addadress-btn{
		display: block;
		margin:50px auto;
		width: 95%;
		height: 45px;
		line-height: 45px;
		text-align: center;
		background-color: #1fd290;
		color: white;
		border-radius: 5px;
		letter-spacing: 5px;
	}
	.ProvCityHeaderCancle, .ProvCityHeaderConfirm {
		color:  black!important;
	}
	.address-more {
		height: 15px;
		vertical-align: text-bottom;
	}
	.addaddress-area {
		width: 67%;
		overflow: hidden;
   		text-overflow: ellipsis;
   		border: none;
	}
</style>
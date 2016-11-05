<template>
	<div class="addadress">
		<title title="编辑地址" showbtn="true"></title>
		<div class="editaddress-wrapper">
		<div>
			<p class="address-tip">收件人</p>
			<input class="editaddress-input" type="text" name="username" 
				placeholder=" 收件人" v-model="name"/>
			<span v-show="perbool" style="color:red">请填写收件人</span>
		</div>
		<hr>
		<div>
			<p class="address-tip">电&nbsp;话</p>
			<input class="editaddress-input" type="tel" name="username" 
				placeholder=" 联系方式" v-model="callnumber" />
			<span v-show="telbool" style="color:red">电话号码有误</span>
		</div>
		<hr>
		<div @click="show=true">
			<p class="address-tip">收货地址</p>
			<input type="text" class="addaddress-area" readonly="readonly" v-model="result.province.name + result.city.name + result.area.name">
			<div class="address-area-group" style="display:none">
				<input class="editaddress-area" type="text" v-model="result.province.name" />
				<input class="editaddress-area" type="text" v-model="result.city.name"/>	
				<input class="editaddress-area" type="text" v-model="result.area.name" />
			</div>
			<img src="/static/images/icon/more-2.png" alt="获取地址" class="address-more">
			<span v-show="probool" style="color:red">请填写省</span>
			<span v-show="citybool" style="color:red">请填写市</span>
			<span v-show="areabool" style="color:red">请填写区</span>
		</div>
		<hr>
		<div>
			<p class="address-tip">详细地址</p>
			<input class="editaddress-input" type="text" name="username" 
				placeholder=" 详细地址" v-model="detailedaddress" />
			<span v-show="districtbool" style="color:red">请填写详细地址</span>
		</div>
		<hr>
		<div>
			<p class="address-tip">邮&nbsp;编</p>
			<input class="editaddress-input" type="text" name="username" 
				placeholder=" 邮政编号（可选）" v-model="postalcode"/>
			<span v-show="postalbool" style="color:red">您已填写邮编，请输入正确的有编号</span>
		</div>
		<hr>
			<a class="addadress-btn" @click="submit()">修改</a>
			<vue-area :show.sync="show" :result.sync="result"></vue-area>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
import Utils from '../../../common/utils.js'
import Config from '../../../common/config.js'
import VueArea from '../../../common/vue-area.js'
export default{
	data:function(){
		return {
			perbool: false,
			telbool: false,
			probool: false,
			citybool: false,
			areabool: false,
			show:false,
			postalbool: false,
			name:'',
			callnumber:'',
			province:'',
			city:'',
			district:'',
			detailedaddress:'',
			postalcode:'',
			id: '',
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
		vueArea: VueArea
	},
	created:function(){
		var self = this;
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
            url: Config.getApiURL()+"/user/address/info",
            data: JSON.stringify({
            	"id":self.$route.params.id
            }),
            success: function (data) {
                if (data.status == 0) {
                	console.log(data);
            		self.name = data.data.receiver;
            		self.callnumber = data.data.phone;
            		self.result.province.name = data.data.province;
            		self.result.city.name = data.data.city;
            		self.result.area.name = data.data.district;
            		self.detailedaddress = data.data.addressDetail;
            		self.postalcode = data.data.zipcode;
            		self.id = data.data.id;
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
	},
	methods:{
		submit:function(){
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
			if (this.detailedaddress.length > 0) {
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
			var self = this;
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
                url: Config.getApiURL()+"/user/address/edit",
                data: JSON.stringify({
                	"id": self.id,
                	"name":self.name,
					"callnumber":self.callnumber,
					"province":self.result.province.name,
					"city":self.result.city.name,
					"district":self.result.area.name,
					"detailedaddress":self.detailedaddress,
					"postalcode":self.postalcode,
                }),
                success: function (data) {
                    if (data.status == 0) {
	            		self.$router.go('/useraddress');
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
	.editaddress-wrapper>div {
		margin-left: 3%;
	}
	.editaddress-input{
		width: 67%;
		margin-right: 5px;
		height: 35px;
		font-size: 15px;
		border: none;
		margin-top: 5px;
	}
	.addadress-btn{
		display: block;
		margin-top: 10px;
		width: 100%;
		height: 45px;
		line-height: 45px;
		text-align: center;
		background-color: #33cc99;
		color: white;
		border-radius: 5px;
		letter-spacing: 5px;
	}
	.editaddress-area {
		width: 28%;
		border: none;
		height: 35px;
	    font-size: 15px;
	    margin-top: 5px;
	    overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
	}
	.address-tip {
		display: inline-block;
    	width: 24%;
	}
</style>
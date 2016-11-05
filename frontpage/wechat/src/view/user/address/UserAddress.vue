<template>
	<div class="useraddress">
		<title title="收货地址" showbtn="true" btnname="设置默认地址" btnlink="defaultaddress" backlink="usercenter"></title>
		<div class="wrapper">
			<div id="piece2" v-if="addresses.length <=0" style="text-align:center;background:#fff;">
				<img src="/static/images/icon/address.png" alt="" style="margin-top:45%;width:25%;">
				<p style="color:#7b7877;line-height:50px;font-weight:bold;margin-bottom:10%;">亲你还没有收货地址哦！</p>
				<a v-link="{name:'addaddress'}" class="useraddress-add-info">去添加</a>			
			</div>
			<div class="useraddress-item" v-for="address in addresses">
				<ul>
					<li class="useraddress-item-tip">
						<div class="useraddress-item-name">收货人：{{address.receiver}}</div>
						<div class="useraddress-item-tel">电话号码：{{address.phone}}</div>
						
					</li>
					<li class="useraddress-item-detail">收货地址：
						{{address.province}}
						{{address.city}}
						{{address.district}}
						{{address.addressDetail}}
					</li>
					
					<li class="useraddress-item-btn-area">
					<span v-show="address.isDefault" style="float:left;font-size:12px;color:#23c083;margin-left:15px;">默认地址</span>
						<a @click="edit(address.id)">修改</a>
						<a @click="del(address.id)">删除</a>
					
					</li>
				</ul>
			</div>
			<div v-if="addresses.length > 0" class="useraddress-new-block">
				<div  class="useraddress-new" v-link="{name: 'addaddress'}">
					新增收货地址
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
			type: 'post',
			url:Config.getApiURL()+"/user/address/list",
        	success:function(result){
	        	if (result.status == 0) {
	        		self.addresses = result.data;
	            }else{
	            	self.toastdialogtitle = "反馈提示";
					self.toastdialogcontent = result.tip;
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
						$('#dialog2').off('click').hide();
					});
	            }
	        }
	    });	
	},
	methods:{
		setdefault:function(id){
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
                url: Config.getApiURL()+"/user/address/setdefault",
                data: JSON.stringify({
                	"id":id
                }),
                success: function (data) {
                    if (data.status == 0) {
	            		location.reload();
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
		del:function(id){
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
                url: Config.getApiURL()+"/user/address/del",
                data: JSON.stringify({
                	"id":id
                }),
                success: function (data) {
                    if (data.status == 0) {
	            		location.reload();
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
		edit:function(id){
			this.$router.go({name:'editaddress',params:{"id":id}});
		},
		show:function(index){
			$("#show-"+index).toggle();
		},
		finished:function(){
			var self = this;
			console.log(document.referrer);
			if (document.referrer.indexOf('http://www.itourbag.com/#!/orderconfirm')> -1) {
				// self.$router.go('/orderconfirm');
			} else {
				// self.$router.go('/usercenter');
			}
		}
	}
}
</script>
<style type="text/css">

	.useraddress {
		background-color:#FFF;	
	}
	.useraddress-item:first-child {
		border-top:10px solid #eee;
	}
	.useraddress-item+.useraddress-item{
		width: 100%;
		background-color: white;
		height: auto;
        border-top: 10px solid #eeeeee;
	}
	.useraddress-item-default{
		font-size: 12px;
		color: #ff3333;
		font-weight: bold;
		margin-left: 5px;
		height: 20px;
		padding-top: 5px;
		line-height: 20px;
	}
	.useraddress-item-normal{
		font-size: 12px;
		color: #888888;
		font-weight: bold;
		margin-left: 5px;
		height: 20px;
		padding-top: 5px;
		line-height: 20px;
	}
	.useraddress-item-tip{
		height: 30px;
		line-height:30px;
		padding-top: 10px;
		line-height: 20px;
		color: #343434;
		padding-left:10px;
	}
	.useraddress-item-name{
		float: left;
		font-size: 14px;
		margin-left: 5px;
	}
	.useraddress-item-tel{
		float: left;
		margin-left: 15px;
		font-size: 14px;
	}
	.useraddress-item-edit{
		float: right;
		font-size: 14px;
		color: #0066aa;
		font-weight: bold;
		margin-right: 5px;
	}
	.useraddress-item-detail{
		font-size: 13px;
		padding-left:15px;
		padding-right:5px;
		margin-top: 3px;
		line-height: 20px;
		color: #727272;
		padding-bottom:10px;
		border-bottom:1px solid #eee;
	}
	.useraddress-item-btn-area{
		height: 30px;
		line-height: 30px;
		text-align: right;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.useraddress-item-btn-area span {
		float: left;
		color: #7c7c7c;
		font-size: 12px;
		margin-left: 5px;
	}
	.useraddress-item-btn-area a{
		font-size: 14px;
		color: #7c7c7c;
		/*margin-right: 5px;*/
		/*margin-left: 5px;*/
		/*color:white;*/
		/*background-color:#23c083;*/
		/*border:1px solid #616161;*/
		/*border-radius: 5px;*/
		display: inline-block;
		width: 60px;
		height: 25px;
		line-height: 25px;
		text-align: center;
	}
	.useraddress-add-info{
		color: #23c083;
		border:1px solid #1fd291;
		border-radius: 5px;
		padding: 12px 50px;
	}
	.useraddress-new-block {
		width:100%;
		height:30px;
		margin-top: 20%;
		margin-bottom: 10%;
	}
	.useraddress-new {
		background-color:#23c083;
		color:white;
		font-size:16px;
		text-align:center;
		border-radius:5px;
		width:80%;
		height:30px;
		line-height:30px;
		margin:0 auto;
		
	}
</style>
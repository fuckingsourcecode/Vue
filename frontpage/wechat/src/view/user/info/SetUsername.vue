<template>
	<div class="setusername" style="background:#fff;">
		<title title="修改昵称" backlink="usercenter" showbtn="false"></title>
		<!-- <div class="title">修改昵称
			<a class="left-btn" v-link="{name:'userinfo',params:{username:this.oldname}}">
				<img src="/static/images/icon/back.png">返回
			</a>
		</div> -->
		<div class="setusername-wrapper">
			<p class="setusername-tip">昵称</p><input class="setusername-input" type="text" name="username" 
				placeholder=" 请输入昵称" v-model="username"/>
			<a class="setusername-btn" @click="submit()">完成</a>
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
			username:'',
			oldname:'',
			toastdialogtitle: '', 
			toastdialogcontent: ''
		}
	},
	components: {
		toastDialog
	},
	ready:function(){
		var self = this;
		$.post(Config.getApiURL()+"/user/info",{},
        function(result){
        	if (result.status == 0) {
        		self.username = result.data.name;
        		self.oldname = result.data.name;
            }else{
            	self.toastdialogtitle = "反馈提示";
	            self.toastdialogcontent = result.tip;
				$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
			        $('#dialog2').off('click').hide();
			    });
            }
        })
	},
	methods:{
		submit:function(){
			var self = this;
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: Config.getApiURL()+"/user/resetname",
                data: "{'name':"+self.username+"}",
                success: function (data) {
                    if (data.status == 0) {
                    	self.oldname = self.username;
	            		self.$router.go('/usercenter');
	                }else{
	                	alert(data.tip);
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
	.setusername-wrapper {
		width: 100%;
		text-align: center;
	}
	.setusername-input{
		width: 70%;
		border: none;
		margin-right: 5px;
		height: 35px;
		font-size: 18px;
		font-weight: normal;
		background-color: transparent;
		outline: medium;
		border-bottom: solid 1px rgba(0,0,0,0.3);
	}
	.setusername-tip {
	    display: inline-block;
	    font-size: 18px;
	    margin-right: 1rem;
    	height: 35px;
	}
	.setusername-btn{
		display: block;
		width: 80%;
		height: 40px;
		margin: 15px auto;
		line-height: 40px;
		text-align: center;
		background-color: #33cc99;
		color: white;
		border-radius: 5px;
		letter-spacing: 5px;
	}
</style>
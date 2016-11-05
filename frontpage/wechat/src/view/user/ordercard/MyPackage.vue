<template>
	<div class="mypackage">
		<title title="我的套餐" backlink="usercenter" showbtn="true"></title>
		<div class="wrapper mypackage-wrapper">
			<div class="mypackage-choose-block">
			　<div class="mypackage-choose-item" @click="contentshow(0);">
				<p>有效套餐</p>
				<span class="mypackage-choose-bottom" v-if="selectIdx==0"></span>
			  </div>
			  <div class="mypackage-choose-item" @click="contentshow(1);" >
				<p>无效套餐</p>
				<span class="mypackage-choose-bottom" v-if="selectIdx==1"></span>
			  </div>
			
			</div>

			<div class="seperator"></div>
				<div class="mypackage-content">
					<div class="mypackage-content-notactive"  v-if="selectIdx==0" >
						<div class="packagedetail-state" style="text-align:center;" v-if="valid_packages.length<=0">
					    	<img src="/static/images/recharge/state.png" style="width:35%;margin-top:33%;">
					    	<p style="color:#c3c3c3;margin-top:5px;">您还没有套餐</p>
					    </div>
					    <div v-link="{name:'mypackagedetail',params:{item:item.id}}" v-for="item in valid_packages" track-by="$index">
							<div class="mypackage-item">
								<img class="mypackage-item-img" v-bind:src="item.imageSrc" alt="">

								<div class="mypackage-item-detail">
									<p class="mypackage-item-name" v-text="item.name+'*' + item.count"></p>
									<p class="mypackage-item-desc" v-text="item.description"></p>
									<div class="mypackage-item-netflow-voicetime">
										<p>流量:
										<span v-if="item.netFlow!='-1'">{{item.netFlow}}MB</span>
										<span v-if="item.netFlow=='-1'">不限</span>
										</p>
										<p>通话:
										<span v-if="item.voiceTime!='-1'">{{item.voiceTime}}分钟</span>
										<span v-if="item.voiceTime=='-1'">不限</span>
										</p>
									</div>
								</div>
								<img class="mypackage-item-more" src="/static/images/icon/chevron-right.png">
									
							</div>					
						</div>
					</div>
					
					<div class="mypackage-content-orderover"v-if="selectIdx==1">
						<div class="packagedetail-state" style="text-align:center;" v-if="invalid_packages.length<=0">
					    	<img src="/static/images/recharge/state.png" style="width:35%;margin-top:33%;">
					    	<p style="color:#c3c3c3;margin-top:5px;">您还没有使用结束的套餐</p>
					    </div>
					    <div v-link="{name:'mypackagedetail',params:{item:item.id}}" v-for="item in invalid_packages" track-by="$index">
							<div class="mypackage-item">	
								<img class="mypackage-item-img" v-bind:src="item.imageSrc" alt="">

								<div class="mypackage-item-detail">
									<p class="mypackage-item-name" v-text="item.name+'*' + item.count"></p>
									<p class="mypackage-item-desc" v-text="item.description"></p>
									<div class="mypackage-item-netflow-voicetime">
										<p>流量:
										<span v-if="item.netFlow!='-1'">{{item.netFlow}}MB</span>
										<span v-if="item.netFlow=='-1'">不限</span>
										</p>
										<p>通话:
										<span v-if="item.voiceTime!='-1'">{{item.voiceTime}}分钟</span>
										<span v-if="item.voiceTime=='-1'">不限</span>
										</p>
									</div>
								</div>
								<img class="mypackage-item-more" src="/static/images/icon/chevron-right.png">		
							</div>				
						</div>
					</div>
				</div>
			</section>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template> 
<script>
import Utils from '../../../common/utils.js'
import Config from '../../../common/config.js'
import toastDialog from '../../../components/dialog/toastDialog.vue'
export default {
	data: function () {
	   	return {
	   		valid_packages: [
	   				
	   		],
	   		invalid_packages: [
	   			
	   		],
	   		selectIdx: 0,
	   		toastdialogtitle: '', 
			toastdialogcontent: ''
	   	}
	},
	methods: {
		contentshow: function (idx) {
			this.selectIdx = idx;
		},
		detail: function(data) {

		}
	},
	components: {
		toastDialog
	},
	ready: function () {
		var self = this;
		$.ajax({
		  	url: Config.getApiURL()+'/userPackage/list',
		  	type: 'POST',
		  	dataType: 'json',
		  	data: {},
		  	beforeSend: function () {
        		$('.weui_loading_toast').css('display', 'block');
        	},
        	complete: function () {
        		$('.weui_loading_toast').css('display', 'none');
        	}, 
		  	success:function(data) {
		  		var pkgs = data.data;
		  		for(var idx in pkgs) {
		  			var pkg = pkgs[idx];
		  			pkg.imageSrc = Config.getMediaURL()+pkg.imageSrc;
		  			if(pkg.status=="0") {
		  				//未激活的套餐
		  				self.valid_packages.push(pkg);
		  			} else if(pkg.status=='1') {
		  				//已激活的套餐
		  				self.valid_packages.push(pkg);
		  			} else if(pkg.status=='2') {
		  				//使用中的套餐
		  				self.valid_packages.push(pkg);
		  			} else if(pkg.status=='3') {
		  				//已用完的套餐
		  				self.invalid_packages.push(pkg);
		  			}
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
		
		$('.mypackage-head-status').click(function() {
			var idx = $(this).index();
			var marginleft = parseFloat(25*parseInt(idx));
			$('.mypackage-head-bottom').animate({"marginLeft": marginleft+"%"}, 300)
		});
	}
}
</script>
<style>
/* .mypackage-wrapper {
	background-color: #fff!important;
} */
.mypackage {
	background-color:white;
}
.seperator {
	width:100%;
	height:10px;
	background-color:#eee;
}
.mypackage-head {
	width: 100%;
	background-color:white;
/*	border-bottom: 1px solid #aaaaaa;*/
}
.mypackage-head-bottom {
	width: 25%;
	height: 3px;
	background-color: #4ed7a0;
	clear: both;
}
.mypackage-head-status{
	width: 25%;
	display: inline-block;
	text-align: center;
	float: left;
	height: 100%;
	font-size: 16px;
	line-height: 35px;
	padding-top:5px;
	padding-bottom:5px;
}
.mypackage-item {
	padding:10px 0px;
	height:150px;
	width:100%;
	border-bottom:1px solid #ddd;
	vertical-align: middle;
}
.mypackage-item-img {
	width: 6.3rem;
	height: 6.3rem;
	float:left;
	border:1px solid none;
	border-radius:5px;
	margin-top: 25px;
	margin-left: 10px;
}
.mypackage-item-detail {
	float:left;
	width:59%;
	margin-top: 29px;
}
p.mypackage-item-name {
	text-align:center;
	font-size:16px;
	color:#23c083;
	height:20px;
	line-height:20px;

}
p.mypackage-item-desc {
	font-size:14px;
	color:#666;
	margin:10px;
	max-height:60px;
	min-height:40px;
	overflow:scroll;
}

.mypackage-item-detail span {
	color:#aaa;
}
.mypackage-item-netflow-voicetime p{
	float:left;
	width:47%;
	padding-left:3%;
	font-size:13px;
	color:#666;
}
.mypackage-item-netflow-voicetime span{
	color:#aaa;
}
.mypackage-item-more {
	width:8%;
	margin-left:-2%;
	margin-top:30px;
	float:right;
}
.mypackage-active{
	color:#23c083;
}
.mypackage-choose-block {
	background-color:#23c083;
	color:white;
	font-size:0.8rem;
	text-align:center;
	
	height:1.8rem;
	

}
.mypackage-choose-item {
	width:40%;
	height:30px;
	line-height:30px;
	float:left;
	text-align:center;
}
.mypackage-choose-item:first-child{
	margin-left:9.5%;
}
.mypackage-choose-bottom {
	width:4rem;
	height:0.2rem;
	background-color:white;
	position:relative;
	top:-0.2rem;
	display:block;
	text-align:center;
	margin:0 auto;
}

</style>
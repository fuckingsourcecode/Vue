<template>
	<div class="usercard" id="usercard-con" style="background-color:#fff;">
		<title title="卡包" btnname="绑卡" showbtn="true" backlink="usercenter"></title>
		<!-- 
		<a class="right-btn" @click="bindcard('MyDiv','fade')"
			v-if="cards.length <= 0">绑卡</a>
		<a class="right-btn" v-else v-link="{name:'unbunding'}">解绑</a> -->
	    <div style="text-align:center;background:#fff;" v-if="this.mycombo <=0 && this.cards.length<=0">
			<img src="/static/images/icon/state.png" alt="" style="margin-top:20%;width:66%;">
			<a v-link="{name:'cardpurchase'}" class="more-info">去逛逛</a>
			<a class="more-info" @click="check">扫一扫</a>
		</div>
		<div id="fade" class="UserCard-black_overlay" @click="closeDiv('MyDiv','fade')">
	    </div>
	    <div id="MyDiv" class="UserCard-white_content animated fadeInUp">
	        <div style="text-align:center;ursor: default;">
	            <span>		            
		            <img src="/static/images/recharge/help.png" alt="">
		            <p>绑卡操作</p>
		            <img src="/static/images/recharge/help.png" alt="">
	            </span>			           
	        </div> 
	        <div class="operation">           	
            	<div class="UserCard-line1" @click="check">
	            	<a>扫一扫</a>
            	</div>
            	<div class="UserCard-line2" v-link="{name:'iccidcode'}">
	            	<a>点击输入ICCID码</a>
            	</div>
            	<div class="UserCard-line3" @click="closeDiv('MyDiv','fade')">
            		<a  style="font-weight:bold;">取消</a>
            	</div>
            </div>
	    </div>
	    <div class="mycardbagwrapper" v-if="showCards">
			<article>
				<div class="mycardbag-group-title" v-if="this.mycombo.length >0 || this.cards.length >0"><span class="mycardbag-title-icon"></span>我的卡贴</div>
				<div class="usercard-mycombo-tip" v-if="this.mycombo.length <=0 && this.cards.length >0">
					<p>您还未购买或绑定卡贴</p>
					<a @click="bindcard('MyDiv','fade')">去绑卡</a>
					<a v-link="{name: 'cardpurchase'}">去逛逛</a>
				</div>
				<section v-for="item in mycombo" class="mycardbag-content" track-by="$index">
					<div v-link="{name: 'carddetails', params: {id: item.id}}">
						<img class="mycardbag-cardimg" v-bind:src="item.imageSrc" alt="">
						<div class="mycardbag-realcard-detail">
							<!-- <h5 v-text="item.currPkgName"></h5> -->
							<!-- <p class="mycardbag-realcard-detail-title">当前套餐:</p>
							<p v-text="item.title" style="text-align:center;"></p> -->
							<div class="mycardbag-realcard-detail-row">
								<p class="mycardbag-realcard-detail-title">卡贴名称:</p>
								<p class="mycardbag-realcard-detail-content" v-text="item.name"></p>
							</div>
							<div class="mycardbag-realcard-detail-row">
								<p class="mycardbag-realcard-detail-title">当前套餐:</p>
								<p class="mycardbag-realcard-detail-content" v-text="item.currPkgName" v-if="item.currPkgName"></p>
								<p class="mycardbag-realcard-detail-content" v-text="'未激活套餐'" v-else></p>
							</div>
							<div class="mycardbag-realcard-detail-row">
								<p class="mycardbag-realcard-detail-title">当前流量:</p>
								<p class="mycardbag-realcard-detail-content" v-text="item.netFlow+'MB'" v-if="item.netFlow"></p>
								<p class="mycardbag-realcard-detail-content" v-text="'无'" v-else></p>
							</div>
							<div class="mycardbag-realcard-detail-row">
								<p class="mycardbag-realcard-detail-title">通话分钟:</p>
								<p class="mycardbag-realcard-detail-content" v-text="item.voiceTime+'分钟'" v-if="item.voiceTime"></p>
								<p class="mycardbag-realcard-detail-content" v-text="'无'" v-else></p>
							</div>
							<!-- <p class="mycardbag-realcard-detail-title">总流量:<span v-text="item.netFlow"></span></p>
							<p class="mycardbag-realcard-detail-title">总通话分钟：<span v-text="item.voiceTime"></span></p> -->
							
						</div>
						<a class="mycardbag-detail-more"><img src="/static/images/icon/chevron-right.png"></a>
					</div>
					
				</section>
			</article>
			<article>
				<div class="mycardbag-group-title" v-if="this.cards.length >0 || this.mycombo.length >0"><span class="mycardbag-title-icon"></span>我的实体卡</div>
				<div class="usercard-mycombo-tip" v-if="this.cards.length <=0 && this.mycombo.length >0">
					<p>您还未购买或绑定实体卡</p>
					<a @click="bindcard('MyDiv','fade')">去绑卡</a>
					<a v-link="{name: 'cardpurchase'}">去逛逛</a>
				</div>
				<section v-for="card in cards" class="mycardbag-content" track-by="$index">
					<div v-link="{name: 'carddetails', params: {id: card.id}}">
						<img class="mycardbag-cardimg" v-bind:src="card.imageSrc" alt="">
						<div class="mycardbag-realcard-detail">
							<!-- <h5 v-text="card.currPkgName"></h5> -->
							<!-- <p class="mycardbag-realcard-detail-title">当前套餐:</p>
							<p v-text="card.title" style="text-align:center;"></p> -->
							<div class="mycardbag-realcard-detail-row">
								<p class="mycardbag-realcard-detail-title">实体卡名称:</p>
								<p class="mycardbag-realcard-detail-content" v-text="card.name"></p>
							</div>
							<div class="mycardbag-realcard-detail-row">
								<p class="mycardbag-realcard-detail-title">当前套餐:</p>
								<p class="mycardbag-realcard-detail-content" v-text="card.currPkgName" v-if="card.currPkgName"></p>
								<p class="mycardbag-realcard-detail-content" v-text="'未激活套餐'" v-else></p>
							</div>
							<div class="mycardbag-realcard-detail-row">
								<p class="mycardbag-realcard-detail-title">当前流量:</p>
								<p class="mycardbag-realcard-detail-content" v-text="card.netFlow+'MB'" v-if="card.netFlow"></p>
								<p class="mycardbag-realcard-detail-content" v-text="'无'" v-else></p>
							</div>
							<div class="mycardbag-realcard-detail-row">
								<p class="mycardbag-realcard-detail-title">通话分钟:</p>
								<p class="mycardbag-realcard-detail-content" v-text="card.voiceTime+'分钟'" v-if="card.voiceTime"></p>
								<p class="mycardbag-realcard-detail-content" v-text="'无'" v-else></p>
							</div>
							<!-- <p class="mycardbag-realcard-detail-title">总流量:<span v-text="card.netFlow"></span></p>
							<p class="mycardbag-realcard-detail-title">总通话分钟：<span v-text="card.voiceTime"></span></p> -->
							
						</div>
						<a class="mycardbag-detail-more"><img src="/static/images/icon/chevron-right.png"></a>
					</div>
					
				</section>
			</article>
		</div>
	    <!-- <toast></toast> -->
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
			cards:[],
			toasttext: '',
			// showBindCard:false,
			// showbg: false,
			// showEmptyBag:false,
			showCards:true,
			mycombo: [

			],
			cards:[],
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
			url: Config.getApiURL()+"/user/card/list",
        	success: function(result){
        		console.log(result);
	        	if (result.status == 0) {
	        		var cards = result.data;
	        		for(var idx in cards) {
	        			cards[idx].imageSrc = Config.getMediaURL()+cards[idx].imageSrc;
	        			if(cards[idx].type=="1") {
	        				//卡贴
	        				self.mycombo.push(cards[idx]);
	        			} else if (cards[idx].type=="2") {
	        				//实体卡
	        				self.cards.push(cards[idx]);
	        			}
	        		}
	            }else{
	            	self.toastdialogtitle = "反馈提示";
			        self.toastdialogcontent = result.tip;
				    $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
				   		$('#dialog2').off('click').hide();
					});
	            }
	        }
        })
        var total = document.documentElement.clientHeight;
		$("#usercard-con").height(total+"px");
		$(".component-title-btn").click(function() {
        	self.bindcard('MyDiv','fade');
        });
	},
	methods:{
		bindcard:function(show_div, bg_div) {
	        $("#"+show_div).css('display', 'block');
	        $("#"+bg_div).css('display', 'block');
	        var bgdiv = document.getElementById(bg_div);
	        bgdiv.style.width = document.body.scrollWidth;
	        $("#" + bg_div).height($(window).height()); 
	        $('html,body').animate({scrollTop: $(document).height()}, 100);//因为页面很长，有纵向滚动条，先让页面滚动到最底端，然后禁止滑动事件，这样可以使遮罩层锁住整个屏幕  
	        $('#'+show_div).bind("touchmove",function(e){  
	                e.preventDefault();  
	        }); 
	        $('#'+bg_div).bind("touchmove",function(e){  
	                e.preventDefault();  
	        }); 
	    },
	    closeDiv:function(show_div, bg_div) {
	    	$("#"+show_div).css('display', 'none');
	        $("#"+bg_div).css('display', 'none');
	    },
	    check: function () {
		    var url = encodeURIComponent(location.href.split('#')[0]);
			$.ajax({
				type: 'get',
				url: "wx/getSignature?url=" + url,
				dataType: 'json',
				success: response => {
					console.log(response);
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过og打出，仅在pc端时才会打印。
						appId: response.data.appid, // 必填，公众号的唯一标识
						timestamp: response.data.timestamp, // 必填，生成签名的时间戳
						nonceStr: response.data.noncestr, // 必填，生成签名的随机串
						signature: response.data.signature,// 必填，签名，见附录1
						jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
				},
				error: err => {
					self.toastdialogtitle = "反馈提示";
					self.toastdialogcontent = "网络错误";
					$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
						$('#dialog2').off('click').hide();
					});
				}
			});
			wx.ready(function () {
				wx.scanQRCode({
				    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				    scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				    success: function (res) {
				    	var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				    	$.ajax({
				    		type: 'post',
				    		url: Config.getApiURL() + "/user/card/scanbindcard",
				    	 	data: JSON.stringify({iccid: result.split(',')[1]}),
				    	 	success: response => {
				    	 		if (response.status == 0) {
				    	 			self.toastdialogtitle = "反馈提示";
			       					self.toastdialogcontent = response.tip;
				    	 		} else {
				    	 			self.toastdialogtitle = "反馈提示";
			       					self.toastdialogcontent = response.tip;
				    	 		}
							    $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
							   		$('#dialog2').off('click').hide();
								});
				    	 		window.location.reload();
				    	 	},
				    	 	error: response => {
				    	 		self.toastdialogtitle = "反馈提示";
						        self.toastdialogcontent = "网络错误";
							    $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
							   		$('#dialog2').off('click').hide();
								});
				    	 		// alert(JSON.stringify(response));
				    	 	}
				    	})
					}
				});
			});
		}
	}
}
</script>
<style type="text/css">
	.mycardbag-detail-more {
		display:block;
		height:100%;
		float:right;
	}
	.mycardbag-detail-more img {
		float:right;
		width:25px;
		vertical-align: middle;
		margin-top:20px;
	}

	.mycardbag-realcard-detail {
		font-size:13px;
		color:#666;
	}
	.mycardbag-realcard-detail-row {
		display:block;
		float:left;
		width:100%;
	}
	.mycardbag-realcard-detail-title{
		
		min-width:30%;
		float:left;
	}
	.mycardbag-realcard-detail-content {
		float:left;
		display:block;
		max-width:68%;
	}
	.usercard-item{
		width: 100%;
		height: 120px;
		background: -webkit-gradient(linear, 0% 0%, 0% 100%,from(rgba(0,102,153,1)), to(rgba(0,102,153,0.5)));
		background: -moz-linear-gradient(top,rgba(0,102,153,1),rgba(0,102,153,0.5));
		border-radius: 7px;
		box-shadow: 0px 1px 2px rgba(0,102,153,1);
	}
	.usercard-item-top{
		width: 100%;
		height: 80px;
	}
	.usercard-item-top-left{
		float: left;
		margin-top: 5px;
		margin-left: 5px;
	}
	.usercard-item-icon{
		width: 38px;
		height: 38px;
		border-radius: 19px;
		float: left;
		margin-right: 10px;
		margin-top: 2px;
	}
	.usercard-item-tip{
		width: 200px;
		color: white;
		opacity: 0.8;
		font-size: 14px;
	}
	.usercard-item-tip li{
		margin-top: 7px;
	}
	.usercard-item-tip-1{
		font-size: 12px;
	}
	.usercard-item-top-right{
		float: right;
		margin-top: 12px;
		margin-right: 10px;
		color: white;
		opacity: 0.8;
		font-size: 14px;
	}
	.usercard-item-iccid{
		margin-left: 5px;
		margin-right: 10px;
		color: white;
		letter-spacing: 1px;
		text-align: right;
		font-size: 15px;
		height: 20px;
		line-height: 20px;
	}
	.UserCard-black_overlay {
		display: none;
	    position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    background-color: black;
	    z-index: 1001;
	    -moz-opacity: 0.5;
	    opacity: .50;
	    filter: alpha(opacity=50);
	}

	.UserCard-white_content {
	    display: none;
	    position: fixed;
	    left: 50%;
	    bottom: 1%;
	    margin: -14% 0 0 -46%;
	    width: 92%;
	    height: 175px;
	    border: 1px solid lightblue;
	    border-radius: 8px;
	    background-color: white;
	    z-index: 1002;
	    overflow: auto;
	}
	.UserCard-white_content span>p{
		line-height: 35px;
		color:#777;
		display: inline-block;
		font-weight: bold;
	}
	.UserCard-white_content span>img{
		right: 0px;
		display: inline-block;
	}
	.UserCard-white_content span>img:first-child{
		float: left;
	}
	.UserCard-white_content span>img:last-child{
		float: right;
	}
	.UserCard-white_content .operation{
		width: 100%;
	    border-top: 1px solid #e9e9e9;
	    margin-top: 5px;
	    clear: both;
	}
	.UserCard-white_content .operation .UserCard-line1,.UserCard-white_content .operation .UserCard-line2,.UserCard-white_content .operation .UserCard-line3{
		clear: both;
		height: 43px;
		border-bottom: 1px solid #e9e9e9;
		text-align: center;
	}
	.UserCard-white_content .operation .UserCard-line1 a,.UserCard-white_content .operation .UserCard-line2 a,.UserCard-white_content .operation .UserCard-line3 a{
		line-height: 45px;
		color: #23c083;
	}
	.UserCard-white_content .operation:last-child .UserCard-line3{
		border-bottom: none;
	}
/*	@media screen 
	  and (min-device-width: 320px) 
	  and (max-device-width: 374px) {
	  	.UserCard-white_content .operation .UserCard-line1,.UserCard-white_content .operation .UserCard-line2,.UserCard-white_content .operation .UserCard-line3{
			height: 34px;
		}
		.UserCard-white_content .operation .UserCard-line1 a,.UserCard-white_content .operation .UserCard-line2 a,.UserCard-white_content .operation .UserCard-line3 a{
			line-height: 34px;
		}
	  }*/

	a.more-info {
		width: 80%;
		height: 35px;
		line-height: 35px;
        display: block;
		color: #1fd291;
		margin: 15px auto;
		border-radius: 5px;
		border:1px solid #1fd291;
	}
	.usercard-mycombo-tip {
		width: 100%;
		text-align: center;
	}
	.usercard-mycombo-tip>p{
		color: #5a5a5a;
		font-size: 14px;
		margin-top: 20px;
	}
	.usercard-mycombo-tip>a {
		display: inline-block;
		margin: 10px auto;
		width: 40%;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		color: #1fd291;
		border: 1px solid #1fd291;
		border-radius: 5px;
	}
</style>
<style>
	.mycardbagwrapper {
		background-color: #fff;
	}
	.mycardbag-title {
		background-color: #ecebeb;
		line-height: 2rem;
		padding-left: 10px;
	}
	.mycardbag-detail {
		display: inline-block;
		color: #1fd290;
		border: 1px solid #1fd290;
		width: 4rem;
		font-size: 0.8rem;
		text-align: center;
	}
	.mycardbag-head-right>div {
		font-size: 0.8rem;
	}
	.mycardbag-head {
		padding: 10px;
	}
	.mycardbag-cardimg{
		width: 5rem;
		height: 4rem;
		border-radius: 5px;
	}
	.mycardbag-card>img {
		width: 8rem;
		height: 7rem;
	}
	.mycardbag-head>section>p {
		float: left;
	}
	.mycardbag-head>section>div {
		float: right;
		text-align: center;
	}
	.mycardbag-content>div {
		padding:  10px;
		padding-right:0;
		vertical-align: middle;
		position: relative;
	}
	.mycardbag-content>div>img {
		vertical-align: middle;
	}
	.mycardbag-content>div>div {
		display: inline-block;
		width: 12rem;
		vertical-align: middle;

	}
	.mycardbag-content>div>div>p {
		font-size: 0.8rem;
	}
	.mycardbag-content {
		
		border-bottom:1px solid #ddd;
	}
	.mycardbag-title-icon {
		float:left;
		display:block;
		height:10px;
		margin-top:7.5px;
		margin-right:10px;
		width:5px;
		background-color:#1fd291;
	}
	.mycardbag-group-title{
		color: #1fd291;
	
		font-size: 14px;
		
		height: 25px;
		line-height: 25px;
		background-color: #eeeeee;
	}
</style>
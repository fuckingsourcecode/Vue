<template>
	<div>
		<!-- <button @click="test" style="font-size:24pt">hello</button>
		<button @click="pay" style="font-size:24pt">pay</button>
		 <div class="bd spacing"><loading-toast></loading-toast></div>
		 <a href="/static/test.html" title="">go to test</a>
		 <action-sheet btnname="点我" scan="false"></action-sheet>
		  <h2 @click="showtoast">test</h2>
		 <toast></toast>
		<!-- <img src="/static/images/temp/timg.jpg"/> --> -->
		<!-- <div v-for="item in arr" track-by="$index">
			<div v-bind:id="item.name + '-'+ $index">
				item.name
			</div>
		</div> --> 
		<!-- <line-toast></line-toast> -->
		<button type="btn" style="font-size:50pt" @click="showdialog()">click me</button>
		<div class="dialog">
			<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
		</div>
	</div>
</template>
<script>
	import Config from '../common/config.js'
	import loadingToast from '../components/dialog/loadingToast.vue'
	import actionSheet from '../components/actionSheet/actionSheet.vue'
	import toast from '../components/toast/index.vue'
	import lineToast from '../components/toast/lineToast.vue'
	import toastDialog from '../components/dialog/toastDialog.vue'
	import confirmDialog from '../components/dialog/confirmDialog.vue'
	export default {
		data: function () {
			return {
				group: JSON.stringify([{path: 'usercenter', name: 'usercenter'}, {path: 'login', name: 'login'}]),
				mywx: {

				},
				arr: [
				{
					id:1,
					name: 'a'
				},
				{
					id:2,
					name: 'b'
				},
				{
					id:3,
					name: 'c'
				}],
				linetoast: 'success',
				toastdialogtitle: '', 
				toastdialogcontent: ''
			}
		},
		components: {
			loadingToast,
			actionSheet,
			toast,
			lineToast,
			toastDialog,
			confirmDialog
		},
		methods: {
			test: function () {
  				wx.scanQRCode({
				    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				    success: function (res) {
				    	var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					}
				});
			},
			showdialog: function() {
				console.log('test');
				this.toastdialogtitle = "hello thank you";
				this.toastdialogcontent = "are you ok"
				$('#dialog2').css("display", "block");
			},
			showtoast: function () {
				$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                    $('#dialog2').off('click').hide();
                });
			},
			pay: function () {
				wx.chooseWXPay({
				    timestamp: this.mywx.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符

				    nonceStr: this.mywx.noncestr, // 支付签名随机串，不长于 32 位

				    package: this.mywx.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）

				    signType: this.mywx.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'

				    paySign: this.mywx.paySign, // 支付签名

				    success: function (res) {

				        // 支付成功后的回调函数
				        console.log(res);
				    }
				});
			}
		},
		ready: function () {
			// var self = this;
			// var url = encodeURIComponent(location.href.split('#')[0]);
			// $.ajax({
			// 	type: 'get',
			// 	url: "wx/getSignature?url=" + url,
			// 	dataType: 'json',
			// 	success: response => {
			// 		console.log(response);
			// 		self.mywx = response.data;
			// 		wx.config({
			// 			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			// 			appId: response.data.appid, // 必填，公众号的唯一标识
			// 			timestamp: response.data.timestamp, // 必填，生成签名的时间戳
			// 			nonceStr: response.data.noncestr, // 必填，生成签名的随机串
			// 			signature: response.data.signature,// 必填，签名，见附录1
			// 			jsApiList: ['checkJsApi','scanQRCode', 'chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			// 		});
			// 	},
			// 	error: err => {
			// 		console.log(err);
			// 	}
			// });
			// console.log(this.group);
		}
	}
</script>

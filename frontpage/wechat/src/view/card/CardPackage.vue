<template>
	<div class="cardpackage">
		<title title="套餐选择"  showbtn="false" backlink="usercenter"></title>
		<div class="cardpackage-wrapper">
			<header class="cardpackage-header">
				<p class="cardpackage-nav-name"><span v-text="combo.name"></span><span v-text="'途宝狂暑季'" class="cardpackage-nav-name-tip"></span></p>
				<div class="cardpackage-header-img">
					<img src="/static/images/icon/2-SIM.png">
					<img src="/static/images/icon/2-SIMback.png">
				</div>
				<div class="cardpackage-header-content" v-text="combo.description">
				</div>
			</header>
			<nav class="cardpackage-nav">
				<p class="clearfix">套餐天数选择 <span class="cardpackage-totalprice">￥<span v-text="totalprice"></span></span></p>
				<ul class="clearfix cardpackage-package-group">
					<li class="cardpackage-package-item" v-for="item in combo.list" track-by="$index" v-bind:class="{'cardpackage-active' : selectIdx == $index}" @click="select(item.id, item.price, $index)">
						<p v-text="item.name"></p>
					</li>
				</ul>
			</nav>
			<section class="cardpackage-package-cotent">
				<dl>
					<dt>套餐说明</dt>
					<dd class="cardpackage-package-cotent-content" v-text="content"></dd>
				</dl>
			</section>
			<footer class="cardpackage-package-footer">
				<a class="cardpackage-package-btn" @click="orderconfirm()">立即购买</a>
			</footer>
		</div>
		<toast-dialog v-bind:toastdialogcontent="toastdialogcontent" v-bind:toastdialogtitle="toastdialogtitle"></toast-dialog>
	</div>
</template>
<script>
	import Utils from "../../common/utils.js"
	import Config from "../../common/config.js"
	import toastDialog from "../../components/dialog/toastDialog.vue"
	export default {
		data: function () {
			return {
				combo: {
					list: [{
						id: '',
						day: '',
						price: '',
						description: ''
					}],
					price: 10000,
					id: 9,
					contents: "abc",
					description: '',
					name: ''
				},
				totalprice: 0,
				id: '',
				content: '',
				selectIdx: 0,
				toastdialogtitle: '',
				toastdialogcontent: ''
			}
		},
		components: {
			toastDialog
		},
		ready: function () {
			this.totalprice = this.combo.list[0].price + this.combo.price;
			this.id = this.combo.list[0].id;
			var self = this;
			$.ajax({
        		beforeSend: function () {
	        		$('.weui_loading_toast').css('display', 'block');
	        	}, 
        	    url: Config.getApiURL() + "/sys/goods",
        	    type: 'POST',
        	    dataType: 'json',
        	    data: JSON.stringify({type: 3}),
        	    success: function(data) {
        	    	console.log(data);
        	    	if (data.status == 0) {
        	    		self.cards = data.data;
        	    		self.cards.forEach((value)=>{
        	    			if (value.systemCardId == self.$route.params.id) {
        	    				self.combo.price = value.price;
        	    				self.combo.name = value.name;
        	    				self.combo.description = value.description;
        	    			}
        	    		});
        	    	} else {
        	    		self.toastdialogtitle = "反馈提示";
                        self.toastdialogcontent = data.tip;
                        $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                            $('#dialog2').off('click').hide();
                        });
        	    	}
        	    }
        	});
			$.ajax({
	        	complete: function () {
	        		$('.weui_loading_toast').css('display', 'none');
	        	},
				url: Config.getApiURL()+'/sys/card/availPkgGoods',
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify({id: self.$route.params.id}),
				success: function(response) {
					console.log(response);
					self.combo.list = response.data;
					self.content = self.combo.list[0].description;
					self.id = self.combo.list[0].id;
					self.totalprice = self.combo.list[0].price + self.combo.price
				},
				error: function(xhr, textStatus, errorThrown) {
					self.toastdialogtitle = "反馈提示";
	                self.toastdialogcontent = "网络错误";
	                $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
	                    $('#dialog2').off('click').hide();
	                });
				}
			});
		},
		methods: {
			select: function (id, price, index) {
				this.totalprice = price + this.combo.price;
				this.id = id;
				this.selectIdx = index;
				this.content = this.combo.list[id].description;
			},
			orderconfirm: function () {
				if (!(Utils.getCookie("TBUID"))) {
		    		this.$router.go('/login');
		    		return false;
		    	}
				var self = this;
				$.ajax({
					beforeSend: function () {
					    $('.weui_loading_toast').css('display', 'block');
					    
					},
					complete: function () {
					    $('.weui_loading_toast').css('display', 'none');
					    
					},
					url: Config.getApiURL()+'/user/expe/createOrder',
				  	type: 'POST',
				  	dataType: 'json',
				  	data: JSON.stringify([{id: self.$route.params.id,count: 1}, {id: self.id, count: 1}]),
				  	success: function(response) {
				  		console.log(response);
				   		if (response.status == 0) {
				   			var order = response.data;
				   			for (var idx in order.data) {	
				   				order.data[idx].imageSrc = Config.getMediaURL()+order.data[idx].imageSrc;	
				   			}
						    sessionStorage.setItem('order', JSON.stringify(order));
						    self.$router.go('/orderconfirm');
				    	} else {
				    		self.toastdialogtitle = "反馈提示";
							self.toastdialogcontent = response.tip;
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
<style type="text/css" media="screen">
	.cardpackage {
		background-color:#fff;
	}
	.cardpackage-header img {
		width: 35%;
		border-radius:0.3rem;
    	box-shadow:0px 1px 3px #222;
	}
	.cardpackage-header img + img {
		margin-left:10%;
	}
	
	.cardpackage-header-content {
		line-height: 1.5rem;
	    font-size: .8rem;
	    margin: 5%;
	    text-indent: 2em;
	    color:#555;
	}
	
	.cardpackage-header-img {
		text-align: center;
		margin-top:1rem;
	}
	.cardpackage-package-group {
		margin-left: 2%;
	}
	.cardpackage-package-item {
		float: left;
		width: 20%;
		text-align: center;
		border: 1px solid #727272;
		border-radius: 5px;
		margin: 1% 2%;
	}
	.cardpackage-package-item p {
		padding: 2px 3px 8px 2px;
		font-size: 0.8rem;
		height: 1rem;
		font-size: .7rem;
		overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
	.cardpackage-nav>p{
		margin-left:1rem;
		margin-right:1rem;
	}
	.cardpackage-nav {
		border-top:5px solid #eed;
		padding-top:1rem;
	}
	.cardpackage-nav-name {
		color: #ff6000;
		margin-top:1rem;
		margin-left:1rem;
	}
	.cardpackage-totalprice {
		float: right;
		color: #ff0101;
	}
	.cardpackage-nav-name-tip {
		background-color: #ff6000;
		color: #fff;
		border-radius: 5px;
		font-size: 0.8rem;
		padding:0.2rem 0.4rem;
	}
	.cardpackage-package-cotent {
		margin: 10px 0 3rem 0;
		padding: 3% 4%;
		border-top: 5px solid #eed;
	}
	.cardpackage-package-cotent-content {
		text-indent: 2em;
    	line-height: 1.5rem;
	}
	.cardpackage-package-btn {
		display: block;
	    background-color: #23c083;
	    color: #fff;
	    line-height: 3rem;
	    font-size: 1.4rem;
	    text-align: center;
	}
	.cardpackage-package-footer {
		position: fixed;
		-webkit-transform: translateZ(0);
		-webkit-overflow-scrolling: touch;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.cardpackage-active {
		border-color: #ff6000;
		color: #ff6000;
	}
</style>

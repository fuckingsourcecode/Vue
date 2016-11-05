<template>
	<div class="apnlist">
		<title title="卡贴/实体卡选择" showbtn="false" backlink="apnhome"></title>
		
		<div class="wrapper">
			<ul class="apnlist-group">
				<template v-if="eur">
					<a v-link="{name: 'apndetail', params: {sec:$route.params.sec, id: 1}}"><li class="apnlist-item">
						欧洲行<img src="/static/images/icon/chevron-right.png">
					</li></a>
				</template>
				<template v-if="asia">
					<a v-link="{name: 'apndetail', params: {sec:$route.params.sec, id: 2}}"><li class="apnlist-item">
						亚太行<img src="/static/images/icon/chevron-right.png">
					</li></a>
				</template>
				<template v-if="japan">
					<a v-link="{name: 'apndetail', params: {sec:$route.params.sec, id: 3}}"><li class="apnlist-item">
						日本行<img src="/static/images/icon/chevron-right.png">
					</li></a>
				</template>
			</ul>					
		</div>
	</div>
</template>
<script>
	export default {
		data: function () {
			return {
				title: '',
				eur: false,
				asia: false,
				japan: false
			}
		},
		route: {
			data() {
				window.all = [{
				    'id': 0,
				    'title': '欧洲行APN设置',
				    'src': [{
				        'title': 'iOS7',
				        'src': '',
				        'card': '',
				        'gpp': '/static/iosapn/eu/SignedEuropeAPN_iOS7Only.mobileconfig'
				    }, {
				        'title': 'iOS7或者最新版',
				        'src': '',
				        'card': '',
				        'gpp': '/static/iosapn/eu/SignedEuropeAPN.mobileconfig'
				    }],
				    gpp: true,
				    card: false
				}, {
				    'id': 1,
				    'title': '亚太行APN设置',
				    'src': [{
				        'title': 'iOS7',
				        'src': '',
				        'card': '',
				        'gpp': '/static/iosapn/hm/TBAPNConfig_iOS7Only.mobileconfig'
				    }, {
				        'title': 'iOS7或者最新版',
				        'src': '',
				        'card': '',
				        'gpp': '/static/iosapn/hm/TBAPNConfig.mobileconfig'
				    }],
				    gpp: true,
				    card: false
				}, {
				    'id': 2,
				    'title': '日本行APN设置',
				    'src': [{
				        'title': 'iOS7',
				        'src': '',
				        'card': '/static/iosapn/jp/SignedJapanAPN_iOS7Only.mobileconfig',
				        'gpp': ''
				    }, {
				        'title': 'iOS7或者最新版',
				        'src': '',
				        'card': '/static/iosapn/jp/SignedJapanAPN.mobileconfig',
				        'gpp': ''
				    }],
				    gpp: false,
				    card: true
				}];
			}
		},
		ready: function () {
			if(parseInt(this.$route.params.sec) == 1) {
				this.title = '卡贴APN设置';
				window.all.forEach((value, index, array) => {
					if (!value.gpp) {
						if(index == 0) {
							this.eur = false;
						} else if (index == 1) {
							this.asia = false;
						} else if (index == 2) {
							this.japan = false;
						}else {

						}
					} else {
						if(index == 0) {
							this.eur = true;
						} else if (index == 1) {
							this.asia = true;
						} else if (index == 2) {
							this.japan = true;
						}else {
							
						}
					}
				});
			}else if (parseInt(this.$route.params.sec) == 2){
				this.title = '实体卡APN设置';
				window.all.forEach((value, index, array) => {
					if (!value.card) {
						if(index == 0) {
							this.eur = false;
						} else if (index == 1) {
							this.asia = false;
						} else if (index == 2) {
							this.japan = false;
						}else {

						}
					} else {
						if(index == 0) {
							this.eur = true;
						} else if (index == 1) {
							this.asia = true;
						} else if (index == 2) {
							this.japan = true;
						}else {
							
						}
					}
				});
			}else {
				this.$route.router.go({name: 'apnhome'});
			}
			$('.apnlist-item').on('touchstart mousedown', function () {
				$(this).css('transform', 'scale(0.9)');
			});
			$('.apnlist-item').on('touchend mouseup', function () {
				$(this).css('transform', 'scale(1)');
			});	
		}
	}
</script>
<style>
	/*.apnlist-group {
		padding: 10px;
		text-align: center;
	}
	.apnlist-item {
		background-color: #0066aa;
		margin: 10px auto;
		font-size: 1.4em;
		height: 45px;
		line-height: 45px;
		border-radius: 10px;
		opacity: 1;
	}
	.apnlist-item a {
		color: #fff;
		display: block;
	}*/
/* 	.apnlist-item:nth-child(1) {
		-webkit-animation: show 0.85s ease-in 0s forwards;
		-moz-animation: show 0.85s ease-in 0s forwards;
		animation: show 0.85s ease-in 0s forwards;
	}
	.apnlist-item:nth-child(2) {
		-webkit-animation: show 0.85s ease-in 0.85s forwards;
		-moz-animation: show 0.85s ease-in 0.85s forwards;
		animation: show 0.85s ease-in 0.85s forwards;
	}
	.apnlist-item:nth-child(3) {
		-webkit-animation: show 0.85s ease-in 1.7s forwards;
		-moz-animation: show 0.85s ease-in 1.7s forwards;
		animation: show 0.85s ease-in 1.7s forwards;
	}
	*/
	.apnlist {
		background-color:white;
	}
	.apnlist-item {
		height:60px;
		border-bottom:1px solid #ddd;
		background-color:white;
		width:100%;
		padding-left:10px;
		line-height:60px;
	}
	.apnlist-group a {
		text-decoration:none;
		color:black;
		font-size:16px;

	}
	.apnlist-item img {
		width:25px;
		height:25px;
		float:right;
		display:block;
		margin-right:30px;
		margin-top:17.5px;
	}
</style>
<template>
	<div class="apndetail">
		<title title="APN下载" showbtn="false" backlink="apnhome"></title>
		<div class="wrapper">
			<ul class="apndetail-group">
			<a v-bind:href="item.src"  v-for="item in detail.src" v-show="item.src == '' ? false : true">
				<li class="apndetail-item" >{{item.title}}
					<img src="/static/images/icon/arrow-down-bold-circle-outline.png">
				
				</li>
			</a>	
			</ul>
			<div class="apndetailtip">
				<span>请使用safari浏览器打开</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data: function () {
			return {
				detail:	{}
			}
		},
		ready: function () {
			// $('.apndetail-item').on('touchstart mousedown', function (e) {
			// 	$(this).css('transform', 'scale(0.9)');
			// 	e.stopPropagation();
			// });
			// $('.apndetail-item').on('touchend mouseup', function () {
			// 	$(this).css('transform', 'scale(1)');
			// 	e.stopPropagation();
			// });	
			
			this.detail = all[parseInt(this.$route.params.id)-1];
			if(parseInt(this.$route.params.sec) == 1) {
				for (var i = 0; i < this.detail.src.length; i++) {
					this.detail.src[i].src = this.detail.src[i].gpp;
				}
			}else if (parseInt(this.$route.params.sec) == 2){
				for (var i = 0; i < this.detail.src.length; i++) {
					this.detail.src[i].src = this.detail.src[i].card;
				}
			}else {
				this.$route.router.go({name: 'apnhome'});
			}
		}
	}
</script>
<style>
	/*.apndetail, .apnlist {
		display: block;
	}
	.apndetail-group {
		padding: 10px;
		text-align: center;
	}
	.apndetail-item {
		background-color: #0066aa;
		margin: 10px auto;
		font-size: 1.4em;
		height: 45px;
		line-height: 45px;
		border-radius: 10px;
		opacity: 1;
	}*/
	.apndetail {
		background-color:white;
	}
	.apndetail-item a {
		color: #fff;
		display: block;
	}
	.apndetailtip {
		text-align: center;
		/*color: #0066aa;*/
		background-color:white;
		color:#999;
		font-size:13px;
		margin-top:50px;
	}

	.apndetail-item {
		height:60px;
		border-bottom:1px solid #ddd;
		background-color:white;
		width:100%;
		padding-left:10px;
		line-height:60px;
	}
	.apndetail-group a {
		text-decoration:none;
		color:black;
		font-size:16px;

	}
	.apndetail-item img {
		width:25px;
		height:25px;
		float:right;
		display:block;
		margin-right:30px;
		margin-top:17.5px;
	}
</style>
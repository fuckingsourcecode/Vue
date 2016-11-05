<template>
	<div class="apnhome">
		<title title="卡贴/实体卡选择" showbtn="false" backlink="index"></title>
		<div class="wrapper">
			<!-- <img class="apnhome-bg" style="z-index: -1000;width: 100%;" /> -->
			<ul class="apnhome-group">
				<a v-link="{name: 'apnlist', params: {sec: 1}}"><li class="apnhome-item">飞鲸途宝软卡贴<img src="/static/images/icon/chevron-right.png"></li></a>
				<a v-link="{name: 'apnlist', params: {sec: 2}}"><li class="apnhome-item">飞鲸途宝软实体卡<img src="/static/images/icon/chevron-right.png"></li></a>
			</ul>					
		</div>
	</div>
</template>
<script>
	export default {
		ready: function () {
			// $('.apnhome-item').on('touchstart mousedown', function () {
			// 	$(this).css('transform', 'scale(0.9)');
			// });
			// $('.apnhome-item').on('touchend mouseup', function () {
			// 	$(this).css('transform', 'scale(1)');
			// });	
			// $('.apnhome-bg').height($(window).height()-60);
		}
	}
</script>
<style>
	.apnhome {
		background-color:white;
	}
	.apnhome> .wrapper {
		/*background-image:url("/static/images/icon/apnhome-bg.png");*/
	}
	.apnhome-group {
		
		
		
	}
/*	.apnhome-item {	
		background-color: #0066aa;
		margin: 40px auto;
		font-size: 25px;
		font-weight: bold;
		height: 90px;
		line-height: 90px;
		border-radius: 10px;
		box-shadow: 1px 2px 2px #888888;
	}

	.apnhome-item a {
		color: #fff;
		display: block;
	}*/
	.apnhome-item {
		height:60px;
		border-bottom:1px solid #ddd;
		background-color:white;
		width:100%;
		padding-left:10px;
		line-height:60px;
	}
	.apnhome-group a {
		text-decoration:none;
		color:black;
		font-size:16px;

	}
	.apnhome-item img {
		width:25px;
		height:25px;
		float:right;
		display:block;
		margin-right:30px;
		margin-top:17.5px;
	}
</style>
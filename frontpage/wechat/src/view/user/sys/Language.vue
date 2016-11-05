<template>
	<div class="language">
		<title title="语言" backlink="system" showbtn="false"></title>
		<div class="wrapper language-wrapper">
			<a class="language-btn">
				<img class="language-country" src="/static/images/temp/china.jpg">
				<span>中国</span>
			</a>
		</div>
	</div>
</template>
<style type="text/css">
	.language-wrapper a{
		width: 100%;
		height: 55px;
		line-height: 55px;
		background-color: white;
		display: block;
	}
	.language-country{
		width: 35px;
		height: 35px;
		border-radius: 17px;
		float: left;
		margin-top: 10px;
		margin-left: 5px;
	}
	.language-btn span{
		float: left;
		margin-left: 5px;
	}
</style>
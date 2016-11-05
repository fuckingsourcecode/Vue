<template>
	<div class="linetoast">
		<span class="linetoast-text">功能暂未开通，敬请期待</span>
	</div>
</template>
<style>
	.linetoast {
		position: fixed;
	    z-index: 5000;
	    width: 85%;
	    top: 90%;
	    left: 50%;
	    -webkit-transform: translate(-50%, -50%);
	    transform: translate(-50%, -50%);
	    /* background-color: #FAFAFC; */
	    background-color: transparent;
	    text-align: center;
	    border-radius: 3px;
	    overflow: hidden;
	    display: none;
	}
	.linetoast-text {
		display: inline-block;
		background-color: #5B5B5B;
		color: #fff;
		font-size: 0.8rem;
		padding: 8px 20px;
		border-radius: 5px;
	}

</style>
<script>
	export default {
		props: ['linetoast'],
		ready: function () {
			$('.linetoast')
		}
	}
</script>
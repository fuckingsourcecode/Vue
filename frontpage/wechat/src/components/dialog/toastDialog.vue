<template>
	<div class="weui_dialog_alert" id="dialog2" style="display: none;">
	    <div class="weui_mask"></div>
	    <div class="weui_dialog">
	        <div class="weui_dialog_hd"><strong class="weui_dialog_title" v-text="toastdialogtitle"></strong></div>
	        <div class="weui_dialog_bd" v-text="toastdialogcontent"></div>
	        <div class="weui_dialog_ft">
	            <a href="javascript:;" class="weui_btn_dialog primary" @click="closeToastDialog()">确定</a>
	        </div>
	    </div>
	</div>
</template>
<script>
	export default {
		props: ['toastdialogtitle', 'toastdialogcontent'],
		methods: {
			closeToastDialog: function () {
				$(".weui_dialog_alert").css("display", "none");
			}	
		}
	}
</script>
<style>

</style>
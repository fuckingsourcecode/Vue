<template>
	<div class="weui_dialog_confirm" id="dialog1" style="display: none;">
	    <div class="weui_mask"></div>
	    <div class="weui_dialog">
	        <div class="weui_dialog_hd"><strong class="weui_dialog_title">弹窗标题</strong></div>
	        <div class="weui_dialog_bd">自定义弹窗内容，居左对齐显示，告知需要确认的信息等</div>
	        <div class="weui_dialog_ft">
	            <a href="javascript:;" class="weui_btn_dialog default">取消</a>
	            <a href="javascript:;" class="weui_btn_dialog primary">确定</a>
	        </div>
	    </div>
	</div>
</template>
<script>
	export default {

	}
</script>
<style>
.weui_dialog {
    background-color: hsl(240, 25%, 98%);
    border-radius: 3px;
    left: 45%;
    overflow: hidden;
    position: fixed;
    text-align: center;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 85%;
    z-index: 5000;
}
.weui_mask {
	    background: hsla(0, 0%, 0%, 0.6) none repeat scroll 0 0;
	    height: 100%;
	    left: 0;
	    position: fixed;
	    top: 0;
	    width: 100%;
	    z-index: 1000;
}
.weui_dialog_confirm .weui_dialog .weui_dialog_hd {
    padding: 1.2em 20px 0.5em;
}
.weui_dialog_confirm .weui_dialog .weui_dialog_bd {
    text-align: left;
}
.weui_dialog_hd {
    padding: 1.2em 0 0.5em;
}
.weui_dialog_title {
    font-size: 17px;
    font-weight: 400;
}
.weui_dialog_bd {
    color: hsl(0, 0%, 53%);
    font-size: 15px;
    padding: 0 20px;
    word-break: break-all;
    word-wrap: break-word;
}
.weui_dialog_ft {
    display: flex;
    font-size: 17px;
    line-height: 42px;
    margin-top: 20px;
    position: relative;
}
.weui_dialog_ft a {
    color: hsl(110, 73%, 45%);
    display: block;
    flex: 1 1 0;
    text-decoration: none;
}
.weui_dialog_ft a:active {
    background-color: hsl(0, 0%, 93%);
}
.weui_dialog_ft::after {
    border-top: 1px solid hsl(240, 1%, 84%);
    color: hsl(240, 1%, 84%);
    content: " ";
    height: 1px;
    left: 0;
    position: absolute;
    top: 0;
    transform: scaleY(0.5);
    transform-origin: 0 0 0;
    width: 100%;
}
.weui_dialog_confirm .weui_dialog_ft a {
    position: relative;
}
.weui_dialog_confirm .weui_dialog_ft a::after {
    border-left: 1px solid hsl(240, 1%, 84%);
    color: hsl(240, 1%, 84%);
    content: " ";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: scaleX(0.5);
    transform-origin: 0 0 0;
    width: 1px;
}
.weui_dialog_confirm .weui_dialog_ft a:first-child::after {
    display: none;
}
.weui_btn_dialog.default {
    color: hsl(0, 0%, 21%);
}
.weui_btn_dialog.primary {
    color: hsl(120, 88%, 37%);
}
@media screen and (min-width: 1024px) {
	.weui_dialog {
	    width: 35%;
	}
}
</style>
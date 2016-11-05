<template>
<div class="bd spacing">
    <a href="javascript:;" class="weui_btn weui_btn_primary" id="showActionSheet" @click="show()" v-text="btnname"></a>
</div>
<!--BEGIN actionSheet-->
<div id="actionSheet_wrap">
    <div class="weui_mask_transition" id="mask"></div>
    <div class="weui_actionsheet" id="weui_actionsheet">
        <div class="weui_actionsheet_menu">
            <div class="weui_actionsheet_cell" v-for="item in group" track-by="$index"><a v-link="{name: item.path}">{{item.name}}</a></div>
            <div class="weui_actionsheet_cell" v-if="scan">扫一扫</div>
        </div>
        <div class="weui_actionsheet_action">
            <div class="weui_actionsheet_cell" id="actionsheet_cancel">取消</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:['btnname', 'scan'],
    data: function () {
        return {
            group: ''
        }
    },
	methods:{
		show: function () {
            this.group = JSON.parse(this.$parent.group);
			var mask = $('#mask');
            var weuiActionsheet = $('#weui_actionsheet');
            weuiActionsheet.addClass('weui_actionsheet_toggle');
             mask.show()
                .focus()//加focus是为了触发一次页面的重排(reflow or layout thrashing),使mask的transition动画得以正常触发
                .addClass('weui_fade_toggle').one('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });
            $('#actionsheet_cancel').one('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });
            mask.unbind('transitionend').unbind('webkitTransitionEnd');
            function hideActionSheet(weuiActionsheet, mask) {
                weuiActionsheet.removeClass('weui_actionsheet_toggle');
                mask.removeClass('weui_fade_toggle');
                mask.on('transitionend', function () {
                    mask.hide();
                }).on('webkitTransitionEnd', function () {
                    mask.hide();
                })
            }
		}
	}
}
</script>
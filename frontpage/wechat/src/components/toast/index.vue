<template>
<div>
  <div class="toast" style="display: none;">
      <div class="weui_mask_transparent"></div>
      <div class="weui_toast">
          <i class="weui_icon_toast"></i>
          <p class="weui_toast_content" v-text="toasttext"></p>
    </div>
  </div>
</div>
</template>

<script>
export default {
    props: ['toasttext'],
}
</script>
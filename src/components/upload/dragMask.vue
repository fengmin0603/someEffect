<template>
  <!-- 拖拽蒙层 -->
  <transition name="el-zoom-in-center">
    <div class="drag-mask" @dragenter.prevent.stop="$emit('dragenter')" @dragover.prevent.stop="$emit('dragover')" @drop.prevent.stop="$emit('drop', $event)" @click.stop.prevent="$emit('click')">
      <div class="drag-desc">直接把文件拖放至此区域内，即可上传（点击可关闭）</div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
    },

    data () {
      return {}
    }
  }
</script>
<style>
  .drag-mask {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(183, 183, 183, 0.9);
  }
</style>

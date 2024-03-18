<template>
  <div
    ref="resize"
    class="resize"
    :style="{
      height: resizeConf.height + 'px',
      bottom: bottomPosition + 'px',
      minHeight: resizeConf.heightRange[0] + 'px',
      maxHeight: resizeConf.heightRange[1] + 'px',
    }"
  >
    <div
      ref="resizeHandle"
      class="handle-resize"
      @mousedown="onMouseDown"
    ></div>
    <slot />
  </div>
</template>
  
  <script>
export default {
  name: "ResizableBox",
  props: {
    resizeConf: {
      type: Object,
      default: () => ({
        height: 204, // 初始高度
        heightRange: [40, 300], // 高度范围
        bottomPosition: 20, // 初始底部位置
      }),
    },
  },
  data() {
    return {
      startY: 0,
      startHeight: 0,
      dragging: false,
    };
  },

  mounted() {},
  methods: {
    onMouseDown(event) {
      const resizeBox = this.$refs.resize;
      this.startY = event.clientY;
      this.startHeight = resizeBox.offsetHeight;
      this.dragging = true;

      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    },
    onMouseMove(event) {
      if (!this.dragging) return;
      const resizeBox = this.$refs.resize;
      const moveY = event.clientY;
      const diff = moveY - this.startY;
      this.resizeConf.height = Math.max(this.startHeight - diff, 0);
      if (
        this.resizeConf.heightRange &&
        this.resizeConf.heightRange.length === 2
      ) {
        const viewportHeight = window.innerHeight;
        const maxHeight = viewportHeight - 270;
        this.resizeConf.heightRange = [40, maxHeight];
        if (
          this.resizeConf.height >= 0 &&
          this.resizeConf.height <= maxHeight
        ) {
          this.$emit("resize-finished", this.resizeConf.height);
        } else {
          console.log("超出" + this.resizeConf.height);
        }
      } else {
        console.log("错");
      }
    },
    onMouseUp() {
      this.dragging = false;
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);
    },
  },
  computed: {
    bottomPosition() {
      return this.resizeConf.bottomPosition;
    },
    heightRangeStyle() {
      return {
        minHeight: this.resizeConf.heightRange[0] + "px",
        maxHeight: this.resizeConf.heightRange[1] + "px",
      };
    },
  },
};
</script>
  
<style scoped>
.resize {
  position: fixed;
  left: 220px;
  right: 20px;
  /* overflow: auto; */
}

.handle-resize {
  cursor: n-resize;
  position: absolute;
  top: -4px;
  left: 0;
  width: 100%;
  height: 4px;
  /* background-color: #e6e5e5; */
  z-index: 999; /* 将 z-index 设置为一个较大的值 */
}
</style>
  
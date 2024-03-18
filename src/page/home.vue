<template>
  <div>
    <div class="echart1"></div>
    <div class="sa-flex">
      <div class="top">上面盒子</div>
      <ResizeBox :resize-conf="resizeConf" class="bottom"> jieg </ResizeBox>
    </div>
  </div>
</template>

<script>
import ResizeBox from "@/components/ResizeBox";
export default {
  name: "home",
  components: { ResizeBox },
  data() {
    return {
      resizeConf: {
        width: 280, // 初始宽度
        widthRange: [100, 500], // 宽度范围
        height: 200, // 初始高度
        heightRange: [100, 500], // 高度范围
        bottomPosition: 0,
      },
    };
  },
  created() {},
  mounted() {
    this.showEcharts();
  },

  methods: {
    showEcharts() {
      let myChart = this.$echarts.init(document.querySelector(".echart1"));
      myChart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      });
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
};
</script>

<style scoped lang="less">
.echart1 {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  /* background-color: skyblue; */
}

.sa-flex {

  .top {
    width: 1000px;
    height: 100px;
    background-color: #f19090;
  }

  .bottom {
    width: 100%;
    background-color: #a1d6fa;
  }
}
</style>
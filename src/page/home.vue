<template>
  <div>
    <div class="echart1"></div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
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
</style>
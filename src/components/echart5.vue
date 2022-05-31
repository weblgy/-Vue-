<template>
  <div id="echart5" :style="{ with: '100%', height: '100%' }"></div>
</template>

<script>
import EleResize from "./js/esresize";
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    drawEchart() {
      var chartDom = document.getElementById("echart5");
      var myChart = this.$echarts.init(chartDom);
      EleResize.on(chartDom, () => {
        myChart.resize();
      });
      var option;

      const data = [];
      for (let i = 0; i < 5; ++i) {
        data.push(Math.round(Math.random() * 200));
      }
      option = {
        xAxis: {
          max: "dataMax",
        },
        yAxis: {
          type: "category",
          data: ["A", "B", "C", "D", "E"],
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 2, // only the largest 3 bars will be displayed
        },
        series: [
          {
            realtimeSort: true,
            name: "X",
            type: "bar",
            data: data,
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
            },
          },
        ],
        legend: {
          show: true,
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      };
      function run() {
        for (var i = 0; i < data.length; ++i) {
          if (Math.random() > 0.9) {
            data[i] += Math.round(Math.random() * 2000);
          } else {
            data[i] += Math.round(Math.random() * 200);
          }
        }
        myChart.setOption({
          series: [
            {
              type: "bar",
              data,
            },
          ],
        });
      }
      setTimeout(function () {
        run();
      }, 0);
      setInterval(function () {
        run();
      }, 3000);

      option && myChart.setOption(option);
    },
  },
  created() {},
  mounted() {
    this.drawEchart();
  },
};
</script>
<style lang="less" scoped>
</style>
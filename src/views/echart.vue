<template>
  <div class="echart">
    <div class="title"></div>
    <div class="box">
      <div class="left_box">
        <div>
          <echart-3 />
        </div>
        <div>
          <echart-4 />
        </div>
      </div>
      <div class="center_box">
        <div class="center_top">
          <echart-1 />
        </div>
        <div class="center_bottom">
          <echart-2 />
        </div>
      </div>
      <div class="right_box">
        <div>
          <echart-5 />
        </div>
        <div>
          <echart-6 />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echart1 from "../components/echart1.vue";
import Echart2 from "../components/echart2.vue";
import Echart3 from "../components/echart3.vue";
import Echart4 from "../components/echart4.vue";
import Echart5 from "../components/echart5.vue";
import Echart6 from "../components/echart6.vue";
export default {
  components: { Echart1, Echart2, Echart3, Echart4, Echart5, Echart6 },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>


<style lang="less" scoped>
.echart {
  width: 100%;
  height: 100%;
  background: url("../assets/background.jpeg") no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  .title {
    width: 100%;
    height: 15%;
    background: url("../assets/top.png") no-repeat;
  }
  .box {
    width: 100%;
    height: 85%;
    display: flex;
    justify-content: space-between;
    .left_box {
      width: 33%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      div {
        width: 100%;
        height: 49%;
      }
    }
    .center_box {
      width: 33%;
      // background: red;
      .center_top {
        height: 70%;
        // background: cadetblue;
      }
      .center_bottom {
        height: 30%;
        // background: chocolate;
      }
    }
    .right_box {
      width: 33%;
      // background: brown;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      div {
        width: 100%;
        height: 66%;
        // background: cyan;
        &:first-child {
          height: 33%;
        }
      }
    }
  }
}
</style>

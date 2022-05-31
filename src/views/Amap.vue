<template>
  <div class="amap">
    <el-amap class="amap-box" :vid="'amap-vue'" :events="mapEvents"></el-amap>
  </div>
</template>


<script>
export default {
  data() {
    return {
      mapEvents: {
        init(o) {
          o.setMapStyle("amap://styles/5e2f3abfd39cb5718a92b2f1dcc56d19"); //自定义的高德地图的样式
        },
      },
    };
  },
};
</script>

<style scoped>
.amap {
  width: 100%;
  height: 100%;
}
</style>
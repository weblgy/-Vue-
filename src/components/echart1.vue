<template>
  <div id="globe3D" :style="{ width: '100%', height: '100%' }"></div>
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
      /****************** 3D地球 ********************/

      var ROOT_PATH =
        "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples";
      //初始化echart实例
      const globe3D = this.$echarts.init(document.getElementById("globe3D"));
      const resizeDiv = document.getElementById("globe3D");
      EleResize.on(resizeDiv, () => {
        globe3D.resize();
      });
      //配置项
      const globeOpt = {
        globe: {
          zoom: 0.9,
          environment: ROOT_PATH + "/data-gl/asset/starfield.jpg", //环境贴图
          baseTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg", //地球的纹理
          heightTexture:
            ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg", //地图的高度纹理
          displacementScale: 0, //地球顶点位移的大小
          shading: "realistic", //着色效果，真实感渲染
          realisticMaterial: {
            //真实感渲染配置
            roughness: 0.8, //材质的粗糙度
          },
          postEffect: {
            //后处理特效配置
            enable: true,
          },
          // viewControl: {   //控制地球是否自转
          //     autoRotate: false
          // },
          light: {
            //光照设置
            main: {
              //场景主光源设置，在globe设置中就是太阳光
              intensity: 4, //主光源强度
              shadow: true, //是否投影
            },
            ambientCubemap: {
              //使用纹理作为光源的环境光， 会为物体提供漫反射和高光反射
              // texture: ROOT_PATH + "/data-gl/asset/pisa.hdr", //环境光贴图
              diffuseIntensity: 0.1, //漫反射强度
            },
          },
        },
      };
      //渲染图表
      globe3D.setOption(globeOpt);
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
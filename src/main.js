import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAMap from 'vue-amap'
import 'lib-flexible'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'
import 'echarts-gl';


Vue.prototype.$echarts = echarts
Vue.use(VueAMap)
Vue.use(ElementUI)
Vue.config.productionTip = false




VueAMap.initAMapApiLoader({
  key: "f8952cecccfbef96f45b583368c56457",
  plugin: [
    'AMap.MarkerClusterer', // 点聚合插件 
    'AMap.Scale', // 比例尺，显示当前地图中心的比例尺
    'AMap.ToolBar', // 工具条，控制地图的缩放、平移等
    'AMap.Driving', // 根据起始坐标规划行车路线
    'AMap.MapType', // 图层切换，用于几个常用图层切换显示
    'AMap.Geolocation', // 定位，提供了获取用户当前准确位置、所在城市的方法
    'AMap.ElasticMarker', // 灵活点标记，可以随着地图级别改变样式和大小的 Marker
    'AMap.Autocomplete', // 输入提示，提供了根据关键字获得提示信息的功能
    'AMap.PlaceSearch', // 地点搜索服务，提供了关键字搜索、周边搜索、范围内搜索等功能
    'AMap.PolyEditor', // 折线、多边形编辑插件
    'AMap.CircleEditor', // 圆编辑插件
    'AMap.MouseTool', // 鼠标工具插件
    'AMap.RangingTool', // 测距插件，可以用距离或面积测量
    'AMap.DistrictSearch', // 行政区划查询    
    'AMap.Geocoder', // 地理编码与逆地理编码服务，提供地址与坐标间的相互转换
    'AMap.Heatmap', //热力图
    'AMap.DragRoute'
  ],
  uiVersion: '1.0.11'
});

window._AMapSecurityConfig = {
  securityJsCode:'4339653c8072b6507f771867130998b3',
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
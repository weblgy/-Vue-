<template>
  <div class="home">
    <!-- {{ mesg | transformFillter }}
    <input type="text" /> -->

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      mesg: "home",
    };
  },
  filters: {
    // 首字母大写
    transformFillter: function (val) {
      let strs = val.split(" ");
      let result = "";
      for (let i = 0; i < strs.length; i++) {
        result += strs[i].charAt(0).toUpperCase() + strs[i].substring(1) + "";
      }
      return result;
    },
  },
  // 页面缓存后的两个生命周期钩子函数
  activated() {
    console.log("进入main组件");
  },
  deactivated() {
    console.log("离开main组件");
  },
};
</script>

<template>
  <div>
    <el-container>
      <el-container>
        <el-header>
          <ul class="nav" @click="navClick">
            <!-- <li><router-link to="/about">Map</router-link></li>
            <li><router-link to="/chart">Chart</router-link></li>
            <li><router-link to="/study">study</router-link></li>
            <li><router-link to="/chart">Chart</router-link></li> -->
            <li>amap</li>
            <li>chart</li>
            <li>study2</li>
            <li>echart</li>
          </ul>
        </el-header>

        <Main></Main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Main from "./main.vue";
export default {
  components: { Main },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    navClick(event) {
      let e = event || window.event;
      let source = e.target || e.srcElement;
      if (source.nodeName.toLowerCase() == "li") {
        this.$router.push(`/${source.innerHTML}`)
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.nav {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  list-style-type: none;
}
.nav li {
  width: 100%;
}
</style>
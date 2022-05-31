<template>
  <div class="wrapper">
     {{mesg}} <input type="text">
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
    <div class="box5"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      mesg :"chart组件被缓存了"
    }
  }
}
</script>

<style scoped>
.wrapper div {
  height: 1rem;
}
.box1 {
  /* 375 * 20% */
  width: 75px;
  background-color: coral;
}
.box2 {
  /* 375 * 40% */
  width: 150px;
  background-color: skyblue;
}
.box3 {
  /* 375 * 60% */
  width: 225px;
  background-color: palegreen;
}
.box4 {
  /* 375 * 80% */
  width: 300px;
  background-color: wheat;
}
.box5 {
  /* 375 * 100% */
  width: 375px;
  background-color: darkred;
}
</style>
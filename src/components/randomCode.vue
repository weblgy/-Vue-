<template>
  <div id="dom"></div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    verify(a = 6, b = "num") {
      //定义三个随机验证码验证码库
      var num = "0123456789";
      var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNIPQRSTUVWXYZ";
      var mixin = num + str;

      //定义一个空字符串用来存放验证码
      var verify = "";
      if (a == undefined || b == undefined) {
        //验证输入是否合法  不通过就抛出一个异常
        throw new Error("参数异常");
      } else {
        if (a == "" || b == "") {
          //判断用户是否没有输入
          throw new Error("参数非法.");
        } else {
          //检测输入的类型来判断是否进入
          var typea = typeof a;
          var typeb = typeof b;
          if (typea == "number" && typeb == "string") {
            if (b == "num") {
              //定义一个循环来接收验证码    纯数字验证码
              for (let i = 0; i < a; i++) {
                //定义一个变量来存储颜色的随机值
                let r1 = Math.random() * 255;
                let g1 = Math.random() * 255;
                let b1 = Math.random() * 255;

                //确定随机索引
                let index = Math.floor(Math.random() * (num.length - 1));
                //确定随机的验证码
                let char = num[index];
                //给随机的验证码加颜色
                verify += `<span style ='color:rgb(${r1},${g1},${b1})'>${char}</span>`;
              }
              //返回到数组本身
              return verify;
            } else if (b == "str") {
              for (let i = 0; i < a; i++) {
                //纯字母的验证码
                let r1 = Math.random() * 255;
                let g1 = Math.random() * 255;
                let b1 = Math.random() * 255;

                let index = Math.floor(Math.random() * (str.length - 1));
                let char = str[index];

                verify += `<span style ='color:rgb(${r1},${g1},${b1})'>${char}</span>`;
              }
              return verify;
            } else if (b == "mixin") {
              // 混合型的验证码
              for (let i = 0; i < a; i++) {
                let r1 = Math.random() * 255;
                let g1 = Math.random() * 255;
                let b1 = Math.random() * 255;

                let index = Math.floor(Math.random() * (mixin.length - 1));
                let char = mixin[index];

                verify += `<span style ='color:rgb(${r1},${g1},${b1})'>${char}</span>`;
              }
              return verify;
            } else {
              //验证没通过抛出一个异常
              throw new Error("输入类型非法.");
            }
          } else {
            //验证没通过抛出一个异常
            throw new Error("输入类型非法.");
          }
        }
      }
    },
  },
  created() {},
  mounted() {
    let arr = this.verify(8, "mixin");
    let oDiv = document.getElementById("dom");
    oDiv.innerHTML = arr;
  },
};
</script>
<style lang="less" scoped>
</style>
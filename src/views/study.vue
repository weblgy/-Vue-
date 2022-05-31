<template>
  <div>
    <h3>冒泡、sort排序</h3>
    数组：{{ array }}
    <button @click="arrayDuplicetion">数组去重</button>
    <button @click="sortArray">冒泡排序</button>
    <button @click="sort">sort排序</button><br />

    <h3>右键保存重命名图片</h3>
    <a
      :download="disable ? imgName : false"
      href="#"
      @click="setDisable(false)"
    >
      <img :src="url" @contextmenu="setDisable(true)" />
    </a>

    <h3>JSON字符转JSON对象</h3>
    <button @click="jsonClick">转换</button>
    {{ newStr }}
    <h3>select组件bug</h3>
    <el-table :data="tableData1" style="width: 100%">
      <el-table-column label="设备名称" width="180">
        <template>
          <el-select v-model="value" placeholder="请选择" @change="test(value)">
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户姓名"> </el-table-column>
      <el-table-column prop="parname" label="部门名称"> </el-table-column>
      <el-table-column prop="startdate" label="授权起始时间"> </el-table-column>
      <el-table-column prop="enddate" label="授权结束时间"> </el-table-column>
    </el-table>
    <random-code />

    <el-radio v-model="radio.item.in" label="1">备选项</el-radio>
    <el-radio v-model="radio.item.in" label="2">备选项</el-radio>
  </div>
</template>

<script>
import RandomCode from "../components/randomCode.vue";
export default {
  components: { RandomCode },
  props: {},
  data() {
    return {
      imgName: "小勾.jpg", //另存为的文件名
      disable: false, //是否可另存为
      url: "http://10.20.37.134:8888/group1/M00/00/1B/ChQlhmGRwfiAP6W9AAJKlPWSIVg966.bmp",
      array: [5, 4, 3, 2, 1, 1, 3, 2],
      newArray: [],
      str: ['{"time1":"00:00"}'],
      newStr: null,
      arr: [{}],
      tableData: [
        {
          id: 1,
          startdate: "2016-05-02",
          enddate: "2020-06-28",
          name: "华为",
          number: "4253125",
          username: "张三",
          parname: "人事部",
        },
        {
          id: 2,
          startdate: "2016-05-04",
          enddate: "2020-06-29",
          name: "小米",
          number: "2536125",
          username: "李四",
          parname: "技术部",
        },
        {
          id: 3,
          startdate: "2016-05-01",
          enddate: "2020-06-27",
          name: "苹果",
          number: "1256542",
          username: "王五",
          parname: "营销部",
        },
        {
          id: 4,
          startdate: "2016-05-03",
          enddate: "2020-06-26",
          name: "三星",
          number: "2564582",
          username: "郭涛",
          parname: "广告部",
        },
      ],
      value: "",
      radio: {
        item: {
          in: "2"
        }
      }
    };
  },
  watch: {
    newArray(value, oldValue) {
      console.log(value, oldValue);
    },
    deep: true,
  },
  computed: {
    tableData1() {
      return this.arr;
    },
  },
  methods: {
    test(value) {
      this.arr = [];
      this.tableData.map((item) => {
        if (item.id == value) {
          this.arr.push(item);
          return;
        }
      });
    },
    //JSON字符转JSON对象
    jsonClick() {
      this.newStr = JSON.parse(this.str[0]);
      console.log(this.newStr);
    },
    setDisable(val) {
      //设置
      this.disable = val;
    },
    // 数组去重
    arrayDuplicetion() {
      for (let i = 0; i < this.array.length; i++) {
        if (this.newArray.indexOf(this.array[i]) == -1) {
          this.newArray.push(this.array[i]);
        }
      }
      this.array = this.newArray;
    },
    sortArray() {
      let temp = 0;
      for (let i = 0; i < this.array.length; i++) {
        for (let j = 0; j < this.array.length - i; j++) {
          if (this.array[j] > this.array[j + 1]) {
            temp = this.array[j + 1];
            this.array[j + 1] = this.array[j];
            this.array[j] = temp;
          }
        }
      }
      //   this.array = Object.assign([],this.array)
      this.$set(this.array, [], this.array);
    },
    sort() {
      this.array.sort((a, b) => {
        return a - b;
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>
<template>
  <!-- 第三步，车道配置  尚 修改后文件-->
  <div class="jr-road-channel">
    <!-- 画布 -->
    <div ref="cvsWrap" class="jr-canvas-wrap">
      <canvas
        ref="cvs"
        :width="cvswidth"
        :height="cvsheight"
        @click="changeLaneTurn($event)"
      >浏览器不支持canvas</canvas>
      <div class="jr-canvas-btns">
        <input ref="files" type="file" style="display:none" @change="exportIn_" />
        <el-button type="primary" plain @click="exportIn">
          <i class="btn-export-in" />导入
        </el-button>
        <el-button type="primary" plain @click="exportOut">
          <i class="btn-export-out" />导出
        </el-button>
      </div>
    </div>
    <!-- 表单 -->
    <div class="jr-lane-config">
      <div class="jr-lane-con">
        <div class="jr-sel-dir">
          <el-button
            v-for="(d,i) in dirs"
            :key="i"
            :class="i===dirIndex?'btn-dir-act':''"
            @click="setDirIndex(i)"
          >方向{{ i+1 }}</el-button>
        </div>
        <!-- 右侧表单区 -->
        <div class="jr-lane-set">
          <!-- 道路公共配置 -->
          <el-form :inline="true" :model="dirForm" class="roadconfigdiv">
            <div class="h4div">道路公共配置</div>
            <el-form-item
              v-if="dirForm.outLanesNum>0&&dirForm.inLanesNum>0"
              class="fenge"
              label="分隔形式:"
            >
              <el-radio-group v-model="dirForm.divide" @change="setRoadDivide">
                <el-radio :label="0">单黄线</el-radio>
                <el-radio :label="1">双黄线</el-radio>
                <el-radio :label="2">绿化带</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="人行横道:">
              <el-radio-group v-model="dirForm.isSideWalk" @change="setRoadSideWalk">
                <el-radio :label="1">有</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <!-- 进出口 -->
          <div class="HorizonRoad">
            <div>
              <!-- 进口车道配置 -->
              <el-form :inline="true" :model="dirForm" class="portForm">
                <div class="h4div">进口车道配置</div>
                <el-form-item label="进口车道数:">
                  <el-select
                    v-model="dirForm.inLanesNum"
                    class="seldiv"
                    @change="setRoadInLanesNum"
                  >
                    <el-option
                      v-for="n in inLaneNumOpt"
                      :key="n.value"
                      :label="n.value"
                      :value="n.value"
                      :disabled="n.disabled"
                    />

                    <!-- <el-option v-for="n in 8" :key="n" :label="n" :value="n" /> -->
                  </el-select>
                </el-form-item>
                <el-form-item label="车道宽度(m):">
                  <el-input v-model="dirForm.inLaneWidths" @change="setRoadInLanesWid" />
                </el-form-item>
                <el-form-item label="非机动车道:">
                  <el-radio-group v-model="dirForm.isInUnvehi" @change="setRoadInUnvehi">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="车道宽度(m):">
                  <el-input
                    v-model="dirForm.inUnvehiWid"
                    :disabled="dirForm.isInUnvehi==0"
                    @blur="setRoadInUnvehiWid"
                  />
                </el-form-item>
                <el-form-item
                  v-if="dirForm.inLanesNum"
                  class="wait"
                  label="是否有待转区:"
                >
                  <span v-for="(di,idx) in dirForm.inLanes" :key="idx">
                    <el-select v-if="di.properties!=3" v-model="di.hasWaitingArea" :disabled="di.turn!==12 && di.turn!==11" @change="waitingArea"> 
                      <el-option label="是" :value="1"></el-option>
                      <el-option label="否" :value="0"></el-option>
                    </el-select>
                  </span>
                  <span style="color:#e6a46e;font-size:12px">(车道从里向外排序)</span>
                </el-form-item>
                <el-form-item v-if="dirs.length > 2" label="是否有右转专用车道:">
                  <el-radio-group v-model="dirForm.rightTurnLane" @change="hasRightTurnLane">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <!--出口车道配置  -->
              <el-form :inline="true" :model="dirForm" class="portForm2">
                <div class="h4div">出口车道配置</div>
                <el-form-item label="出口车道数:">
                  <el-select
                    v-model="dirForm.outLanesNum"
                    class="seldiv"
                    @change="setRoadOutLanesNum"
                  >
                    <el-option
                      v-for="n in outLaneNumOpt"
                      :key="n.value"
                      :label="n.value"
                      :value="n.value"
                      :disabled="n.disabled"
                    />
                    <!-- <el-option v-for="n in 9" :key="n" :label="n-1" :value="n-1" /> -->
                  </el-select>
                </el-form-item>
                <el-form-item label="车道宽度(m):">
                  <el-input v-model="dirForm.outLaneWidths" @change="setRoadOutLanesWid" />
                </el-form-item>
                <el-form-item label="非机动车道:">
                  <el-radio-group v-model="dirForm.isOutUnvehi" @change="setRoadOutUnvehi">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="车道宽度(m):">
                  <el-input
                    v-model="dirForm.outUnvehiWid"
                    :disabled="dirForm.isOutUnvehi==0"
                    @blur="setRoadOutUnvehiWid"
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- 路段配置 -->
          <el-form :model="dirForm" label-width="95px" class="roadconfigdiv2">
            <div class="h4div">路段配置</div>
            <el-row>
              <el-col :span="11">
                <el-form-item label-width="100px" label="上游路口:" class="inputSearch">
                  <!-- <el-input v-model="dirForm.upRoad" class="jr-lane-name" @focus="setFocusName(1,'inRoadName')" @change="setupstream" /> -->
                  <template>
                    <el-autocomplete
                      v-model="dirForm.upRoad.name"
                      class="searchInput"
                      :fetch-suggestions="querySearch"
                      placeholder="请输入上游路段查询"
                      :trigger-on-focus="false"
                      popper-append-to-body
                      @select="handleSelect"
                      @input="searchUperRoad"
                      @keyup.enter.native="searchUperRoad"
                    >
                      <template slot-scope="{ item }">
                        <div class="name">{{ item.name }}</div>
                        <span class="code">{{ item.code }}</span>
                      </template>
                    </el-autocomplete>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label-width="0">
                  <el-button class="jr-maproad-btn" @click="showMapRoad( )" />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label-width="0">
                  <el-button
                    :disabled="dirForm.upRoad.name!==''? false:true"
                    @click="newRoadBtn"
                  >生成路段</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label-width="100px" label="进口路段:">
              <el-input
                v-model="dirForm.inRoadName"
                class="jr-lane-name"
                readonly
                :disabled="dirForm.inLanesNum==0"
                @focus="setFocusName(1,'inRoadName')"
                @change="setInRoadName"
              />
            </el-form-item>
            <el-form-item label-width="100px" label="出口路段:">
              <el-input
                v-model="dirForm.outRoadName"
                class="jr-lane-name"
                readonly
                :disabled="dirForm.outLanesNum==0"
                @focus="setFocusName(0,'outRoadName')"
                @change="setOutRoadName"
              />
            </el-form-item>
            <el-form-item label-width="100px" label="行驶方向;">
              <el-select v-model="dirForm.drivingDirection" class="jr-lane-name-dir">
                <el-option
                  v-for="dri in drivingDirection"
                  :key="dri.value"
                  :label="dri.label"
                  :value="dri.value"
                />
              </el-select>
            </el-form-item>
            <p class="jr-lane-tips">tips:每个方向的进出口路段均需要正确配置</p>
          </el-form>
          <!-- 上一步，下一步 按钮区 -->
          <div class="jr-save-btns">
            <el-button type="primary" @click="exit">退出</el-button>
            <el-button @click="preFlowPhaseConfig">上一步</el-button>
            <el-button type="primary" @click="saveChannelData()">保存数据</el-button>
            <el-button @click="goFlowPhaseConfig">下一步</el-button>
          </div>
        </div>
      </div>
      <!-- 路段 卡片 -->
      <div class="jr-lane-sch">
        <!-- <el-input placeholder="输入路段名称/编号" @keyup.native.enter="getCurrentList(1)">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="getCurrentList(1)" />
        </el-input>-->
        <!-- <i class="el-icon-circle-plus-outline btn-road-add" /> -->
        <div
          v-for="road in roadList"
          :key="road.code"
          class="jr-roadname-card"
          :class="road.name==dirForm[focusname]?'act':''"
          @click="setRoadName(road)"
        >
          <h4>{{ road.name }}</h4>
          <div class="jr-start-end">
            <b>始</b>
            <i />
            <b>止</b>
          </div>
          <div class="jr-roadcard-info">
            <p>{{ road.fromJncName }}</p>
            <span>{{ road.direction1Name }}</span>
            <span>{{ road.numLanes||0 }}</span>
            <span>{{ road.length||0 }} m</span>
            <p>{{ road.toJncName }}</p>
          </div>
        </div>
        <!-- <el-pagination
          layout=" prev, pager, next"
          :total="pageTotal"
          :page-size="roadSearchParam.pageSize"
          :current-page.sync="roadSearchParam.pageNum"
          @prev-click="getCurrentList"
          @next-click="getCurrentList"
          @current-change="getCurrentList"
        />-->
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog :visible.sync="showDlg" class="jr-turns-dlg" center @close="closeDlg()">
      <img
        v-for="img in turnBtns"
        :key="img.name"
        class="jr-turnimg-btn"
        :src="img.img"
        :alt="img.title"
        :title="img.title"
        @click="changeTurn(img.code)"
      />
    </el-dialog>
    <!-- 地图 显示当前路口 弹窗 -->
    <el-dialog
      :title="jncName"
      :visible.sync="isShowMapRoad"
      :close-on-click-modal="false"
      :fullscreen="true"
      width="80%"
      center
      class="show-map-class"
      custom-class="maproaddlg"
      @close="closeMapDlg"
    >
      <a-map ref="map" @getPosition="getPosition" />
      <el-dialog
        width="30%"
        title="当前点附近路口"
        :visible.sync="isShowUpperRoadsList"
        :modal="false"
        custom-class="maproadlistdlg"
        append-to-body
      >
        <el-radio-group
          v-model="upperRoadsListIndex"
          class="jr-upperroads-list"
          @change="selUpperRoad"
        >
          <el-radio v-for="(r,i) in upperRoadsList" :key="i" :label="i">{{ r.name }}</el-radio>
        </el-radio-group>
      </el-dialog>
    </el-dialog>
    <!-- 生成路段 弹框 -->
    <el-dialog :visible.sync="dialogVisible" width="30%" top="8vh" :close-on-click-modal="true">
      <div class="addUser">生成路段:</div>
      <div class="hengxian" />
      <div class="tableDiv">
        <el-form
          ref="adminareaForm"
          :model="adminareaItem"
          :rules="rules"
          :label-position="labelPosition"
          label-width="140px"
        >
          <el-form-item label="行政区划:" prop="adminareaItem.administrativeName">
            <el-select v-model="adminareaItem.administrativeName" placeholder="请选择">
              <el-option
                v-for="op in adminDivisionCode"
                :key="op.dictData"
                :label="op.dictLabel"
                :value="op.dictData"
                disabled
              />
            </el-select>
          </el-form-item>
          <el-form-item label="路段名称:" prop="fullname">
            <el-input v-model="adminareaItem.fullname" />
          </el-form-item>
          <el-form-item label="起始路口:" prop="fromwhereName">
            <el-input v-model="adminareaItem.towhereName" />
          </el-form-item>
          <el-form-item label="终止路口:" prop="towhereName">
            <el-input v-model="adminareaItem.fromwhereName" />
          </el-form-item>
          <el-form-item label="路段长度(m):" prop="lulength" required>
            <el-input v-model="adminareaItem.lulength" />
          </el-form-item>
          <el-form-item label="车道数:" prop="chedaonum">
            <el-input v-model="adminareaItem.chedaonum" />
          </el-form-item>
          <el-form-item label="自由流速度(km/h):" prop="freeFlowVelocity">
            <el-input v-model="adminareaItem.freeFlowVelocity" />
          </el-form-item>
          <el-form-item label="方向:" prop="ludirection">
            <div class="fangxiangdiv">
              <div
                v-for="(fangwei,index) in directions"
                :key="fangwei.dictData"
                class="clickdiv"
                :class="{'active':clickFlag == index+1}"
                @click="selectCard(fangwei,index)"
              >{{ fangwei.dictLabel }}</div>
            </div>
          </el-form-item>
          <el-form-item label="是否二次识别:" prop="delivery">
            <el-switch v-model="adminareaItem.delivery" active-value="1" inactive-value="0" />
          </el-form-item>
        </el-form>
        <div class="dashdiv" />
        <div class="secondform">
          <el-form
            ref="adminareaForm2"
            v-model="adminareaItem2"
            :label-position="labelPosition"
            label-width="140px"
          >
            <el-form-item>
              <div class="checkdiv">
                <el-checkbox v-model="checkedValue" size="medium" style="margin-top:10px;" />是否创建反向路段
              </div>
            </el-form-item>
            <el-form-item label="反向路段名称:" prop="fxname">
              <el-input v-model="adminareaItem2.fxname" />
            </el-form-item>
            <el-form-item label="反向路段车道数(m):" prop="cdNum">
              <el-input v-model="adminareaItem2.cdNum" />
            </el-form-item>
            <el-form-item label="自由流速度(km/h):" prop="freeFlowVelocity2">
              <el-input v-model="adminareaItem2.freeFlowVelocity2" />
            </el-form-item>
          </el-form>
        </div>
        <div class="jr-attr-btn-submit">
          <el-button type="primary" @click="submitAdminArea">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  pi,
  turnName,
  getTwoPointDis,
  getInLinePoint,
  getOutLinePoint,
  imgDirObjs,
  Point,
  InLane,
  OutLane,
  RoadChan
} from '@/utils/channelize-base.js'
import {
  queryRoadsSection,
  saveChannelizationData,
  getDict,
  queryRoadsByCode,
  queryRoadsByRange
} from '@/api/user.js'
import { getMapAdd, getUperRoadList } from '@/api/systemSetting' // 弹框保存
import AMap from '@/components/Common/AMap'
export default {
  components: { AMap },
  data() {
    return {
      dialogVisible: false, // 生成菜单弹框
      adminareaItem: {
        // 生成路段表单
        fullname: '',
        fromwhere: '',
        fromwhereName: '',
        towhere: '',
        towhereName: '',
        lulength: '',
        chedaonum: '',
        ludirection: '',
        freeFlowVelocity: 60, // 自由流速度
        delivery: true // 是否二次识别
      },
      // 方位div
      directions: [],
      // 方位选中项
      clickFlag: null,
      adminareaItem2: {
        freeFlowVelocity2: 60,
        cdNum: ''
      },
      labelPosition: 'right',
      checkedValue: false,
      adminDivisionCode: [], // 行政区划
      oldRoadName: '', // 点击的原路口名称
      dirForm: {
        // 进出口路段表单
        // inLaneWidths: 3.5,
        // inLanesNum: 3,
        // outLaneWidths: 3.5,
        // outLanesNum: 3
        upRoad: { name: '', code: '' }, // 上游路段
        inRoadName: '', // 进口路段
        outRoadName: '', // 出口路段
        drivingDirection: '' // 行驶方向
      },
      inLaneNumOpt: Array.from({ length: 9 }, (item, index) => {
        return { value: index, disabled: false }
      }),
      outLaneNumOpt: Array.from({ length: 9 }, (item, index) => {
        return { value: index, disabled: false }
      }),
      rules: {
        lulength: [
          { required: true, message: '长度不能为空', trigger: 'blur' },
          { type: 'number', message: '必须是数字', trigger: ['blur', 'change'] }
        ],
        chedaonum: [
          { required: true, message: '车道数不能为空', trigger: 'blur' },
          { type: 'number', message: '必须是数字', trigger: ['blur', 'change'] }
        ],
        freeFlowVelocity: [
          { type: 'number', message: '必须是数字', trigger: ['blur', 'change'] }
        ],
        cdNum: [
          { type: 'number', message: '必须是数字', trigger: ['blur', 'change'] }
        ],
        freeFlowVelocity2: [
          { type: 'number', message: '必须是数字', trigger: ['blur', 'change'] }
        ]
      },
      // upRoadCode: '',
      toJncCode: '',
      upRoadList: [], // 上游路段模糊查询列表
      showDlg: false,
      dirIndex: 0, // 道路下标
      inLaneIndex: 0, // 进口车道下标
      outLaneIndex: 0,
      drivingDirection: [
        { value: 1, label: '东 -> 西' },
        { value: 2, label: '南 -> 北' },
        { value: 3, label: '西 -> 东' },
        { value: 4, label: '北 -> 南' }
      ],
      roadList: [], // 路口名称列表
      roadSearchParam: {
        // 搜索路口名称参数 type:1 进口，type:0 出口
        // keyWord: '',
        // pageSize: 5,
        // pageNum: 1,
        currentJncCode: this.$store.state.road.jncCode, // 当前路口编号
        type: 1
      },
      // pageTotal: 0, // 总数
      cvs: null,
      ctx: null,
      cvs_: null,
      ctx_: null,
      cvs_bg: null,
      ctx_bg: null,
      cvswidth: 0,
      cvsheight: 0,
      roadChan: null,
      imgDirObjs: imgDirObjs,
      focusname: '',
      turnBtns: [
        {
          name: 'round',
          code: 31,
          title: '掉头',
          img: require('@/assets/images/SystemSetting/road/round01.png')
        },
        {
          name: 'left',
          code: 12,
          title: '左转',
          img: require('@/assets/images/SystemSetting/road/left01.png')
        },
        {
          name: 'straight',
          code: 11,
          title: '直行',
          img: require('@/assets/images/SystemSetting/road/straight01.png')
        },
        {
          name: 'right',
          code: 13,
          title: '右转',
          img: require('@/assets/images/SystemSetting/road/right01.png')
        },
        {
          name: 'straightright',
          code: 22,
          title: '直行右转',
          img: require('@/assets/images/SystemSetting/road/straightright01.png')
        },
        {
          name: 'leftround',
          code: 32,
          title: '左转掉头',
          img: require('@/assets/images/SystemSetting/road/leftround01.png')
        },
        {
          name: 'leftstraight',
          code: 21,
          title: '左转直行',
          img: require('@/assets/images/SystemSetting/road/leftstraight01.png')
        },
        {
          name: 'leftstraright',
          code: 24,
          title: '左转直行右转',
          img: require('@/assets/images/SystemSetting/road/leftstraright01.png')
        },
        {
          name: 'leftright',
          code: 23,
          title: '左转右转',
          img: require('@/assets/images/SystemSetting/road/leftright01.png')
        },
        {
          name: 'none',
          code: 0,
          title: '无标',
          img: require('@/assets/images/SystemSetting/road/none.png')
        }
      ],
      isShowMapRoad: false,
      isShowUpperRoadsList: false,
      jncLat: this.$store.state.road.jncLat,
      jncLon: this.$store.state.road.jncLon,
      jncMarker: null, // 当前路口marker
      upperMarker: null, // 上游路口marker
      upperRoadsList: [],
      upperRoadsListIndex: -1
    }
  },
  computed: {
    dirs: {
      // 方向1,2,3,4
      get() {
        return this.$store.state.road.dirs
      },
      set(v) {
        this.$store.commit('setDirs', v)
      }
    },
    jncCode() {
      return this.$store.state.road.jncCode
    },
    jncName() {
      return this.$store.state.road.jncName
    }
  },
  watch: {
    // 'dirForm.upRoad'(n){
    //   if(n===''){
    //     this.dirForm.upRoad.code=''
    //     this.dirs[this.dirIndex]=this.dirForm
    //     this.drawRoadLanes()
    //   }
    // }
    'dirForm.inLanesNum'(n) {
      // inLaneNumOpt
      if (n === 0) {
        this.outLaneNumOpt[0].disabled = true
      } else {
        this.outLaneNumOpt[0].disabled = false
      }
    },
    'dirForm.outLanesNum'(n) {
      if (n === 0) {
        this.inLaneNumOpt[0].disabled = true
      } else {
        this.inLaneNumOpt[0].disabled = false
      }
    }
  },
  created() {
    // 设置初始 dirForm
    for (const j in this.dirs[0]) {
      this.$set(this.dirForm, j, this.dirs[0][j])
    }
    // 离屏canvas
    this.cvs_ = document.createElement('canvas')
    this.ctx_ = this.cvs_.getContext('2d')
    this.cvs_bg = document.createElement('canvas')
    this.ctx_bg = this.cvs_bg.getContext('2d')
  },
  mounted() {
    // console.log('this.dirs:', this.dirs)
    this.render()
    this.searchRoad()
    this.initDict()
    // window.onresize = () => {
    //   this.render()
    // }
  },
  methods: {
    initDict() {
      // 弹框行政下拉框
      getDict('ADMINDIVISIONCODE').then(res => {
        this.adminDivisionCode = res.data
        // console.log('行政区域：', this.adminDivisionCode)
      })
      getDict('JNCS_DIRECTION').then(res => {
        this.directions = res.data
      })
    },
    // 地图中展示当前路口
    showMapRoad() {
      this.isShowMapRoad = true
      setTimeout(() => {
        this.$refs.map && this.$refs.map.clearMap()
        this.jncMarker = this.$refs.map.drawPoint(this.jncLon, this.jncLat, {
          type: 'blue',
          title: this.jncName
        })
        this.$refs.map.setCennter(this.jncLon, this.jncLat)
        // 路口居中
        this.$refs.map.closePosition()
        this.$refs.map.getPosition()
        // 放大层级
        this.$refs.map.setZoom(18)
      }, 500)
      // this.$nextTick(() => {
      //   // 画路口marker
      //   if (this.jncMarker) {
      //     this.$refs.map.getMap().remove(this.addMarker)
      //   }
      //   console.log(this.$refs)
      //   console.log(this.$refs.map)
      //   this.jncMarker = this.$refs.map.drawPoint(
      //     this.jncLon,
      //     this.jncLat,
      //     'blue'
      //   )
      // console.log('jncMarker', this.jncMarker)
      // })
    },
    // 点击地图 选择上游路口
    getPosition(p) {
      if (this.upperMarker) {
        this.$refs.map.removeMarkers('red')
      }
      const [lng, lat] = p
      this.upperMarker = this.$refs.map.drawPoint(lng, lat, {
        type: 'red'
      })
      queryRoadsByRange({ jncLon: lng, jncLat: lat, range: 0.5, needSignal: '' }).then(re => {
        this.upperRoadsList = re.data
        if (this.upperRoadsList.length > 0) {
          this.isShowUpperRoadsList = true
        }
      })
    },
    // 点击 选择路口
    selUpperRoad() {
      // console.log(this.upperRoadsList[this.upperRoadsListIndex])
      const data = this.upperRoadsList[this.upperRoadsListIndex]
      this.handleSelect(data)
      this.closeMapDlg()
    },
    // 关闭地图弹窗 回调
    closeMapDlg() {
      // 清空数据 关闭弹窗
      this.isShowUpperRoadsList = false
      this.isShowMapRoad = false
      this.upperRoadsList = []
      this.upperRoadsListIndex = -1
    },
    // 模糊查询, 输入的方法
    querySearch(queryString, cb) {
      const searchList = this.upRoadList
      const results = queryString
        ? searchList.filter(this.createFilter(queryString))
        : searchList
      // 调用 callback 返回建议列表的数据
      getUperRoadList({ keyWord: queryString }).then(res => {
        console.log('模糊查询：', res.data)
        this.upRoadList = res.data.list.map(item => {
          return {
            name: item.name,
            code: item.code,
            value: item.name
          }
        })
      })
      cb(searchList)
    },
    createFilter(queryString) {
      return searchList => {
        if (searchList.value) {
          return (
            // 改为===0 就是筛选的数据只是首字匹配的列表项，需要包含输入字的所有列表项改为！==-1
            // searchList.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
            searchList.value
              .toLowerCase()
              .indexOf(queryString.toLowerCase()) === 0
          )
        }
      }
    },
    handleSelect(data) {
      // 上游路段，选值, 跳转并传值
      // (this.dirForm.upRoad = data.name),
      // (this.upRoadCode = data.code),
      this.dirForm.upRoad = { name: data.name, code: data.code }
      this.dirs[this.dirIndex] = this.dirForm
      this.drawRoadLanes()
      console.log('选择项：', data.name, data.code)
    },
    // 上游路口搜索
    searchUperRoad() {
      const data = this.dirForm.upRoad.name
      getUperRoadList({ keyWord: data }).then(res => {
        console.log('模糊查询：', res.data)
        this.upRoadList = res.data.list.map(item => {
          return {
            name: item.name,
            code: item.code,
            value: item.name
          }
        })
      })
    },
    // 搜索路段名称
    searchRoad() {
      queryRoadsSection(this.roadSearchParam).then(re => {
        this.roadList = re.data.list
        // this.pageTotal = re.data.total
        // console.log( this.focusname)
      })
    },
    // 输入路段或编号查询
    // getCurrentList(p) {
    //   this.roadSearchParam.pageNum = p
    //   this.searchRoad()
    // },
    // 弹框 方向的点击事件
    selectCard(fangwei, index) {
      this.clickFlag = fangwei.dictData
    },
    // 生成路段按钮
    newRoadBtn() {
      this.dialogVisible = true
      this.adminareaItem.chedaonum = this.dirForm.inLanesNum // 车道数
      this.adminareaItem2.cdNum = this.dirForm.outLanesNum // 反向车道数
      // 路段长度，方向清空
      this.adminareaItem.lulength = ''
      this.adminareaItem.direction1 = ''
      // 根据code查询路口信息
      queryRoadsByCode(this.jncCode)
        .then(res => {
          this.adminareaItem.administrativeName = res.data.code.substring(0, 6) // 行政区划
          this.oldRoadName = res.data.name
          this.adminareaItem.fromwhereName = res.data.name // 起始路口 名称

          // 传入上游路段 code 查询
          queryRoadsByCode(this.dirForm.upRoad.code)
            .then(res => {
              this.toJncCode = res.data.code // 终点路口编号
              this.adminareaItem.towhereName = res.data.name // 终点路口名,上游路段名
              var newRoadName = res.data.name // 上游路口名称
              this.adminareaItem.fullname = newRoadName + '-' + this.oldRoadName // 路段名称
              this.adminareaItem2.fxname = this.oldRoadName + '-' + newRoadName // 反向路段 名称
            })
            .catch(e => {
              console.log('上游路口查询失败', e)
            })
        })
        .catch(e => {
          console.log('原路口查询失败', e)
        })
    },
    // 生成路段 保存按钮
    submitAdminArea() {
      var checkreverse
      if (this.checkedValue === false) {
        checkreverse = 0
      } else {
        checkreverse = 1 // 创建反向路段
      }
      const data = {
        adminDivisionCode: this.adminareaItem.administrativeName, // 6位行政区划代码 ,
        direction1: this.clickFlag,
        name: this.adminareaItem.fullname, // 路段名称
        fromJncCode: this.jncCode, // 起始路口编号 ,
        toJncCode: this.toJncCode, // 终止路口编号
        length: this.adminareaItem.lulength, // 路段长度
        numLanes: this.adminareaItem.chedaonum, // 车道数
        freeFlowVelocity: this.adminareaItem.freeFlowVelocity, // 自由流速度
        pictureRecognitionStatus: this.adminareaItem.delivery, // 二次识别状态 0-否   1-是
        createReverseSection: checkreverse, // 是否创建反向路段
        reverseSectionName: this.adminareaItem2.fxname, // 反向路段名
        reverseSectionNumLanes: this.adminareaItem2.cdNum, // 反向车道数
        freeFlowVelocity2: this.adminareaItem2.freeFlowVelocity2 // 自由流速度2
      }
      getMapAdd(data)
        .then(res => {
          this.$message({
            message: '新增路段成功！',
            type: 'success'
          })
          this.dialogVisible = false
        })
        .then(res => {
          // 刷新卡片区列表
          // const roadSearchParam = {
          //   // 搜索路口名称参数 type:1 进口，type:0 出口 ,type: -1全部
          //   // keyWord: '',
          //   // pageSize: 5,
          //   // pageNum: 1,
          //   currentJncCode: this.$store.state.road.jncCode, // 当前路口编号
          //   type: -1
          // }
          queryRoadsSection(this.roadSearchParam).then(re => {
            this.roadList = re.data.list
            // this.pageTotal = re.data.total
          })
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: '新增路段失败！',
            type: 'error'
          })
        })
    },
    setRoadName(road) {
      // 卡片点击事件，填充进出口路段
      if (this.roadSearchParam.type === 1) {
        // 进口路段
        // this.dirForm.inRoadName = road.name
        this.$set(this.dirForm, 'inRoadName', road.name)
        this.setInRoadName()
        // this.$message('进口路段:'+ road.name)
      } else if (this.roadSearchParam.type === 0) {
        // 出口路段
        // this.dirForm.outRoadName = road.name
        this.$set(this.dirForm, 'outRoadName', road.name)
        this.setOutRoadName()
        // this.$message('出口路段:' + road.name)
      }
      this.dirForm[`${this.focusname}Code`] = road.code // 新创建的路口的 编号
      // console.log(this.focusname, this.dirForm);
      // if (this.focusname) {
      //   // this.dirForm[this.focusname] = road.fromJncName
      //   // this.dirForm[`${this.focusname}Code`] = road.fromJncCode
      //   // console.log(1111, road)
      //   // this.dirForm.inRoadName = road.fromJncName// 进口路段名：road.fromJncName , 路段编码：fromJncCode
      //   // this.dirForm.outRoadName = road.toJncName// 出口路段名：road.toJncName , 路段编码：toJncCode
      //   // this.dirForm[this.focusname] = road.name
      //   this.dirForm[`${this.focusname}Code`] = road.code // 新创建的路口的 编号
      //   // 进口路段改变方法
      //   this.setInRoadName()
      // }
    },
    // 设置方向
    setDirIndex(i) {
      console.log('dirIndex', i)
      console.log(this.roadChan)
      console.log(this.roadChan.sideWalkStart)
      // 方向 点击事件
      this.focusname = ''
      this.dirs[this.dirIndex] = Object.assign({}, this.dirForm)
      this.$store.commit('setDirs', this.dirs)
      this.dirIndex = i

      Object.assign(this.dirForm, this.dirs[this.dirIndex])
      this.drawCanvas(false, () => {
        this.hightLightSelRoad(i)
      })

      // console.log(this.dirs);
      // console.log(this.dirForm);
      // for (const j in this.dirs[i]) {
      //   this.$set(this.dirForm, j, this.dirs[i][j])
      // }
    },
    // 选择进口车道
    setInLaneIndex(i) {
      this.inLaneIndex = i
    },
    // 选择出口车道
    setOutLaneIndex(i) {
      this.outLaneIndex = i
    },
    // 设置车道事件
    // 路口渠化
    render() {
      //   设置canvas宽高
      this.cvsheight = this.$refs.cvsWrap.offsetHeight
      this.cvswidth = this.$refs.cvsWrap.offsetWidth
      this.cvs = this.$refs.cvs
      this.ctx = this.cvs.getContext('2d')

      this.cvs_.width = this.cvswidth
      this.cvs_.height = this.cvsheight
      this.ctx_.translate(this.cvswidth / 2, this.cvsheight / 2)
      this.ctx_.save()
      this.cvs_bg.width = this.cvswidth
      this.cvs_bg.height = this.cvsheight
      this.ctx_bg.translate(this.cvswidth / 2, this.cvsheight / 2)
      this.ctx_bg.save()
      // 创建roadChan

      this.$nextTick(() => {
        this.roadChan = new RoadChan(this.dirs)
        this.drawRoadLanes()
      })
    },
    // 画转向图片
    drawImages() {
      const imgs = this.roadChan.turn_imgs
      for (let i = 0; i < imgs.length; i++) {
        const { img_c, name, index, type } = imgs[i]
        const [i_0, i_1] = index
        let rotate
        let turnName = name
        // 出口车道
        if (type === 'turn_out') {
          rotate = this.dirs[i_0].rotation - pi / 2
          if (this.dirs[i_0].outLanes[i_1].select === type) {
            turnName = name + '02'
          }
        } else {
          // 进口车道
          rotate = this.dirs[i_0].rotation + pi / 2
          if (this.dirs[i_0].inLanes[i_1].select === type) {
            turnName = name + '02'
          }
        }
        const img = this.imgDirObjs[turnName]
        this.ctx_.save()
        this.ctx_.translate(img_c.x, img_c.y)
        this.ctx_.rotate(rotate)
        this.ctx_.drawImage(
          img,
          -this.roadChan.imgWid / 2,
          -this.roadChan.imgWid / 2,
          this.roadChan.imgWid,
          this.roadChan.imgWid
        )
        this.ctx_.restore()
      }
    },
    // 投屏
    drawCanvas(isClearCtx, callback) {
      if (isClearCtx) {
        this.ctx_.clearRect(
          -this.cvswidth / 2,
          -this.cvsheight / 2,
          this.cvswidth,
          this.cvsheight
        )
      }
      callback()
      this.ctx.clearRect(0, 0, this.cvswidth, this.cvsheight)
      this.ctx.drawImage(this.cvs_, 0, 0, this.cvswidth, this.cvsheight)
      this.ctx.drawImage(this.cvs_bg, 0, 0, this.cvswidth, this.cvsheight)
    },
    drawRoadLanes() {
      // this.dirs[this.dirIndex] = this.dirForm;
      this.drawCanvas(true, () => {
        this.roadChan = new RoadChan(this.dirs)
        this.roadChan.draw(this.ctx_)
        this.drawImages()
        this.hightLightSelRoad(this.dirIndex)
      })
      // this.drawImages()
    },
    // 联通事件
    // 进口路段，出口路段的focus事件，type=1进口，type=0,出口
    setFocusName(type, fn) {
      this.roadSearchParam.type = type
      // this.$message("进出口type是" + type)
      this.focusname = fn
      this.roadList = []
      this.searchRoad()
    },
    // setupstream() {}, // 上游路口的改变事件
    setInRoadName() {
      // 进口路段改变方法 改为只读，
      // this.focusname = "";
      this.dirs[this.dirIndex] = this.dirForm
      this.drawRoadLanes()
    },
    setOutRoadName() {
      // 出口路段 改变方法 改为只读，
      // this.focusname = "";
      this.dirs[this.dirIndex] = this.dirForm
      this.drawRoadLanes()
    },
    // 分隔线
    setRoadDivide() {
      this.dirs[this.dirIndex] = this.dirForm
      this.drawRoadLanes()
    },
    // 人行道
    setRoadSideWalk() {
      this.dirs[this.dirIndex] = this.dirForm
      if (this.dirForm.isSideWalk === 1) {
        this.dirs[this.dirIndex].sideWalkLen = 20
      } else {
        this.dirs[this.dirIndex].sideWalkLen = 0
      }
      this.drawRoadLanes()
    },
    //进口车道设置是否有非机动车道；若有，则对应右转方向的出口车道也有非机动车道；
    setRoadInUnvehi() {
      this.dirs[this.dirIndex] = this.dirForm
      if (this.dirForm.isInUnvehi === 1) {
        // this.dirs[this.dirIndex].inLanes.push(new Lane(2, 99, 0, 3))
        this.dirs[this.dirIndex].inLanes.push(new InLane(2, 99, 3))
        if (this.dirIndex != 0) {
          this.dirs[this.dirIndex - 1].outLanes.push(new OutLane(2, 99, 3))
        } else {
          this.dirs[this.dirs.length - 1].outLanes.push(new OutLane(2, 99, 3))
        }
      } else {
        this.dirs[this.dirIndex].inLanes.pop()
        if (this.dirIndex != 0) {
          this.dirs[this.dirIndex - 1].outLanes.pop()
        } else {
          this.dirs[this.dirs.length - 1].outLanes.pop()
        }
        this.dirForm.inUnvehiWid = 2
      }
      this.drawRoadLanes()
    },
    // 设置是否有非机动车道
    // setRoadOutUnvehi() {
    //   this.dirs[this.dirIndex] = this.dirForm
    //   // console.log(this.dirs)
    //   if (this.dirForm.isOutUnvehi === 1) {
    //     // this.dirs[this.dirIndex].outLanes.push(new Lane(2, 99, 1, 3))
    //     this.dirs[this.dirIndex].outLanes.push(new OutLane(2, 99, 3))
    //   } else {
    //     this.dirs[this.dirIndex].outLanes.pop()
    //     this.dirForm.outUnvehiWid = 2
    //   }
    //   this.drawRoadLanes()
    // },

    //设置是否有待转区
    waitingArea() {
      this.dirs[this.dirIndex] = this.dirForm
      this.drawRoadLanes()
    },
    //设置是否有右转专用车道
    hasRightTurnLane() {
      this.dirs[this.dirIndex] = this.dirForm
      if (this.dirForm.rightTurnLane === 1){
        if (this.dirForm.isInUnvehi === 0) {
          this.dirForm.inLanes.splice(this.dirForm.inLanes.length - 1, 1)
          //this.dirForm.inLanes.splice(this.dirForm.inLanes.length - 1, 0, new InLane(0, 99, 9) )
        }else {
          this.dirForm.inLanes.splice(this.dirForm.inLanes.length - 2, 1)
          //this.dirForm.inLanes.splice(this.dirForm.inLanes.length - 2, 0, new InLane(0, 99, 9) )
        }
      } else {
        this.dirForm.inLanes.splice(2, 0, new InLane(3.5, 13, 1))
      }
      this.drawRoadLanes()
    },

    setRoadInUnvehiWid() {
      const len = this.dirs[this.dirIndex].inLanes.length
      this.dirs[this.dirIndex].inLanes[len - 1].wid = Number(
        this.dirForm.inUnvehiWid
      )
      this.drawRoadLanes()
    },
    setRoadOutUnvehiWid() {
      const len = this.dirs[this.dirIndex].outLanes.length
      this.dirs[this.dirIndex].outLanes[len - 1].wid = Number(
        this.dirForm.outUnvehiWid
      )
      this.drawRoadLanes()
    },
    setRoadInLanesNum(v) {
      if (v === 0) {
        this.$set(this.dirForm, 'inRoadName', '')
        this.$set(this.dirForm, 'inRoadNameCode', '')
      }
      var count = this.dirForm.inLanes.length - this.dirForm.isInUnvehi
      
      if (this.dirForm.rightTurnLane === 1){
        count = count + 1
      }
      // 获取车道宽度
      const vs = this.dirForm.inLaneWidths.split('-')
      let wid = 3.5
      if (vs.length === 1) {
        wid = +this.dirForm.inLaneWidths
      }

      if (v < count) {
        for (let i = 0; i < count - v; i++) {
          this.dirs[this.dirIndex].inLanes.shift()
          if (vs.length !== 1) {
            vs.shift()
          }
        }
      } else {
        for (let i = 0; i < v - count; i++) {
          // this.dirs[this.dirIndex].inLanes.unshift(new Lane(wid, 11, 0, 1))
          this.dirs[this.dirIndex].inLanes.unshift(new InLane(wid, 11, 1))
          if (vs.length !== 1) {
            vs.unshift(wid)
          }
        }
      }
      this.dirForm.inLaneWidths = vs.join('-')
      console.log(this.dirForm)
      this.dirs[this.dirIndex] = this.dirForm
      this.drawRoadLanes()
    },
    setRoadInLanesWid(v) {
      const vs = v.split('-')
      if (vs.length === 1) {
        if (!Number(v)) {
          this.$message('车道宽度设置错误，请重新设置')
          this.dirForm.inLaneWidths = this.dirs[this.dirIndex].inLaneWidths
        } else {
          for (let i = 0; i < this.dirForm.inLanesNum; i++) {
            // 进口车道数 dirForm.inLanesNum
            this.dirs[this.dirIndex].inLanes[i].wid = +v
            this.dirs[this.dirIndex].inLanes[i].width = v * 100
          }
        }
      } else {
        if (vs.length !== this.dirForm.inLanesNum) {
          this.$message('车道宽度设置错误，请重新设置')
          this.dirForm.inLaneWidths = this.dirs[this.dirIndex].inLaneWidths
        } else {
          for (let i = 0; i < this.dirForm.inLanesNum; i++) {
            this.dirs[this.dirIndex].inLanes[i].wid = +vs[i]
            this.dirs[this.dirIndex].inLanes[i].width = vs[i] * 100
          }
        }
      }
      this.dirs[this.dirIndex] = this.dirForm
      this.drawRoadLanes()
    },
    setRoadOutLanesNum(v) {
      if (v === 0) {
        this.$set(this.dirForm, 'outRoadName', '')
        this.$set(this.dirForm, 'outRoadNameCode', '')
        // this.dirForm.outRoadName = "";
        // this.dirForm.outRoadNameCode = "";
      }
      const count = this.dirForm.outLanes.length - this.dirForm.isOutUnvehi
      // 获取车道宽度
      const vs = this.dirForm.outLaneWidths.split('-')
      let wid = 3.5
      if (vs.length === 1) {
        wid = +this.dirForm.outLaneWidths
      }

      if (v < count) {
        for (let i = 0; i < count - v; i++) {
          this.dirs[this.dirIndex].outLanes.shift()
          if (vs.length !== 1) {
            vs.shift()
          }
        }
      } else {
        for (let i = 0; i < v - count; i++) {
          // this.dirs[this.dirIndex].outLanes.unshift(new Lane(3.5, 11, 1, 1))
          this.dirs[this.dirIndex].outLanes.unshift(new OutLane(3.5, 11, 1))
          if (vs.length !== 1) {
            vs.unshift(wid)
          }
        }
      }

      this.dirForm.outLaneWidths = vs.join('-')

      this.drawRoadLanes()
    },
    setRoadOutLanesWid(v) {
      const vs = v.split('-')
      if (vs.length === 1) {
        if (!Number(v)) {
          this.$message('车道宽度设置错误，请重新设置')
          this.dirForm.outLaneWidths = this.dirs[this.dirIndex].outLaneWidths
        } else {
          for (let i = 0; i < this.dirForm.outLanesNum; i++) {
            // 出口车道数 dirForm.outLanesNum
            this.dirs[this.dirIndex].outLanes[i].wid = +v
            this.dirs[this.dirIndex].outLanes[i].width = v * 100
          }
        }
      } else {
        if (vs.length !== this.dirForm.outLanesNum) {
          this.$message('车道宽度设置错误，请重新设置')
          this.dirForm.outLaneWidths = this.dirs[this.dirIndex].outLaneWidths
        } else {
          for (let i = 0; i < this.dirForm.outLanesNum; i++) {
            this.dirs[this.dirIndex].outLanes[i].wid = +vs[i]
            this.dirs[this.dirIndex].outLanes[i].width = vs[i] * 100
          }
        }
      }
      this.drawRoadLanes()
    },
    // 改变车道转向
    changeLaneTurn(ev) {
      const e = ev || event
      const box = this.cvs.getBoundingClientRect()
      // 计算当前鼠标位置
      const x = parseInt(e.clientX - box.left - this.cvswidth / 2) // 鼠标点击canvas图像里面的X位置；
      const y = parseInt(e.clientY - box.top - this.cvsheight / 2)
      let dis = Infinity
      let imgObj = {}
      const turn_imgs = this.roadChan.turn_imgs
      for (let i = 0; i < turn_imgs.length; i++) {
        if (turn_imgs[i].type === 'turn_out') continue
        const d = getTwoPointDis(new Point(x, y), turn_imgs[i].img_c)
        if (d < dis) {
          dis = d
          imgObj = turn_imgs[i]
        }
      }
      if (dis < 10) {
        const { index, type } = imgObj
        const [i_0, i_1] = index
        this.dirs[i_0].inLanes[i_1].select = type

        this.drawRoadLanes()
        this.showDlg = true
      }
    },
    changeTurn(v) {
      for (let i = 0; i < this.dirs.length; i++) {
        for (let j = 0; j < this.dirs[i].inLanes.length; j++) {
          if (this.dirs[i].inLanes[j].select) {
            const nameLen_old =
              turnName[this.dirs[i].inLanes[j].turn].zh.length / 2
            const nameLen_new = turnName[v].zh.length / 2
            this.dirs[i].inLanes[j].turn = v
            delete this.dirs[i].inLanes[j].select
            var dis = nameLen_new - nameLen_old
            // if (this.dirs[i].inLanes[j].flowCount == nameLen_old) {
            //   this.dirs[i].inLanes[j].flowCount += dis
            // }
            this.dirs[i].inLanes[j].flowCount = nameLen_new
            this.drawRoadLanes()
            this.showDlg = false
          }
        }
      }
    },
    closeDlg() {
      for (let i = 0; i < this.dirs.length; i++) {
        for (let j = 0; j < this.dirs[i].inLanes.length; j++) {
          if (this.dirs[i].inLanes[j].select) {
            delete this.dirs[i].inLanes[j].select
          }
        }
      }
      this.drawRoadLanes()
    },
    // 退出
    exit() {
      this.$router.push({ path: '/systemSetting/roadConfig' })
    },
    // 保存渠化信息
    getDirec() {
      this.dirs[this.dirIndex] = Object.assign({}, this.dirForm)
      this.$store.commit('setDirs', this.dirs)
      const direc = []
      for (let i = 0; i < this.dirs.length; i++) {
        const in_driv = this.dirs[i].drivingDirection
        const out_driv = in_driv + 2 > 4 ? in_driv - 2 : in_driv + 2
        const direction = this.dirs[i].direction
        const angle = this.dirs[i].rotation
        const { inLanes, outLanes } = this.dirs[i]
        for (let j = 0; j < inLanes.length; j++) {
          inLanes[j].seqNum = j + 1
          inLanes[j].drivingDirection = in_driv
        }
        for (let j = 0; j < outLanes.length; j++) {
          outLanes[j].seqNum = j + 1
          outLanes[j].drivingDirection = out_driv
        }
        direc.push({ inLanes, outLanes, direction, angle })
      }
      return direc
    },
    saveChannelData(callback) {
      // 保存数据按钮
      // 判断路名是否都填写
      for (let i = 0; i < this.dirs.length; i++) {
        if (
          this.dirs[i].inRoadName.trim() === '' ||
          this.dirs[i].outRoadName.trim() === ''
        ) {
          this.$message({
            message: '方向' + (i + 1) + '路名未填写',
            type: 'warning'
          })
          // return false
        }
      }
      const data = {
        jncCode: this.jncCode, // 路口编号
        directions: this.getDirec(),
        jncCanalization: JSON.stringify(this.dirs)
      }
      console.log(data)
      console.log(this.dirs)
      saveChannelizationData(data)
        .then(re => {
          this.$message({ message: '保存成功', type: 'success' })
        })
        .then(callback)
    },
    preFlowPhaseConfig() {
      // 上一步
      // this.setDirIndex(1)
      console.log(this.dirs)
      this.dirs[this.dirIndex] = Object.assign({}, this.dirForm)
      this.$store.commit('setDirs', this.dirs)
      this.$store.commit('setStepAct', 1)
    },
    goFlowPhaseConfig() {
      // 下一步 流量相位配置
      // this.setDirIndex(1)
      // this.getDirec()
      // this.$store.commit('setStepAct', 3)
      this.dirs[this.dirIndex] = Object.assign({}, this.dirForm)
      this.$store.commit('setDirs', this.dirs)
      this.saveChannelData(() => {
        this.$store.commit('setStepAct', 3)
      })
    },
    exportIn() {
      this.$refs.files.dispatchEvent(new MouseEvent('click'))
    },
    exportIn_() {
      // 导入
      const this_ = this
      // 定义Excel文件, 获取文件对象 var file = this.files[0];
      const selectedFile = this.$refs.files.files[0]
      // HTML5 的 FileReader 对象允许Web应用程序 异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，
      // 使用 File 或 Blob 对象指定要读取的文件或数据。
      const reader = new FileReader()
      // 读取操作完成 事件
      reader.onload = function(e) {
        console.log(11111, reader.result)
        this_.dirs = JSON.parse(this.result)
        // console.log('in', this_.dirs)
        this_.drawRoadLanes()
        Object.assign(this_.dirForm, this_.dirs[this_.dirIndex])
        console.log(this_.dirForm)
      }
      // 将文件读取为Text
      reader.readAsText(selectedFile)
    },
    exportOut() {
      // 导出
      const dirs = JSON.parse(JSON.stringify(this.dirs))
      for (let i = 0; i < dirs.length; i++) {
        dirs[i] = Object.assign(dirs[i], {
          inRoadName: '',
          inRoadNameCode: '',
          outRoadName: '',
          outRoadNameCode: '',
          sideWalk: { lightGroupType: '', phaseCode: '' }
        })
        const { inLanes, outLanes } = dirs[i]
        for (let j = 0; j < inLanes.length; j++) {
          inLanes[j] = Object.assign(inLanes[j], {
            lightGroupType: '',
            phaseCode: '',
            toRoadIndex: '',
            flowIndex: '',
            str: '',
            tac: ''
          })
        }
        for (let j = 0; j < outLanes.length; j++) {
          outLanes[j] = Object.assign(outLanes[j], {
            lightGroupType: '',
            phaseCode: '',
            off: ''
          })
        }
      }
      console.log('this.dirs', this.dirs)
      const downLink = document.createElement('a')
      downLink.download = this.$store.state.road.jncName
      const blob = new Blob([JSON.stringify(dirs)])
      console.log('out', dirs)
      downLink.href = window.URL.createObjectURL(blob)
      document.body.appendChild(downLink)
      downLink.click()
      document.body.removeChild(downLink)
    },
    // 高亮显示选中道路
    hightLightSelRoad(i) {
      const roadLen = this.roadChan.roadLen
      const { len, alpha, wid } = this.roadChan.sideWalkStart[i]

      // len, width, theta
      const p1 = getInLinePoint(len, wid / 2, alpha)
      const p2 = getInLinePoint(roadLen, wid / 2, alpha)
      const p3 = getOutLinePoint(roadLen, wid / 2, alpha)
      const p4 = getOutLinePoint(len, wid / 2, alpha)
      this.ctx_bg.clearRect(
        -this.cvswidth / 2,
        -this.cvsheight / 2,
        this.cvswidth,
        this.cvsheight
      )
      this.ctx_bg.beginPath()
      ;[p1, p2, p3, p4].map(p => {
        const { x, y } = p
        this.ctx_bg.lineTo(x, y)
      })
      this.ctx_bg.closePath()
      this.ctx_bg.fillStyle = '#66ef4336'
      this.ctx_bg.fill()
    }
  }
}
</script>
<style lang="scss" scoped>
.jr-road-channel {
  // 组件宽高
  position: relative;
  width: 100%;
  height: 100%;
  // border:1px solid orange;
  .jr-canvas-wrap {
    // 画布区
    position: relative;
    width: calc(100% - 860px);
    height: 100%;
    // border:1px solid orange;
    background-color: rgb(238, 238, 238);
    .jr-canvas-btns {
      position: absolute;
      right: 20px;
      top: 20px;
      .el-button {
        width: 72px;
        line-height: 32px;
        height: 32px;
        vertical-align: middle;
        i {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 5px;
          vertical-align: middle;
          &.btn-export-in {
            background: url('~@/assets/images/SystemSetting/road/exportIn.png')
              5px 0px no-repeat;
          }
          &.btn-export-out {
            background: url('~@/assets/images/SystemSetting/road/exportOut.png')
              5px 0px no-repeat;
          }
        }
      }
    }
  }
  .jr-lane-config {
    // 右侧灰色区域
    position: absolute;
    width: 840px;
    height: 100%;
    top: 0;
    right: 0;
    padding-left: 20px;
    background-color: rgb(238, 238, 238);
    .jr-lane-con {
      position: relative;
      width: 100%;
      height: 99%;
      // border:1px solid orange;
      box-sizing: border-box;
      .jr-sel-dir {
        width: 320px;
      }
      .jr-lane-tips {
        font-size: 12px;
        color: #fa0101;
      }
      .jr-lane-set {
        // 右侧表单区
        .h4div {
          color: #333;
          font-weight: bold;
          font-size: 14px;
        }
        .el-input {
          width: 55px;
          .el-input__inner {
            padding: 0 5px;
          }
        }
        .roadconfigdiv {
          //公共配置
          margin-top: 15px;
          .fenge{
            width: 300px;  //260px;
          }
          .el-form-item__label{
            width: 95px;
          }
        }
        .HorizonRoad {
          // 进出口表单
          width: 100%;
          box-sizing: border-box;
          .seldiv {
            width: 75px;
            .el-input {
              width: 75px;
              border: 1px solid red;
              .el-input__inner {
                padding: 0 5px;
              }
            }
            .el-input .el-input--suffix {
              width: 75px;
            }
          }
          .portForm {
            // 进口车道配置
            .el-form-item {
              .el-select {
                width: 75px;
              }
              .el-input.el-input--suffix {
                width: 75px;
              }
              .el-select {
                width: 55px !important;
                .el-select-dropdown .el-popper {
                  width: 75px;
                }
                .el-input.el-input--suffix {
                  width: 75px;
                }
              }
              .el-form-item__label{
                width: 100px;
              }
            }
            .el-form-item:nth-child(4){
              width: 210px;
            }
            .el-form-item:nth-child(7){
              width: 270px;
              padding-left: 30px;
            }
          }
          .portForm2 {
            // 出口车道配置
            .el-form-item {
              .el-input {
                // 进出口表单 框宽
                width: 55px;
              }
              .el-select {
                width: 55px;
                .el-select-dropdown .el-popper {
                  width: 55px;
                }
                .el-input.el-input--suffix {
                  width: 55px;
                }
              }
              .el-form-item__label{
                width: 100px;
              }
            }
            .el-form-item:nth-child(4){
              width: 210px;
            }
          }
        }
        .roadconfigdiv2 {
          // 路段配置 表单
          .el-input {
            width: 270px;
          }
          .searchInput {
            // 上游路段框
            width: 270px;
            // border:1px solid green;
            .el-input {
              width: 270px;
            }
          }
          .jr-maproad-btn {
            position: relative;
            top: 3px;
            background: url('~@/assets/images/IntegratedPlatform/send.png')
              center center no-repeat;
          }
        }
      }
      .jr-save-btns {
        position: absolute;
        width: 100%;
        bottom: 20px;
        text-align: center;
      }
    }
    .jr-lane-sch {
      // 输入路段名称/编号
      position: absolute;
      right: 20px;
      top: 278px;
      bottom: 70px;
      width: 220px;
      // border: 1px dotted green;
      overflow: hidden;
      overflow-y: auto;
      .btn-road-add {
        display: inline-block;
        width: 30px;
        line-height: 32px;
        color: #4976c9;
        cursor: pointer;
        text-align: center;
        margin-bottom: 20px;
      }
      .jr-roadname-card {
        margin: 25px 0px;
        width: 100%;
        // height: 94px;
        padding: 10px;
        background-color: #fff;
        cursor: pointer;
        &.act {
          background-color: #69a4e14a;
        }
        h4 {
          margin: 0;
          font-size: 14px;
          color: #666;
        }
        .jr-start-end {
          float: left;
          width: 20px;
          margin-top: 2px;
          b {
            font-size: 14px;
          }
          i {
            display: inline-block;
            height: 20px;
            width: 9px;
            border-right: 1px solid #333;
          }
        }
        .jr-roadcard-info {
          margin-left: 15px;
          p,
          span {
            margin: 5px 0;
            font-size: 12px;
            color: #999;
          }
          span {
            margin-right: 15px;
          }
        }
      }
    }
  }
  .addUser {
    position: absolute;
    top: 12px;
    left: 15px;
    font-size: 15px;
    font-weight: bold;
  }
  .hengxian {
    width: 105.5%;
    height: 5px;
    border-top: 1px solid #ccc;
    margin-top: -20px;
    margin-left: -20px;
  }
  .tableDiv {
    width: 100%;
    height: 780px;
    overflow: hidden;
    overflow-y: auto;
    .el-form-item {
      // border:1px solid red;
      margin-bottom: 5px;
    }
    .el-input {
      width: 220px;
    }
    .el-select {
      width: 220px;
    }
    .dashdiv {
      width: 90%;
      border: 1px dashed #ccc;
      margin-top: 20px;
      margin-left: 20px;
    }
    .secondform {
      .el-form-item {
        // border:1px solid red;
        margin-bottom: 5px;
      }
    }
    .jr-attr-btn-submit {
      position: absolute;
      bottom: 20px;
      left: 38%;
      .el-button {
        width: 120px;
      }
    }
  }
}
</style>

<style lang="scss">
.jr-road-channel {
  .show-map-class {
    .el-dialog__body {
      height: calc(100% - 44px);
    }
  }
  .el-form-item__label{
    font-size: 14px !important;
  }
}
.tableDiv {
  .el-input.el-input--suffix {
    // select下拉框
    width: 220px;
  }
  // 循环 方向
  .fangxiangdiv {
    width: 180px;
    height: 180px;
    text-align: center;
    // border:1px solid orange;
    .clickdiv {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border: 1px dashed #ccc;
      cursor: pointer;
      display: inline-block;
      margin-left: 5px;
      margin-top: 5px;
      border-radius: 5px;
    }
    .clickdiv.active {
      background-color: #d9e7fe;
      border: 1px dashed #4976c9;
    }
  }
}
.HorizonRoad {
  .wait {
    width: auto !important;
    .el-select {
      margin-right: 5px;
    }
    .el-input {
      width: 55px;
      .el-input__inner {
        padding: 0 5px;
      }
    }
  }
}
.inputSearch {
  .el-autocomplete {
    width: 270px;
    .el-input {
      width: 270px;
    }
  }
}
.seldiv {
  width: 75px;
  .el-input {
    width: 55px !important;
    // border:1px solid red;
  }
  .el-input .el-input--suffix {
    width: 55px;
  }
}
.jr-sel-dir {
  .el-button {
    margin-left: 0;
    margin-right: 10px;
    margin-bottom: 10px;
    color: #888;
    &.btn-dir-act {
      color: #4976c9;
      background-color: #d9e6fe;
    }
  }
}
.jr-lane-set {
  // 右侧表单区
  .el-form-item {
    width: 185px;
    margin-bottom: 0;
    margin-right: 0;
    label {
      font-weight: 400;
    }
    .el-radio {
      margin-right: 10px;
    }
    .el-radio__label {
      // 分隔形式
      padding-left: 5px;
    }
  }
  .jr-lane-name-dir {
    // 行驶方向
    width: 115px;
    .el-input {
      width: 115px;
      .el-input__inner {
        width: 110px;
      }
      // .el-input__icon{
      //   position: relative;
      //   left:30px;
      // }
    }
    .el-select-dropdown .el-popper {
      min-width: 110px;
    }
  }
  .jr-save-btns {
    .el-button {
      width: 100px;
    }
  }
}
.jr-lane-sch {
  // 输入路段名称/编号
  .el-input {
    width: 220px;
    .el-input__suffix {
      cursor: pointer;
      .el-input__icon {
        line-height: 32px;
      }
    }
  }
  .el-pagination {
    padding: 2px 0;
    .number {
      min-width: 30px;
      border: none;
      margin: 0;
      background-color: transparent;
      &.active {
        background-color: transparent;
        color: #4f75b3;
      }
    }
    .btn-prev {
      padding-right: 0;
      border: none;
      margin: 0;
      background-color: transparent;
    }
    .btn-next {
      padding-left: 0;
      border: none;
      margin: 0;
      background-color: transparent;
    }
  }
}
.jr-turns-dlg {
  .el-dialog {
    width: 400px;
  }
  .jr-turnimg-btn {
    width: 46px;
    height: 76px;
    background: #ccc;
    border-radius: 4px;
    margin: 10px;
    padding: 10px 5px;
    cursor: pointer;
  }
}
.jr-upperroads-list {
  .el-radio {
    display: block;
    margin: 10px;
  }
}
// 弹窗动画
.jr-road-channel {
  .el-dialog__wrapper {
    transition-duration: 1s;
  }
  .dialog-fade-enter-active {
    animation: none !important;
  }
  .dialog-fade-leave-active {
    transition-duration: 0.5s !important;
    animation: none !important;
  }

  .dialog-fade-enter-active .el-dialog,
  .dialog-fade-leave-active .el-dialog {
    animation-fill-mode: forwards;
  }

  .dialog-fade-enter-active .el-dialog {
    animation-duration: 1s;
    animation-name: anim-open;
    animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
  }

  .dialog-fade-leave-active .el-dialog {
    animation-duration: 1s;
    animation-name: anim-close;
  }

  @keyframes anim-open {
    0% {
      opacity: 0;
      transform: scale(0, 0);
    }
    100% {
      opacity: 1;
      transform: scale(1, 1);
    }
  }

  @keyframes anim-close {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(0, 0);
    }
  }
  .maproaddlg {
    .el-dialog__header {
      padding: 10px 20px;

      .el-dialog__headerbtn {
        top: 10px;
      }
    }
    .el-dialog__body {
      padding: 0;
    }
  }
}
.maproadlistdlg {
  .el-dialog__header {
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    .el-dialog__headerbtn {
      top: 10px;
    }
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>

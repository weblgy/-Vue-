export const pi = Math.PI
// 转向对应的代码
export const turnName = {
  0: {
    en: 'none',
    zh: '无标无标无标'
  },
  11: {
    en: 'straight',
    zh: '直行'
  },
  12: {
    en: 'left',
    zh: '左转'
  },
  13: {
    en: 'right',
    zh: '右转'
  },
  21: {
    en: 'leftstraight',
    zh: '直行左转'
  },
  22: {
    en: 'straightright',
    zh: '直行右转'
  },
  23: {
    en: 'leftright',
    zh: '左转右转'
  },
  24: {
    en: 'leftstraright',
    zh: '直行左转右转'
  },
  31: {
    en: 'round',
    zh: '掉头'
  },
  32: {
    en: 'leftround',
    zh: '左转掉头'
  },
  99: {
    en: 'other',
    zh: '其他'
  }
}

const imgNames = ['round', 'left', 'straight', 'right', 'straightright', 'leftround', 'leftstraight', 'leftstraright', 'leftright', 'none'] // 'detc_stra', 'detc_tact', 'detc_off'
const imgDirObjs = {}
for (let i = 0; i < imgNames.length; i++) {
  imgDirObjs[imgNames[i]] = new Image()
  imgDirObjs[imgNames[i]].src = require('@/assets/images/SystemSetting/road/' +
        imgNames[i] +
        '.png')
  imgDirObjs[imgNames[i] + '02'] = new Image()
  imgDirObjs[imgNames[i] + '02'].src = require('@/assets/images/SystemSetting/road/' +
        imgNames[i] +
        '02.png')
}
export { imgDirObjs }
//  'ROUND_HEADED_STRAIGHT_RED',
// 'round_head_str_GREEN', 'round_head_str_RED',
const sigNames = [
  'ROUND_HEADED_LAMP_RED', 'ROUND_HEADED_LAMP_GREEN', 'ROUND_HEADED_LAMP_YELLOW', 'ROUND_HEADED_LAMP_OFF',
  'ROUND_HEADED_LEFT_RED', 'ROUND_HEADED_LEFT_GREEN', 'ROUND_HEADED_LEFT_YELLOW', 'ROUND_HEADED_LEFT_OFF',
  'ROUND_HEADED_STRAIGHT_RED', 'ROUND_HEADED_STRAIGHT_GREEN', 'ROUND_HEADED_STRAIGHT_YELLOW', 'ROUND_HEADED_STRAIGHT_OFF',
  'ROUND_HEADED_RIGHT_RED', 'ROUND_HEADED_RIGHT_GREEN', 'ROUND_HEADED_RIGHT_YELLOW', 'ROUND_HEADED_RIGHT_OFF',
  'VARIABLE_RED', 'VARIABLE_GREEN', 'VARIABLE_YELLOW', 'VARIABLE_OFF',
  'PEDESTRIAN_RED', 'PEDESTRIAN_GREEN', 'PEDESTRIAN_YELLOW', 'PEDESTRIAN_OFF',
  'NON_VEHICLE_RED', 'NON_VEHICLE_GREEN', 'NON_VEHICLE_YELLOW', 'NON_VEHICLE_OFF'
]
const imgSigObjs = {}
for (let i = 0; i < sigNames.length; i++) {
  imgSigObjs[sigNames[i]] = new Image()
  imgSigObjs[sigNames[i]].src = require('@/assets/images/SystemSetting/road/' +
        sigNames[i] +
        '.png')
}
export { imgSigObjs }
// 创建点坐标
/**
 * @param {number} x
 * @param {number} y
 */
export class Point {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

// 创建车道
/**
 * @param {number} wid 车道宽 m
 * @param {string} turn 转向
 * @param {number} attr 属性 * 0：进口  1：出口 2：匝道 3：路段车道 9：其他
 * @param {number} prop  性质* 1：机动车道  2：行人  3：非机动车道  4：有轨车道 5：车道信号灯  9：其他
 * @param {*} saturatedFlow 饱和流量（折合为pcu）
 * @param {*} leftTurn 左转混行比例
 * @param {*} straight  直行混行比例 百分数
 * @param {*} right 右转混行比例百分数
 * @param {*} variable 是否是可变车道
 * @param {*} hasWaitingArea 有无待行区
 * @param {number} canalizationLength 渠化长度
 */
export class Lane {
  constructor(attr, wid, turn, prop) {
    this.attribute = attr
    this.wid = wid
    this.width = this.wid * 100
    this.properties = prop
    this.turn = turn
    // this.saturatedFlow = ''
    this.leftTurn = ''
    this.straight = ''
    this.right = ''
    this.variable = ''
    this.hasWaitingArea = ''
    this.canalizationLength = ''
    // this.toRoadIndex = '' // 流向 out dir  index
    // this.lightGroupType = '' // 信号灯
    // this.phaseCode = '' // 相位
  }
}
export class InLane extends Lane {
  constructor(wid, turn, prop) {
    super(0, wid, turn, prop)
    this.toRoadIndex = [] // 流向 out dir  index
    this.flowCount = turnName[turn].zh.length / 2 // 流向数
    this.lightGroupType = [] // 信号灯
    this.phaseCode = [] // 相位
    this.toRoadSectionCode = []
    this.toRoadSectionName = []
    this.saturatedFlowRate = 1400 // 饱和流量
    this.str = '' // 战略检测器
    this.tac = '' // 战术检测器
  }
}
export class OutLane extends Lane {
  constructor(wid, turn, prop) {
    super(1, wid, turn, prop)
    this.off = '' // 溢出检测器
  }
}
export class Dir {
  constructor(inLanes, outLanes, inRoad = '', outRoad = '', upRoadName = '', upRoadCode = '', isInUnvehi = 0, inUnvehiWid = 2, isOutUnvehi = 0, outUnvehiWid = 2, divide = 1, isSideWalk = 1, rightTurnLane = 0) {
    this.inLanes = inLanes
    this.outLanes = outLanes
    this.inRoadName = inRoad
    this.outRoadName = outRoad
    this.upRoad = { name: upRoadName, code: upRoadCode }
    this.isInUnvehi = isInUnvehi
    this.inUnvehiWid = inUnvehiWid
    this.isOutUnvehi = isOutUnvehi
    this.outUnvehiWid = outUnvehiWid
    this.divide = divide
    this.isSideWalk = isSideWalk
    this.rightTurnLane = rightTurnLane
    this.sideWalk = { // 人行横道信息
      lightGroupType: '', // 信号灯
      phaseCode: '' // 相位
    }
    this.sideWalkLen = 20
    this.rightTurnLaneWid = 20
    this.inLaneWidths = '3.5'
    this.inLanesNum = this.inLanes.length
    this.outLaneWidths = '3.5'
    this.outLanesNum = this.outLanes.length
  }
}
// export const direction = { 1: '北', 2: '东北', 3: '东', 4: '东南', 5: '南', 6: '西南', 7: '西', 8: '西北', 9: '其他' }

// 函数简写
export function sin(x) {
  return Math.sin(x)
}

export function cos(x) {
  return Math.cos(x)
}

export function atan2(y, x) {
  return Math.atan2(y, x)
}

export function abs(x) {
  return Math.abs(x)
}

export function tan(y, x) {
  return Math.tan(y, x)
}

export function ceil(x) {
  return Math.ceil(x)
}

export function floor(x) {
  return Math.floor(x)
}
// 获取两点之间距离
export function getTwoPointDis(p1, p2) {
  const dis = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
  return +dis.toFixed(2)
}
// 获取两个向量的叉乘积 p-p1 x p-p2
export function getVectCross(p, p1, p2) {
  return (p1.x - p.x) * (p2.y - p.y) - (p1.y - p.y) * (p2.x - p.x)
}
// 坐标点保留两位小数
export function fixedPoint(p) {
  const x = p.x.toFixed(2)
  const y = p.y.toFixed(2)
  return new Point(+x, +y)
}
// 使rotation在0-2*Math.PI
export function transRotation(r) {
  if (r < 0) {
    r += 2 * pi
    transRotation(r)
  } else if (r >= 2 * pi) {
    r -= 2 * pi
    transRotation(r)
  }
  return r
}
// 入口线上的点的方程
/**
 * @param {number} len 对应中心线上的点到中心的长度
 * @param {number} width 点到中心线的距离
 * @param {number} theta 道路方向
 */
export function getInLinePoint(len, width, theta) {
  const x = len * cos(theta) + width * sin(theta)
  const y = len * sin(theta) - width * cos(theta)
  return fixedPoint(new Point(x, y))
}

// 出口线上点的方程
/**
 *
 * @param {number} len 对应中心线上的点到中心的长度
 * @param {number} width 点到中心线的距离
 * @param {number} theta 道路方向
 */
export function getOutLinePoint(len, width, theta) {
  const x = len * cos(theta) - width * sin(theta)
  const y = len * sin(theta) + width * cos(theta)
  return fixedPoint(new Point(x, y))
}

// 获取两道路 （路1出口与路2进口 ）之间交点
/**
 * @param {number} width1 道路1出口侧到中心线距离
 * @param {number} width2 道路2入口侧到中心线距离
 * @param {number} alpha  道路1角度
 * @param {number} beta 道路2角度
 * 道路1与道路2夹角!==pi
 */
export function getJoinPoint(width1, width2, alpha, beta) {
  if (abs(beta - alpha) === pi) {
    // return null
    return getOutLinePoint(0, width1, alpha)
  } else {
    const x = (width1 * cos(beta) + width2 * cos(alpha)) / sin(beta - alpha)
    const y = (width1 * sin(beta) + width2 * sin(alpha)) / sin(beta - alpha)
    return new Point(x, y)
  }
}

// 基本渠化
/**
 * @param {Array} dirs 渠化所有信息
 * @param {number} edgeBgWid 边界边缘宽
 * @param {number} twoYellowLineDiv 双黄线宽
 * @param {number} greenBagWidth 绿化带宽度
 * @param {number} lenScale 1m=>6px显示
 * @param {number} roadLen 道路长
 * @param {number} sideWalkLen 人行道长
 * @param {number} rightTurnLaneWid 右转专用车道进口宽
 * @param {string} bgColor 道路背景色
 * @param {number} solidLen 进口车道实线长
 * @param {Array} dashLen 车道虚线长
 * @param {number} imgWid 车道转向图片 宽
 * @param {number} imgHeight 车道转向图片 高
 */
export class RoadChan {
    edgeBgWid = 1  
    twoYellowLineDiv = 3 
    greenBagWidth = 3
    lenScale = 6
    roadLen = 400
    sideWalkLen = 20
    rightTurnLaneWid = 20
    bgColor = '#2f354b'
    // bgColor = 'rgba(0,0,0,.35)'
    solidLen = 56
    dashLen = [16, 24]
    imgWid = 20
    imgHeight = 20
    constructor(dirs) {
      this.dirs = dirs
      // this.edgeBgWid = 1
      // this.twoYellowLineDiv = 3
      // this.lenScale = 6
      // this.roadLen = 360
      // this.sideWalkLen = 20
      // this.bgColor = 'rgba(0,0,0,.35)'
      // this.solidLen = 56
      // this.dashLen = [16, 24]
      // this.imgWid = 20
      // this.imgHeight = 20
    }
    // 获取各道路路宽
    getRoadWidth() {
      const width = []
      for (let i = 0; i < this.dirs.length; i++) {
        let wid = 0
        const dir = this.dirs[i]
        // 进口车道
        for (let j = 0; j < dir.inLanes.length; j++) {
          const lane = dir.inLanes[j]
          wid += lane.wid
        }
        // 出口车道
        for (let j = 0; j < dir.outLanes.length; j++) {
          const lane = dir.outLanes[j]
          wid += lane.wid
        }
        wid += 2 * this.edgeBgWid // 道路两侧各留1m
        wid *= this.lenScale // 1m=>6px显示
        // 分隔形式
        if (dir.divide === 1) {
          // 双黄线
          wid += this.twoYellowLineDiv * 3 // 3px
        } else if (dir.divide === 0) {
          wid += 3  //单黄线
        }
        else if (dir.divide === 2) {
          wid += this.greenBagWidth * 6  //绿化带
        }
        width.push(wid)
      }
      this.width = width
      return width
    }
    // 获取各边界坐标
    getBoundPs() {
      const boundPs = []
      const boundLinePs = []
      const joinPs = []
      const sideWalkStart = [] // 人行道信息{起点坐标，人行道长， 距中心距离，角度}
      const width = this.getRoadWidth()
      // 获取背景数据
      for (let i = 0; i < width.length; i++) {
        const wid1 = width[i] / 2
        const road1 = this.dirs[i]
        let wid2, road2
        if (i === width.length - 1) {
          wid2 = width[0] / 2
          road2 = this.dirs[0]
        } else {
          wid2 = width[i + 1] / 2
          road2 = this.dirs[i + 1]
        }
        // 获取背景点坐标

        const out_end1 = getOutLinePoint(this.roadLen, wid1, road1.rotation)
        const in_end2 = getInLinePoint(this.roadLen, wid2, road2.rotation)
        const join = getJoinPoint(wid1, wid2, road1.rotation, road2.rotation)
        boundPs.push([out_end1, join, in_end2])

        
        // 获取边界线坐标
        const out_end_line1 = getOutLinePoint(this.roadLen, wid1 - this.edgeBgWid * this.lenScale, road1.rotation)
        const in_end_line2 = getInLinePoint(this.roadLen, wid2 - this.edgeBgWid * this.lenScale, road2.rotation)
        const join_line = getJoinPoint(wid1 - this.edgeBgWid * this.lenScale, wid2 - this.edgeBgWid * this.lenScale, road1.rotation, road2.rotation)
        
        boundLinePs.push([out_end_line1, join_line, in_end_line2])
        // 交点
        joinPs.push(join_line)

      }
      // 人行道信息
      for (let i = 0; i < joinPs.length; i++) {
        const wid = width[i] - this.edgeBgWid * this.lenScale
        const alpha = this.dirs[i].rotation
        let in_join
        const out_join = joinPs[i]
        if (i === 0) {
          in_join = joinPs[joinPs.length - 1]
        } else {
          in_join = joinPs[i - 1]
        }
        // 判断in out距中心点距离
        let dis_in, dis_out
        if (in_join !== null) {
          dis_in = getTwoPointDis(in_join, new Point(0, 0))
        } else {
          dis_in = 0
        }
        if (out_join !== null) {
          dis_out = getTwoPointDis(out_join, new Point(0, 0))
        } else {
          dis_out = 0
        }
        // 计算人行道到中心点的距离
        let len, theta
        const sideWalkLen = this.dirs[i].sideWalkLen
        // const sideWalkLen = this.sideWalkLen
        if (dis_in <= dis_out) {
          theta = atan2(out_join.y, out_join.x)
          len = dis_out * cos(theta - alpha)
        } else {
          theta = atan2(in_join.y, in_join.x)
          len = dis_in * cos(alpha - theta)
        }
        len += 5 // 人行道外移1m,人行道到中心点的距离


        if (len < 40) {
          len = 40
        }
        this.dirs[i].len = len
        // wid路宽
        sideWalkStart.push({ len, sideWalkLen, alpha, wid })  //len：人行道到中心点的距离；sideWalkLen：人行横道长度；alpha:道路旋转角度；wid：人行横道宽度（马路宽度-边界边缘宽）；
      }
      this.boundPs = boundPs   //背景边界点坐标；
      this.boundLinePs = boundLinePs  //边界边缘点坐标；
      this.sideWalkStart = sideWalkStart  //人行道起始信息；
      return { boundPs, boundLinePs, sideWalkStart }
    }

    // 根据人行道信息，获取绘制人行道的坐标
    getSideWalkPs() {
      const sideWalkPs = []
      const avg = [] //每条车道斑马线的平均长度
      for (let i = 0; i < this.sideWalkStart.length; i++) {
        const { len, sideWalkLen, alpha, wid } = this.sideWalkStart[i]
        const walkP = []
        const s = -floor(wid / 2 - 3)
        const e = floor(wid / 2 - 3)
        for (let j = s; j < e; j = j + 6) {
          const p_s = getInLinePoint(len, j, alpha)  
          const p_e = getInLinePoint(len + sideWalkLen, j, alpha)
          walkP.push([p_s, p_e])
        }
          avg.push(floor(((e-s)/6 + 1 ) / (this.dirs[i].inLanes.length + this.dirs[i].outLanes.length)))
        sideWalkPs.push(walkP)
      }
      for (let i = 0; i < this.sideWalkStart.length; i++) {  //对于有右转专用车道人形道，内边界不需要斑马线
        if (i === 0){
          if (this.dirs[i].rightTurnLane === 1 && this.dirs[i].isInUnvehi === 1){
            sideWalkPs[i] = sideWalkPs[i].slice(0, -avg[i]+1)
            sideWalkPs[this.sideWalkStart.length -1] = sideWalkPs[this.sideWalkStart.length -1].slice(avg[this.sideWalkStart.length - 1])
          }
        } else {
          if (this.dirs[i].rightTurnLane === 1 && this.dirs[i].isInUnvehi === 1){
            sideWalkPs[i] = sideWalkPs[i].slice(0, -avg[i]+1)
            sideWalkPs[i -1] = sideWalkPs[i -1].slice(avg[i - 1])
          }
        }  
      }
      //   this.sideWalkPs = sideWalkPs
      return sideWalkPs
    }
    // 根据人行道信息 获取车道(虚线)坐标点 中心线坐标点 车道实线坐标点 停车线坐标点  ,路名位置 上游路口名
    getRoadLinesPs() {
      const sideWalkStart = this.sideWalkStart  //人行道信息{起点坐标，人行道长，角度，路宽}
      const dirs = this.dirs
      const unVehi_in = []
      const unVehi_out = []
      const dashLine_in = []
      const dashLine_out = []
      const solidLine = []
      const divideLine = []
      const parkLine = []
      const roadName = []
      const inRoadName = []
      const outRoadName = []
      const upRoadName = []
      const turn_in = [] // 进口车道转向
      const turn_out = []
      const turn_imgs = []
      const detc_stra = [] // 战略检测器
      const detc_tact = [] // 战术检测器
      const detc_off = [] // 溢出检测器
      const line_pt = []// 溢出排队长度
      const line_tact = []// 战术排队长度
      const line_stra = [] // 战略排队长度

      const join_point = [] //存储车道线交叉点信息

      // signals = [];
      for (let i = 0; i < dirs.length; i++) {
        //const { len, alpha, sideWalkLen, wid } = sideWalkStart[i]
        const { len, sideWalkLen, alpha, wid } = sideWalkStart[i]
        const dash_in = []
        const solid_in = []
        const dash_out = []
        const turn_i = []
        const turn_o = []
        const detc_st = []
        const detc_ta = []
        const detc_of = []
        const line_p = []
        const line_t = []
        const line_s = []
        // sig = [];
        let outLaneW = this.edgeBgWid
        let inLaneW = this.edgeBgWid
        const inName = dirs[i].inRoadName
        const outName = dirs[i].outRoadName
        const upName = dirs[i].upRoad.name
        let lineLen = this.lineLen ? this.lineLen : dirs[i].lineLen + 70

        if (lineLen > 380) {
          lineLen = 380
        }
        // 路名坐标
        const startL = len + sideWalkLen + 10
        const namePs = getInLinePoint(startL + 100, wid / 2 + 3 * this.lenScale, alpha) //进口路段名坐标；
        const namePs_out = getOutLinePoint(startL + 100, wid / 2 + 3 * this.lenScale, alpha)  //出口路段名坐标；

        const namePs_out_s1 = getOutLinePoint(startL + 100 - outName.length * this.lenScale, wid / 2 + 1 * this.lenScale, alpha)
        const namePs_out_s2 = getOutLinePoint(startL + 100 - outName.length * this.lenScale, wid / 2 + 5 * this.lenScale, alpha)
        const namePs_out_e1 = getOutLinePoint(startL + 100 + outName.length * this.lenScale, wid / 2 + 1 * this.lenScale, alpha)
        const namePs_out_e2 = getOutLinePoint(startL + 100 + outName.length * this.lenScale, wid / 2 + 5 * this.lenScale, alpha)

        const namePs_up = getInLinePoint(lineLen, 0, alpha)
        const namePs_up_1 = getOutLinePoint(lineLen - 15, -upName.length * 10, alpha)
        const namePs_up_2 = getOutLinePoint(lineLen - 15, upName.length * 10, alpha)
        const namePs_up_3 = getOutLinePoint(lineLen + 15, upName.length * 10, alpha)
        const namePs_up_4 = getOutLinePoint(lineLen + 15, -upName.length * 10, alpha)
        roadName.push({ namePs, name, alpha })
        inRoadName.push({ namePs: namePs, name: inName, alpha: alpha })  //进口路段信息；
        outRoadName.push({
          namePs: namePs_out,
          name: outName,
          alpha: alpha,
          namePs_s1: namePs_out_s1,
          namePs_e1: namePs_out_e1,
          namePs_s2: namePs_out_s2,
          namePs_e2: namePs_out_e2
        })
        upRoadName.push({
          namePs: namePs_up,
          name: upName,
          alpha: alpha,
          namePs_1: namePs_up_1,
          namePs_2: namePs_up_2,
          namePs_3: namePs_up_3,
          namePs_4: namePs_up_4
        })
        // 进口
        const unvehiIn_s = new Point()
        const invehiIn_e = new Point()
        for (let j = dirs[i].inLanes.length - 1; j >= 0; j--) {
          const inLane = dirs[i].inLanes[j]
          const laneName = turnName[inLane.turn].en

          inLaneW += inLane.wid
          // 非机动车道
          if (inLane.properties === 3) {
            unvehiIn_s = getInLinePoint(startL, wid / 2 - inLaneW * this.lenScale, alpha) //非机动车道线起始点坐标；
            invehiIn_e = getInLinePoint(this.roadLen, wid / 2 - inLaneW * this.lenScale, alpha)  //非机动车道线终点坐标；
            
          } else if (inLane.properties === 1) {
            // 机动车道
            // 虚线
            const l = this.solidLen + this.dashLen[1] //l 为停止线到开始画虚线的长度；
            const dash_s = getInLinePoint(startL + l, wid / 2 - inLaneW * this.lenScale, alpha) //机动车道虚线部分起始点坐标；
            const dash_e = getInLinePoint(this.roadLen, wid / 2 - inLaneW * this.lenScale, alpha)  //机动车道虚线部分终点坐标；
            dash_in.push([dash_s, dash_e])
            // 实线
            const solid_s = getInLinePoint(startL, wid / 2 - inLaneW * this.lenScale, alpha)  //机动车道实线部分起始点坐标；
            const solid_e = getInLinePoint(startL + this.solidLen, wid / 2 - inLaneW * this.lenScale, alpha) //机动车道实线部分终点坐标；
            solid_in.push([solid_s, solid_e])
            // 进口车道转向
            const t_i_c = getInLinePoint(startL + this.imgWid, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)  //进口车道转向图标位置；
            const d_s_c = getInLinePoint(startL + this.imgWid * 2+ 40, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha) //战略检测器位置；
            const d_t_c = getInLinePoint(startL + this.imgWid * 2, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)  //战术检测器位置；
            const l_t_c = getInLinePoint(startL + 20 + this.imgWid * 2, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)  //战略排队长度；
            const l_s_c = getInLinePoint(startL + 20 + this.imgWid * 2 + 40, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha) //战术排队长度；
            // 信号灯位置
            const t_i_d = getInLinePoint(startL + this.imgWid - 60, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)
            
            turn_i.push({ img_c: t_i_c, name: laneName, type: 'turn_in', index: [i, j] }) 
            detc_st.push({ img_c: d_s_c, name: 'detc_stra', type: 'detc_stra', index: [i, j] })
            detc_ta.push({ img_c: d_t_c, name: 'detc_tact', type: 'detc_tact', index: [i, j] })
            turn_imgs.push({ img_c: t_i_c, name: laneName, type: 'turn_in', index: [i, j], img_d: t_i_d })
            line_t.push({ img_c: l_t_c, index: [i, j] })
            line_s.push({ img_c: l_s_c, index: [i, j] })
          }
        }
        unVehi_in.push([unvehiIn_s, invehiIn_e])
        dashLine_in.push(dash_in)  //机动车道虚线信息；
        solidLine.push(solid_in)   //机动车道实线信息；
        turn_in.push(turn_i)       //进口车道转向信息；
        detc_stra.push(detc_st)    //战略检测器信息；
        detc_tact.push(detc_ta)    //战术检测器信息；
        line_stra.push(line_s)     //战略排队长度；
        line_tact.push(line_t)     //战术排队长度；
        // 停车线
        let park_s = new Point  //停车线起始点（靠近边缘边界）；
        const park_e = getInLinePoint(startL, wid / 2 - inLaneW * this.lenScale, alpha)         //停车线终点（靠近分割线）；
        if (dirs[i].rightTurnLane === 1 && dirs[i].isInUnvehi === 1){
          park_s = getInLinePoint(startL, wid / 2 - (this.edgeBgWid + dirs[i].inLanes[dirs[i].inLanes.length - 1].wid) * this.lenScale, alpha)
        } else {
          park_s = getInLinePoint(startL, wid / 2 - this.edgeBgWid * this.lenScale, alpha)
        }
        parkLine.push([park_s, park_e])
        // 出口
        const outvehiOut_s = new Point()
        const outvehiOut_e = new Point()
        for (let j = dirs[i].outLanes.length - 1; j >= 0; j--) {
          const outLane = dirs[i].outLanes[j]
          const laneName = turnName[outLane.turn].en
          outLaneW += outLane.wid
          if (outLane.properties === 3) {
            // 非机动车道
            outvehiOut_s = getOutLinePoint(startL, wid / 2 - outLaneW * this.lenScale, alpha)  //非机动车道线起始点坐标；
            outvehiOut_e = getOutLinePoint(this.roadLen, wid / 2 - outLaneW * this.lenScale, alpha)  //非机动车道线终点坐标；
            
          } else if (outLane.properties === 1) {
            // 机动车道
            const dash_s = getOutLinePoint(startL, wid / 2 - outLaneW * this.lenScale, alpha)  //机动车道线起始点坐标；
            const dash_e = getOutLinePoint(this.roadLen, wid / 2 - outLaneW * this.lenScale, alpha) //机动车道线终点坐标；
            dash_out.push([dash_s, dash_e])
            // 转向
            const t_o_c = getOutLinePoint(startL + this.imgWid, wid / 2 - (outLaneW - outLane.wid / 2) * this.lenScale, alpha) //出口车道转向标识；
            const d_o_c = getOutLinePoint(startL + this.imgWid * 2, wid / 2 - (outLaneW - outLane.wid / 2) * this.lenScale, alpha) //溢出检测器位置；
            const l_o_c = getOutLinePoint(startL + 20 + this.imgWid * 2, wid / 2 - (outLaneW - outLane.wid / 2) * this.lenScale, alpha) //溢出排队长度； 
            turn_o.push({ img_c: t_o_c, name: laneName, type: 'turn_out', index: [i, j] })
            detc_of.push({ img_c: d_o_c, name: 'detc_off', type: 'detc_off', index: [i, j] }) 
            // let s_i_c = getOutLinePoint(len - imgWid / 2, wid / 2 - (inLaneW - inLane.wid / 2) * lenScale, alpha);
            // sig.push({ img_c: s_i_c, alpha: alpha });
            turn_imgs.push({ img_c: t_o_c, name: laneName, type: 'turn_out', index: [i, j] })
            line_p.push({ img_c: l_o_c, index: [i, j] })  
          }
        }
        unVehi_out.push([outvehiOut_s, outvehiOut_e])
        dashLine_out.push(dash_out)
        turn_out.push(turn_o)
        detc_off.push(detc_of)
        line_pt.push(line_p)
        // line_tact.push(line_t)
        // line_stra.push(line_s)
        // signals.push(sig)
        
        //存储车道线交叉点信息（可作为贝塞尔曲线控制点）---便于有右转专用车道时绘制非机动车道线和外侧机动车道线
        const vehi_join = new Point()
        const unvehi_join = new Point()
        if (dirs[i].rightTurnLane === 1 && dirs[i].isInUnvehi === 0){ //有右转专用车道但无非机动车道 
          if (i === 0) {
            const wid2 = sideWalkStart[dirs.length - 1].wid
            const alpha2 = sideWalkStart[dirs.length - 1].alpha
            vehi_join = getJoinPoint(wid2 / 2 - (dirs[dirs.length - 1].outLanes[dirs[dirs.length - 1].outLanes.length - 1].wid + this.edgeBgWid ) * this.lenScale, wid / 2 - (dirs[i].inLanes[dirs[i].inLanes.length - 1].wid + this.edgeBgWid)* this.lenScale, alpha2, alpha)
          } else {
            const wid3 = sideWalkStart[i - 1].wid
            const alpha3 = sideWalkStart[i - 1].alpha
            vehi_join = getJoinPoint(wid3 / 2 - (dirs[i - 1].outLanes[dirs[i - 1].outLanes.length - 1].wid + this.edgeBgWid ) * this.lenScale, wid / 2 - (dirs[i].inLanes[dirs[i].inLanes.length - 1].wid + this.edgeBgWid ) * this.lenScale, alpha3, alpha)
          } 
        } 
        if (dirs[i].rightTurnLane === 1 && dirs[i].isInUnvehi === 1){ //有右转专用车道且有非机动车道)
          if (i === 0) {
            const wid4 = sideWalkStart[dirs.length - 1].wid
            const alpha4 = sideWalkStart[dirs.length - 1].alpha
            unvehi_join= getJoinPoint(wid4 / 2 - (dirs[dirs.length - 1].outLanes[dirs[dirs.length - 1].outLanes.length - 1].wid + this.edgeBgWid) * this.lenScale, wid / 2 - (dirs[i].inLanes[dirs[i].inLanes.length - 1].wid + this.edgeBgWid) * this.lenScale, alpha4, alpha)
            vehi_join = getJoinPoint(wid4 / 2 - (dirs[dirs.length - 1].outLanes[dirs[dirs.length - 1].outLanes.length - 1].wid + this.edgeBgWid * 1.25) * 2 * this.lenScale, wid / 2 - (dirs[i].inLanes[dirs[i].inLanes.length - 1].wid  + this.edgeBgWid * 1.25) * 2 * this.lenScale, alpha4, alpha)
          } else {
            const wid5 = sideWalkStart[i - 1].wid
            const alpha5 = sideWalkStart[i - 1].alpha
            unvehi_join = getJoinPoint(wid5 / 2 - (dirs[i - 1].outLanes[dirs[i - 1].outLanes.length - 1].wid + this.edgeBgWid) * this.lenScale, wid / 2 - (dirs[i].inLanes[dirs[i].inLanes.length - 1].wid + this.edgeBgWid) * this.lenScale, alpha5, alpha)
            vehi_join = getJoinPoint(wid5 / 2 - (dirs[i - 1].outLanes[dirs[i - 1].outLanes.length - 1].wid + this.edgeBgWid * 1.25) * 2 * this.lenScale, wid / 2 - (dirs[i].inLanes[dirs[i].inLanes.length - 1].wid + this.edgeBgWid * 1.25) * 2 * this.lenScale, alpha5, alpha)
          }
        }
        join_point.push([vehi_join, unvehi_join])

        // 中间分隔线坐标
        if (dirs[i].inLanes.length - dirs[i].isInUnvehi === 0) {  //没有进口车道的情况：无中间分割线；
          divideLine.push([])
        } else if (dirs[i].outLanes.length - dirs[i].isOutUnvehi === 0) { //没有出口车道的情况：无中间分割线；
          divideLine.push([])
        } else if (dirs[i].divide === 1) {  //分割形式为双黄线；
          // 双黄线
          const divi_s = getInLinePoint(startL, wid / 2 - inLaneW * this.lenScale, alpha) //右侧双黄线起始点坐标；
          const divi_e = getInLinePoint(this.roadLen, wid / 2 - inLaneW * this.lenScale, alpha) //右侧双黄线终点坐标；
          const divi_s1 = getInLinePoint(startL, wid / 2 - inLaneW * this.lenScale - this.twoYellowLineDiv, alpha)  //左侧双黄线起始点坐标；
          const divi_e1 = getInLinePoint(this.roadLen, wid / 2 - inLaneW * this.lenScale - this.twoYellowLineDiv, alpha)  //左侧双黄线终点坐标；
          divideLine.push([divi_s, divi_e, divi_s1, divi_e1])
        } else if (dirs[i].divide === 0) { //分割形式为单黄线；
          // 单黄线
          const divi_s = getInLinePoint(startL, wid / 2 - inLaneW * this.lenScale, alpha)  //单黄线起始点坐标；
          const divi_e = getInLinePoint(this.roadLen, wid / 2 - inLaneW * this.lenScale, alpha)  //单黄线终点坐标；
          divideLine.push([divi_s, divi_e])
        }
        else if (dirs[i].divide === 2) { //分割形式为绿化带；
          // 绿化带
          const divi_s = getInLinePoint(startL, wid / 2 - inLaneW * this.lenScale, alpha)  //右侧绿化带起始点坐标；
          const divi_e = getInLinePoint(this.roadLen, wid / 2 - inLaneW * this.lenScale, alpha)  //右侧绿化带终点坐标；
          const divi_s1 = getInLinePoint(startL, wid / 2 - inLaneW * this.lenScale - this.greenBagWidth * 4, alpha)  //左侧绿化带起始点坐标；
          const divi_e1 = getInLinePoint(this.roadLen, wid / 2 - inLaneW * this.lenScale - this.greenBagWidth * 4, alpha)  //左侧绿化带终点坐标；
          const divi_m1 = new Point((divi_s.x + divi_s1.x) / 2, (divi_s.y + divi_s1.y) / 2)  //辅助点，画图时使用；
          divideLine.push([divi_s, divi_m1, divi_s1, divi_e1, divi_e])
        }
      }
      this.unVehi_in = unVehi_in
      this.unVehi_out = unVehi_out
      this.dashLine_in = dashLine_in
      this.dashLine_out = dashLine_out
      this.solidLine = solidLine
      this.divideLine = divideLine
      this.parkLine = parkLine
      this.inRoadName = inRoadName
      this.outRoadName = outRoadName
      this.upRoadName = upRoadName
      this.turn_in = turn_in
      this.turn_out = turn_out
      this.turn_imgs = turn_imgs
      this.detc_stra = detc_stra
      this.detc_tact = detc_tact
      this.detc_off = detc_off
      this.line_pt = line_pt
      this.line_tact = line_tact
      this.line_stra = line_stra
      
      this.join_point = join_point

      // return { dashLine_in, dashLine_out, unVehi_in, unVehi_out, solidLine, divideLine, parkLine, roadName, turn_in, turn_out, detc_stra, detc_tact, detc_off };
    }
    // 画背景
    drawBoundPs(ctx, boundPs, bgColor) {  //boundPs:边界点坐标组成的数组；
      ctx.beginPath()
      for (let i = 0; i < this.dirs.length; i++){
        let outl1, join, inl1
        if (i === 0) {  
          [outl1, join, inl1] = boundPs[boundPs.length - 1]      
        } else {
          [outl1, join, inl1]= boundPs[i - 1]
        }
        ctx.lineTo(outl1.x, outl1.y)
        if (this.dirs[i].rightTurnLane === 1) { // 在出口边界点坐标和交点中间取一点作为贝塞尔曲线的起点
          ctx.lineTo(0.5 * join.x + 0.5 * outl1.x, 0.5 * join.y + 0.5 * outl1.y)
          ctx.quadraticCurveTo(join.x, join.y, 0.5 * join.x + 0.5 * inl1.x, 0.5 * join.y + 0.5 * inl1.y)   // 在进口边界点坐标和交点中间取一点作为贝塞尔曲线的终点        
        } else {
          ctx.lineTo(0.85 * join.x + 0.15 * outl1.x, 0.85 * join.y + 0.15 * outl1.y) 
          ctx.quadraticCurveTo(join.x, join.y, 0.85 * join.x + 0.15 * inl1.x, 0.85 * join.y + 0.15 * inl1.y)
        } 
        ctx.lineTo(inl1.x, inl1.y) 
        
      }  
      ctx.closePath()
      ctx.fillStyle = bgColor
      ctx.fill()
    }
    // 画边界线
    drawBoundLinePs(ctx, boundLinePs, joinPoint, dashLineIn, dashLineOut, unVehi, unVehiOut){
      ctx.setLineDash([])  //实线
      ctx.beginPath()
      for (let i = 0; i < this.dirs.length; i++) {
        let outl, join, inl
        if (i === 0) {
          [outl, join, inl] = boundLinePs[boundLinePs.length - 1]        
        } else {
          [outl, join, inl] = boundLinePs[i - 1]
        }
        ctx.moveTo(outl.x, outl.y)
        if (this.dirs[i].rightTurnLane === 1) { //} && this.dirs[i].isInUnvehi ===1) {
          const vehi_join = joinPoint[i][0]
          const unvehi_join = joinPoint[i][1]
          const dash_in_e = dashLineIn[i][0][1]
          let dashOut_s = new Point()
          let dashOut_e = new Point()
          const unvehiIn_e = unVehi[i][1]
          let unvehiOut_e = new Point()
          if (i === 0){
            [dashOut_s, dashOut_e] = dashLineOut[this.dirs.length - 1][0]
            unvehiOut_e = unVehiOut[unVehiOut.length - 1][1] 
          } else {
            [dashOut_s, dashOut_e] = dashLineOut[i - 1][0]
            unvehiOut_e = unVehiOut[i - 1][1]
          }
          if (this.dirs[i].isInUnvehi ===1){
            ctx.lineTo(0.5 * join.x + 0.5 * outl.x, 0.5 * join.y + 0.5 * outl.y)
            ctx.quadraticCurveTo(join.x, join.y, 0.5 * join.x + 0.5 * inl.x, 0.5 * join.y + 0.5 * inl.y)
            ctx.lineTo(inl.x, inl.y) 

            ctx.moveTo(0.78 * unvehi_join.x + 0.22 * unvehiIn_e.x,  0.78 * unvehi_join.y + 0.22 * unvehiIn_e.y)  
            ctx.bezierCurveTo(unvehi_join.x, unvehi_join.y, unvehi_join.x, unvehi_join.y, 0.78 * unvehi_join.x + 0.22 * unvehiOut_e.x, 0.78 * unvehi_join.y + 0.22 * unvehiOut_e.y)       
          } else {     
            ctx.lineTo(0.5 * join.x + 0.5 * outl.x, 0.5 * join.y + 0.5 * outl.y)
            ctx.quadraticCurveTo(join.x, join.y, 0.5 * join.x + 0.5 * inl.x, 0.5 * join.y + 0.5 * inl.y)
            ctx.lineTo(inl.x, inl.y)
            ctx.moveTo(0.8 * join.x + 0.2 * inl.x, 0.8 * join.y + 0.2 * inl.y)
            ctx.bezierCurveTo(join.x, join.y, join.x, join.y, 0.8 * join.x + 0.2 * outl.x, 0.8 * join.y + 0.2 * outl.y)  
          }
               
        } else {
          ctx.lineTo(0.85 * join.x + 0.15 * outl.x, 0.85 * join.y + 0.15 * outl.y)          
          ctx.quadraticCurveTo(join.x, join.y, 0.85 * join.x + 0.15 * inl.x, 0.85 * join.y + 0.15 * inl.y)
          ctx.lineTo(inl.x, inl.y)
        }
      }
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.stroke()
      
    }
    画人行道
    drawSideWalkPs(ctx) {
      const sideWalkPs = this.getSideWalkPs()
      ctx.setLineDash([])
      for (let i = 0; i < sideWalkPs.length; i++) {
        const walkP = sideWalkPs[i]
        ctx.beginPath()
        ctx.setLineDash([])
        for (let j = 0; j < walkP.length; j++) {
          const [p_s, p_e] = walkP[j]
          ctx.moveTo(p_s.x, p_s.y)
          ctx.lineTo(p_e.x, p_e.y)
        }
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.closePath()
      }
      
    }
    drawWaitingArea(ctx, solidLine, dashLineOut){
      for (let i = 0; i < this.dirs.length; i++){
        let m = 0
        if (this.dirs[i].inLanes.length >2){
          m = this.dirs[i].inLanes.length -2
        } else {
          m = this.dirs[i].inLanes.length -1
        }
        for (let j =0; j < m; j++){
          const solidPoint = solidLine[i].slice().reverse()
          const areaPoint1 = new Point()
          const areaPoint3 = new Point()
          const areaPoint2 = new Point()
          const areaPoint4 = new Point() 
          areaPoint1.x = solidPoint[j][0].x - (solidPoint[j][1].x - solidPoint[j][0].x) * 0.54 
          areaPoint1.y = solidPoint[j][0].y - (solidPoint[j][1].y - solidPoint[j][0].y) * 0.54
          areaPoint3.x = solidPoint[j + 1][0].x - (solidPoint[j + 1][1].x - solidPoint[j + 1][0].x) * 0.54
          areaPoint3.y = solidPoint[j + 1][0].y - (solidPoint[j + 1][1].y - solidPoint[j + 1][0].y) * 0.54
                  
          areaPoint2.x = solidPoint[j][0].x - (solidPoint[j][1].x - solidPoint[j][0].x) * 1.25
          areaPoint2.y = solidPoint[j][0].y- (solidPoint[j][1].y - solidPoint[j][0].y) * 1.25
          areaPoint4.x = solidPoint[j + 1][0].x - (solidPoint[j + 1][1].x - solidPoint[j + 1][0].x) * 1.25
          areaPoint4.y = solidPoint[j + 1][0].y- (solidPoint[j + 1][1].y - solidPoint[j + 1][0].y) * 1.25

          

          if (this.dirs[i].inLanes[j].hasWaitingArea ===1 && this.dirs[i].inLanes[j].turn === 12) {  //左转等待区
            ctx.beginPath()
            ctx.setLineDash([4,3])
            ctx.moveTo(areaPoint1.x, areaPoint1.y)

            const areaPoint5 = new Point()
            const areaPoint6 = new Point()
            areaPoint5.x = (solidPoint[j][0].x+solidPoint[j + 1][0].x)/2 - ((solidPoint[j][1].x+solidPoint[j + 1][1].x)/2 - (solidPoint[j][0].x+solidPoint[j + 1][0].x)/2) * 1.35
            areaPoint5.y = (solidPoint[j][0].y+solidPoint[j + 1][0].y)/2 - ((solidPoint[j][1].y+solidPoint[j + 1][1].y)/2 - (solidPoint[j][0].y+solidPoint[j + 1][0].y)/2) * 1.35
            if (j===0){
              const dashPoint = dashLineOut[i].slice().reverse() 
              const dashOutLen = getTwoPointDis(dashPoint[1][0], dashPoint[1][1])         
              areaPoint6.x = (solidPoint[j][0].x+dashPoint[1][0].x)/2 - ((solidPoint[j][1].x+(dashPoint[1][1].x - dashPoint[1][0].x)*(56 / dashOutLen ) + dashPoint[1][0].x)/2 - (solidPoint[j][0].x+dashPoint[1][0].x)/2) * 1.35
              areaPoint6.y = (solidPoint[j][0].y+dashPoint[1][0].y)/2 - ((solidPoint[j][1].y+(dashPoint[1][1].y - dashPoint[1][0].y)*(56 / dashOutLen ) + dashPoint[1][0].y)/2 - (solidPoint[j][0].y+dashPoint[1][0].y)/2) * 1.35
            } else {
              areaPoint6.x = (solidPoint[j][0].x+solidPoint[j - 1][0].x)/2 - ((solidPoint[j][1].x+solidPoint[j - 1][1].x)/2 - (solidPoint[j][0].x+solidPoint[j - 1][0].x)/2) * 1.35
              areaPoint6.y = (solidPoint[j][0].y+solidPoint[j - 1][0].y)/2 - ((solidPoint[j][1].y+solidPoint[j - 1][1].y)/2 - (solidPoint[j][0].y+solidPoint[j - 1][0].y)/2) * 1.35
            }
        
            ctx.quadraticCurveTo(areaPoint2.x, areaPoint2.y, areaPoint6.x, areaPoint6.y)
            ctx.moveTo(areaPoint3.x, areaPoint3.y)
            ctx.quadraticCurveTo(areaPoint4.x, areaPoint4.y, areaPoint5.x, areaPoint5.y)
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = 2
            ctx.stroke()
            ctx.closePath()
            ctx.beginPath()
            ctx.setLineDash([])
            ctx.moveTo(areaPoint5.x, areaPoint5.y)
            ctx.lineTo( areaPoint6.x, areaPoint6.y)
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = 2
            ctx.stroke()
            ctx.closePath()

            ctx.save()
            ctx.translate((areaPoint2.x +areaPoint4.x)/2, (areaPoint2.y +areaPoint4.y)/2)
            ctx.rotate(this.dirs[i].rotation - 90*Math.PI/180)
            ctx.font = '12px arial'
            ctx.fillStyle = '#fff'
            ctx.fillText('待', 0, 0)
            ctx.restore()
          }
          // if (this.dirs[i].inLanes[j].hasWaitingArea ===1 && this.dirs[i].inLanes[j].turn === 11) {     //直行等待区                     
          //   ctx.lineTo( areaPoint2.x, areaPoint2.y)
          //   ctx.moveTo(areaPoint3.x, areaPoint3.y)
          //   ctx.lineTo( areaPoint4.x, areaPoint4.y)
          //   ctx.strokeStyle = '#fff'
          //   ctx.lineWidth = 2
          //   ctx.stroke()
          //   ctx.closePath()

          //   ctx.beginPath()
          //   ctx.setLineDash([])
          //   ctx.moveTo(areaPoint2.x, areaPoint2.y)
          //   ctx.lineTo( areaPoint4.x, areaPoint4.y)
          // }
          
        }
      }
      
    }
    // 画路名
    drawRoadName(ctx, roadName) {
      for (let i = 0; i < roadName.length; i++) {
        const { name, namePs, alpha } = roadName[i]
        ctx.save()
        ctx.translate(namePs.x, namePs.y) //重新映射画布上原点的位置；
        if (alpha > pi / 2 && alpha < 3 * pi / 2) {
          ctx.rotate(alpha + pi)  //旋转当前绘图；
        } else {
          ctx.rotate(alpha)
        }
        ctx.textAlign = 'center'
        ctx.fillStyle = '#333'
        ctx.font = '16px sans-serif'
        ctx.fillText(name, 0, 4)
        ctx.restore()
      }
    }
    // 画上游路口名
    drawUpRoadName(ctx, roadName) {
      for (let i = 0; i < roadName.length; i++) {
        const { name, namePs, alpha, namePs_1, namePs_2, namePs_3, namePs_4 } = roadName[i]
        const ps = [namePs_1, namePs_2, namePs_3, namePs_4]
        // 画白色背景
        ctx.beginPath()
        for (let i = 0; i < ps.length; i++) {
          ctx.lineTo(ps[i].x, ps[i].y)
        }
        ctx.fillStyle = '#072C49'
        ctx.fill()
        ctx.save()  //保存当前环境的状态；
        ctx.translate(namePs.x, namePs.y) //重新映射画布原点的位置；

        if (alpha >= 0 && alpha < pi) {
          ctx.rotate(alpha - pi / 2)
        } else {
          ctx.rotate(alpha + pi / 2)
        }
        ctx.textAlign = 'center' // 设置文本对齐方式；
        ctx.fillStyle = '#fff'
        ctx.font = '18px sans-serif'
        ctx.fillText(name, 0, 6)  //name:在画布中输出的文本；0：开始绘制文本的x坐标；6：开始绘制文本的y坐标（相对于画布原点位置）；
        ctx.restore()  //返回之前保存过的路径状态和属性
      }
    }
    // 画非机动车道
    // drawUnVehicLines(ctx, unVehi) {  
    //   ctx.setLineDash([])
    //   ctx.beginPath()
    //   for (let i = 0; i < unVehi.length; i++) {
    //     const [s, e] = unVehi[i]
    //     ctx.moveTo(s.x, s.y)
    //     ctx.lineTo(e.x, e.y)
    //   }    
    //   ctx.strokeStyle = '#fff'
    //   ctx.lineWidth = 2
    //   ctx.stroke()
    // }
    drawUnVehicLines(ctx, unVehi, unVehiOut, joinPoint){ //boundPs) {  
      ctx.setLineDash([])
      ctx.beginPath() 
      for (let i = 0; i < unVehi.length; i++) {
        const in_s = new Point()
        const in_e = new Point()
        const out_s = new Point()
        const out_e = new Point()
        const in_out_c = new Point()
        
        if (this.dirs[i].rightTurnLane === 1 && this.dirs[i].isInUnvehi === 1){
          in_e = unVehi[i][1]
          in_out_c = joinPoint[i][1]
          in_s.x = in_out_c.x * 0.5 + in_e.x * 0.5
          in_s.y = in_out_c.y * 0.5 + in_e.y * 0.5
          if (i === 0){  
            out_e = unVehiOut[unVehiOut.length - 1][1]
          } else {  
            out_e = unVehiOut[i - 1][1]
          }
          out_s.x = in_out_c.x * 0.5 + out_e.x * 0.5
          out_s.y = in_out_c.y * 0.5 + out_e.y * 0.5
          ctx.moveTo(in_e.x, in_e.y)
          ctx.lineTo(in_s.x, in_s.y)
          ctx.quadraticCurveTo(in_out_c.x, in_out_c.y, out_s.x, out_s.y)
          ctx.lineTo(out_e.x, out_e.y)
        } else {
          in_s = unVehi[i][0]
          in_e = unVehi[i][1]
          if (i === 0){            
            out_s = unVehiOut[unVehiOut.length - 1][0]
            out_e = unVehiOut[unVehiOut.length - 1][1]
          } else {
            out_s = unVehiOut[i - 1][0]
            out_e = unVehiOut[i - 1][1]
          }
          ctx.moveTo(in_s.x, in_s.y)
          ctx.lineTo(in_e.x, in_e.y)
          ctx.moveTo(out_s.x, out_s.y)
          ctx.lineTo(out_e.x, out_e.y)
        }  
      } 
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.stroke()
    }
    // 画停车线
    drawParkLines(ctx, parkLine) {
      ctx.setLineDash([])
      ctx.beginPath()
      for (let i = 0; i < parkLine.length; i++) {
        const [s, e] = parkLine[i]
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(e.x, e.y)
      }
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.stroke()
    }
    // 画机动车道实线
  
    drawSolidLines(ctx, solidLine, boundLinePs, unVehi, unVehiOut, joinPoint) {
      ctx.setLineDash([])
      ctx.beginPath()
      for (let i = 0; i < solidLine.length; i++) {
        for (let j = 0; j < solidLine[i].length - 1; j++) {
            const [s, e] = solidLine[i][j]
            ctx.moveTo(s.x, s.y)
            ctx.lineTo(e.x, e.y)
        }
        if (this.dirs[i].rightTurnLane === 1 && this.dirs[i].isInUnvehi === 0) {
          let join = new Point()
          let inl = new Point()
          let outl = new Point()
          if (i === 0) {
            [outl, join, inl] = boundLinePs[boundLinePs.length - 1]        
          } else {
            [outl, join, inl] = boundLinePs[i - 1]
          }       
          ctx.moveTo(0.8 * join.x + 0.2 * inl.x, 0.8 * join.y + 0.2 * inl.y)  //(e.x, e.y)
          ctx.quadraticCurveTo(1.25 * join.x, 1.25 * join.y , 0.8 * join.x + 0.2 * outl.x, 0.8 * join.y + 0.2 * outl.y)       
        }
        if  (this.dirs[i].rightTurnLane === 1 && this.dirs[i].isInUnvehi === 1){
          let join1 = joinPoint[i][1]
          //let unvehiIn_s = new Point()
          const unvehiIn_e = unVehi[i][1]
          //let unvehiOut_s = new Point()
          let unvehiOut_e = new Point()
          
          if (i === 0) {
            unvehiOut_e = unVehiOut[unVehiOut.length - 1][1]        
          } else {
            unvehiOut_e = unVehiOut[i - 1][1]
          }
          ctx.moveTo(0.78 * join1.x + 0.22 * unvehiIn_e.x,  0.78 * join1.y + 0.22 * unvehiIn_e.y)  //(e.x, e.y)
          ctx.quadraticCurveTo(1.25 * join1.x, 1.25 * join1.y , 0.78 * join1.x + 0.22 * unvehiOut_e.x, 0.78 * join1.y + 0.22 * unvehiOut_e.y) 
        }
      }
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.stroke()
    }
    // 画车道虚线
    drawDashLines(ctx, dashLine) {
      ctx.setLineDash(this.dashLen)
      ctx.beginPath()
      for (let i = 0; i < dashLine.length; i++) {
        const dash = dashLine[i]
        for (let j = 0; j < dash.length - 1; j++) {
          const [s, e] = dash[j]
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(e.x, e.y)
        }
      }
      ctx.strokeStyle = '#FFF'
      ctx.lineWidth = 2
      ctx.stroke()
    }
    // 画分隔线
    drawDivideLines(ctx, divideLine) {
      for (let i = 0; i < divideLine.length; i++) {
        const divs = divideLine[i]
        if (divs.length < 5) {  //单黄线和双黄线；
          ctx.setLineDash([])
          ctx.beginPath()
          for (let j = 0; j < divs.length / 2; j++) {
            ctx.moveTo(divs[2 * j].x, divs[2 * j].y)
            ctx.lineTo(divs[2 * j + 1].x, divs[2 * j + 1].y)
          }
          ctx.strokeStyle = '#D6AD5C'
          ctx.lineWidth = 2
          ctx.stroke()
        } else {  //绿化带；
          ctx.beginPath()
          for (let m = 0; m < divs.length; m++) {
            ctx.lineTo(divs[m].x, divs[m].y) 
          }
          ctx.closePath()
          ctx.fillStyle = '#669933'
          ctx.fill()
        }
      }
      
    }
    // // 绘制转向
    // drawTurns(ctx, imgs) {
    //   for (let i = 0; i < imgs.length; i++) {
    //     const { img_c, name, index, type } = imgs[i]
    //     const [i_0, i_1] = index
    //     let rotate
    //     let turnName = name
    //     // 出口车道
    //     if (type === 'turn_out') {
    //       rotate = this.dirs[i_0].rotation - pi / 2
    //       if (this.dirs[i_0].outLanes[i_1].select === type) {
    //         turnName = name + '02'
    //       }
    //     } else {
    //       // 进口车道
    //       rotate = this.dirs[i_0].rotation + pi / 2
    //       if (this.dirs[i_0].inLanes[i_1].select === type) {
    //         turnName = name + '02'
    //       }
    //     }
    //     const img = imgDirObjs[turnName]
    //     console.log(img)
    //     ctx.save()
    //     ctx.translate(img_c.x, img_c.y)
    //     ctx.rotate(rotate)
    //     ctx.drawImage(img, 0, 0, this.imgWid / 2, this.imgWid / 2)
    //     ctx.restore()
    //   }
    // }
    // 绘制图片
    // drawImgs(can, ctx, imgs, imgDirObjs) {
    //   const dirs = this.dirs
    //   for (let i = 0; i < imgs.length; i++) {
    //     for (let j = 0; j < imgs[i].length; j++) {
    //       const { img_c, name, index, type } = imgs[i][j]
    //       const [i0, i1] = index
    //       let rotate
    //       let turnName
    //       // 出口车道
    //       if (type === 'turn_out') {
    //         rotate = dirs[i0].rotation - pi / 2
    //         if (dirs[i0].outLanes[i1].select === type) {
    //           turnName = name + '02'
    //         }
    //       } else {
    //         // 进口车道
    //         rotate = dirs[i0].rotation + pi / 2
    //         if (dirs[i0].inLanes[i1].select === type) {
    //           turnName = name + '02'
    //         }
    //       }

    //       const img = imgDirObjs[turnName]
    //       ctx.save()
    //       ctx.translate(img_c.x, img_c.y)
    //       ctx.rotate(rotate)
    //       ctx.drawImage(img, -this.imgWid / 2, -this.imgHei / 2, this.imgWid, this.imgHei)
    //       ctx.restore()
    //       // ================================================================
    //       //   drawCanvas(can)
    //     }
    //   }
    // }
    // 画图
    draw(ctx, isShowRoadName) {
      // 初始化所有信息
      this.getBoundPs()                                 // 获取背景边界坐标信息；
      this.getRoadLinesPs()                             //获取边缘边界坐标；
      this.drawBoundPs(ctx, this.boundPs, this.bgColor) //画背景；
      this.drawBoundLinePs(ctx, this.boundLinePs, this.join_point, this.dashLine_in, this.dashLine_out, this.unVehi_in, this.unVehi_out)       //画边缘边界；
      this.drawSideWalkPs(ctx)                          //画人行横道；
      //this.drawSideWalkPs(ctx, this.boundPs, this.boundLinePs, this.join_point)
      this.drawWaitingArea(ctx, this.solidLine, this.dashLine_out)
      this.drawUnVehicLines(ctx, this.unVehi_in, this.unVehi_out, this.join_point)        //画进口车道非机动车道线；
      //this.drawUnVehicLines(ctx, this.unVehi_in)
      //this.drawUnVehicLines(ctx, this.unVehi_out)       //画出口车道非机动车道线；
      this.drawParkLines(ctx, this.parkLine)            //画停止线；
      //this.drawSolidLines(ctx, this.solidLine)          //画实线；
      this.drawSolidLines(ctx, this.solidLine, this.boundLinePs, this.unVehi_in, this.unVehi_out, this.join_point)
      this.drawDashLines(ctx, this.dashLine_in)         //画进口车道虚线；
      this.drawDashLines(ctx, this.dashLine_out)        //画出口车道虚线；
      this.drawDivideLines(ctx, this.divideLine)        //画分割线；
      if (!isShowRoadName) {
        this.drawRoadName(ctx, this.inRoadName)         //显示上游路口；
        this.drawRoadName(ctx, this.outRoadName)        //显示下游路口；
      }  
      this.drawUpRoadName(ctx, this.upRoadName)         //显示上游路口；
      //   this.drawTurns(ctx, this.turn_imgs)
    }
}

export class RoadFlow extends RoadChan {
    flowLen = 60  //显示车道流向时 代表车道的长度（箭头为出口车道，直线为进口车道）；
    flowWid = 10  //线宽度；
    arrH = 30   //箭头三角形的高；
    arrTheta = pi / 8   //箭头顶角的角度为pi/4;
    flowCols = ['#1ab4a0', '#8b78f6', '#f57474', '#f8b448', '#56d0e3', '#0399f9', '#e469dd', '#cb4425']  //每个车道分别用不同颜色表示；
    flowDis = 40  //显示车道流向时表示进口车道直线和出口车道箭头之间的距离；

    // constructor() {
    //   super()
    // }
    getFlowLen(cvsWidth) {  //获取流向中各车道顶点坐标信息；
      const { flowDis, dirs, flowLen, arrH, arrTheta } = this
      // const inRoadName = []
      // const outRoadName = []

      const flow_in = [] // {in_s,in_e}
      const flow_out = [] // {out_s,out_e,out_arr,out_arr_t,out_arr_b}
      const flow_bez = [] // 曲线点 {bez_s,bez_e,bez_c}
      const phase_ps = [] // 相位名 坐标
      for (let i = 0; i < dirs.length; i++) {
        const in_s = getInLinePoint(cvsWidth - 20, flowDis / 2, dirs[i].rotation)  //进口车道起点坐标（远离中心）；
        const in_e = getInLinePoint(cvsWidth - 20 - flowLen, flowDis / 2, dirs[i].rotation)  //进口车道终点坐标（靠近中心）；
        flow_in.push({ in_s, in_e })
        const out_s = getOutLinePoint(cvsWidth - 20 - flowLen, flowDis / 2, dirs[i].rotation) //出口车道直线部分起点坐标（靠近中心）；
        const out_e = getOutLinePoint(cvsWidth - 20 - arrH, flowDis / 2, dirs[i].rotation)  //出口车道直线部分终点坐标（远离中心，与箭头三角形连接部分）；
        const out_arr = getOutLinePoint(cvsWidth - 20, flowDis / 2, dirs[i].rotation)   //出口车道箭头三角形部分顶点坐标；
        const out_arr_t = getOutLinePoint(cvsWidth - 20 - arrH, flowDis / 2 + arrH * tan(arrTheta), dirs[i].rotation)  //出口车道箭头三角形部分左顶点坐标；
        const out_arr_b = getOutLinePoint(cvsWidth - 20 - arrH, flowDis / 2 - arrH * tan(arrTheta), dirs[i].rotation)  //出口车道箭头三角形部分右顶点坐标；
        flow_out.push({ out_s, out_e, out_arr, out_arr_t, out_arr_b })
        flow_bez[i] = []
        phase_ps[i] = []
      }
      // this.inRoadName = inRoadName
      // this.outRoadName = outRoadName
      this.flow_in = flow_in
      this.flow_out = flow_out
      this.flow_bez = flow_bez
    }
    getFlowBez(cvsWidth, config) {  //画曲线的点的坐标信息；
      const { flowWid, flowDis, dirs, flowLen } = this  //flowWid:线宽度；flowDis：显示车道流向时表示进口车道直线和出口车道箭头之间的距离；flowLen:显示车道流向时代表车道的长度（箭头为出口车道，直线为进口车道）；
      const wid = flowWid / dirs.length  //流向线条的宽度；
      const widAll = flowDis / 2 - flowWid / 2 
      const flow_bez = []  //存储流向线的坐标点信息：起点，控制点，终点；
      for (let l = 0; l < config.length; l++) {
        flow_bez[l] = []
        for (let m = 0; m < config[l].laneLinkPhase.length; m++) {
          if (!config[l].laneLinkPhase[m].flowIndex) continue
          const [i, , j] = config[l].laneLinkPhase[m].flowIndex  //从车道i流向车道j；
          if (j === undefined || j === null) continue
          const w = j - i < 0 ? j - i + dirs.length : j - i
          const bez_s = getInLinePoint(cvsWidth - 20 - flowLen, widAll + wid * w + wid / 2, dirs[i].rotation)  //流向线的起点坐标；
          const bez_s0 = getInLinePoint(cvsWidth - 20 - flowLen - 5, widAll + wid * w + wid / 2, dirs[i].rotation) //流向线的起点处辅助坐标（找控制点）；
          const bez_e = getOutLinePoint(cvsWidth - 20 - flowLen, widAll + wid * w + wid / 2, dirs[j].rotation)  //流向线的终点坐标；
          const bez_e0 = getOutLinePoint(cvsWidth - 20 - flowLen - 5, widAll + wid * w + wid / 2, dirs[j].rotation) //流向线的终点处辅助坐标（找控制点）；
          const bez_c = this.getBesierConPoint(bez_s, bez_s0, bez_e0, bez_e)  //获取流向线的贝塞尔曲线控制点；
          flow_bez[l].push({ bez_s, bez_c, bez_e })
        }
        this.flow_bez = flow_bez //[{曲线起始点坐标，曲线控制点坐标，曲线终点坐标}]
      }
    }
    getFlowBez_(cvsWidth) {
      const { flowWid, flowDis, dirs, flowLen } = this
      const wid = flowWid / dirs.length
      const widAll = flowDis / 2 - flowWid / 2
      const flow_bez = []
  
      for (let l = 0; l < dirs.length; l++) {
        if (dirs[l].inLanes.length > 0) {
          flow_bez[l] = []
          for (let m = 0; m < dirs[l].inLanes.length; m++) {
            for (let n = 0; n < dirs[l].inLanes[m].toRoadIndex.length; n++) {
              const j = dirs[l].inLanes[m].toRoadIndex[n]
              const flowNum = dirs[l].inLanes[m].flowCount || 0
              if (!j && j !== 0) {
                continue
              }
              const i = l
              const w = j - i < 0 ? j - i + dirs.length : j - i
              const bez_s = getInLinePoint(cvsWidth - 20 - flowLen - 20, widAll + wid * w + wid / 2, dirs[i].rotation)  
              const bez_s0 = getInLinePoint(cvsWidth - 20 - flowLen - 5, widAll + wid * w + wid / 2, dirs[i].rotation)  
              const bez_e = getOutLinePoint(cvsWidth - 20 - flowLen, widAll + wid * w + wid / 2, dirs[j].rotation)      
              const bez_e0 = getOutLinePoint(cvsWidth - 20 - flowLen - 5, widAll + wid * w + wid / 2, dirs[j].rotation) 
              const bez_c = this.getBesierConPoint(bez_s, bez_s0, bez_e0, bez_e)   
              flow_bez[l].push({ bez_s, bez_c, bez_e, flowNum })
            }
          }
        }
      }
      for (let i = 0; i < flow_bez.length; i++) {
        if (flow_bez[i] !== undefined) {
          var ItemBack = flow_bez[i][0]
          var neArr = [ItemBack]
          for (let j = 1; j < flow_bez[i].length; j++) {
            if (JSON.stringify(ItemBack.bez_s) === JSON.stringify(flow_bez[i][j].bez_s) && JSON.stringify(ItemBack.bez_c) === JSON.stringify(flow_bez[i][j].bez_c) && JSON.stringify(ItemBack.bez_e) === JSON.stringify(flow_bez[i][j].bez_e)) {
              neArr[neArr.length - 1].flowNum = neArr[neArr.length - 1].flowNum + flow_bez[i][j].flowNum
            } else {
              neArr.push(flow_bez[i][j])
            }
            ItemBack = flow_bez[i][j]
          }
          flow_bez[i] = neArr
        }
      }
      for (let i = flow_bez.length - 1; i > -1; i--) {
        if (flow_bez[i] === undefined) {
          flow_bez.splice(i, 1)
        }
      }
      this.flow_bez = flow_bez
    }

    setRoadFlow(data) {
      const { dirs } = this
      for (let i = 0; i < dirs.length; i++) {
        for (let j = 0; j < dirs[i].inLanes.length; j++) {
          dirs[i].inLanes[j].flowCount = 0
          for (let k = 0; k < data.length; k++) {
            if (data[k].drivingDirection === dirs[i].inLanes[j].drivingDirection.toString() && data[k].attribute === dirs[i].inLanes[j].attribute.toString() && data[k].seqNum === dirs[i].inLanes[j].seqNum.toString()) {
              dirs[i].inLanes[j].flowCount = data[k].todayCarFlow
            }
          }
        }
      }
    }
    drawFlow(ctx) {
      const { flow_in, flow_out, flowWid, flowCols, dirs, flow_bez } = this
      // 画入口 出口直线
      for (let i = 0; i < flow_in.length; i++) {
        const { in_s, in_e } = flow_in[i]
        ctx.beginPath()
        // 入口
        ctx.moveTo(in_s.x, in_s.y)
        ctx.lineTo(in_e.x, in_e.y)

        // ctx.lineWidth = width_in[i];
        ctx.lineWidth = flowWid
        ctx.strokeStyle = flowCols[i]
        ctx.stroke()
      }
      for (let i = 0; i < flow_out.length; i++) {
        const { out_s, out_e } = flow_out[i]
        ctx.beginPath()
        // 出口直线部分
        ctx.moveTo(out_s.x, out_s.y)
        ctx.lineTo(out_e.x, out_e.y)

        ctx.lineWidth = flowWid
        ctx.strokeStyle = flowCols[i]
        ctx.stroke()
      }
      // 画箭头
      for (let i = 0; i < flow_out.length; i++) {
        const { out_arr, out_arr_t, out_arr_b } = flow_out[i]
        ctx.beginPath()
        ctx.lineTo(out_arr.x, out_arr.y)
        ctx.lineTo(out_arr_b.x, out_arr_b.y)
        ctx.lineTo(out_arr_t.x, out_arr_t.y)
        ctx.fillStyle = flowCols[i]
        ctx.fill()
      }
      const wid = flowWid / dirs.length
      for (let i = 0; i < flow_bez.length; i++) {
        for (let j = 0; j < flow_bez[i].length; j++) {
          let { bez_c } = flow_bez[i][j]
          const { bez_s, bez_e } = flow_bez[i][j]
          if (bez_c == null) {
            bez_c = bez_s
          }
          ctx.beginPath()
          ctx.moveTo(bez_s.x, bez_s.y)  //二次贝塞尔曲线起始点坐标；
          ctx.quadraticCurveTo(bez_c.x, bez_c.y, bez_e.x, bez_e.y)  //二次贝塞尔曲线，控制点（bez_c.x,bez_c.y),结束点（bez_e.x,bez_e.y);
          ctx.strokeStyle = flowCols[i]
          ctx.lineWidth = wid
          ctx.stroke()
        }
      }
      // 画路名
      // for (let i = 0; i < inRoadName.length; i++) {
      //   const { name, namePs } = inRoadName[i]
      //   const r = dirs[i].rotation
      //   ctx.save()
      //   ctx.translate(namePs.x, namePs.y)
      //   if (r < pi) {
      //     ctx.rotate(dirs[i].rotation - pi / 2)
      //   } else {
      //     ctx.rotate(dirs[i].rotation + pi / 2)
      //   }
      //   ctx.fillStyle = flowCols[i]

      //   ctx.fillText(name, 0, 0)
      //   ctx.restore()
      // }
      // for (let i = 0; i < outRoadName.length; i++) {
      //   const { name, namePs } = outRoadName[i]
      //   const r = dirs[i].rotation
      //   ctx.save()
      //   ctx.translate(namePs.x, namePs.y)
      //   if (r < pi) {
      //     ctx.rotate(dirs[i].rotation - pi / 2)
      //   } else {
      //     ctx.rotate(dirs[i].rotation + pi / 2)
      //   }
      //   ctx.fillStyle = flowCols[i]

      //   ctx.fillText(name, 0, 0)
      //   ctx.restore()
      // }
    }
    // 画转向流量
    drawTurnFlow(ctx, label) {
      const { flowCols, flow_bez } = this
      for (let i = 0; i < flow_bez.length; i++) {
        for (let j = 0; j < flow_bez[i].length; j++) {
          let { bez_c, flowNum } = flow_bez[i][j]
          const { bez_s, bez_e } = flow_bez[i][j]
          if (bez_c == null) {
            bez_c = bez_s
          }

          ctx.save()
          ctx.beginPath()
          ctx.translate((bez_e.x + bez_s.x + bez_c.x) / 3, (bez_e.y + bez_s.y + bez_c.y) / 3)
          ctx.arc(0, 0, 10, 0, 2 * pi)  //以（0，0）为圆心，10为半径，起始角度为0，结束角度为2pi画圆；
          if (label) {
            ctx.fillStyle = '#fff'
          } else {
            ctx.fillStyle = '#05131e'
          }
          ctx.fill()
          ctx.font = 'bold 28px UnidreamLED'
          ctx.fillStyle = flowCols[i]
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(flowNum, 0, 0)
          ctx.restore()
        }
      }
    }

    // drawNameCircle(ctx) {
    //   const roadName = this.outRoadName
    //   for (let i = 0; i < roadName.length; i++) {
    //     const { namePs } = roadName[i]
    //     ctx.beginPath()
    //     ctx.arc(namePs.x, namePs.y, 8, 0, 2 * pi)
    //     ctx.closePath()
    //     // 设置圆的样式
    //     ctx.lineWidth = 4
    //     ctx.strokeStyle = '#f8b4489c'
    //     ctx.stroke()
    //   }
    // }

    // getBesierConPoint(cvsWidth, in_s, in_e, out_s, out_e) {
    //         console.log(in_s, in_e, out_s, out_e)
    //         const flowDis = this.flowDis
    //         const bez_c = new Point()
    //         const dis = 0.5

    //         const x1 = in_e.x
    //         const y1 = in_e.y
    //         const x2 = out_s.x
    //         const y2 = out_s.y
    //         const l = getTwoPointDis(in_s, out_e)
    //         const len = cvsWidth - 20 - this.flowLen
    //         let k = 0.382
    //         console.log(l, this.flowDis)
    //         if (abs(l - len * 2) < 2) {
    //             return in_e
    //         } else if (abs(l - 32.5) < 2) {
    //             k = 0
    //         }
    //         console.log(k)
    //         const x = k * (x1 + x2) / 2
    //         const y = k * (y1 + y2) / 2
    //         console.log(x, y)
    //         return new Point(x, y)
    //     }
    getBesierConPoint(in_s, in_e, out_s, out_e) {  //获取流向线的贝塞尔曲线控制点：in_s与in_e连线和out_s与out_e连线的交点即为控制点；
      const flowDis = this.flowDis  //进口直线和出口直线之间的间隔；
      let bez_c = new Point()

      const dis = 0.5

      if (abs(in_s.x - in_e.x) < dis && abs(out_s.x - out_e.x) < dis && abs(in_s.y - out_e.y) < dis) {
        // Y方向：相当于Y方向上的U型转弯；
        bez_c.x = (in_e.x + out_s.x) / 2
        if (in_e.y > 0) {
          bez_c.y = in_e.y - flowDis
        } else {
          bez_c.y = in_e.y + flowDis
        }
      } else if (abs(in_s.y - in_e.y) < dis && abs(out_s.y - out_e.y) < dis && abs(in_s.x - out_e.x) < dis) {
        // X方向:相当于x方向的U型转弯；
        bez_c.y = (in_e.y + out_s.y) / 2
        if (in_e.x > 0) {
          bez_c.x = in_e.x - flowDis
        } else {
          bez_c.x = in_e.x + flowDis
        }
      } else if (abs(in_s.x - in_e.x) < dis && abs(out_s.y - out_e.y) < dis) {
        // Y -> X 方向90deg
        bez_c.x = in_s.x
        bez_c.y = out_s.y
      } else if (abs(in_s.y - in_e.y) < dis && abs(out_s.x - out_e.x) < dis) {
        // X -> Y 方向90deg
        bez_c.y = in_s.y
        bez_c.x = out_s.x
      } else if (abs(in_s.y - in_e.y) < dis && abs(out_s.y - out_e.y) < dis && out_s.x !== out_e.x) {  //x->x方向；
        bez_c.x = (in_s.x + out_s.x) / 2
        bez_c.y = (in_s.y + out_s.y) / 2
      } else if (abs(in_s.x - in_e.x) < dis && abs(out_s.x - out_e.x) < dis && out_s.y !== out_e.y) {  //y->y方向；
        bez_c.x = (in_s.x + out_s.x) / 2
        bez_c.y = (in_s.y + out_s.y) / 2
      } else if (abs(in_s.x - in_e.x) < dis && abs(out_s.x - out_e.x) < dis) {
        bez_c.x = (in_s.x + out_s.x) / 2
        bez_c.y = (in_s.y + out_s.y) / 2
      } else if (abs(in_s.x - in_e.x) < dis && out_s.y !== out_e.y && out_s.x !== out_e.x) { //y方向直行到斜方向；
        bez_c.x = in_s.x
        const out_k = (out_e.y - out_s.y) / (out_e.x - out_s.x)
        const delta_outY = out_e.y - out_k * out_e.x
        bez_c.y = out_k * bez_c.x + delta_outY
      } else if (abs(in_s.y - in_e.y) < dis && out_s.y !== out_e.y && out_s.x !== out_e.x) {  //x方向直行到斜方向；
        bez_c.y = in_s.y
        const out_k = (out_e.y - out_s.y) / (out_e.x - out_s.x)
        const delta_outY = out_e.y - out_k * out_e.x
        bez_c.x = (bez_c.y - delta_outY) / out_k
      } else if (in_s.y !== in_e.y && in_s.x !== in_e.x && abs(out_s.x - out_e.x) < dis) { //斜方向到y方向直行；
        bez_c.x = out_s.x
        const in_k = (in_e.y - in_s.y) / (in_e.x - in_s.x)
        const delta_inY = in_e.y - in_k * in_e.x
        bez_c.y = in_k * bez_c.x + delta_inY
      } else if (in_s.y !== in_e.y && in_s.x !== in_e.x && abs(out_s.y - out_e.y) < dis) { //斜方向到x方向直行；
        bez_c.y = out_s.y
        const in_k = (in_e.y - in_s.y) / (in_e.x - in_s.x)
        const delta_inY = in_e.y - in_k * in_e.x
        bez_c.x = (bez_c.y - delta_inY) / in_k
      } else {  //斜方向到斜方向；
        const in_k = (in_e.y - in_s.y) / (in_e.x - in_s.x)
        const delta_inY = in_e.y - in_k * in_e.x
        const out_k = (out_e.y - out_s.y) / (out_e.x - out_s.x)
        const delta_outY = out_e.y - out_k * out_e.x
        if (abs(in_k - out_k) < 0.1) {
          // 获取中点
          const l = getTwoPointDis(in_e, new Point(0, 0))
          bez_c = getInLinePoint(l - 30, 0, atan2(in_s.y - in_e.y, in_s.x - in_e.x))
          // console.log(bez_c)
          // bez_c = getInLinePoint(circleR / 2 - 40 - flowLen - flowDis / 2, 0, atan2(in_s.y - in_e.y, in_s.x - in_e.x));
        } else {
          bez_c.x = (delta_outY - delta_inY) / (in_k - out_k)
          bez_c.y = in_k * bez_c.x + delta_inY
          // console.log(bez_c)
        }
      }
      return bez_c
    }
}

export class RoadDetec extends RoadChan {
  //  获取检测器位置
  getRoadDetecPs(dec, isShowPhase, upPageType, onlyShowPhase) {
    const sideWalkStart = this.sideWalkStart  // 人行道信息{起点坐标，人行道长， 距中心距离，角度}
    const dirs = this.dirs
    const detc_stra = [] // 战略检测器
    const detc_tact = [] // 战术检测器
    const detc_off = [] // 溢出检测器
    const phase_pic = [] // 相位
    // console.log(dirs)
    for (let i = 0; i < dirs.length; i++) {
      const { len, alpha, sideWalkLen, wid } = sideWalkStart[i]  //len：人行道距离中心的距离；sideWalkLen:人行道长；wid：人行横道宽度（马路宽度-边界边缘宽）
      const detc_st = []
      const detc_ta = []
      const detc_of = []
      const phase_in = []
      let outLaneW = this.edgeBgWid
      let inLaneW = this.edgeBgWid
      const startL = len + sideWalkLen + 10  //战术检测器距中心点的距离；
      const phaseStartL = len - 10  //相位距中心点的距离；
      // 进口
      for (let j = dirs[i].inLanes.length - 1; j >= 0; j--) {
        const inLane = dirs[i].inLanes[j]   //第i车道的第j进口车道；
        inLaneW += inLane.wid
        const { str, tac, phaseCode } = inLane
        if (inLane.properties === 1) {  //机动车道；
          if ((dec && inLane.str === dec.code)) {
            const d_s_c = getInLinePoint(startL + this.imgWid * 2 + 40, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha) //战略检测器圈圈位置起始点坐标；
            detc_st.push({ img_c: d_s_c, typ: 2, index: [i, j], alpha, detec: str, phaseCodes: phaseCode, isDete: true, phsel: true })
          }
          if (!onlyShowPhase) {
            const d_s_c = getInLinePoint(startL + this.imgWid * 2 + 40, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)
            detc_st.push({ img_c: d_s_c, typ: 2, index: [i, j], alpha, detec: str, phaseCodes: phaseCode, isDete: true })
          }

          if ((dec && inLane.tac === dec.code)) {
            const d_t_c = getInLinePoint(startL + this.imgWid * 2, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)  //战术检测器圈圈位置起始点坐标；
            detc_ta.push({ img_c: d_t_c, typ: 1, index: [i, j], alpha, detec: tac, phaseCodes: phaseCode, isDete: true, phsel: true })
          }
          if (!onlyShowPhase) {
            const d_t_c = getInLinePoint(startL + this.imgWid * 2, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)
            detc_ta.push({ img_c: d_t_c, typ: 1, index: [i, j], alpha, detec: tac, phaseCodes: phaseCode, isDete: true })
          }
          if (isShowPhase) {
            for (var k = 0; k < phaseCode.length; k++) {
              const p_h_c = getInLinePoint(phaseStartL - this.imgWid * k, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)  //相位圈圈(溢出检测器)位置坐标；
              var param = { img_c: p_h_c, typ: 4, index: [i, j], alpha, detec: dec.code, phaseCode: phaseCode[k], phaseCodes: phaseCode }
              if (dec[upPageType] && isShowPhase === 'in') {
                dec[upPageType].forEach(element => {
                  if (element == phaseCode[k]) {
                    param.phsel = true
                  }
                })
              } else if (dec[upPageType] && isShowPhase === 'out') {
                dec[upPageType].forEach(element => {
                  if (element == phaseCode[k]) {
                    param.phsel = true
                  }
                })
              }
              phase_in.push(param)
            }
          }
          // const d_s_c = getInLinePoint(startL + this.imgWid * 2 + 40, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)
          // const d_t_c = getInLinePoint(startL + this.imgWid * 2, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)
          // detc_st.push({ img_c: d_s_c, typ: 2, index: [i, j], alpha, detec: str, phaseCodes: phaseCode })
          // detc_ta.push({ img_c: d_t_c, typ: 1, index: [i, j], alpha, detec: tac, phaseCodes: phaseCode })
        }
      }
      if (isShowPhase) {
        phase_pic.push(phase_in)
      }
      detc_stra.push(detc_st)
      detc_tact.push(detc_ta)
      // 出口
      for (let j = dirs[i].outLanes.length - 1; j >= 0; j--) {
        const outLane = dirs[i].outLanes[j]
        outLaneW += outLane.wid
        const { off } = outLane
        if (outLane.properties === 1) {
          if ((dec && off === dec.code && !onlyShowPhase)) {
            const d_o_c = getOutLinePoint(startL + this.imgWid * 2, wid / 2 - (outLaneW - outLane.wid / 2) * this.lenScale, alpha)
            detc_of.push({ img_c: d_o_c, typ: 3, index: [i, j], alpha: alpha, detec: off, isDete: true, phsel: true })
          }
          if (!onlyShowPhase) {
            const d_o_c = getOutLinePoint(startL + this.imgWid * 2, wid / 2 - (outLaneW - outLane.wid / 2) * this.lenScale, alpha)
            detc_of.push({ img_c: d_o_c, typ: 3, index: [i, j], alpha: alpha, detec: off, isDete: true })
          }
        }
        detc_off.push(detc_of)
      }
    }
    // this.detc_stra = detc_stra
    // this.detc_tact = detc_tact
    // this.detc_off = detc_off
    let ps = detc_stra.concat(detc_tact, detc_off)
    if (isShowPhase) {
      ps = ps.concat(phase_pic)
    }
    ps = ps.flat()
    this.ps = ps
  }
  getRoadDetecPs2(dec, isShowPhase, upPageType, onlyShowPhase) {
    const sideWalkStart = this.sideWalkStart
    const dirs = this.dirs
    const detc_stra = [] 
    const detc_tact = [] 
    const detc_off = [] 
    const phase_pic = [] 
    // console.log(dirs)
    for (let i = 0; i < dirs.length; i++) {
      const { len, alpha, sideWalkLen, wid } = sideWalkStart[i]
      const detc_st = []
      const detc_ta = []
      const detc_of = []
      const phase_in = []
      let outLaneW = this.edgeBgWid
      let inLaneW = this.edgeBgWid
      const startL = len + sideWalkLen + 10
      const phaseStartL = len - 10
      // 进口
      for (let j = dirs[i].inLanes.length - 1; j >= 0; j--) {
        const inLane = dirs[i].inLanes[j]
        inLaneW += inLane.wid
        const { str, tac, phaseCode } = inLane
        if (inLane.properties === 1) {  //机动车道；
          dec.forEach(el => {
            if (el == inLane.str) {
              const d_s_c = getInLinePoint(startL + this.imgWid * 2 + 40, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)
              detc_st.push({ img_c: d_s_c, typ: 2, index: [i, j], alpha, detec: str, phaseCodes: phaseCode, isDete: true, phsel: true })
            }
            if (el == inLane.tac) {
              const d_t_c = getInLinePoint(startL + this.imgWid * 2, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)
              detc_ta.push({ img_c: d_t_c, typ: 1, index: [i, j], alpha, detec: tac, phaseCodes: phaseCode, isDete: true, phsel: true })
            }
          })
          if (!onlyShowPhase) {
            const d_s_c = getInLinePoint(startL + this.imgWid * 2 + 40, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)
            detc_st.push({ img_c: d_s_c, typ: 2, index: [i, j], alpha, detec: str, phaseCodes: phaseCode, isDete: true })
          }

          if (!onlyShowPhase) {
            const d_t_c = getInLinePoint(startL + this.imgWid * 2, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)
            detc_ta.push({ img_c: d_t_c, typ: 1, index: [i, j], alpha, detec: tac, phaseCodes: phaseCode, isDete: true })
          }
          if (isShowPhase) {
            for (var k = 0; k < phaseCode.length; k++) {
              const p_h_c = getInLinePoint(phaseStartL - this.imgWid * k, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)
              var param = { img_c: p_h_c, typ: 4, index: [i, j], alpha, detec: dec.code, phaseCode: phaseCode[k], phaseCodes: phaseCode }
              if (dec[upPageType] && isShowPhase === 'in') {
                dec[upPageType].forEach(element => {
                  if (element == phaseCode[k]) {
                    param.phsel = true
                  }
                })
              } else if (dec[upPageType] && isShowPhase === 'out') {
                dec[upPageType].forEach(element => {
                  if (element == phaseCode[k]) {
                    param.phsel = true
                  }
                })
              }
              phase_in.push(param)
            }
          }
          // const d_s_c = getInLinePoint(startL + this.imgWid * 2 + 40, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)
          // const d_t_c = getInLinePoint(startL + this.imgWid * 2, wid / 2 - (inLaneW - inLane.wid / 2) * this.lenScale, alpha)
          // detc_st.push({ img_c: d_s_c, typ: 2, index: [i, j], alpha, detec: str, phaseCodes: phaseCode })
          // detc_ta.push({ img_c: d_t_c, typ: 1, index: [i, j], alpha, detec: tac, phaseCodes: phaseCode })
        }
      }
      if (isShowPhase) {
        phase_pic.push(phase_in)
      }
      detc_stra.push(detc_st)
      detc_tact.push(detc_ta)
      // 出口
      for (let j = dirs[i].outLanes.length - 1; j >= 0; j--) {
        const outLane = dirs[i].outLanes[j]
        outLaneW += outLane.wid
        const { off } = outLane
        if (outLane.properties === 1) {
          dec.forEach(el => {
            if (el == off) {
              const d_o_c = getOutLinePoint(startL + this.imgWid * 2, wid / 2 - (outLaneW - outLane.wid / 2) * this.lenScale, alpha)
              detc_of.push({ img_c: d_o_c, typ: 3, index: [i, j], alpha: alpha, detec: off, isDete: true, phsel: true })
            }
          })
          if (!onlyShowPhase) {
            const d_o_c = getOutLinePoint(startL + this.imgWid * 2, wid / 2 - (outLaneW - outLane.wid / 2) * this.lenScale, alpha)
            detc_of.push({ img_c: d_o_c, typ: 3, index: [i, j], alpha: alpha, detec: off, isDete: true })
          }
        }
        detc_off.push(detc_of)
      }
    }
    // this.detc_stra = detc_stra
    // this.detc_tact = detc_tact
    // this.detc_off = detc_off
    let ps = detc_stra.concat(detc_tact, detc_off)
    if (isShowPhase) {
      ps = ps.concat(phase_pic)
    }
    ps = ps.flat()
    this.ps = ps
  }
  // 在检测器位置画圈
  drawDete(ctx) {
    const cols = {
      2: '#f8b448',  //战略检测器；
      1: '#8b78f6',  //战术检测器；
      3: '#f57474', //出口溢出检测器；
      4: '#fff'  //进口溢出检测器；
    }
    // this.getRoadDetecPs()
    const ps = this.ps
    for (let i = 0; i < ps.length; i++) {
      const { img_c, typ, sel, detec, alpha, phsel, phaseCode } = ps[i]
      if (phsel && typ === 4) {
        // ctx.beginPath()
        // ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)
        // ctx.closePath()
        // ctx.fillStyle = 'rgba(99, 145, 228, 0.1)'
        // ctx.fill()
        ctx.beginPath()
        ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)  //以（img_c.x, img_c.y）为圆心，8为半径画圆；
        ctx.closePath()
        ctx.lineWidth = 1
        ctx.strokeStyle = cols[typ]
        ctx.fillStyle = 'rgba(99, 145, 228，0.5)'
        ctx.fill()
        ctx.stroke()
        if (detec) {
          ctx.save()
          ctx.translate(img_c.x, img_c.y)
          ctx.rotate(alpha)
          ctx.fillStyle = '#fff'
          ctx.textAlign = 'center'
          ctx.fillText(phaseCode, 0, 4)
          ctx.restore()
        }
      } else if (sel) {
        ctx.beginPath()
        ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)
        ctx.closePath()
        ctx.fillStyle = '#f00'
        ctx.fill()
      } else if (phsel && typ != 4) {
        ctx.beginPath()
        ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)
        ctx.closePath()
        ctx.lineWidth = 1
        ctx.strokeStyle = cols[typ]
        ctx.fillStyle = 'rgba(99, 145, 228, 0.8)'
        ctx.fill()
        ctx.stroke()
        if (detec) {
          ctx.save()
          ctx.translate(img_c.x, img_c.y)
          ctx.rotate(alpha)
          ctx.fillStyle = '#fff'
          ctx.textAlign = 'center'
          ctx.fillText(detec, 0, 4)
          ctx.restore()
        }
      } else if (typ != 4) {
        ctx.beginPath()
        ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)
        ctx.closePath()
        ctx.lineWidth = 3
        ctx.strokeStyle = cols[typ]
        ctx.stroke()
        if (detec) {
          ctx.save()
          ctx.translate(img_c.x, img_c.y)
          // if (alpha > pi / 2 && alpha < 3 * pi / 2) {
          //   ctx.rotate(alpha + pi)
          // } else {
          //   ctx.rotate(alpha)
          // }
          ctx.rotate(alpha)
          ctx.fillStyle = '#fff'
          ctx.textAlign = 'center'
          ctx.fillText(detec, 0, 4)
          ctx.restore()
        }
      } else if (typ == 4) {
        ctx.beginPath()
        ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)
        ctx.closePath()
        ctx.lineWidth = 3
        ctx.strokeStyle = cols[typ]
        ctx.stroke()
        if (phaseCode) {
          ctx.save()
          ctx.translate(img_c.x, img_c.y)
          // if (alpha > pi / 2 && alpha < 3 * pi / 2) {
          //   ctx.rotate(alpha + pi)
          // } else {
          //   ctx.rotate(alpha)
          // }
          ctx.rotate(alpha)
          ctx.fillStyle = '#fff'
          ctx.textAlign = 'center'
          ctx.fillText(phaseCode, 0, 4)
          ctx.restore()
        }
      }
    }
  }
  drawFlash(ctx, list) {
    const ps = this.ps
    for (let i = 0; i < ps.length; i++) {
      if (!ps[i].detec) {
        continue
      }
      var flag = false
      list.forEach(element => {
        if (element == ps[i].detec) {
          flag = true
        }
      })
      if (!flag) {
        continue
      }
      const { img_c, typ, sel, detec, alpha, phsel, phaseCode } = ps[i]
      ctx.beginPath()
      ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)
      ctx.closePath()
      ctx.lineWidth = 3
      ctx.strokeStyle = '#1E90FF'
      ctx.fillStyle = '#1E90FF'
      ctx.fill()
      ctx.stroke()
      ctx.save()
      ctx.translate(img_c.x, img_c.y)
      ctx.rotate(alpha)
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.fillText(detec, 0, 4)
      ctx.restore()
    }
  }
  // 流量页面展示检测器用
  drawDete2(ctx, list) {
    const cols = {
      2: '#f8b448',
      1: '#8b78f6',
      3: '#f57474',
      4: '#fff'
    }
    // this.getRoadDetecPs()
    const ps = this.ps
    for (let i = 0; i < ps.length; i++) {
      if (!ps[i].detec) {
        continue
      }
      var flag = false
      list.forEach(element => {
        if (element == ps[i].detec) {
          flag = true
        }
      })
      if (!flag) {
        continue
      }
      const { img_c, typ, sel, detec, alpha, phsel, phaseCode } = ps[i]
      if (phsel && typ === 4) {
        // ctx.beginPath()
        // ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)
        // ctx.closePath()
        // ctx.fillStyle = 'rgba(99, 145, 228, 0.1)'
        // ctx.fill()
        ctx.beginPath()
        ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)
        ctx.closePath()
        ctx.lineWidth = 1
        ctx.strokeStyle = cols[typ]
        ctx.fillStyle = 'rgba(99, 145, 228, 0.5)'
        ctx.fill()
        ctx.stroke()
        if (detec) {
          ctx.save()
          ctx.translate(img_c.x, img_c.y)
          ctx.rotate(alpha)
          ctx.fillStyle = '#fff'
          ctx.textAlign = 'center'
          ctx.fillText(phaseCode, 0, 4)
          ctx.restore()
        }
      } else if (sel) {
        ctx.beginPath()
        ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)
        ctx.closePath()
        ctx.fillStyle = '#f00'
        ctx.fill()
      } else if (phsel && typ != 4) {
        ctx.beginPath()
        ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)
        ctx.closePath()
        ctx.lineWidth = 1
        ctx.strokeStyle = cols[typ]
        ctx.fillStyle = 'rgba(99, 145, 228, 0.8)'
        ctx.fill()
        ctx.stroke()
        if (detec) {
          ctx.save()
          ctx.translate(img_c.x, img_c.y)
          ctx.rotate(alpha)
          ctx.fillStyle = '#fff'
          ctx.textAlign = 'center'
          ctx.fillText(detec, 0, 4)
          ctx.restore()
        }
      } else if (typ != 4) {
        ctx.beginPath()
        ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)
        ctx.closePath()
        ctx.lineWidth = 3
        ctx.strokeStyle = cols[typ]
        ctx.stroke()
        if (detec) {
          ctx.save()
          ctx.translate(img_c.x, img_c.y)
          // if (alpha > pi / 2 && alpha < 3 * pi / 2) {
          //   ctx.rotate(alpha + pi)
          // } else {
          //   ctx.rotate(alpha)
          // }
          ctx.rotate(alpha)
          ctx.fillStyle = '#fff'
          ctx.textAlign = 'center'
          ctx.fillText(detec, 0, 4)
          ctx.restore()
        }
      } else if (typ == 4) {
        ctx.beginPath()
        ctx.arc(img_c.x, img_c.y, 8, 0, 2 * pi)
        ctx.closePath()
        ctx.lineWidth = 3
        ctx.strokeStyle = cols[typ]
        ctx.stroke()
        if (phaseCode) {
          ctx.save()
          ctx.translate(img_c.x, img_c.y)
          // if (alpha > pi / 2 && alpha < 3 * pi / 2) {
          //   ctx.rotate(alpha + pi)
          // } else {
          //   ctx.rotate(alpha)
          // }
          ctx.rotate(alpha)
          ctx.fillStyle = '#fff'
          ctx.textAlign = 'center'
          ctx.fillText(phaseCode, 0, 4)
          ctx.restore()
        }
      }
    }
  }
}
export class RoadSignal extends RoadDetec {
    imgWid = 20
    imgHeight = 20
    // lineLen = 280
    constructor(dirs, lineLen) {
      super(dirs)
      this.lineLen = lineLen
    }

    // 画底图
    drawChannel(ctx, isShowUpRoad) {
      this.getBoundPs() // 获取边界坐标信息
      this.getRoadLinesPs()
      this.drawBoundPs(ctx, this.boundPs, this.bgColor)
      this.drawBoundLinePs(ctx, this.boundLinePs, this.join_point, this.dashLine_in, this.dashLine_out, this.unVehi_in, this.unVehi_out)
      this.drawSideWalkPs(ctx)
      this.drawWaitingArea(ctx, this.solidLine, this.dashLine_out)
      //this.drawSideWalkPs(ctx, this.boundPs, this.boundLinePs, this.join_point)
      // this.drawRoadName(ctx, this.inRoadName)
      // this.drawRoadName(ctx, this.outRoadName)
      this.drawUnVehicLines(ctx, this.unVehi_in, this.unVehi_out, this.join_point)
      //this.drawUnVehicLines(ctx, this.unVehi_in)
      //this.drawUnVehicLines(ctx, this.unVehi_out)
      this.drawParkLines(ctx, this.parkLine)
      //this.drawSolidLines(ctx, this.solidLine)
      this.drawSolidLines(ctx, this.solidLine, this.boundLinePs, this.unVehi_in, this.unVehi_out, this.join_point)
      this.drawDashLines(ctx, this.dashLine_in)
      this.drawDashLines(ctx, this.dashLine_out)
      this.drawDivideLines(ctx, this.divideLine)
      if (isShowUpRoad) {
        this.drawUpRoadName(ctx, this.upRoadName)
      }
    }

  // 画人行道
  // drawSideWalkPs(ctx, walkP, color) {
  //   console.log(walkP)
  //   ctx.beginPath()
  //   for (let j = 0; j < walkP.length; j++) {
  //     const [p_s, p_e] = walkP[j]
  //     ctx.moveTo(p_s.x, p_s.y)
  //     ctx.lineTo(p_e.x, p_e.y)
  //   }
  //   ctx.strokeStyle = color
  //   ctx.lineWidth = 3
  //   ctx.stroke()
  //   // }
  // }
}
export class RoadStage {
    roadLen = 55
    sideWalkLen = 10
    imgWid = 14
    imgHeight = 14
    lensScale = 6
    roadWid = 50 // 各道路宽
    constructor(dirs) {
      this.dirs = dirs
    }
    // 获取人行道坐标
    // getSideWalkPs() {
    //   const sideWalk = []
    //   for (let i = 0; i < this.dirs.length; i++) {
    //     if (this.dirs[i].isSideWalk === 0) continue
    //     const alpha = this.dirs[i].rotation
    //     const s = -floor(this.roadWid / 2 - 3)
    //     const e = floor(this.roadWid / 2 - 3)
    //     const walkP = []
    //     for (let j = s; j < e; j = j + 6) {
    //       const p_s = getInLinePoint(this.roadLen, j, alpha)
    //       const p_e = getInLinePoint(this.roadLen + this.sideWalkLen, j, alpha)
    //       walkP.push([p_s, p_e])
    //     }
    //     sideWalk.push(walkP)
    //   }
    //   //   this.sideWalk = sideWalk
    //   return sideWalk
    // }
}

import * as echarts from '../../ec-canvas/echarts';

import {
  AssayModel
} from '../../models/assay';
import {
  BillModel
} from '../../models/bill';
import {
  Util
} from '../../utils/utils'
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
var WxNotificationCenter = require('../../utils/wx-notify.js')

var chart = null


function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selectedColor: "#ffffff",
    unSelectedColor: "#e6e6e6",

    date: Util.dateFormat("YYYY-mm", new Date()),

    billAmountData: {},
    ec: {
      onInit: initChart
    }
  },

  async onLoad() {
    this._initAllData();
    const titleBarHeight = deviceUtil.getTitleBarHeight()
    this.setData({
      titleBarHeight
    })
    WxNotificationCenter.addNotification('refresh', this.didNotification, this)
  },

  //通知处理
  didNotification: function () {
    //更新数据
    this._initAllData()
  },


  async _initAllData() {
    let billAmount = await BillModel.getBillAmount(this.data.date);
    let lineData = await AssayModel.line(this.data.date);
    this.setData({
      billAmount
    })
    this.initChart(lineData)
  },

  //向上取整十、整百
  ceilNumber(number) {
    var bite = 0;
    if (number < 10) {
      return 10;
    }
    while (number >= 10) {
      number /= 10;
      bite += 1;
    }
    return Math.ceil(number) * Math.pow(10, bite);
  },

  /**
   * 初始化折线图
   */
  initChart(lineData) {
    var edata = [];
    for (let i = 1; i <= 31; i++) {
      if (i == 1 || i == 15 || i == 30) {
        edata.push(i)
      } else {
        edata.push(i + "点")
      }
    }
    var option = {
      backgroundColor: "#fff",
      color: ['#8cc7b5', '#ebb43e'],
      legend: {
        bottom: 15,
        data: ['支出', '收入']
      },
      // 设置内容的距离
      grid: {
        left: 20,
        right: 20,
        containLabel: true
      },
      animation: true,
      // animationDuration: 1500, //动画时长
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: edata,
        axisLabel: {
          interval: (index, value) => {
            //具体逻辑判断
            if (value.indexOf("点") == -1)
              return true
            return false
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        show: true,
        min: 0,
        max: this.ceilNumber(lineData.max_consume),
        interval: this.ceilNumber(lineData.max_consume) / 4,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dotted'
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      series: [{
        name: '支出',
        type: 'line',
        smooth: true,
        data: lineData.consumes,
        showSymbol: true,
      }, {
        name: '收入',
        type: 'line',
        smooth: true,
        data: lineData.incomes,
        showSymbol: true,
      }]
    };
    setTimeout(() => {
      chart.clear()
      chart.setOption(option);
    }, 50)
  },

  onTap() {
    this.setData({
      selected: !this.data.selected
    })
  },

  onDateChange(event) {
    this.setData({
      date: event.detail
    })
    this._initAllData();
  },

  onGoPie() {
    wx.navigateTo({
      url: '/pages/pie/pie?date=' + this.data.date
    })
  },

  onGoAssayBudget() {
    wx.navigateTo({
      url: '/pages/assay-budget/assay-budget?date=' + this.data.date,
    })
  },


  onGoTarget() {
    wx.lin.showToast({
      title: '正在开发中～快了快了！',
      icon: 'loading',
      duration: 1000
    })
  }
})
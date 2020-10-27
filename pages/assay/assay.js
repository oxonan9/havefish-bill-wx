import * as echarts from '../../ec-canvas/echarts';

import {
  AssayModel
} from '../../models/assay';
import {
  BillModel
} from '../../models/bill';
import {
  Util
} from '../../utils/utils';

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
    // let data = await Assay.assay2("2020-10", 0, 0)
    this._initAllData();
  },

  async _initAllData() {
    let billAmountData = await BillModel.getBillAmount(this.data.date);
    let lineData = await AssayModel.line(this.data.date);
    this.setData({
      billAmountData
    })
    this.initChart(lineData)
  },

  //向上取整十、整百
  ceilNumber(value) {
    if (value < 10) {
      return 10
    } else {
      let num = Number(value.toString().substring(0, 1));
      return (num + 1) * Math.pow(10, (value.toString().length - 1));
    }
  },

  /**
   * 初始化折线图
   */
  initChart(lineData) {
    // let chartDataList = [];
    // for (let i in data) {
    //   let chartData = {};
    //   chartData['value'] = data[i].amount;
    //   chartData['name'] = `${data[i].name}:${data[i].amount}`;
    //   chartDataList.push(chartData);
    // }
    // this.setData({
    //   items: data,
    // })
    var edata = [];
    for (let i = 1; i <= 30; i++) {
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
      animationDuration: 1500, //动画时长
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
    }, 100)
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
      url: '/pages/pie/pie',
    })
  },

  onGoAssayBudget() {
    wx.navigateTo({
      url: '/pages/assay-budget/assay-budget',
    })
  }
})
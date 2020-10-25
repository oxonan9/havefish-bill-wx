import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  console.log(width, height)
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var data = [];
  var option = {
    backgroundColor: "#fff",
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],

    // tooltip: {
    //   trigger: 'axis'
    // },
    // legend: {

    //   data: ['A商品', 'B商品', 'C商品']
    // },
    grid: {
      containLabel: true
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2日', '5', '10', '15', '20', '25', '30'],
      axisLabel: {
        interval: (index, value) => {
          //具体逻辑判断
          if (value.indexOf("点") == -1)
            return true
          return false
        }
      }

    },
    yAxis: {
      min: 0,
      max: 999,
      interval: 333,
    },
    series: [{
      name: 'A商品',
      type: 'line',
      smooth: false,
      data: [0, 80, 100, 888, 0, 0, 0]
    }]
  };

  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 跳转预算中心
   */
  onGoBudget() {
    wx.navigateTo({
      "url": "/pages/budget/budget"
    })
  }
})
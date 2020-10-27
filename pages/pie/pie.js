import * as echarts from '../../ec-canvas/echarts';
import {
  AssayModel
} from '../../models/assay';

var chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  chart.on('click', (parmas) => {
    console.log(parmas)
  })
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  async onLoad() {
    let data = await AssayModel.assay2("2020-10", 0, 0)
    console.log(data)
    let chartDataList = [];
    for (let i in data) {
      let chartData = {};
      chartData['value'] = data[i].percent;
      chartData['name'] = `${data[i].name}:${data[i].percent}%`;
      chartDataList.push(chartData);
    }
    this.setData({
      items: data,
    })

    var option = {
      backgroundColor: "#ffffff",
      color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
      series: [{
        label: {
          show: true,
        },
        type: 'pie',
        center: ['50%', '50%'],
        radius: [0, '55%'],
        data: chartDataList,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 2, 2, 0.3)'
          }
        }
      }]
    };
    setTimeout(() => {
      chart.clear()
      chart.setOption(option);
    }, 100)
  },

  onTap(e) {
    console.log(e)
  },

  onReady() {

  },

});
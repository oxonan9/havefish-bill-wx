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

  data: {
    show_network_status: false,
    show_data_status: false,
    ec: {
      onInit: initChart
    }
  },

  async onLoad(options) {
    let date = options.date;
    try {
      let data = await AssayModel.assay2(date, 0, 0)
      this._handleSuccess(data)
    } catch (error) {
      this.setData({
        show_network_status: true
      })
    }
  },

  _handleSuccess(data) {
    let chartDataList = [];
    if (!data || data.length == 0) {
      this.setData({
        show_data_status: true
      })
      return
    }
    for (let i in data) {
      let chartData = {};
      chartData['value'] = data[i].percent;
      chartData['name'] = `${data[i].name}:${data[i].percent}%`;
      chartDataList.push(chartData);
    }
    this.setData({
      items: data,
      show_network_status: false
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
    }, 50)
  },

  onRefresh() {
    this.onLoad()
  }

});
import * as echarts from '../../ec-canvas/echarts';

import {
  Assay
} from '../../models/assay';

var chart = null


// /**
//  * 初始化图表
//  */
// function initChart(canvas, width, height) {
//   chart = echarts.init(canvas, null, {
//     width: width,
//     height: height
//   });
//   canvas.setChart(chart);
//   var option = {
//     backgroundColor: "#ffffff",
//     color: ["#333333", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
//     series: [{
//       label: {
//         normal: {
//           fontSize: 14
//         }
//       },
//       type: 'pie',
//       center: ['50%', '50%'],
//       radius: [0, '60%'],
//       data: [],
//       itemStyle: {
//         emphasis: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 2, 2, 0.3)'
//         }
//       }
//     }]
//   };
//   chart.setOption(option);
//   return chart;
// }

function initChart(canvas, width, height) {
  console.log(width, height)
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var data = [];
  for (let i = 1; i <= 30; i++) {
    if (i == 1 || i == 15 || i == 30) {
      data.push(i)
    } else {
      data.push(i + "点")
    }
  }
  console.log(data)
  var option = {
    backgroundColor: "#fff",
    color: ['#8cc7b5', '#ebb43e'],
    // tooltip: {
    //   trigger: 'axis'
    // },
    legend: {
      bottom: 15,
      data: ['支出', '收入']
    },
    grid: {
      containLabel: true
    },
    animation: true,
    animationDuration: 3000,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data,
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
      min: 0,
      max: 999,
      interval: 333,
      splitLine: {
        show: true
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
      data: [0, 100, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 256, 0, 0, 0, 0, 0, 0, 0, 875, 0, 0, 0, 0, 0, 0, 0, 0, 438],
      showSymbol: true,
    }, {
      name: '收入',
      type: 'line',
      smooth: true,
      data: [0, 500, 0, 0, 80, 0, 0, 10, 0, 0, 666, 0, 30, 0, 0, 0, 0, 0, 0, 0, 777, 0, 0, 0, 0, 0, 0, 0, 0, 150],
      showSymbol: true,
    }]
  };

  // chart.setOption(option);
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
    ec: {
      onInit: initChart
    }
  },

  async onLoad() {
    let data = await Assay.assay2("2020-10", 0, 0)
    console.log(data)
    let chartDataList = [];
    for (let i in data) {
      let chartData = {};
      chartData['value'] = data[i].amount;
      chartData['name'] = `${data[i].name}:${data[i].amount}`;
      chartDataList.push(chartData);
    }
    this.setData({
      items: data,
    })

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
      animationDuration: 3000,
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
        max: 6000,
        interval: 2000,
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
        data: [0, 100, 0, 0, 1000, 0, 0, 10, 0, 230, 0, 0, 256, 0, 0, 0, 0, 0, 0, 0, 875, 0, 0, 0, 0, 520, 0, 0, 0, 438],
        showSymbol: true,
      }, {
        name: '收入',
        type: 'line',
        smooth: true,
        data: [0, 500, 0, 0, 80, 0, 0, 10, 0, 0, 666, 0, 30, 0, 0, 0, 0, 0, 0, 0, 777, 0,5000.89, 0, 0, 0, 0, 0, 0, 150],
        showSymbol: true,
      }]
    };

    setTimeout(() => {
      chart.clear()
      chart.setOption(option);
    }, 0)
  },

  onTap() {
    this.setData({
      selected: !this.data.selected
    })
  },
})
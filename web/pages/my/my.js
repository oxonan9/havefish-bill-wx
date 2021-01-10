import * as echarts from '../../ec-canvas/echarts';
import {
  BillModel
} from '../../models/bill';

Page({

  /**
   * 页面的初始数据
   */
  data: {},

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
  },

  async onExport() {
    let data = await BillModel.export();
    wx.lin.showDialog({
      type: "confirm",
      title: "提示",
      content: "点击确定复制excel链接去浏览器下载",
      success: (res) => {
        if (res.confirm) {
          wx.setClipboardData({
            data: data.excel_url,
            success(res) {
              wx.getClipboardData({
                success(res) {}
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
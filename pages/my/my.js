// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
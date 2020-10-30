const {
  BudgetModel
} = require("../../models/budget");
const {
  Util
} = require("../../utils/utils");

// pages/budget/budget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onSave() {
    let amount = this.data.amount;
    if (amount == 0) {
      wx.showToast({
        title: '😝不能为空哦～',
        icon: "none"
      })
      return;
    }
    BudgetModel.save(Util.dateFormat("YYYY-mm-dd HH:MM:SS", new Date()), amount)
    wx.lin.showToast({
      title: '设置成功~奥利给!',
      icon: 'success'
    })
    setTimeout(() => {
      wx.navigateBack({
        url: '/pages/my/my'
      })
    }, 600);
  },

  onConfirmRemark(event) {
    this.setData({
      amount: event.detail.value
    })
  }
})
const {
  BudgetModel
} = require("../../models/budget");
const {
  Util
} = require("../../utils/utils");
Page({

  data: {
    amount: 0
  },

  async onSave() {
    let amount = this.data.amount;
    console.log(amount)
    if (amount == 0) {
      wx.showToast({
        title: '😝不能为空哦～',
        icon: "none"
      })
      return;
    }
    let data = await BudgetModel.save(Util.dateFormat("YYYY-mm-dd HH:MM:SS", new Date()), amount)
    if (data.success) {
      wx.lin.showToast({
        title: '设置成功~奥利给!',
        icon: 'success'
      })
      setTimeout(() => {
        wx.navigateBack({
          url: '/pages/my/my'
        })
      }, 600);
    }
  },

  onConfirmRemark(event) {
    this.setData({
      amount: event.detail.value
    })
  }
})
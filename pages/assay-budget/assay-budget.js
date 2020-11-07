const {
  BudgetModel
} = require("../../models/budget")

Page({

  data: {
    data:{}
  },


  async onLoad(options) {
    let date = options.date;
    let data = await BudgetModel.get(date);
    this.setData({
      data
    })
  },


})
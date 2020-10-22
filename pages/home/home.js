import {
  RecordModel
} from '../../models/record.js'

import {
  formatTime
} from '../../utils/utils.js'
const recordModel = new RecordModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_loadmore: false,
    show_loading: true,
    show_popup: false,
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    // showDate: formatTime(new Date(), "yyyy-MM"),
    dataList: [],

    start: 0,
    page: 0,
    count: 10,

    recordAmount: {
      income: 0,
      consume: 0
    }
  },

  onGoTally() {
    wx.navigateTo({
      url: '/pages/tally/tally',
    })
  },

  onSelectDate(event) {
    this.setData({
      show_popup: true
    })
  },
  onConfirm(event) {
    this.setData({
      currentDate: new Date(event.detail).getTime(),
      // showDate: formatTime(new Date(event.detail), "yyyy-MM"),
      show_popup: false
    })
    this._getRecordList(this.data.start, this.data.count, this.data.showDate)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    let recordAmount = await recordModel.getRecordAmount(this.data.showDate);
    this.setData({
      recordAmount
    })
    console.log(this.data)
    this._getRecordList(this.data.start, this.data.count, this.data.showDate)
  },
  async _getRecordList(start, count, date) {
    let dataList = this.data.dataList;
    let data = await recordModel.getRecordList(start, count, date);
    let items = data.items;
    if (this.data.start == 0) {
      dataList = items
    } else {
      for (let i in items) {
        if (items[i].date == dataList[dataList.length - 1].date) {
          dataList[dataList.length - 1].items = dataList[dataList.length - 1].items.concat(items[i].items)
        } else {
          dataList.push(items)
        }
      }
    }
    this.setData({
      dataList: dataList,
      page: data.page,
      start: this.data.start + data.count,
      totalPages: data.total_pages,

      show_loading: false,
      show_loadmore: false,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.show_loadmore = true;
    let page = this.data.page;
    let totalPages = this.data.totalPages;
    if (page + 1 == totalPages) {
      return;
    }
    this._getRecordList(this.data.start, this.data.count, this.data.showDate)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
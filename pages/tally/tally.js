import {
  RecordModel
} from '../../models/record.js'
const recordModel = new RecordModel()
let consume_grids = [{
    id: 1,
    image: "/images/account/eat.png",
    text: "三餐"
  }, {
    id: 2,
    image: "/images/account/shopping.png",
    text: "购物"
  }, {
    id: 3,
    image: "/images/account/sock.png",
    text: "零食"
  }, {
    id: 4,
    image: "/images/account/fruit.png",
    text: "水果"
  }, {
    id: 5,
    image: "/images/account/plane.png",
    text: "出行"
  }, {
    id: 6,
    image: "/images/account/car.png",
    text: "修车"
  }, {
    id: 7,
    image: "/images/account/education.png",
    text: "学习"
  }, {
    id: 8,
    image: "/images/account/children.png",
    text: "小孩"
  },
  {
    id: 9,
    image: "/images/account/gift.png",
    text: "送礼"
  },
  {
    id: 10,
    image: "/images/account/pet.png",
    text: "宠物"
  },
  {
    id: 11,
    image: "/images/account/skin.png",
    text: "护肤"
  },
  {
    id: 12,
    image: "/images/account/phone.png",
    text: "通讯"
  }
];

import {
  formatTime
} from '../../utils/utils.js'
let income_grids = [{
  id: 1,
  image: "/images/account/salary.png",
  text: "工资"
}, {
  id: 2,
  image: "/images/account/bonus.png",
  text: "奖金"
}, {
  id: 3,
  image: "/images/account/financing.png",
  text: "理财"
}, {
  id: 4,
  image: "/images/account/lifefee.png",
  text: "生活费"
}, {
  id: 5,
  image: "/images/account/vicejob.png",
  text: "兼职"
}, {
  id: 6,
  image: "/images/account/wipeout.png",
  text: "报销"
}, {
  id: 7,
  image: "/images/account/refund.png",
  text: "退款"
}, {
  id: 7,
  image: "/images/account/gift.png",
  text: "礼金"
}, ];
Page({

  data: {
    show_popup: false,
    minHour: 10,
    maxHour: 20,
    maxDate: new Date().getTime(),
    minDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    consume_grids: consume_grids,
    income_grids: income_grids,
    showDate: formatTime(new Date()),
    remark: ""
  },

  onPopupPicker() {
    this.setData({
      show_popup: true
    })
  },

  onConfirm(event) {
    console.log(event)
    this.setData({
      show_popup: false,
      showDate: formatTime(new Date(event.detail))
    })
  },

  onPost(event) {
    console.log(event.detail.value)
    this.setData({
      remark: event.detail.value
    })
  },

  onCancel() {
    this.setData({
      show_popup: false
    })
  },

  onSave() {
    console.log(this.data.remark)
    recordModel.saveRecord({
      "categoryId": 14,
      "type": 1,
      "amount": 7200,
      "remark": this.data.remark,
      "recordTime": this.data.showDate
    }).then(res => {
      wx.redirectTo({
        url: '/pages/home/home',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentDate: new Date().getTime()
    })
    console.log(this.data.currentDate)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


})
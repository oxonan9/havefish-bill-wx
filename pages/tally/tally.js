import {
  RecordModel
} from '../../models/record.js'

import {
  formatTime
} from '../../utils/utils.js'
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
  // {
  //   id: 9,
  //   image: "/images/account/gift.png",
  //   text: "送礼"
  // },
  // {
  //   id: 10,
  //   image: "/images/account/pet.png",
  //   text: "宠物"
  // },
  // {
  //   id: 11,
  //   image: "/images/account/skin.png",
  //   text: "护肤"
  // },
  // {
  //   id: 12,
  //   image: "/images/account/phone.png",
  //   text: "通讯"
  // }
];
let income_grids = [{
  id: 13,
  image: "/images/account/salary.png",
  text: "工资"
}, {
  id: 14,
  image: "/images/account/bonus.png",
  text: "奖金"
}, {
  id: 15,
  image: "/images/account/financing.png",
  text: "理财"
}, {
  id: 16,
  image: "/images/account/lifefee.png",
  text: "生活费"
}, {
  id: 17,
  image: "/images/account/vicejob.png",
  text: "兼职"
}, {
  id: 18,
  image: "/images/account/wipeout.png",
  text: "报销"
}, {
  id: 19,
  image: "/images/account/refund.png",
  text: "退款"
}, {
  id: 20,
  image: "/images/account/gift.png",
  text: "礼金"
}, ];
Page({
  data: {
    show_popup: false, //是否显示弹框
    show_message: false, //显示消息提示
    maxDate: new Date().getTime(),
    minDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    consume_grids: consume_grids, //支出宫格集合
    income_grids: income_grids, //收入宫格集合
    showDate: formatTime(new Date()),
    amount: 0,
    remark: "", //备注
    categoryId: 1, //分类id 
    type: 0 //0-支出 1-收入
  },

  onPopupPicker() {
    this.setData({
      show_popup: true
    })
  },

  onConfirm(event) {
    this.setData({
      show_popup: false,
      showDate: formatTime(new Date(event.detail))
    })
  },

  onSetRemark(event) {
    this.setData({
      remark: event.detail.value
    })
  },

  //取消弹框
  onCancelPopup() {
    this.setData({
      show_popup: false
    })
  },

  //切换标签  支出-收入
  onChangeTab(event) {
    let categoryId = event.detail.currentIndex == 0 ? this.data.consume_grids[0].id : this.data.income_grids[0].id;
    this.setData({
      type: event.detail.currentIndex,
      categoryId
    })
  },

  //选择分类 
  onSelect(event) {
    this.setData({
      categoryId: event.detail
    })
  },

  getAmount(event) {
    this.setData({
      amount: event.detail
    })
  },

  onSave() {
    if (this.data.amount == 0) {
      wx.showToast({
        title: '花了多少钱写一下吧~',
        icon: "none"
      })
      return;
    }
    recordModel.saveRecord({
      "categoryId": this.data.categoryId,
      "type": this.data.type,
      "amount": this.data.amount,
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
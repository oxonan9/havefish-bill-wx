import {
  RecordModel
} from '../../models/record.js'

import {
  Util
} from '../../utils/utils.js'
const recordModel = new RecordModel()
const util = new Util()
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
  }
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
    maxDate: new Date().getTime(), //最大日期
    minDate: new Date(2019, 10, 1).getTime(), //最小日期
    currentDate: new Date().getTime(), //当前日期
    consume_grids: consume_grids, //支出宫格集合
    income_grids: income_grids, //收入宫格集合
    // showDate: formatTime(new Date()), //显示的日期
    showDate: "今天",

    bookkeep: {
      num: 0
    }

  },

  onPopupPicker() {
    this.setData({
      show_popup: true
    })
  },

  onConfirm(event) {
    this.setData({
      show_popup: false,
      showDate: util.dateFormat("mm-dd", new Date(event.detail))
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

  onSave() {
    if (this.data.amount == 0) {
      wx.showToast({
        title: '😝花了多少钱写一下吧~',
        icon: "none"
      })
      return;
    }
    recordModel.saveRecord({
      "category_id": this.data.categoryId,
      "type": this.data.type,
      "amount": this.data.amount,
      "remark": this.data.remark,
      "record_time": this.data.showDate
    }).then(res => {
      wx.switchTab({
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
   * 点击键盘上的数字
   */
  tapKey(event) {
    let key = event.currentTarget.dataset.key; //获取点击的数字 
    let num = this.data.bookkeep.num; //获取当前数值
    let hasDot = this.data.hasDot; //获取是否有无小数点

    num = Number(num + key)
    if (num < 100000000) {
      num = "" + Math.floor(num * 100) / 100; //保留两位小数
      if (key == '.') {
        if (hasDot) return; //防止用户多次输入小数点
        num = num + "."
        this.setData({
          hasDot: true
        })
      }
    } else if (num > 10000000) {
      wx.showToast({
        title: '能花这么多？我不信😝',
        icon: "none"
      })
      return;
    } else if (isNaN(num)) {
      //格式错误
      return;
    }
    this.setData({
      'bookkeep.num': num == '0' ? key : num
    })
  },

  /**
   * 点击退格
   */
  tapDel() {
    let num = "" + this.data.bookkeep.num; //转为字符串，因为要用到字符串的截取方法

    if (num == '0') {
      return;
    }

    if (num.charAt(num.length - 1) == '.') {
      this.setData({
        hasDot: false //不设置false无法再次输入小数点
      })
    }

    this.setData({
      'bookkeep.num': num.length == 1 ? '0' : num.substring(0, num.length - 1)
    })
  },

  /**
   * 点击日期
   */
  tapDate() {
    console.log("日期")

    this.setData({
      show_popup: true
    })
  },

  longpressDel() {
    this.tapDel();
    this.setData({
      interval: setInterval(() => {
        console.log(123)
        this.tapDel();
      }, 100)
    })
    return;
  },

  stopInterval() {
    clearInterval(this.data.interval)
  }



})
import {
  BillModel
} from '../../models/bill.js'
import {
  Util
} from '../../utils/utils.js'
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
var WxNotificationCenter = require('../../utils/wx-notify.js')

Page({
  data: {
    showDialog: false,
    showTag: false,
    maxDate: new Date().getTime(), //最大日期
    minDate: new Date(2019, 10, 1).getTime(), //最小日期
    currentDate: new Date().getTime(), //当前日期
    consume_grids: consume_grids, //支出宫格集合
    income_grids: income_grids, //收入宫格集合
    showDate: "今天",

    selectedId: 1,
    bill: {
      id: null,
      num: 0, //金额
      type: 0, //类型 0-支出  1-收入
      categoryId: 1, //分类id
      remark: '', //备注
      date: Util.dateFormat("YYYY-mm-dd HH:MM:SS", new Date()) //日期
    },
    activeKey: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = options.data;
    if (data) {
      data = JSON.parse(options.data);
      //根据id查询账单 然后填充内容  并且有删除按钮
      this.selectedId = data.categoryId
      this.setData({
        bill: {
          id: data.id,
          num: data.amount, //金额
          type: data.type, //类型 0-支出  1-收入
          categoryId: data.category_id, //分类id
          remark: data.remark, //备注
          date: Util.dateFormat("YYYY-mm-dd HH:MM:SS", new Date(data.record_time)) //日期
        },
        activeKey: data.type,
        selectedId: data.category_id,
        showDate: Util.dateFormat("mm-dd", new Date(data.record_time)),
        showTag: true
      })
    }
    this.setData({
      currentDate: new Date().getTime()
    })
  },

  /**
   *  确认日期
   */
  bindDateChange(event) {
    console.log(event)
    this.setData({
      showDate: Util.dateFormat("mm-dd", new Date(event.detail.value)),
      'bill.date': Util.dateFormat("YYYY-mm-dd HH:MM:SS", new Date(event.detail.value)),
    })
  },

  /**
   * 确认备注
   */
  onConfirmRemark(event) {
    this.setData({
      'bill.remark': event.detail.value
    })
  },

  //切换标签  支出-收入
  onChangeTab(event) {
    this.setData({
      'bill.type': event.detail.currentIndex,
    })
  },

  //选择分类 
  onSelect(event) {
    this.setData({
      'bill.categoryId': event.detail,
      selectedId: event.detail
    })
  },

  /**
   * 保存账单
   */
  async tapSubmit() {
    let bill = this.data.bill;
    if (bill.num == '0') {
      wx.showToast({
        title: '😝花了多少钱写一下吧~',
        icon: "none"
      })
      return;
    }
    await BillModel.saveRecord({
      "id": bill.id,
      "amount": bill.num,
      "type": bill.type,
      "category_id": bill.categoryId,
      "remark": bill.remark,
      "record_time": bill.date
    }).then(res => {
      WxNotificationCenter.postNotificationName('NotificationName')
      wx.lin.showToast({
        title: '记账成功~奥利给!',
        icon: 'success'
      })
      setTimeout(() => {
        wx.navigateBack({
          url: '/pages/home/home'
        })
      }, 600);
    });
  },

  /**
   * 点击键盘上的数字
   */
  tapKey(event) {
    let key = event.currentTarget.dataset.key; //获取点击的数字 
    let num = this.data.bill.num; //获取当前数值
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
        title: '啥家庭啊！！😝',
        icon: "none"
      })
      return;
    } else if (isNaN(num)) {
      //格式错误
      return;
    }
    this.setData({
      'bill.num': num == '0' ? key : num
    })
  },


  /**
   * 弹出删除框
   */
  onDelete() {
    this.setData({
      showDialog: true
    })
  },


  /**
   * 删除
   */
  async onConfirmDelete() {
    await BillModel.remove(this.data.bill.id).then(res => {
      WxNotificationCenter.postNotificationName('refresh') //发布消息 通知home和assay更新
      wx.lin.showToast({
        title: '删除成功~',
        icon: 'success'
      })
      setTimeout(() => {
        wx.navigateBack({
          url: '/pages/home/home',
          success: () => {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
        })
      }, 500);
    })
  },

  /**
   * 点击退格
   */
  tapDel() {
    let num = "" + this.data.bill.num; //转为字符串，因为要用到字符串的截取方法

    if (num == '0') {
      return;
    }

    if (num.charAt(num.length - 1) == '.') {
      this.setData({
        hasDot: false //不设置false无法再次输入小数点
      })
    }

    this.setData({
      'bill.num': num.length == 1 ? '0' : num.substring(0, num.length - 1)
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

  /**
   * 停止循环
   */
  stopInterval() {
    clearInterval(this.data.interval)
  },



})
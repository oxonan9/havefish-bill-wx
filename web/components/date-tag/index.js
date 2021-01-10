const { Util } = require("../../utils/utils");

const date = new Date();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    maxDate: Util.dateFormat("YYYY-mm",new Date()),
    showDate: date.getFullYear() + "  |  " + (date.getMonth() + 1) + "月", //显示的日期
    date: date.getFullYear() + "-" + (date.getMonth() + 1) //传递给后端的日期
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChange(event) {
      this.setData({
        showDate: event.detail.value.replace("-", "  |  ") + "月",
        date: event.detail.value
      })
      this.triggerEvent("datechange", this.data.date, {});
    }
  }
})
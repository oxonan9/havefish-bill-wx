// components/account/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      console.log(event)
      let item = event.currentTarget.dataset.item
      //对象转为字符串
      let data = JSON.stringify(item)
      wx.navigateTo({
        url: '/pages/tally/tally?data=' + data,
    })
    }
  }
})
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
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

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  ready() {
    let statusBarHeight = deviceUtil.getStatusBarHeight();
    // const {
    //   statusBarHeight,
    // } = getApp().globalData
    this.setData({
      statusBarHeight,
    })
  }
})
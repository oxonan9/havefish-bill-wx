const {
  Token
} = require("./models/token")

App({

  globalData: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'], // 获取导航栏的高度
    statusBarHeight: wx.getSystemInfoSync()['navBarHeight'], // 获取导航栏的高度
  },

  onLaunch() {
    // 获取手机信息以配置顶栏
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.statusBarHeight = res.statusBarHeight
        this.globalData.navBarHeight = 44 + res.statusBarHeight
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
      },
    })

    let token = new Token();
    token.verify();
  }

})
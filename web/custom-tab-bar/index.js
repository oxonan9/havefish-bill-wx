Component({
  data: {
    "color": "#bbbbbb",
    "selectedColor": "#333333",
    "backgroundColor": "#ffffff",
    "borderStyle": "#ffffff",
    list: [{
        pagePath: "/pages/home/home",
        text: "首页",
        iconPath: "/images/home.png",
        selectedIconPath: "/images/home_hl.png"
      },
      {
        pagePath: "pages/home/home",
        bulge: true,
        iconPath: "/images/add_hl.png",
        selectedIconPath: "/images/add_hl.png"
      },
      {
        pagePath: "/pages/home/home",
        text: "我的",
        iconPath: "/images/my.png",
        selectedIconPath: "/images/my_hl.png"
      }
    ]
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(e)
      if (data.index == 1) {
        wx.navigateTo({
          url: "/pages/do/do",
        })
      } else {
        wx.switchTab({
          url
        })
      }
    }
  }
})
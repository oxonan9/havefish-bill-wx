// components/icon-grid/index.js
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
    selectedId: 0,
    grids1: [{
      id: 1,
      image: "/images/account/eat@select.png",
      image_dis: "/images/account/eat@unselect.png",
      text: "三餐"
    }, {
      id: 2,
      image_dis: "/images/account/shopping@black.png",
      image: "/images/account/shopping@white.png",
      text: "购物"
    }, {
      id: 3,
      image_dis: "/images/account/shopping@black.png",
      image: "/images/account/shopping@white.png",
      text: "购物"
    }, {
      id: 4,
      image_dis: "/images/account/shopping@black.png",
      image: "/images/account/shopping@white.png",
      text: "购物"
    }, {
      id: 5,
      image_dis: "/images/account/shopping@black.png",
      image: "/images/account/shopping@white.png",
      text: "购物"
    }, {
      id: 6,
      image: "/images/account/eat@select.png",
      image_dis: "/images/account/eat@unselect.png",
      text: "三餐"
    }, {
      id: 7,
      image_dis: "/images/account/shopping@black.png",
      image: "/images/account/shopping@white.png",
      text: "购物"
    }, {
      id: 8,
      image_dis: "/images/account/shopping@black.png",
      image: "/images/account/shopping@white.png",
      text: "购物"
    }, {
      id: 9,
      image_dis: "/images/account/shopping@black.png",
      image: "/images/account/shopping@white.png",
      text: "购物"
    }, {
      id: 10,
      image_dis: "/images/account/shopping@black.png",
      image: "/images/account/shopping@white.png",
      text: "购物"
    }, ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(event) {
      this.setData({
        selectedId: event.currentTarget.dataset.id
      })

      console.log(this.data.selectedId)
    }
  }
})
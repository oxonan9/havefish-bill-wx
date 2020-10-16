// components/icon-grid/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    grids: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    readyObj: {},
    amount: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(event) {
      this.setData({
        readyObj: this.properties.grids[event.currentTarget.dataset.index]
      })
      this.triggerEvent('select', this.data.readyObj.id, {})
    },

    onPost(event) {
      this.triggerEvent("post", event.detail.value, {})
    }
  },
  attached() {
    this.setData({
      readyObj: this.properties.grids[0]
    })
  }
})
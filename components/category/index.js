// components/icon-grid/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    grids: Array,
    selectedId: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    amount: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      this.setData({
        selectedId: event.currentTarget.dataset.id
      })
      this.triggerEvent('select', this.data.selectedId, {})
    },

    onPost(event) {
      this.triggerEvent("post", event.detail.value, {})
    }
  },
  attached() {
    console.log(this.data.selectedId)
    // this.setData({
    //   selectedId: this.data.grids[0].id
    // })
  },

  moved() {
    console.log("moved")
  },

  detached() {
    console.log("detached")
  }
})
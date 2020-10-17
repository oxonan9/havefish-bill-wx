import {
  config
} from '../config.js'
class HTTP {

  async request({
    url,
    method = "GET",
    data = {}
  }) {
    const res = await this._request(url, method, data)
    return res.data
  }

  _request(url, method = "GET", data = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.baseUrl + url,
        method: method,
        data: data,
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject()
          this._showError("抱歉，服务器可能开小差了")
        }
      })
    })
  }

  _showError(msg) {
    wx.lin.showMessage({
      content: msg,
      type: 'error',
    })
  }
}

export {
  HTTP
}
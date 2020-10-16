import {
  config
} from '../config.js'
class HTTP {

  request({
    url,
    method = "GET",
    data = {}
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, method, data)
    })
  }

  _request(url, resolve, reject, method = "GET", data = {}) {
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
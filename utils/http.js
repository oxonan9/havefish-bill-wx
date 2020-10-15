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
    console.log(config.baseUrl + url)
    wx.request({
      url: config.baseUrl + url,
      method: method,
      data: data,
      success: (res) => {
        resolve(res)
      },
      fail: (error) => {
        reject()
        console.log(error)
      }
    })
  }
}

export {
  HTTP
}
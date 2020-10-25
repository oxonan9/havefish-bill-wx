import {
  config
} from '../config.js'
class Http {

  static async request({
    url,
    method = "GET",
    data = {}
  }) {
    const res = await Http._request(url, method, data)
    return res.data
  }

  static _request(url, method = "GET", data = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.baseUrl + url,
        method: method,
        data: data,
        success: (res) => {
          //只有2开头才是操作成功  小程序规定即使是404、500也会走success，除非网络错误
          if (res.statusCode.toString().startsWith("2")) {
            resolve(res)
          } else {
            Http._showError("资源找不到或者服务器异常");
          }
        },
        fail: (error) => {
          reject(error);
          Http._showError("抱歉，服务器可能开小差了")
        }
      })
    })
  }

  static _showError(msg) {
    wx.showToast({
      title: msg,
      icon: "none"
    })
  }
}

export {
  Http
}
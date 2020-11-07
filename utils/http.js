import {
  config
} from '../config.js'
import {
  Token
} from '../models/token.js';
class Http {

  static async request({
    url,
    method = "GET",
    data = {},
    refretch = true,
  }) {
    let res = await Http._request(url, method, data)
    let statusCode = res.statusCode.toString();
    if (statusCode.startsWith("2")) {
      return res.data
    } else {
      if (statusCode == '401') {
        //token未授权 二次重发  防止多次重发
        if (refretch) {
          return await Http._refetch({
            url,
            method,
            data
          })
        }
      } else {
        Http._showError(res.data.message)
      }
    }
  }
  //二次重发 
  static async _refetch(data) {
    let token = new Token();
    await token.getToken()
    data.refretch = false
    return await Http.request(data);
  }

  static _request(url, method = "GET", data = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.baseUrl + url,
        method: method,
        data: data,
        header: {
          "Authorization": `Bearer ${wx.getStorageSync('token')}`
        },
        success: (res) => {
          resolve(res)
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
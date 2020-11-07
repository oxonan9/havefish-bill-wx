const {
  Http
} = require("../utils/http");

class Token {

  async verify() {
    let token = wx.getStorageSync('token');
    if (!token) {
      await this.getToken()
    } else {
      await this.verifyToken();
    }
  }

  /**
   * 请求token  并放入Storage
   */
  async getToken() {
    let login = await wx.login()
    let data = await Http.request({
      url: "token",
      method: "POST",
      data: {
        account: login.code,
        type: 0
      }
    })
    wx.setStorageSync('token', data.token)
    return data.token;
  }

  /**
   * 校验token是否过期 过期重新获取token
   */
  async verifyToken() {
    let token = wx.getStorageSync('token');
    let data = await Http.request({
      url: "token/verify",
      method: "POST",
      data: {
        token,
      }
    })
    if (!data.is_valid) {
      this.getToken();
    }
  }

}

export {
  Token
}
const {
  Http
} = require("./http");

/**
 * 封装分页
 */
class Paging {
  url
  start
  count
  lock
  req
  moreData = true
  /**
   * 构造器初始化
   * @param {*} url 
   * @param {*} start 
   * @param {*} count 
   */
  constructor(req, start = 0, count = 10) {
    this.start = start;
    this.count = count;
    this.req = req
    this.url = req.url;
  }

  /**
   * 加载数据
   */
  async getMoreData() {
    //没有更多数据直接return
    if (!this.moreData) {
      return
    }
    //获取到锁才执行
    if (!this._getLocker()) {
      return
    }
    let data = await this._getRealData();
    //释放送
    this._releaseLocker()
    return data;
  }

  /**
   * 获取真正数据的方法
   */
  async _getRealData() {
    let req = this._finallyReq();
    let data = await Http.request(req)
    if (data.total == 0) {
      return {
        empty: true,
        moreData: false,
        items: []
      }
    }
    this.moreData = this._moreData(data.page, data.total_pages);
    if (this.moreData) {
      this.start += this.count
    }
    return {
      empty: false,
      moreData: this.moreData,
      items: data.items
    };
  }

  _moreData(page, totalPages) {
    return page < totalPages - 1
  }
  /**
   * 对url进行拼接
   * 两种情况：
   * url是否携带了其他参数 xxx?start=0&count=10
   * 
   */
  _finallyReq() {
    let url = this.url;
    let params = `start=${this.start}&count=${this.count}`;
    if (url.includes('?')) {
      url += `&${params}`
    } else {
      url += `?${params}`
    }
    this.req.url = url;
    return this.req;
  }

  /**
   * 获取锁
   */
  _getLocker() {
    if (this.lock) {
      return false
    }
    this.lock = true;
    return true;
  }


  /**
   * 释放锁
   */
  _releaseLocker() {
    this.lock = false;
  }

}

//导出Paging对象
export {
  Paging
}
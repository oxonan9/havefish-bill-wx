import {
  HTTP
}
from '../utils/http.js'
class RecordModel extends HTTP {

  /**
   * 获取流水列表
   */
  getRecordList(date) {
    return this.request({
      url: "record/list",
      method: "GET",
      data: {
        recordTime: date
      }

    })
  }

  /**
   * 记账
   */
  saveRecord(data) {
    return this.request({
      url: "record/save",
      method: "POST",
      data: data
    })
  }

}

export {
  RecordModel
}
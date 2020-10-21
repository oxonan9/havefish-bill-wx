import {
  HTTP
}
from '../utils/http.js'
class RecordModel extends HTTP {

  /** */
  async getRecordAmount(recordTime) {
    return await this.request({
      url: "record/total_amount",
      method: "GET",
      data: {
        recordTime
      }
    })
  }

  /**
   * 获取流水列表
   */
  async getRecordList(start, count, date) {
    return await this.request({
      url: "record/list",
      method: "GET",
      data: {
        start,
        count,
        recordTime: date
      }
    })
  }

  /**
   * 添加记录
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
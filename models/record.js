import {
  HTTP
}
from '../utils/http.js'
class RecordModel extends HTTP {

  getRecordList() {
    return this.request({
      url: "record/list"
    })
  }

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
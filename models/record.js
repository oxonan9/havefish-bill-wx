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

}

export {
  RecordModel
}
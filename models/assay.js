const {
  Http
} = require("../utils/http")

class Assay {
  static async assay2(date, dateType, type) {
    return await Http.request({
      url: "bill/assay",
      method: "GET",
      data: {
        date,
        date_type: dateType,
        type,
      }
    })
  }
}

export {
  Assay
}
const {
  Http
} = require("../utils/http")

class AssayModel {
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

  static async line(date) {
    return await Http.request({
      url: "bill/line",
      method: "GET",
      data: {
        date
      }
    })
  }

}

export {
  AssayModel
}
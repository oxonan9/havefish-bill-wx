const {
  Http
} = require("../utils/http");

class BudgetModel {

  static async save(date, amount) {
    return await Http.request({
      url: "budget/save",
      method: "POST",
      data: {
        date: date,
        amount: amount
      }
    })
  }

  static async get(date) {
    return await Http.request({
      url: "budget/get",
      method: "GET",
      data: {
        date
      }
    })
  }
}

export {
  BudgetModel
}
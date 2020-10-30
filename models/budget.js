const {
  Http
} = require("../utils/http");

class BudgetModel {

  static save(date, amount) {
    Http.request({
      url: "budget/save",
      method: "POST",
      data: {
        date: date,
        amount: amount
      }
    })
  }
}

export {
  BudgetModel
}
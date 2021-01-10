package com.opisir.bill.api;

import com.opisir.bill.core.LocalUser;
import com.opisir.bill.model.Budget;
import com.opisir.bill.service.BudgetService;
import com.opisir.bill.vo.BudgetVO;
import com.opisir.bill.core.interceptors.ScopeLevel;
import com.opisir.bill.dto.BudgetDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: dingjn
 * @Desc:
 */
@RestController
@RequestMapping("budget")
public class BudgetController {

    @Autowired
    BudgetService budgetService;

    @ScopeLevel
    @PostMapping("/save")
    public Map<String, Boolean> save(@RequestBody BudgetDTO budget) {
        Map<String, Boolean> map = new HashMap<>();
        Long userId = LocalUser.getUserId();
        Budget result = budgetService.save(budget.getDate(), budget.getAmount(), userId);
        map.put("success", result != null);
        return map;
    }

    //type 月 年
    @ScopeLevel
    @GetMapping("/get")
    public BudgetVO getBudget(String date) {
        Long userId = LocalUser.getUserId();
        return budgetService.getBudget(date, userId);
    }
}

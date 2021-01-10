package com.opisir.bill.service;

import com.opisir.bill.core.enumration.BillType;
import com.opisir.bill.vo.BudgetVO;
import com.opisir.bill.model.Budget;
import com.opisir.bill.repository.BillRepository;
import com.opisir.bill.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;


/**
 * @Auther: dingjn
 * @Desc:
 */
@Service
public class BudgetService {
    @Autowired
    BudgetRepository budgetRepository;

    @Autowired
    BillRepository billRepository;

    @Transactional
    public Budget save(Date date, Long amount, Long userId) {
        //todo 先判断当月有没有设置过预算，有的话就更新
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM");
        Budget firstByUserId = budgetRepository.findFirstByUserId(sf.format(date), userId);
        if (firstByUserId == null) {
            Budget budget = Budget.builder()
                    .userId(userId)
                    .date(date)
                    .amount(amount).build();
            return budgetRepository.save(budget);
        } else {
            Budget budget = Budget.builder()
                    .id(firstByUserId.getId())
                    .userId(userId)
                    .date(date)
                    .amount(amount).build();
            return budgetRepository.save(budget);
        }
    }

    public BudgetVO getBudget(String date, Long userId) {
        Budget budget = budgetRepository.findFirstByUserId(date, userId);
        //获取当月总支出
        BigDecimal consume = billRepository.findAmountByRecordTimeAndType(date, BillType.CONSUME.getValue(), userId);

        long current = consume == null ? 0 : consume.longValue();
        long budgetAmount = budget == null ? 0 : budget.getAmount();
        int percent = budgetAmount == 0 ? 0 : Math.round((float) current / budgetAmount * 100);
        if (current > budgetAmount) {
            percent = 100;
        }
        return BudgetVO.builder()
                .current(current)
                .budget(budgetAmount)
                .percent(percent).build();
    }
}


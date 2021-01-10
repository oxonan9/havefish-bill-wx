package com.opisir.bill.repository;

import com.opisir.bill.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @Auther: dingjn
 * @Desc:
 */
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    @Query("select b from Budget b where function('date_format', b.date, '%Y-%m') = :date AND b.userId = :userId")
    Budget findFirstByUserId(String date, Long userId);
}

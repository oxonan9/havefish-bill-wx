package com.opisir.bill.repository;

import com.opisir.bill.model.Record;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;


/**
 * @Auther: dingjn
 * @Desc:
 */
@Repository
public interface BillRepository extends JpaRepository<Record, Long> {

    List<Record> findAllByUserId(Long userId);

    @Query("select r from Record r where function('date_format', r.recordTime, '%Y-%m') = :recordTime AND r.userId = :userId")
    List<Record> findAllByRecordTime(String recordTime, Long userId);

    @Query("select r from Record r where function('date_format', r.recordTime, '%Y-%m') = :recordTime AND r.userId = :userId")
    Page<Record> findAllByRecordTime(Pageable pageable, String recordTime, Long userId);

    @Query("SELECT SUM(r.amount) FROM Record r WHERE function('date_format', r.recordTime, '%Y-%m') = :recordTime AND r.type = :type AND r.userId=:userId")
    BigDecimal findAmountByRecordTimeAndType(String recordTime, Integer type, Long userId);
}

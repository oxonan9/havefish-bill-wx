package com.opisir.bill.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Data
public class RecordPureVO {

    private Long id;

    private Long categoryId;

    private String icon;

    private String name;

    private String remark;

    private BigDecimal amount;

    private Integer type;

    private Date recordTime;
}

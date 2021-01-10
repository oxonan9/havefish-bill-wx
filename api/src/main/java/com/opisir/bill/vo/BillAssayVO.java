package com.opisir.bill.vo;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * @Auther: dingjn
 * @Desc: 账单统计VO
 */
@Getter
@Setter
public class BillAssayVO {
    private Long catetgoryId;
    private String name;
    private String icon;
    private BigDecimal amount;
    private BigDecimal percent;
}

package com.opisir.bill.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

/**
 * @Auther: dingjn
 * @Desc:
 */
@ToString
@Getter
@Builder
public class BillAmountVO {
    private BigDecimal income; //总收入
    private BigDecimal consume; //总支出
    private BigDecimal budget; //剩余预算
    private BigDecimal balance; //结余
    private BigDecimal average; //平均
}

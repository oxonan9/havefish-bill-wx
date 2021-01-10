package com.opisir.bill.vo;

import lombok.*;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Getter
@Builder
public class AssayLineVO {
    private double maxConsume;
    private double maxIncome;
    private double[] consumes;
    private double[] incomes;
}

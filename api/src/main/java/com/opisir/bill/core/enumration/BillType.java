package com.opisir.bill.core.enumration;

import lombok.Getter;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Getter
public enum BillType {
    CONSUME(0, "支出"),
    INCOME(1, "收入");


    private Integer value;

    BillType(Integer value, String desc) {
        this.value = value;
    }
}

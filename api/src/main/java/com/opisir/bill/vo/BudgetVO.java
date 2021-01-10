package com.opisir.bill.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Getter
@Setter
@Builder
public class BudgetVO {
    private Long current;
    private Long budget;
    private Integer percent;
}

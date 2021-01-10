package com.opisir.bill.bo;

import lombok.Builder;
import lombok.Getter;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Getter
@Builder
public class PageCounter {
    private Integer pageNum;
    private Integer count;
}

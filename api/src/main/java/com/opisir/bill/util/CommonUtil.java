package com.opisir.bill.util;

import com.opisir.bill.bo.PageCounter;

/**
 * @Auther: dingjn
 * @Desc:
 */
public class CommonUtil {

    public static PageCounter convertToPageNumParameter(Integer start, Integer count) {
        Integer pageNum = start / count;
        PageCounter pageCounter = PageCounter.builder()
                .pageNum(pageNum)
                .count(count)
                .build();
        return pageCounter;
    }

}

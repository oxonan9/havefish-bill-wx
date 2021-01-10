package com.opisir.bill.vo;

import lombok.Data;

import java.util.List;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Data
public class RecordVO {
    private String date; //日期
    private Double income; //当天收入
    private Double consume; //当天支出
    private List<RecordPureVO> items; //当天账单
}

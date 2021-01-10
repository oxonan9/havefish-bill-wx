package com.opisir.bill.core;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.metadata.BaseRowModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WriteModel extends BaseRowModel {

    @ExcelProperty(value = "消费日期", index = 0)
    private Date recordTime;

    @ExcelProperty(value = "分类", index = 1)
    private String name;

    @ExcelProperty(value = "金额", index = 2)
    private BigDecimal amount;

    @ExcelProperty(value = "备注", index = 3)
    private String remark;
}

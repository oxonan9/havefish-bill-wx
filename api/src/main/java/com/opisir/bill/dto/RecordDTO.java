package com.opisir.bill.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Setter
@Getter
public class RecordDTO implements Serializable {

    private Long id;

    private Long categoryId;

    private Integer type;

    private BigDecimal amount;

    private String remark;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date recordTime;
}


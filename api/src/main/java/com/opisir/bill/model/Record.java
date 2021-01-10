package com.opisir.bill.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @Auther: dingjn
 * @Desc: 流水记录Model
 */
@ToString
@Getter
@Setter
@Entity
public class Record extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long categoryId;

    private Integer type;

    private BigDecimal amount;

    private String remark;

    private Date recordTime;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(insertable = false, updatable = false, name = "categoryId")
    private Category category;

}

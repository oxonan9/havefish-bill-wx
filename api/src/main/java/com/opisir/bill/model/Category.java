package com.opisir.bill.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @Auther: dingjn
 * @Desc: 流水记录Model
 */
@ToString
@Getter
@Setter
@Entity
public class Category extends BaseEntity {

    @Id
    private Long id;

    private String name;

    private String icon;
}

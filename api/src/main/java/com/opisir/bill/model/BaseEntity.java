package com.opisir.bill.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.util.Date;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Getter
@Setter
@MappedSuperclass //表示是一个基类
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {
    @CreatedDate
    private Date createTime;
    @LastModifiedDate
    private Date updateTime;
}

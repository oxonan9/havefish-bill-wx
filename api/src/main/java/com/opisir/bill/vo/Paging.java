package com.opisir.bill.vo;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Getter
@Setter
public class Paging<T> {
    private Long total;
    private Integer count;
    private Integer page;
    private Integer totalPages;
    private List<T> items;

    public Paging(Page<T> pageT) {
        this.total = pageT.getTotalElements();
        this.count = pageT.getSize();
        this.page = pageT.getNumber();
        this.totalPages = pageT.getTotalPages();
        this.items = pageT.getContent();
    }
}

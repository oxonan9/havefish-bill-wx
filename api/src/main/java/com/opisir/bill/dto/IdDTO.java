package com.opisir.bill.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Getter
@Setter
public class IdDTO {
    @NotNull
    private Long id;
}

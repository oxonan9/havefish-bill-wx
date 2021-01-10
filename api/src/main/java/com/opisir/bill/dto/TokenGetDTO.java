package com.opisir.bill.dto;

import com.opisir.bill.core.enumration.LoginType;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Getter
public class TokenGetDTO {
    //account可以是code，手机号、邮箱
    @NotBlank(message = "account不能为空")
    private String account;
    //todo 密码校验
    private String password;
    @NotNull(message = "type不能为空")
    private LoginType type;
}

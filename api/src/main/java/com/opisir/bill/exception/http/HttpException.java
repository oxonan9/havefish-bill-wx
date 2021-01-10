package com.opisir.bill.exception.http;

import lombok.Getter;
import lombok.Setter;

/**
 * @Auther: dingjn
 * @Desc: 自定义异常
 */
@Getter
@Setter
public class HttpException extends RuntimeException {
    protected Integer code = 500; //自定义错误码
    protected Integer httpStatusCode = 500; //Http响应码
}

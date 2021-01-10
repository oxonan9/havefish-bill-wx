package com.opisir.bill.exception.http;

/**
 * @Auther: dingjn
 * @Desc: 未找到资源
 */
public class NotFoundException extends HttpException {


    public NotFoundException(int code) {
        this.code = code;
        this.httpStatusCode = 404;
    }
}

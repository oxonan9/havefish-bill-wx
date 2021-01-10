package com.opisir.bill.exception.http;

/**
 * @Auther: dingjn
 * @Desc:
 */
public class UnAuthenticationExcepiton extends HttpException {
    public UnAuthenticationExcepiton(int code) {
        this.code = code;
        this.httpStatusCode = 401;
    }
}

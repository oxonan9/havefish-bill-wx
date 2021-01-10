package com.opisir.bill.exception.http;

/**
 * @Auther: dingjn
 * @Desc:
 */
public class ParameterExcepiton extends HttpException {

    public ParameterExcepiton(int code) {
        this.code = code;
        this.httpStatusCode = 400;
    }
}

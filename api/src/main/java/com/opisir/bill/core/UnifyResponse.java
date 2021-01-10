package com.opisir.bill.core;

import lombok.Getter;
import lombok.Setter;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Getter
@Setter
public class UnifyResponse {
    private int code;
    private String message;
    private String request;

    public UnifyResponse(int code, String message, String request) {
        this.code = code;
        this.message = message;
        this.request = request;
    }
    
}

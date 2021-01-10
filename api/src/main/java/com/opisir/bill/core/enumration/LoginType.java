package com.opisir.bill.core.enumration;

/**
 * @Auther: dingjn
 * @Desc:
 */
public enum LoginType {
    USER_wx(0,"微信"),
    User_email(1,"邮箱");

    int value;

    LoginType(int value, String desc) {
        this.value = value;
    }
}

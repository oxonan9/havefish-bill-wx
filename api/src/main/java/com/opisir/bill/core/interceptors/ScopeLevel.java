package com.opisir.bill.core.interceptors;

import java.lang.annotation.*;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface ScopeLevel {
    int value() default 4;
}

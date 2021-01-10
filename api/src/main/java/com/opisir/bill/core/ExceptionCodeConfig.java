package com.opisir.bill.core;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: dingjn
 * @Desc: 读取exception-code.properties根据错误码获取对应message
 */
@Component
@ConfigurationProperties(prefix = "yungu")
@PropertySource(value = "classpath:config/exception-code.properties")
public class ExceptionCodeConfig {

    private Map<Integer, String> codes = new HashMap<>();

    public void setCodes(Map<Integer, String> codes) {
        this.codes = codes;
    }

    public String getMessage(Integer code) {
        return codes.get(code);
    }
}

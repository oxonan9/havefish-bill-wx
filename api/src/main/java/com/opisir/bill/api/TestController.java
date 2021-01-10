package com.opisir.bill.api;

import com.opisir.bill.exception.http.NotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Auther: dingjn
 * @Desc:
 */
@RestController
public class TestController {

    @GetMapping("/test")
    public String hello() {
        throw new NotFoundException(20001);
//        return "hello yuntu";
    }

}

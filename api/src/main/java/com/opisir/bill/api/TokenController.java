package com.opisir.bill.api;

import com.opisir.bill.service.WxAuthenticationService;
import com.opisir.bill.dto.TokenDTO;
import com.opisir.bill.dto.TokenGetDTO;
import com.opisir.bill.util.JwtToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: dingjn
 * @Desc:
 */
@RestController
@RequestMapping("token")
public class TokenController {

    @Autowired
    JwtToken jwtToken;

    @Autowired
    WxAuthenticationService wxAuthenticationService;

    @PostMapping("")
    public Map<String, String> getToken(@Valid @RequestBody TokenGetDTO tokenGetDTO) {
        Map<String, String> map = new HashMap<>();
        String token = null;
        switch (tokenGetDTO.getType()) {
            case USER_wx:
                token = wxAuthenticationService.code2Session(tokenGetDTO.getAccount());
                break;
            default:
                break;
        }
        map.put("token", token);
        return map;
    }

    @PostMapping("/verify")
    public Map<String, Boolean> verify(@RequestBody TokenDTO tokenDTO) {
        Map<String, Boolean> map = new HashMap<>();
        Boolean valid = jwtToken.verifyToken(tokenDTO.getToken());
        map.put("is_valid", valid);
        return map;
    }
}

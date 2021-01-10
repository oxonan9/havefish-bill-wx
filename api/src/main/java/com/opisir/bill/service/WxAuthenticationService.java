package com.opisir.bill.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opisir.bill.exception.http.ParameterExcepiton;
import com.opisir.bill.model.User;
import com.opisir.bill.repository.UserRepository;
import com.opisir.bill.util.JwtToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Service
public class WxAuthenticationService {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    JwtToken jwtToken;

    @Autowired
    UserRepository userRepository;

    @Value("${wx.appid}")
    private String appid;
    @Value("${wx.secret}")
    private String secret;
    @Value("${wx.code2SessionUrl}")
    private String code2SessionUrl;

    public String code2Session(String code) {
        //请求微信接口
        String url = MessageFormat.format(code2SessionUrl, appid, secret, code);
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);
        Map<String, String> map = new HashMap<>();
        try {
            map = objectMapper.readValue(response, Map.class);
        } catch (JsonProcessingException e) {
            //
        }
        return this.registUser(map);
    }

    private String registUser(Map<String, String> map) {
        String openid = map.get("openid");
        if (StringUtils.isEmpty(openid)) {
            throw new ParameterExcepiton(20001);
        }
        //根据openid查询数据库 ，不存在
        User user = userRepository.findFirstByOpenid(openid);
        if (user == null) {
            User saveUser = User.builder().openid(openid).build();
            userRepository.save(saveUser);
            return jwtToken.generateToken(saveUser.getId());
        }
//        User updateUser = new User();
//        updateUser.setId(user.getId());
//        updateUser.setUpdateTime(new Date()); //更新登录时间
//        userRepository.save(updateUser);
        //根据id生成token
        return jwtToken.generateToken(user.getId());
    }
}

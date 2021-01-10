package com.opisir.bill.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.opisir.bill.exception.http.UnAuthenticationExcepiton;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Component
public class JwtToken {

    private static String secret;

    private static Integer expires;

    //@Value给静态变量注入  需要setter方法
    @Value("${jwt.secret}")
    public void setSecret(String secret) {
        JwtToken.secret = secret;
    }

    @Value("${jwt.expires}")
    public void setExpires(Integer expires) {
        JwtToken.expires = expires;
    }

    /**
     * 获取token携带信息
     */
    public static Map<String, Claim> getClaims(String token) {
        DecodedJWT decodedJWT;
        Algorithm algorithm = Algorithm.HMAC256(secret);
        JWTVerifier jwtVerifier = JWT.require(algorithm).build();
        try {
            decodedJWT = jwtVerifier.verify(token);
        } catch (JWTVerificationException e) {
            throw new UnAuthenticationExcepiton(10003);
        }
        return decodedJWT.getClaims();
    }

    /**
     * 校验token
     */
    public Boolean verifyToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        JWTVerifier jwtVerifier = JWT.require(algorithm).build();
        try {
            jwtVerifier.verify(token);
        } catch (JWTVerificationException e) {
            return false;
        }
        return true;
    }

    /**
     * 生成token
     */
    public String generateToken(Long userId) {
        return generateToken(userId, 8);
    }

    public String generateToken(Long userId, Integer scope) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        Map<String, Date> dateMap = this.appointExpires();
        String token = JWT.create()
                .withClaim("userId", userId)
                .withClaim("scope", scope)
                .withIssuedAt(dateMap.get("nowDate"))//生成日期
                .withExpiresAt(dateMap.get("expireDate"))//过期日期
                .sign(algorithm);
        return token;
    }

    //指定过期时间
    private Map<String, Date> appointExpires() {
        Map<String, Date> resultMap = new HashMap<>();
        Calendar calendar = Calendar.getInstance();
        Date nowDate = calendar.getTime();
        calendar.add(Calendar.SECOND, expires);
        Date expireDate = calendar.getTime();
        resultMap.put("nowDate", nowDate);
        resultMap.put("expireDate", expireDate);
        return resultMap;
    }
}


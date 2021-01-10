package com.opisir.bill.core;

import com.alibaba.fastjson.JSONObject;
import com.opisir.bill.exception.http.HttpException;
import com.opisir.bill.model.User;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: dingjn
 * @Desc: AOP处理请求日志
 */
@Aspect
@Component
@Slf4j
public class RequestAspect {

    @Pointcut("execution(public * com.yuntu.account.api.*.*(..)))")
    public void requestCutPoint() {

    }

    @Around("requestCutPoint()")
    public Object doAround(ProceedingJoinPoint call) throws Throwable {
        ServletRequestAttributes servletRequestAttributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = servletRequestAttributes.getRequest();
        //请求url
        //记录下请求内容
        User user = LocalUser.getUser();
        if (user == null) {
            user = new User(0L, "0000000", "", "");
        }
        log.info("################ api日志开始 ################");
        log.info("【请求用户】: id={}, username={} : ", user.getId(), user.getNickname());
        log.info("【请求URL】: " + request.getRequestURL().toString());
        log.info("【请求方式】: " + request.getMethod());
        log.info("【请求IP】: " + request.getRemoteAddr() + " , nginx配置的ip：" + request.getHeader("X-REAL-IP"));
        Object[] args = call.getArgs();
        if (args != null) {
            StringBuilder sb = new StringBuilder();
            for (Object arg : args) {
                if (arg instanceof HttpServletRequest) {
                    continue;
                } else if (arg instanceof HttpServletResponse) {
                    continue;
                }
                sb.append(arg);
                sb.append("|");
            }
            log.info("【请求参数】: " + sb);
        }

        Long startTimeStamp = System.currentTimeMillis();
        try {
            //请求处理
            Object object = call.proceed();
            log.info("【响应结果】: " + (null != object ? JSONObject.toJSONString(object) : null));
            return object;
        } catch (HttpException e) {
            Map<String, Object> map = new HashMap<>();
            map.put("code", e.getCode());
            map.put("message", e.getMessage());
            log.error("【响应结果】(ServerException): " + JSONObject.toJSONString(map));
            log.info("【响应结果】(ServerException): " + JSONObject.toJSONString(map));
            return map;
        } catch (Exception e) {
            log.error("服务请求处理异常", e);
            Map<String, Object> map = new HashMap<>();
            map.put("code", "999");
            map.put("message", e.getMessage());
            log.error("【响应结果】(ServerException): " + JSONObject.toJSONString(map));
            log.info("【响应结果】(ServerException): " + JSONObject.toJSONString(map));
            return map;
        } finally {
            log.info("################ api日志结束 耗时: {}毫秒 ################", (System.currentTimeMillis() - startTimeStamp));
        }
    }
}



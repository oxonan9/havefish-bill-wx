package com.opisir.bill.core.interceptors;

import com.auth0.jwt.interfaces.Claim;
import com.opisir.bill.core.LocalUser;
import com.opisir.bill.service.UserService;
import com.opisir.bill.exception.http.UnAuthenticationExcepiton;
import com.opisir.bill.model.User;
import com.opisir.bill.util.JwtToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Slf4j
public class PermissionInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    UserService userService;

    public PermissionInterceptor() {
        super();
    }


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //handle 访问的方法
        ScopeLevel scopeLevel = getScopeLevel(handler);
        if (scopeLevel == null) { //如果方法上没有ScopeLevel注解，说明是公开的接口
            return true;
        }
        //对于认证的接口，需要校验token
        //1.token 是否为空 2.Bearer  3.token是否有效
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.isEmpty(bearerToken)) {
            throw new UnAuthenticationExcepiton(10002);
        }
        if (!bearerToken.startsWith("Bearer ")) {
            throw new UnAuthenticationExcepiton(10003);
        }
//        String token = bearerToken.split(" ")[1]; 直接获取有数组越界的风险，比如前端只传递了Bearer
        String[] tokens = bearerToken.split(" ");
        if (tokens.length != 2) {
            throw new UnAuthenticationExcepiton(10003);
        }
        String token = tokens[1];
        log.info("token={}", token);
        Map<String, Claim> claims = JwtToken.getClaims(token);
        setUser(claims); //保存当前用户信息
        return true;
    }

    private void setUser(Map<String, Claim> claims) {
        Long id = claims.get("userId").asLong();
        User user = userService.getUserById(id);
        LocalUser.set(user);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        LocalUser.clear();
        super.afterCompletion(request, response, handler, ex);
    }

    public ScopeLevel getScopeLevel(Object handler) {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            ScopeLevel scopeLevel = handlerMethod.getMethod().getAnnotation(ScopeLevel.class);
            return scopeLevel;
        }
        return null;
    }
}

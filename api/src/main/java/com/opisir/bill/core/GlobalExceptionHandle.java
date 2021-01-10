package com.opisir.bill.core;

import com.opisir.bill.exception.http.HttpException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.List;

/**
 * @Auther: dingjn
 * @Desc: 统一返回格式
 * {
 * code:10001
 * message:通用错误耦
 * request:GET：/test
 * }
 */
@RestControllerAdvice
public class GlobalExceptionHandle {

    private ExceptionCodeConfig exceptionCodeConfig;

    public GlobalExceptionHandle(ExceptionCodeConfig exceptionCodeConfig) {
        this.exceptionCodeConfig = exceptionCodeConfig;
    }

    /**
     * 未知异常.
     */
    @ExceptionHandler(Exception.class)
    public UnifyResponse handle(HttpServletRequest request, Exception e) {
        String method = request.getMethod();
        String requestURI = request.getRequestURI();
        return new UnifyResponse(999, "服务器异常，请联系后台管理人员", method + "：" + requestURI);
    }


    /**
     * 已知异常.
     */
    @ExceptionHandler(HttpException.class)
    public ResponseEntity<UnifyResponse> handle2(HttpServletRequest request, HttpException e) {
        Integer code = e.getCode();
        //根据code去配置文件查找message
        String message = exceptionCodeConfig.getMessage(code);
        String method = request.getMethod();
        String requestURI = request.getRequestURI();
        UnifyResponse unifyResponse = new UnifyResponse(code, message, method + "：" + requestURI);

        HttpHeaders headers = new HttpHeaders(); //响应头，设置为json格式，因为之前使用的是@ResponseBody注解 ，他帮我们做了
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpStatus httpStatus = HttpStatus.resolve(e.getHttpStatusCode());//动态生成http status
        ResponseEntity<UnifyResponse> responseEntity = new ResponseEntity<>(unifyResponse, headers, httpStatus);

        return responseEntity;
    }

    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public UnifyResponse handleBeanValidation(HttpServletRequest request, MethodArgumentNotValidException e) {
        String method = request.getMethod();
        String requestURI = request.getRequestURI();
        //错误集合，如果多个校验失败，
        List<ObjectError> allErrors = e.getBindingResult().getAllErrors();
        //可以选择一次性将所有错误返回给前端，
        //String message = assertErrors(allErrors);
        //也可以选择一次只返回一个错误
        String message = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        return new UnifyResponse(10001, message, method + " " + requestURI);
    }

    @ResponseBody
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public UnifyResponse handleUrlValidation(HttpServletRequest request, ConstraintViolationException e) {
        String method = request.getMethod();
        String requestURI = request.getRequestURI();
        StringBuilder stringBuilder = new StringBuilder();
        for (ConstraintViolation constraintViolation : e.getConstraintViolations()) {
            String message = constraintViolation.getMessage();
            String path = constraintViolation.getPropertyPath().toString();
            //用.分割需要用\\.或者[.]格式
            String name = path.split("\\.")[1];
            stringBuilder.append(name).append(" ").append(message).append(";");
        }
        return new UnifyResponse(10001, stringBuilder.toString(), method + " " + requestURI);
    }

}

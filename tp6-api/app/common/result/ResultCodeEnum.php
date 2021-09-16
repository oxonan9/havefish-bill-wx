<?php


namespace app\common\result;


use PhpEnum\Enum;

/**
 * Class ResultCodeEnum
 * @package app\common
 * @date 2021/3/20 23:08
 * @author 奇奇
 */
class ResultCodeEnum extends Enum
{
    const SUCCESS = ['success' => true, 'code' => 20000,'message' => "成功"];

    const URL_INVALID = ['success' => false, 'code' => 40000, 'message' => "url无效"];
    const TOKEN_INVALID = ['success' => false, 'code' => 40001,'message' => "token无效"];
    const LOGIN_OVERDUE = ['success' => false, 'code' => 40002,'message' => "登录过期"];
    const REQUEST_METHOD_ERROR = ['success' => false, 'code' => 40003,'message' => "请求类型错误"];

    const ERROR = ['success' => false, 'code' => 50000,'message' => "未知错误"];

    const NO_USER = ['success' => false, 'code' => 10001,'message' => "用户不存在"];
    const NO_DATA = ['success' => false, 'code' => 10002,'message' => "数据不存在"];
}
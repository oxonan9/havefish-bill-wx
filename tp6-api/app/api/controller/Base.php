<?php
namespace app\api\controller;

use app\BaseController;
use app\common\exception\AppException;
use app\common\result\R;
use app\common\result\ResultCodeEnum;
use app\common\util\Jwt;

class Base extends BaseController
{
    protected $userId;

    protected function initialize()
    {
        //对于认证的接口，需要校验token
        $bearerToken = request()->header()['authorization'];
        if (empty($bearerToken) || $bearerToken == 'Bearer') {
            throw new AppException(ResultCodeEnum::TOKEN_INVALID);
        }
        $token = explode(' ', $bearerToken)[1];
        //记录日志
        trace('token=' . $token, 'info');
        $user         = Jwt::getTokenUser($token);
        $this->userId = $user['id'];
    }

    /**
     * description: 方法不存在错误
     */
    public function __call($name, $arguments)
    {
        return R::setResult(ResultCodeEnum::URL_INVALID);
    }
}

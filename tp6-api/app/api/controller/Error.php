<?php

namespace app\api\controller;

use app\common\result\R;
use app\common\result\ResultCodeEnum;

class Error
{
    /**
     * description: 控制器不存在 错误
     */
    public function __call($name, $arguments)
    {
        return R::setResult(ResultCodeEnum::URL_INVALID);
    }
}

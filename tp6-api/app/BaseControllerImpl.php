<?php
/**
 * description:
 * Class BaseControllerImpl
 * @package app
 * @date 2021/3/21 22:45
 * @author 奇奇
 */

namespace app;


use app\common\result\R;
use app\common\result\ResultCodeEnum;

class BaseControllerImpl extends BaseController
{
    public function __call($name, $arguments)
    {
        return R::setResult(ResultCodeEnum::URL_INVALID);
    }
}
<?php


namespace app\common\exception;


class AppException extends \RuntimeException
{
    private $resultCodeEnum; // 错误枚举

    /**
     * AppException constructor.
     * @param $resultCodeEnum
     */
    public function __construct($resultCodeEnum)
    {
        $this->resultCodeEnum = $resultCodeEnum;
    }

    /**
     * @return mixed
     */
    public function getResultCodeEnum()
    {
        return $this->resultCodeEnum;
    }
}
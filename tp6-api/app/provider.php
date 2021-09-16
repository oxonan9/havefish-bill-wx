<?php

use app\common\exception\GlobalExceptionHandle;
use app\ExceptionHandle;
use app\Request;

// 容器Provider定义文件
return [
    'think\Request'          => Request::class,
    'think\exception\Handle' => ExceptionHandle::class,
    // 'think\exception\Handle' => GlobalExceptionHandle::class, // 自定义异常
];

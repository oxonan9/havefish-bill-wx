<?php
// +----------------------------------------------------------------------
// | 应用设置
// +----------------------------------------------------------------------

return [
    // 应用地址
    'app_host'         => env('app.host', ''),
    // 应用的命名空间
    'app_namespace'    => '',
    // 是否启用路由
    'with_route'       => true,
    // 默认应用
    'default_app'      => 'index',
    // 默认时区
    'default_timezone' => 'Asia/Shanghai',

    // 应用映射（自动多应用模式有效）
    'app_map'          => [],
    // 域名绑定（自动多应用模式有效）
    'domain_bind'      => [],
    // 禁止URL访问的应用列表（自动多应用模式有效）
    'deny_app_list'    => [],

    // 异常页面的模板文件
    'exception_tmpl'   => app()->getThinkPath() . 'tpl/think_exception.tpl',

    // 错误显示信息,非调试模式有效
    'error_message'    => '页面错误！请稍后再试～',
    // 显示错误信息
    'show_error_msg'   => true,

    // jwt配置
    'jwt' => [
        "secret" => "huangyouqi", // jwt md5加密key秘钥
        "key" => "huangyouqi-jwt-key", // jwt key
        "iss" => "https://gitee.com/qq651901286", //签发组织
        "aud" => 'qiqi', //签发作者
        "time" => 60 * 60 * 24, // 默认过期时间 单位秒
    ],

    //wx小程序
    'wx' => [
        'app_id'=> env('wx.app_id'),  //小程序appid
        'secret'=> env('wx.secret') ,//小程序secret
        // 下面为可选项
        // 指定 API 调用返回结果的类型：array(default)/collection/object/raw/自定义类名
        'response_type' => 'array',

        'log' => [
            'level' => 'debug',
            'file' => '../runtime/wechat.log',
        ],
    ]
];

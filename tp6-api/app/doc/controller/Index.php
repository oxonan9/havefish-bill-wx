<?php
namespace app\doc\controller;

use app\BaseController;
use hg\apidoc\annotation as Apidoc;

/**
 * @Apidoc\Title("基础示例")
 * @Apidoc\Group("base")
 */
class Index extends BaseController
{
    /**
     * @Apidoc\Title("基础的注释方法")
     * @Apidoc\Desc("最基础的接口注释写法")
     * @Apidoc\Url("/doc/index/index1")
     * @Apidoc\Method("GET")
     * @Apidoc\Tag("测试 基础")
     * @Apidoc\Header("Authorization", require=true, desc="Token")
     * @Apidoc\Param("username", type="string",require=true, desc="用户名" )
     * @Apidoc\Param("password", type="string",require=true, desc="密码" )
     * @Apidoc\Param("phone", type="string",require=true, desc="手机号" )
     * @Apidoc\Param("sex", type="int",default="1",desc="性别" )
     * @Apidoc\Returned("id", type="int", desc="新增用户的id")
     */
    public function index1()
    {
        return 12222;
    }

    /**
     * @Apidoc\Title("基础的注释方法")
     * @Apidoc\Desc("最基础的接口注释写法")
     * @Apidoc\Url("/doc/index/index2")
     * @Apidoc\Method("GET")
     * @Apidoc\Tag("测试 基础")
     * @Apidoc\Header("Authorization", require=true, desc="Token")
     * @Apidoc\Param("username", type="string",require=true, desc="用户名" )
     * @Apidoc\Param("password", type="string",require=true, desc="密码" )
     * @Apidoc\Param("phone", type="string",require=true, desc="手机号" )
     * @Apidoc\Param("sex", type="int",default="1",desc="性别" )
     * @Apidoc\Returned("id", type="int", desc="新增用户的id")
     */
    public function index2()
    {
        return 2;
    }
}

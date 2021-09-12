<?php
namespace app\test\controller;

use app\common\exception\AppException;
use app\common\result\R;
use app\common\result\ResultCodeEnum;
use think\cache\driver\Redis;
use think\facade\Cache;
use think\facade\Config;
use \Firebase\JWT\JWT;

class Index
{
    public function test() {
        return R::setResult(ResultCodeEnum::REQUEST_METHOD_ERROR);
    }

    public function exception() {
        throw new AppException(ResultCodeEnum::REQUEST_METHOD_ERROR);
    }

    public function test2() {
        throw new AppException(ResultCodeEnum::REQUEST_METHOD_ERROR);
        return "ss";
    }

    public function createToken() {
        return Jwt::createJwt();
    }

    public function verifToken() {
        // $a = 3/0;
        Jwt::verifyJwt('1');
        // var_dump(Jwt::verifyJwt('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ2l0ZWUuY29tXC9xcTY1MTkwMTI4NiIsImF1ZCI6InFpcWkiLCJpYXQiOjE2MTYzMTE4OTgsIm5iZiI6MTYxNjMxMTg5OCwiZXhwIjoxNjE2MzM3MDk4LCJkYXRhIjp7ImlkIjoxfX0.Vlrs-bk7lM9mV869ph1yW6IGZTEkw1OGx2yzMFt1Mzg'));
    }

    public function test222() {
        json(Config::get('jwt'))->send();
    }

    public function setCache() {
        Cache::set('name','value');
    }

    public function setReids() {
        $r = new Redis();
        $r->set('name','1111');
    }

    public function getCache() {
        $redis = new Redis();
        // 获取redis缓存
        $name = $redis->get('name');
        var_dump($name);
    }

    public function url(){
    }

    public function jwt() {
        $key = "example_key";
        $payload = array(
            "iss" => "http://example.org",
            "aud" => "http://example.com",
            "iat" => 1356999524,
            "nbf" => 1357000000
        );

        /**
         * IMPORTANT:
         * You must specify supported algorithms for your application. See
         * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
         * for a list of spec-compliant algorithms.
         */
        $jwt = JWT::encode($payload, $key);
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        var_dump($jwt);
        echo "<br>";
        echo "<br>";
        var_dump($decoded);
        echo "<br>";
        echo "<br>";
        /*
         NOTE: This will now be an object instead of an associative array. To get
         an associative array, you will need to cast it as such:
        */

        $decoded_array = (array)$decoded;
        var_dump($decoded_array);
        echo "<br>";
        echo "<br>";
        /**
         * You can add a leeway to account for when there is a clock skew times between
         * the signing and verifying servers. It is recommended that this leeway should
         * not be bigger than a few minutes.
         *
         * Source: http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#nbfDef
         */
        JWT::$leeway = 60; // $leeway in seconds
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        var_dump($decoded);
        echo "<br>";
        echo "<br>";

        $decoded = JWT::decode("YyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLm9yZyIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUuY29tIiwiaWF0IjoxMzU2OTk5NTI0LCJuYmYiOjEzNTcwMDAwMDB9.KcNaeDRMPwkRHDHsuIh1L2B01VApiu3aTOkWplFjoYI", $key, array('HS256'));
        var_dump($decoded);
        echo "<br>";
        echo "<br>";
    }
}

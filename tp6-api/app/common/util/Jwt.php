<?php
/**
 * description: jwt工具类
 * Class Jwt
 * @package app\common\util
 * @date 2021/3/21 12:49
 * @author 奇奇
 */

namespace app\common\util;

use app\common\exception\AppException;
use app\common\model\User;
use app\common\result\R;
use app\common\result\ResultCodeEnum;
use Firebase\JWT\ExpiredException;
use think\facade\Config;

class Jwt
{
    /**
     * description:
     * @date 2021/3/21 15:20
     * @param $data array 存放用户数据
     * @param int $expireTimeInput 多少秒过期
     * @return string  token
     * @author 奇奇
     */
    public static function createJwt($data = ['id' => 1], $expireTimeInput = 0)
    {
        $key = self::getKey(); //jwt的签发密钥，验证token的时候需要用到
        $expireTime = Config::get('app')['jwt']['time']; // 读取配置文件 config jwt time
        $time = time(); //签发时间
        $expireTime = $expireTimeInput !== 0 ? $expireTimeInput : $expireTime; // 多少秒后过期
        $expire = $time + $expireTime; //过期时间
        $info = array(
            "iss" => Config::get('app')['jwt']['iss'],//签发组织
            "aud" => Config::get('app')['jwt']['aud'], //签发作者
            "iat" => $time, // 签发时间
            "nbf" => $time, // 生效时间
            "exp" => $expire, // 过期时间
            "data" => $data, // 用户数据
        );
        $token = \Firebase\JWT\JWT::encode($info, $key);
        return $token;
    }

    //校验jwt权限API
    public static function verifyJwt($token = '')
    {
        $key = self::getKey();
        try {
            $jwtAuth = json_encode(\Firebase\JWT\JWT::decode($token, $key, array('HS256')));
            $authInfo = json_decode($jwtAuth, true);

            if (!empty($authInfo['data'])) {
                // 查询数据库 判断该用户存不存在
                $user = User::where($authInfo['data'])->find();
                if(empty($user)){
                    return R::setResult(ResultCodeEnum::NO_USER);
                }
            }
            return R::setResult(ResultCodeEnum::SUCCESS);
        } catch (ExpiredException $e) {
            // token 过期
            return R::setResult(ResultCodeEnum::LOGIN_OVERDUE);
        } catch (\Exception $e) {
            // token 无效
            return R::setResult(ResultCodeEnum::TOKEN_INVALID);
        }
    }

    /**
     * 获取token的用户信息
     */
    public static function getTokenUser($token = '')
    {
        $key = self::getKey();
        try {
            $jwtAuth = json_encode(\Firebase\JWT\JWT::decode($token, $key, array('HS256')));
            $authInfo = json_decode($jwtAuth, true);

            if (!empty($authInfo['data'])) {
                // 查询数据库 判断该用户存不存在
                $user = User::where($authInfo['data'])->find();
                if(empty($user)){
                    return R::setResult(ResultCodeEnum::NO_USER);
                }
            }
            return $authInfo['data'];
        } catch (ExpiredException $e) {
            // token 过期
            return R::setResult(ResultCodeEnum::LOGIN_OVERDUE);
        } catch (\Exception $e) {
            // token 无效
            return R::setResult(ResultCodeEnum::TOKEN_INVALID);
        }
    }

    /**
     * description: 得到jwt key
     * @date 2021/3/21 15:22
     * @return string  jwt key
     * @author 奇奇
     */
    public static function getKey()
    {
        $secret = Config::get('app')['jwt']['secret']; // 读取配置文件 config jwt secret
        $key = Config::get('app')['jwt']['key']; // 读取配置文件 config jwt key
        return md5($secret, $key);
    }
}
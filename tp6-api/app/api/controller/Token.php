<?php

namespace app\api\controller;

use app\common\exception\AppException;
use app\common\model\User;
use app\common\result\ResultCodeEnum;
use app\common\util\Jwt;
use EasyWeChat\Factory;

class Token
{
    /**
     * description:生成token
     * @return string  token
     * @author star
     */
    public function index()
    {
        $wx  = Factory::miniProgram(config('app.wx'));
        $res = $wx->auth->session(input('account'));
        if (empty($res['openid'])) {
            throw new AppException(ResultCodeEnum::ERROR);
        }

        $user = User::where('openid', $res['openid'])->find();
        if (empty($user)) {
            $user = User::create([
                'openid' => $res['openid'],
            ]);
        }
        $token = Jwt::createJwt(['id' => $user->id]);
        return json(['token' => $token]);
    }

    /**
     * description:校验token
     * @return string|\think\response\Json
     * @author star
     */
    public function verify($token)
    {
        $data             = Jwt::verifyJwt($token)->getData();
        $data['is_valid'] = $data['success'];
        return json($data);
    }

}

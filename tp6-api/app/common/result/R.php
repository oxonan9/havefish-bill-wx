<?php


namespace app\common\result;

use think\helper\Str;

class R
{
    private $success; // 是否成功
    private $code; // 返回码
    private $message; // 返回消息
    private $data; // 返回数据

    /**
     * description: 成功返回
     * @date 2021/3/20 23:46
     * @return R
     * @author 奇奇
     */
    public static function ok($data=null){
        $r = new R();
        $r->setSuccess(ResultCodeEnum::SUCCESS['success']);
        $r->setCode(ResultCodeEnum::SUCCESS['code']);
        $r->setMessage(ResultCodeEnum::SUCCESS['message']);
        $r->setData($data);
        return $r->toJson();
    }

    /**
     * description: 错误返回
     * @date 2021/3/20 23:46
     * @return \think\response\Json
     * @author 奇奇
     */
    public static function error($data=null) {
        $r = new R();
        $r->setSuccess(ResultCodeEnum::ERROR['success']);
        $r->setCode(ResultCodeEnum::ERROR['code']);
        $r->setMessage(ResultCodeEnum::ERROR['message']);
        $r->setData($data);
        return $r->toJson();
    }

    /**
     * description:
     * @date 2021/3/20 23:51
     * @param $resultCodeEnum 是一个key-value  ['success' => true, 'code' => 20000,'message' => "成功"]
     * @return \think\response\Json
     * @author 奇奇
     */
    public static function setResult($resultCodeEnum,$data=null) {
        $r = new R();
        $r->setSuccess($resultCodeEnum['success']);
        $r->setCode($resultCodeEnum['code']);
        $r->setMessage($resultCodeEnum['message']);
        $r->setData($data);
        return $r->toJson();
    }

    /**
     * description:
     * @date 2021/3/20 23:58
     * @param $success boolean 是否成功
     * @return $this
     * @author 奇奇
     */
    public function success($success){
        $this->setSuccess($success);
        return $this;
    }

    /**
     * description:
     * @date 2021/3/20 23:59
     * @param $code int 返回状态码
     * @return $this
     * @author 奇奇
     */
    public function code($code) {
        $this->setCode($code);
        return $this;
    }

    /**
     * description:
     * @date 2021/3/21 0:02
     * @param $message string 消息
     * @return $this
     * @author 奇奇
     */
    public function message($message) {
        $this->setMessage($message);
        return $this;
    }

    /**
     * description:
     * @date 2021/3/21 0:10
     * @param $data object 可以重复添加数据
     * @return $this
     * @author 奇奇
     */
    public function data($key,$value) {
        $this->data[] = [$key => $value];
        return $this;
    }

    /**
     * description: 将结果转成json
     * @date 2021/3/21 0:45
     * @return \think\response\Json
     * @author 奇奇
     */
    public function toJson(){
        $res = [
            'success' => $this->getSuccess(),
            'code' => $this->getCode(),
            'message' => $this->getMessage(),
            'data' => $this->getData()
        ];
        return json($res);
    }

    /**
     * R constructor.
     * @param $success
     * @param $code
     * @param $message
     * @param $data
     */
    public function __construct($success=null, $code=null, $message=null, $data=null)
    {
        $this->success = $success;
        $this->code = $code;
        $this->message = $message;
        $this->data = $data;
    }

    /**
     * @return mixed
     */
    public function getSuccess()
    {
        return $this->success;
    }

    /**
     * @param mixed $success
     */
    public function setSuccess($success): void
    {
        $this->success = $success;
    }

    /**
     * @return mixed
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @param mixed $code
     */
    public function setCode($code): void
    {
        $this->code = $code;
    }

    /**
     * @return mixed
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @param mixed $message
     */
    public function setMessage($message): void
    {
        $this->message = $message;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param mixed $data
     */
    public function setData($data): void
    {
        $this->data = $data;
    }

}
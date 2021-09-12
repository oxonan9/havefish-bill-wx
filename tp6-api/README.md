# PHP后端接口

## 更新记录
- 2021-9-12 后端API接口

## 安装
> 数据库文件在sql文件夹下，自行导入

> 复制`.example.env`为`.env`然后根据数据库和小程序进行相关配置

使用composer安装

~~~
composer install
~~~

启动服务

~~~
cd tp6-api
php think run
~~~

然后就可以在浏览器中访问

~~~
http://localhost:8000/api
~~~
显示如下
```json
{"success":false,"code":40000,"message":"url无效","data":null}
```
## 小程序对接
在`web\config.js`修改地址

~~~
http://localhost:8000/api
~~~
## 框架官方在线手册
其他相关资料查询参考如下：
+ [完全开发手册](https://www.kancloud.cn/manual/thinkphp5_1/content)

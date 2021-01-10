# YuntuAccount-Api
云兔账本后端源码


# 折线图逻辑
返回两个Date数组对应折线图的X轴 

30个元素，每个元素对应当天的支出，如果当天没有支出用0替代

22 - 500元

23 - 300元

``` 2020-10

查询出2020-10月下的日期的数据

select  ****   from record where date = "2020-10"


分组，得出每一天的支出

key = 2020-10-23
value ===== for循环统计出支出


key进行截取，作为数组的指标


开始循环
String[] data =new String[30];

data[key] = 支出

return data;
<?php

namespace app\api\controller;

use app\common\exception\AppException;
use app\common\model\Record;
use app\common\model\Budget as BudgetModel;
use app\common\result\R;
use app\common\result\ResultCodeEnum;

class Bill extends Base
{
    /**
     * 记账
     */
    public function save()
    {
        try {
            $data            = input();
            $data['user_id'] = $this->userId;
            Record::create($data);
            throw new AppException(ResultCodeEnum::SUCCESS);
        } catch (\Exception $e) {
            throw new AppException(ResultCodeEnum::ERROR);
        }
    }

    /**
     * 获取当月收入与支出
     * @author star
     */
    public function all()
    {
        $count      = input('count');
        $start      = input('start');
        $userId     = $this->userId;
        $recordTime = input('recordTime');
        $records    = Record::whereMonth('record_time', $recordTime)->where('user_id', $userId)->page($start, $count)->order(['id' => 'desc', 'record_time' => 'desc'])->select();
        if ($records->isEmpty()) {
            return R::setResult(ResultCodeEnum::NO_DATA);
        }

        $dates   = array_unique(array_column($records->toArray(), 'record_time'));
        $details = [];
        foreach ($dates as $date) {
            $income  = 0; //当天收入
            $consume = 0; //当天支出
            $items   = []; //当天账单
            foreach ($records as $record) {
                if ($record->record_time == $date) {
                    if ($record->type == 1) {
                        $income += $record->amount;
                    } else {
                        $consume += $record->amount;
                    }
                    //分类里的图标和名字
                    array_push($items, array_merge($record->toArray(), [
                        'name' => $record->category->name,
                        'icon' => $record->category->icon,
                    ]));
                }
            }

            $date_items = [
                'date'    => $date,
                'income'  => $income,
                'consume' => $consume,
                'items'   => $items,
            ];
            array_push($details, $date_items);

        }
        $res = [
            'total'      => $records->count(), //总条数
            'count'      => $count, //每页大小
            'page'       => $start,
            'totalPages' => (int) ceil($records->count() / $count), //总页数
            'items'      => $details,
        ];
        return json($res);
    }

    /**
     * 删除
     */
    public function remove()
    {
        try {
            Record::delete(input('id'));
            throw new AppException(ResultCodeEnum::SUCCESS);
        } catch (\Exception $e) {
            throw new AppException(ResultCodeEnum::ERROR);
        }
    }

    /**
     * 查询每月总支出和总收入
     */
    public function total_amount($recordTime)
    {
        $userId  = $this->userId;
        $income  = Record::whereMonth('record_time', $recordTime)->where(['user_id' => $userId, 'type' => 1])->sum('amount');
        $consume = Record::whereMonth('record_time', $recordTime)->where(['user_id' => $userId, 'type' => 0])->sum('amount');
        $budget  = BudgetModel::whereMonth('date', $recordTime)->where('user_id', $userId)->sum('amount');
        //计算平衡
        $balance = $income - $consume;
        $res     = [
            'income'  => $income, //总收入
            'consume' => $consume, //总支出
            'budget'  => (!empty($budget)) ? $budget - $consume : 0, //剩余预算
            'balance' => $balance, //结余
            'average' => sprintf("%.2f", round($consume / date("t", strtotime($recordTime)), 2)), //平均
        ];
        return json($res);

    }

    /**
     * 根据时间查询
     * 统计年度账单.
     */
    public function assay($date, $dateType, $type)
    {
        $userId  = $this->userId;
        $date    = input('date');
        $type    = input('type');
        $amount  = Record::whereMonth('record_time', $date)->where(['user_id' => $userId, 'type' => $type])->sum('amount');
        $records = Record::with('category')->field('category_id,sum(amount) as total')->whereMonth('record_time', $date)->where('user_id', $userId)->group('category_id')->select();
        $items   = [];
        foreach ($records as $record) {
            $item = [
                'catetgory_id' => $record->category_id,
                'name'         => $record->category->name,
                'icon'         => $record->category->icon,
                'amount'       => $record->total,
                'percent'      => (!empty($amount)) ? intval($record->total / $amount * 100) : '0',
            ];
            array_push($items, $item);
        }
        return json($items);
    }

    /**
     *
     */
    public function line()
    {
        $userId     = $this->userId;
        $recordTime = input('date');
        $records    = Record::whereMonth('record_time', $recordTime)->where('user_id', $userId)->order(['id' => 'desc', 'record_time' => 'desc'])->select();
        if ($records->isEmpty()) {
            return R::setResult(ResultCodeEnum::NO_DATA);
        }

        $dates    = array_unique(array_column($records->toArray(), 'record_time'));
        $incomes  = [];
        $consumes = [];
        foreach ($dates as $date) {
            $income  = 0; //当天收入
            $consume = 0; //当天支出
            foreach ($records as $record) {
                if ($record->record_time == $date) {
                    if ($record->type == 1) {
                        $income += $record->amount;
                    } else {
                        $consume += $record->amount;
                    }
                }
            }
            $index = date('d', strtotime($date)) - 1;
            //todo 显示失败
            $incomes[$index]  = sprintf("%.2f", round($income, 2));
            $consumes[$index] = sprintf("%.2f", round($consume, 2));
        }
        $res = [
            'incomes'     => $incomes,
            'consumes'    => $consumes,
            'max_consume' => max(array_merge(array_values($incomes), array_values($consumes))),
        ];
        return json($res);
    }

    /**
     * 导出
     */
    public function export()
    {
        $userId  = $this->userId;
        $records = Record::where('user_id', $userId)->order(['id' => 'desc', 'record_time' => 'desc'])->select();
        if ($records->isEmpty()) {
            return R::setResult(ResultCodeEnum::NO_DATA);
        }
        $res = [];
        foreach ($records as $record) {
            $detail['name']        = $record->category->name;
            $detail['amount']      = $record->amount;
            $detail['remark']      = $record->remark;
            $detail['type']        = ($record->type > 0) ? '收入' : '支出';
            $detail['record_time'] = $record->record_time;
            array_push($res, $detail);
        }
        $url = excelExport('bill', ['分类', '金额', '备注', '类型', '时间'], $res);
        return json(['excel_url' => $url]);
    }
}

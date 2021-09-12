<?php

namespace app\api\controller;

use app\common\exception\AppException;
use app\common\model\Budget as BudgetModel;
use app\common\model\Record;
use app\common\result\ResultCodeEnum;

class Budget extends Base
{
    /**
     * 保存预算
     */
    public function save()
    {
        try {
            $amount = input('amount');
            $date   = substr(input('date'), 0, 10);
            $userId = $this->userId;
            $budget = BudgetModel::whereMonth('date', $date)->where('user_id', $userId)->find();

            if (empty($budget)) {
                BudgetModel::create([
                    'date'    => $date,
                    'user_id' => $userId,
                    'amount'  => $amount,
                ]);
            } else {
                $budget->amount = $amount;
                $budget->save();
            }
            return json(ResultCodeEnum::SUCCESS);
        } catch (\Exception $e) {
            throw new AppException(ResultCodeEnum::ERROR);
        }
    }

    public function get()
    {
        $userId = $this->userId;
        $date   = input('date');
        //总支出
        $consume = Record::whereMonth('record_time', $date)->where(['user_id' => $userId, 'type' => 0])->sum('amount');
        $budget  = BudgetModel::whereMonth('date', $date)->where('user_id', $userId)->sum('amount');

        $percent = (!empty($budget)) ? intval($consume / $budget * 100) : '0';
        if ($consume > $budget) {
            $percent = 100;
        }
        $res = [
            'current' => $consume,
            'budget'  => $budget,
            'percent' => $percent,
        ];
        return json($res);
    }
}

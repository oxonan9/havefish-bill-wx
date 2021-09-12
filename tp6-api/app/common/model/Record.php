<?php
declare (strict_types = 1);

namespace app\common\model;

use think\Model;

/**
 * @mixin \think\Model
 */
class Record extends Model
{
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

<?php
// 应用公共文件
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

/**
 * excel表格导出
 * @param string $fileName 文件名称
 * @param array $headArr 表头名称
 * @param array $data 要导出的数据
 */

function excelExport($fileName = '', $headArr = [], $data = [])
{
    //默认128M，这里设置1024G预防大数据导出失败
    ini_set('memory_limit','1024M');
    $fileName .= "_" . md5($fileName.time()) . ".xlsx";
    $spreadsheet = new Spreadsheet();
    $objPHPExcel = $spreadsheet->getActiveSheet();
    $key = ord("A"); // 设置表头
    $key2 = ord("@");
    foreach ($headArr as $v) {
        if ($key > ord("Z")) {
            $key2 += 1;
            $key = ord("A");
            $colum = chr($key2) . chr($key);
        } else {
            if ($key2 >= ord("A")) {
                $colum = chr($key2) . chr($key);
            } else {
                $colum = chr($key);
            }
        }
        $objPHPExcel->setCellValue($colum . '1', $v);
        $key += 1;
    }
    $column = 2;
    foreach ($data as $key => $rows) {
        // 行写入
        $span = ord("A");
        $span2 = ord("@");
        foreach ($rows as $keyName => $value) {
            // 列写入
            if ($span > ord("Z")) {
                $span2 += 1;
                $span = ord("A");
                $j = chr($span2) . chr($span);
            } else {
                if ($span2 >= ord("A")) {
                    $j = chr($span2) . chr($span);
                } else {
                    $j = chr($span);
                }
            }
            $objPHPExcel->setCellValue($j . $column, $value);
            $span++;
        }
        $column++;
    }
    ob_end_clean();
    $writer = new Xlsx($spreadsheet);
    $path = 'bill/'.date('Y-m-d', time());
    !is_dir($path) && mkdir($path, 0755, true);
    $writer->save($path.'/'.$fileName);
    //删除清空：
    $spreadsheet->disconnectWorksheets();
    unset($spreadsheet);
    return request()->host().'/'.$path.'/'.$fileName;

}

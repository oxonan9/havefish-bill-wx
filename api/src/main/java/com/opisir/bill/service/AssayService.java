package com.opisir.bill.service;

import com.opisir.bill.model.Record;
import com.opisir.bill.repository.BillRepository;
import com.opisir.bill.vo.AssayLineVO;
import com.opisir.bill.vo.BillAssayVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Service
public class AssayService {


    @Autowired
    BillRepository billRepository;

    /**
     *
     */
    public List<BillAssayVO> assay(String date, Integer dateType, Integer type, Long userId) {
        // 查询2020-10月份的记录 根据分类分组
        List<BillAssayVO> billAssayVOList = new ArrayList<>();
        List<Record> recordList = billRepository.findAllByRecordTime(date, userId);

        BigDecimal totalAmount = billRepository.findAmountByRecordTimeAndType(date, type, userId);

        LinkedHashMap<Long, List<Record>> groupingMap = recordList.stream().collect(
                Collectors.groupingBy(record -> record.getCategoryId()
                        , LinkedHashMap::new, Collectors.toList()));

        Set<Long> keys = groupingMap.keySet();
        for (Long key : keys) {
            List<Record> records = groupingMap.get(key);
            BillAssayVO billAssayVO = new BillAssayVO();
            BigDecimal amount = new BigDecimal(0);
            for (Record record : records) {
                if (billAssayVO.getCatetgoryId() == null) {
                    billAssayVO.setCatetgoryId(record.getCategoryId());
                    billAssayVO.setName(record.getCategory().getName());
                    billAssayVO.setIcon(record.getCategory().getIcon());
                }
                amount = amount.add(record.getAmount());
            }
            billAssayVO.setAmount(amount);
            //百分比
//            DecimalFormat df = new DecimalFormat("0.00%");
            if (totalAmount != null) {
                BigDecimal multiply = amount.divide(totalAmount, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100")).setScale(2);
                billAssayVO.setPercent(multiply);
            } else {
                billAssayVO.setPercent(new BigDecimal("0.00"));
            }

            billAssayVOList.add(billAssayVO);
        }
        return billAssayVOList;
    }

    public AssayLineVO line(String recordTime, Long userId) {
        double[] incomes = new double[31];
        double[] consumes = new double[31];
        List<Record> recordList = billRepository.findAllByRecordTime(recordTime, userId);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        //将查询的日期分组 key为日期，value为集合
        Map<String, List<Record>> collect = recordList.stream().collect(
                Collectors.groupingBy(record -> formatter.format(record.getRecordTime()), LinkedHashMap::new, Collectors.toList()));
        Set<String> keySet = collect.keySet();
        for (String key : keySet) {
            //每日的收入和支出
            BigDecimal income = new BigDecimal(0);
            BigDecimal consume = new BigDecimal(0);
            List<Record> recordList1 = collect.get(key);
            for (Record record : recordList1) {
                if (record.getType() == 1) {
                    income = income.add(record.getAmount());
                }
                if (record.getType() == 0) {
                    consume = consume.add(record.getAmount());
                }
            }
            int index = Integer.parseInt(key.substring(8));
            incomes[index - 1] = income.doubleValue();
            consumes[index - 1] = consume.doubleValue();
        }

        return AssayLineVO.builder()
                .incomes(incomes)
                .consumes(consumes)
                .maxConsume(getMax(concat(incomes, consumes)))
                .build();
    }


    /**
     * 获取数组最大值
     *
     * @param array
     * @return
     */
    public double getMax(double[] array) {
        double max = 0;
        for (double v : array) {
            if (v > max) {
                max = v;
            }
        }
        return max;
    }

    public static void main(String[] args) {
        int[] ints = {11, 33, 121};
        System.out.println(ints[02]);
    }

    /**
     * 合并两个数组
     *
     * @param a
     * @param b
     * @return
     */
    public double[] concat(double[] a, double[] b) {
        double[] c = new double[a.length + b.length];
        System.arraycopy(a, 0, c, 0, a.length);
        System.arraycopy(b, 0, c, a.length, b.length);
        return c;
    }

}

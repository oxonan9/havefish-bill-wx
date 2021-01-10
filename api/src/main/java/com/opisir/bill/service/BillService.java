package com.opisir.bill.service;

import com.alibaba.excel.EasyExcelFactory;
import com.alibaba.excel.ExcelWriter;
import com.alibaba.excel.metadata.Sheet;
import com.opisir.bill.core.LocalUser;
import com.opisir.bill.core.WriteModel;
import com.opisir.bill.core.enumration.BillType;
import com.opisir.bill.model.Record;
import com.opisir.bill.vo.RecordPureVO;
import com.opisir.bill.vo.RecordVO;
import com.opisir.bill.dto.RecordDTO;
import com.opisir.bill.exception.http.ParameterExcepiton;
import com.opisir.bill.repository.BillRepository;
import com.opisir.bill.vo.Paging;
import com.opisir.bill.vo.BillAmountVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @Auther: dingjn
 * @Desc:
 */

@Service
public class BillService {

    @Autowired
    BillRepository billRepository;

    /**
     * 添加流水/更新流水.
     */
    @Transactional
    public void saveResord(RecordDTO recordDTO, Long userId) {
        Record record = new Record();
        BeanUtils.copyProperties(recordDTO, record);
        if (recordDTO.getId() != null) {
            record.setId(recordDTO.getId());
        }
        record.setUserId(userId);
        billRepository.save(record);
    }

    /**
     * 查询流水.
     */
    public Paging selectRecord(Integer pageNum, Integer count, String recordTime) {
        Long userId = LocalUser.getUserId();
        //分页查询
        Pageable pageable = PageRequest.of(pageNum, count, Sort.by("recordTime").descending().and(Sort.by("id").descending()));

        Page<Record> recordPage = billRepository.findAllByRecordTime(pageable, recordTime, userId);

        Paging recordPaging = new Paging<>(recordPage);

        List<RecordVO> recordVOList = new ArrayList<>();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        //将查询的日期分组 key为日期，value为集合
        List<Record> items = recordPaging.getItems();

        Map<String, List<Record>> collect = items.stream().collect(
                Collectors.groupingBy(record -> formatter.format(record.getRecordTime()), LinkedHashMap::new, Collectors.toList()));

        Set<String> objects = collect.keySet();

        for (String string : objects) {
            //构建返回给前端的VO对象
            RecordVO recordVO = new RecordVO();
            //每日的收入和支出
            BigDecimal income = new BigDecimal(0);
            BigDecimal consume = new BigDecimal(0);
            List<Record> recordList = collect.get(string);
            for (Record record : recordList) {
                if (record.getType() == 1) {
                    income = income.add(record.getAmount());
                }
                if (record.getType() == 0) {
                    consume = consume.add(record.getAmount());
                }
            }
            recordVO.setDate(string);
            recordVO.setIncome(income.doubleValue());
            recordVO.setConsume(consume.doubleValue());

            //每日的账单记录
            List<Record> list = collect.get(string);
            List<RecordPureVO> recordPureVOList = new ArrayList<>();
            list.forEach(record -> {
                RecordPureVO recordPureVO = new RecordPureVO();
                BeanUtils.copyProperties(record, recordPureVO);
                recordPureVO.setName(record.getCategory().getName());
                recordPureVO.setIcon(record.getCategory().getIcon());
                recordPureVOList.add(recordPureVO);
            });
            recordVO.setItems(recordPureVOList);
            recordVOList.add(recordVO);
        }
        recordPaging.setItems(recordVOList);
        return recordPaging;
    }

    public void remove(Long id) {
        billRepository.deleteById(id);
    }

    /**
     * 获取每月总收入、总支出.
     */
    public BillAmountVO getBillAmount(String recordTime, Long userId) {
        BigDecimal income = billRepository.findAmountByRecordTimeAndType(recordTime, BillType.INCOME.getValue(), userId);
        BigDecimal consume = billRepository.findAmountByRecordTimeAndType(recordTime, BillType.CONSUME.getValue(), userId);
        income = income == null ? new BigDecimal("0") : income;
        consume = consume == null ? new BigDecimal("0") : consume;

        //todo 预算

        //结余 收入-支出
        BigDecimal balance = income.subtract(consume);

        BillAmountVO billAmountVO = BillAmountVO.builder()
                .income(income)
                .consume(consume)
                .balance(balance)
                .budget(new BigDecimal(0))
                .average(consume.divide(new BigDecimal("30"), BigDecimal.ROUND_HALF_UP))
                .build();
        return billAmountVO;
    }


    public String export(Long userId) {
        List<Record> recordList = billRepository.findAllByUserId(userId);
        String result = null;
        try {
            result = writeExcel(recordList);
        } catch (IOException e) {
            throw new ParameterExcepiton(40001);
        }
        return result;
    }

    private String writeExcel(List<Record> recordList) throws IOException {
        // 文件输出位置
        String prefix = UUID.randomUUID().toString();
        OutputStream out = new FileOutputStream("/file/hvfish" + prefix + ".xlsx");
        ExcelWriter writer = EasyExcelFactory.getWriter(out);
        Sheet sheet1 = new Sheet(1, 0, WriteModel.class);
        sheet1.setSheetName("第一个sheet");
        writer.write(createModelList(recordList), sheet1);
        // 将上下文中的最终 outputStream 写入到指定文件中
        writer.finish();
        // 关闭流
        out.close();
        return "http://www.ygzb.xyz/hvfish" + prefix + ".xlsx";
    }

    private List<WriteModel> createModelList(List<Record> recordList) {
        List<WriteModel> list = new ArrayList<>();
        recordList.forEach(record -> {
            WriteModel writeModel = WriteModel.builder()
                    .name(record.getCategory().getName())
                    .amount(record.getAmount())
                    .remark(record.getRemark())
                    .recordTime(record.getRecordTime()).build();
            list.add(writeModel);
        });
        return list;
    }
}

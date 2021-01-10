package com.opisir.bill.api;

import com.opisir.bill.core.LocalUser;
import com.opisir.bill.dto.IdDTO;
import com.opisir.bill.service.AssayService;
import com.opisir.bill.service.BillService;
import com.opisir.bill.bo.PageCounter;
import com.opisir.bill.core.interceptors.ScopeLevel;
import com.opisir.bill.dto.RecordDTO;
import com.opisir.bill.util.CommonUtil;
import com.opisir.bill.vo.AssayLineVO;
import com.opisir.bill.vo.BillAssayVO;
import com.opisir.bill.vo.Paging;
import com.opisir.bill.vo.BillAmountVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Auther: dingjn
 * @Desc: 流水Controller
 */
@Validated
@RestController
@RequestMapping("bill")
public class BillController {

    @Autowired
    BillService billService;

    @Autowired
    AssayService assayService;

    /**
     * 添加流水.
     */
    @ScopeLevel
    @PostMapping("/save")
    public void saveRecord(@Valid @RequestBody RecordDTO recordDTO) {
        Long userId = LocalUser.getUserId();
        billService.saveResord(recordDTO, userId);
    }

    /**
     * @Query("select r from Record r where function('date_format', r.recordTime, '%Y-%m') = :recordTime")
     * <p>
     * 查询流水.
     */
    @ScopeLevel
    @GetMapping("/all")
    public Paging recordList(@RequestParam(defaultValue = "0") Integer start,
                             @RequestParam(defaultValue = "10") Integer count,
                             String recordTime) {
        PageCounter pageCounter = CommonUtil.convertToPageNumParameter(start, count);
        return billService.selectRecord(pageCounter.getPageNum(), pageCounter.getCount(), recordTime);
    }

    @ScopeLevel
    @PostMapping("/remove")
    public void remove(@Valid @RequestBody IdDTO idDTO) {
        billService.remove(idDTO.getId());
    }

    /**
     * 查询总支出和总收入
     */
    @ScopeLevel
    @GetMapping("/total_amount")
    public BillAmountVO all(@NotBlank String recordTime) {
        Long userId = LocalUser.getUserId();
        return billService.getBillAmount(recordTime, userId);
    }

    /**
     * 根据时间查询
     * 统计年度账单.
     */
    @ScopeLevel
    @GetMapping("/assay")
    public List<BillAssayVO> assay(String date, Integer dateType, Integer type) {
        Long userId = LocalUser.getUserId();
        return assayService.assay(date, dateType, type, userId);
    }


    @ScopeLevel
    @GetMapping("/line")
    public AssayLineVO line(String date) {
        Long userId = LocalUser.getUserId();
        return assayService.line(date, userId);
    }


    @ScopeLevel
    @PostMapping("/export")
    public Map<String, String> export() {
        Map<String, String> map = new HashMap<>();
        Long userId = LocalUser.getUserId();
        map.put("excel_url", billService.export(userId));
        return map;
    }
}

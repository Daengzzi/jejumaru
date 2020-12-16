package com.spring.jejumaru.controller.api;

import com.spring.jejumaru.beans.Notice;
import com.spring.jejumaru.beans.ResponseDto;
import com.spring.jejumaru.controller.service.NoticeService;
import com.spring.jejumaru.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
public class AdminNoticeApiController {

    @Autowired
    private NoticeService noticeService;

    @Autowired
    private NoticeRepository noticeRepository;

    @PostMapping("/api/admin_notice")
    public ResponseDto<Integer> save(@RequestBody Notice notice) {
        noticeService.noticeWrite(notice);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    @DeleteMapping("/api/admin_notice/{nno}")
    public ResponseDto<Integer> deleteById(@PathVariable int nno) {
        noticeService.noticeDelete(nno);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    @PutMapping("/api/admin_notice/{nno}")
    public ResponseDto<Integer> update(@PathVariable int nno, @RequestBody Notice notice) {
        noticeService.noticeUpdate(nno, notice);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

//    @PutMapping("/admin_notice/{nno}")
//    public ResponseDto<Integer> view(@PathVariable int nno) {
//        noticeService.글상세보기(nno);
//        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
//    }

}

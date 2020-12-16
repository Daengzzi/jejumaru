package com.spring.jejumaru.controller.api;

import com.spring.jejumaru.beans.Notice;
import com.spring.jejumaru.beans.ResponseDto;
import com.spring.jejumaru.controller.service.NoticeService;
import com.spring.jejumaru.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
public class NoticeApiController {

    @Autowired
    private NoticeService noticeService;

    @Autowired
    private NoticeRepository noticeRepository;

    @PostMapping("/api/notice")
    public ResponseDto<Integer> save(@RequestBody Notice notice) {
        noticeService.noticeWrite(notice);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    @DeleteMapping("/api/notice/{nno}")
    public ResponseDto<Integer> deleteById(@PathVariable int nno) {
        noticeService.noticeDelete(nno);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    @PutMapping("/api/notice/{nno}")
    public ResponseDto<Integer> update(@PathVariable int nno, @RequestBody Notice notice) {
        noticeService.noticeUpdate(nno, notice);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

//    @PutMapping("/notice/{nno}")
//    public ResponseDto<Integer> view(@PathVariable int nno) {
//        noticeService.글상세보기(nno);
//        //noticeRepository.view(nno);
//
//        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
//    }

}

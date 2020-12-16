package com.spring.jejumaru.controller;

import com.spring.jejumaru.beans.Notice;
import com.spring.jejumaru.controller.service.NoticeService;
import com.spring.jejumaru.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/api")
public class NoticeController {

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/notice/notice_list")
    public Page<Notice> index(@PageableDefault(size=15, sort="nno", direction= Sort.Direction.DESC) Pageable pageable) {
        Page<Notice> notices = noticeRepository.findAll(pageable);
        return notices;
    }

    // View
    @Transactional
    @GetMapping("/notice/{nno}")
    public Notice findById(@PathVariable int nno) {
        Notice notice = noticeRepository.findByNno(nno);
        int viewCnt = notice.getNviewcnt() + 1;
        notice.setNviewcnt(viewCnt);
        return notice;
    }
//
//    // Update
//    @GetMapping("/notice/{nno}/notice_update")
//    public String updateForm(@PathVariable int nno, Model model ) {
//        model.addAttribute("notice", noticeService.글상세보기(nno));
//        return "notice/notice_update" ;
//    }
//
//    // Insert
//    @GetMapping("/notice/notice_write")
//    public String saveForm() {
//        return "notice/notice_write";
//    }
}

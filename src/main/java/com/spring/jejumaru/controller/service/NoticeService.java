package com.spring.jejumaru.controller.service;

import com.spring.jejumaru.beans.Notice;
import com.spring.jejumaru.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;


    @Transactional
    public void noticeWrite(Notice notice) {  //title content
        notice.setNviewcnt(0);
        noticeRepository.save(notice);
    }

//    @Transactional(readOnly = true)
//    public Page<Notice> 글목록(Pageable pageable) {
//        return noticeRepository.findAll(pageable);
//    }
//
//    @Transactional(readOnly = true)
//    public Notice 글상세보기(int nno) {
//
//        return noticeRepository.findById(nno)
//                .orElseThrow(() -> {
//                    return new IllegalArgumentException("글 상세보기 실패 : 아이디를 찾을 수 없습니다.");
//                });
//    }

    @Transactional
    public void noticeDelete(int nno) {
        noticeRepository.deleteById(nno);
    }

    @Transactional
    public void noticeUpdate(int nno, Notice requestBoard) {
        Notice notice = noticeRepository.findById(nno)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("해당 글을 찾을 수 없습니다.");
                });     //영속화 완료
        notice.setNtitle(requestBoard.getNtitle());
        notice.setNcontent(requestBoard.getNcontent());
    }
}

package com.spring.jejumaru.controller;

import com.spring.jejumaru.beans.QnA;
import com.spring.jejumaru.controller.service.QnAService;
import com.spring.jejumaru.repository.QnARepository;
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
public class QnAController {

    @Autowired
    private QnAService qnAService;

    @Autowired
    private QnARepository qnARepository;

    // Select (내가쓴글)
    @GetMapping("/qanda/qanda_list/{qmno}")
    public Page<QnA> myindex(@PathVariable int qmno, @PageableDefault(size=15, sort="qno", direction= Sort.Direction.DESC) Pageable pageable) {
        Page<QnA> page = qnARepository.findAllByQmno(qmno, pageable);
        return page;     // viwResolver 작동!!
    }





    /////////////////////////////////////////////select
    // 컨트롤러에서 세션을 어떻게 찾음?
    @GetMapping("/qanda/qanda_list")
    public Page<QnA> index(@PageableDefault(size=15, sort="qno", direction= Sort.Direction.DESC) Pageable pageable) {
        Page<QnA> qnAS = qnARepository.findAll(pageable);
        return qnAS;     // viwResolver 작동!!
    }


    /////////////////////////////////////////////view
    @Transactional
    @GetMapping("/qanda/{qno}")
    public QnA findById(@PathVariable int qno) {
        QnA qna = qnARepository.findByQno(qno);
        int viewCnt = qna.getQviewcnt() + 1;
        qna.setQviewcnt(viewCnt);
        return qna;
    }

}

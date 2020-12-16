package com.spring.jejumaru.controller.api;

import com.spring.jejumaru.beans.QnA;
import com.spring.jejumaru.beans.ResponseDto;
import com.spring.jejumaru.controller.service.QnAService;
import com.spring.jejumaru.repository.QnARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminQnAApiController {

    @Autowired
    private QnAService qnAService;

    @Autowired
    private QnARepository qnARepository;

    @PutMapping("/api/admin_qanda/answer_{qno}")
    public ResponseDto<Integer> update(@RequestBody QnA qanda, @PathVariable int qno) {
        System.out.println("답변apicontroller---------------------------------"+qanda.getQanswer());
        qnAService.답변작성(qanda, qno);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    @PutMapping("/admin_qanda/{qno}")
    public ResponseDto<Integer> view(@PathVariable int qno) {
        qnAService.글상세보기(qno);
//        noticeRepository.view(nno);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }


    @PutMapping("/api/admin_qanda/answer_del_{qno}")
    public ResponseDto<Integer> delanswer(@PathVariable int qno, @RequestBody QnA qanda) {
        System.out.println("답변삭제apicontroller");
        qnAService.답변삭제(qno, qanda);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    @PutMapping("/api/admin_qanda/answer_up_{qno}")
    public ResponseDto<Integer> upanswer(@PathVariable int qno, @RequestBody QnA qanda) {
        System.out.println("답변수정apicontroller");
        qnAService.답변수정(qno, qanda);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }
}

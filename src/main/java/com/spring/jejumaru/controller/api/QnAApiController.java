package com.spring.jejumaru.controller.api;

import com.spring.jejumaru.beans.Member;
import com.spring.jejumaru.beans.QnA;
import com.spring.jejumaru.beans.ResponseDto;
import com.spring.jejumaru.controller.service.QnAService;
import com.spring.jejumaru.repository.QnARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class QnAApiController {

    @Autowired
    private QnAService qnaService;

    @Autowired
    private QnARepository qnaRepository;

    private Member member;

    @PostMapping("/api/qanda")
    public ResponseDto<Integer> save(@RequestBody QnA qanda) {
        System.out.println("qanda 글쓰기");
        qnaService.글쓰기(qanda);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }



    @DeleteMapping("/api/qanda/{qno}")
    public ResponseDto<Integer> deleteById(@PathVariable int qno) {
        System.out.println("삭제apicontroller");
        qnaService.글삭제하기(qno);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }





    @PutMapping("/api/qanda/{qno}")
    public ResponseDto<Integer> update(@PathVariable int qno, @RequestBody QnA qanda) {
        System.out.println("수정apicontroller");
        qnaService.글수정하기(qno, qanda);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }


    @PutMapping("/api/qanda/answer_del_{qno}")
    public ResponseDto<Integer> delanswer(@PathVariable int qno, @RequestBody QnA qanda) {
        System.out.println("답변삭제apicontroller");
        qnaService.답변삭제(qno, qanda);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    @PutMapping("/api/qanda/answer_up_{qno}")
    public ResponseDto<Integer> upanswer(@PathVariable int qno, @RequestBody QnA qanda) {
        System.out.println("답변수정apicontroller");
        qnaService.답변수정(qno, qanda);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    @PutMapping("/api/qanda/answer_{qno}")
    public ResponseDto<Integer> answer(@PathVariable int qno, @RequestBody QnA qanda) {
        System.out.println("수정apicontroller");
        qnaService.답변작성(qanda, qno);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    @PutMapping("/qanda/{qno}")
    public ResponseDto<Integer> view(@PathVariable int qno, @RequestBody QnA qanda) {
        qnaService.글상세보기(qno);
//        noticeRepository.view(nno);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }





    ////////////////내가 쓴 QANDAN
//    @GetMapping("/mylist/myqanda_list/{user.mid}")
    @GetMapping("/mylist/myqanda_list/test01")
    public ResponseDto<Integer> myqandaview(@PathVariable String mid, @RequestBody QnA qanda) {
        mid = "test01";

        qnaService.내글목록(mid);
//        noticeRepository.view(nno);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

}

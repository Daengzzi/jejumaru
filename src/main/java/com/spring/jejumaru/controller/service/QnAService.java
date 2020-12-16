package com.spring.jejumaru.controller.service;

import com.spring.jejumaru.beans.QnA;
import com.spring.jejumaru.repository.QnARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QnAService {

    @Autowired
    private QnARepository qnaRepository;



    public void 글쓰기(QnA qna) {  //title content
        qna.setQviewcnt(0);
//        board.setUser(user);
        qnaRepository.save(qna);
    }

    /////////////////////////////////////////////////////////////////////////////////
    @Transactional(readOnly = true)
    public Page<QnA> 글목록(Pageable pageable) {
        return qnaRepository.findAll(pageable);
    }

    /////////////내가 쓴 Qna
    @Transactional(readOnly = true)
    public QnA 내글목록(String mid) {
        mid="test01";
        return qnaRepository.findByMid(mid).orElseThrow(() -> {
            return new IllegalArgumentException("글 불러오기 실패 : 아이디를 찾을 수 없습니다.");
        }); //1대신 nno
    }
/////////////////////////////////////////////////////////////////////////////////


    @Transactional(readOnly = true)
    public QnA 글상세보기(int qno) {
//        Notice_2 notice = null;
//        notice.setNviewcnt(notice.getNviewcnt()+1);

//        qnaRepository.view(nno);

        return qnaRepository.findById(qno)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("글 상세보기 실패 : 아이디를 찾을 수 없습니다.");
                });
    }


    ///////////////////////////////////////////////////////////////////
    @Transactional
    public void 글삭제하기(int nno) {
        System.out.println("글삭제하기 : "+nno);
        qnaRepository.deleteById(nno);
    }
    ///////////////////////////////////////////////////////////////////
//
    @Transactional
    public void 글수정하기(int nno, QnA requestBoard) {

        QnA qna = qnaRepository.findById(nno)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("해당 글을 찾을 수 없습니다.");
                });     //영속화 완료
        qna.setQtitle(requestBoard.getQtitle());
        qna.setQcontent(requestBoard.getQcontent());
//        qna.setQanswer(null);
        // 이때 더티체킹 = > 자동 업데이트가 됨 . db flush
    }

    @Transactional
    public void 답변삭제(int nno, QnA requestBoard) {

        System.out.println("답변삭제Service");

        QnA qna = qnaRepository.findById(nno)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("해당 글을 찾을 수 없습니다.");
                });     //영속화 완료

        qna.setQanswer(null);
        // 해당 함수로 종료시 (Service가 료될 때 ) 트랜잭션종이 종료된다.
        // 이때 더티체킹 = > 자동 업데이트가 됨 . db flush
    }

    @Transactional
    public void 답변수정(int nno, QnA requestBoard) {

        System.out.println("답변수정Service");

        QnA qna = qnaRepository.findById(nno)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("해당 글을 찾을 수 없습니다.");
                });     //영속화 완료

        qna.setQanswer(requestBoard.getQanswer());
        // 해당 함수로 종료시 (Service가 료될 때 ) 트랜잭션종이 종료된다.
        // 이때 더티체킹 = > 자동 업데이트가 됨 . db flush
    }


    @Transactional
    public void 답변작성(QnA requestBoard, int qno) {

        QnA qna = qnaRepository.findById(qno)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("해당 글을 찾을 수 없습니다.");
                });     //영속화 완료

        qna.setQanswer(requestBoard.getQanswer());

    }
}

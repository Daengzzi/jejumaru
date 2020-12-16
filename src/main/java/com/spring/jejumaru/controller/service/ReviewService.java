//package com.spring.jejumaru.controller.service;
//
//import com.spring.jejumaru.beans.Member;
//import com.spring.jejumaru.beans.Review;
//import com.spring.jejumaru.repository.ReviewRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//public class ReviewService {
//
//    @Autowired
//    private ReviewRepository reviewRepository;
//
//    private Member member;
//
//    @Transactional(readOnly = true)
//    public Page<Review> 글목록(Pageable pageable) {
//        return reviewRepository.findAll(pageable);
//    }
//
//    @Transactional
//    public void 글삭제하기(int rno) {
//        System.out.println("글삭제하기 : "+rno);
//        reviewRepository.deleteById(rno);
//    }
//
//    // 내가 쓴 Q&A
//    @Transactional(readOnly = true)
//    public Review 내글목록(String mid) {
//        mid = member.getMid();
//        return reviewRepository.findByMid(mid).orElseThrow(() -> {
//            return new IllegalArgumentException("글 불러오기 실패 : 아이디를 찾을 수 없습니다.");
//        });
//    }
//
//
//}

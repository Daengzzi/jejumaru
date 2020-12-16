//package com.spring.jejumaru.controller.api;
//
//import com.spring.jejumaru.beans.ResponseDto;
//import com.spring.jejumaru.controller.service.ReviewService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RestController;
//
//
//@RestController
//public class AdminReviewApiController {
//
//    @Autowired
//    private ReviewService reviewService;
//
//    @DeleteMapping("/api/admin_review/{rno}")
//    public ResponseDto<Integer> deleteById(@PathVariable int rno) {
//        reviewService.글삭제하기(rno);
//        System.out.println("리뷰 삭제하기 ApiController");
//        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
//    }
//
//
//
//}
//

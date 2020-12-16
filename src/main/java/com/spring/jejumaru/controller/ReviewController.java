//package com.spring.jejumaru.controller;
//
//import com.spring.jejumaru.beans.Place;
//import com.spring.jejumaru.beans.Review;
//import com.spring.jejumaru.repository.ReviewRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.web.PageableDefault;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.io.UnsupportedEncodingException;
//
//@RestController
//@RequestMapping("/api")
//public class ReviewController {
//    @Autowired
//    private ReviewRepository reviewRepository;
//
//    @GetMapping("/review/{rplace}")
//    public Page<Review> pageReview(@PathVariable int rplace, @PageableDefault(size = 5, sort = "rno", direction = Sort.Direction.ASC) Pageable pageable){
//        Page<Review> reviews = reviewRepository.findAllByRplaceOrderByRnoDesc(rplace, pageable);
//        return reviews;
//    }
//}
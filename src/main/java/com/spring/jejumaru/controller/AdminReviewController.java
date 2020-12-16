//package com.spring.jejumaru.controller;
//
//import com.spring.jejumaru.controller.service.ReviewService;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.web.PageableDefault;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api")
//public class AdminReviewController {
//
//    private ReviewService reviewService;
//
//    @GetMapping("/admin_review/admin_review_list")
//    public String index(Model model, @PageableDefault(size=5, sort="rno", direction= Sort.Direction.DESC) Pageable pageable) {
//        model.addAttribute("reviews", reviewService.글목록(pageable));
//        return "admin_review/admin_review_list";
//    }
//}

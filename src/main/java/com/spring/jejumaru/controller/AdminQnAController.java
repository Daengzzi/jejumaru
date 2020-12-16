package com.spring.jejumaru.controller;

import com.spring.jejumaru.controller.service.QnAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AdminQnAController {

    @Autowired
    private QnAService qnAService;

    //Select (AdminQnA)
    @GetMapping("/admin_qanda/admin_qanda_list")
    public String index(Model model, @PageableDefault(size=15, sort="qno", direction= Sort.Direction.DESC) Pageable pageable) {
        System.out.println("질문과답변controller:: 들어왔나혹쉬?");
        model.addAttribute("qandas", qnAService.글목록(pageable));
        return "admin_qanda/admin_qanda_list";     // viwResolver 작동!!
    }


    /////////////////////////////////////////////view
    @GetMapping("/admin_qanda/{qno}")
    public String findById(@PathVariable int qno, Model model) {
        model.addAttribute("qanda", qnAService.글상세보기(qno));
        return "admin_qanda/admin_qanda_view";
    }



    /////////////////////////////////////////////update
    @GetMapping("/admin_qanda/{qno}/admin_qanda_update")
    public String updateForm(@PathVariable int qno, Model model ) {
        model.addAttribute("qanda", qnAService.글상세보기(qno));

        return "admin_qanda/admin_qanda_update" ;
    }

//    /////////////////////////////////////////////answerupdate

    @GetMapping("/admin_qanda/{qno}/answer_update")
    public String answerupdateForm(@PathVariable int qno, Model model) {
        model.addAttribute("qanda", qnAService.글상세보기(qno));

        return "admin_qanda/qanda_answer_update" ;
    }
}


package com.spring.jejumaru.controller;

import com.spring.jejumaru.beans.Place;
import com.spring.jejumaru.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PlaceController {
    @Autowired
    private PlaceRepository placeRepository;

    @GetMapping("/list")
    public Page<Place> pageList(@PageableDefault(size = 9, sort = "pno", direction = Sort.Direction.ASC) Pageable pageable){
        Page<Place> places = placeRepository.findAll(pageable);
        return places;
    }

    @GetMapping("/list/{plabel}")
    public Page<Place> cateList(@PathVariable String plabel, @PageableDefault(size = 9, sort = "pno", direction = Sort.Direction.ASC) Pageable pageable) throws UnsupportedEncodingException {
        if(plabel.equals("jeju"))
            plabel = "제주시";
        if(plabel.equals("seo"))
            plabel = "서귀포시";
        if(plabel.equals("island"))
            plabel = "섬 속의 섬";
        Page<Place> places = placeRepository.findAllByPlabelOrderByPnoAsc(plabel, pageable);
        return places;
    }

    @GetMapping("/search/{search}")
    public Page<Place> searchPlace(@PathVariable String search, @PageableDefault(size = 9, sort = "pno", direction = Sort.Direction.ASC) Pageable pageable) throws UnsupportedEncodingException {
        String param = "%" + search + "%";
        Page<Place> places = placeRepository.findAllByPintroLikeOrPtitleLikeOrPaddrLikeOrProadLikeOrderByPno(param, param, param, param, pageable);
        return places;
    }

    @GetMapping("/detail/{pno}")
    public Place detailPage(@PathVariable int pno) {
        Place places = placeRepository.findAllByPno(pno);
        return places;
    }

    @GetMapping("/recommand")
    public List<Place> recommand(){
        List<Place> places = placeRepository.findRecommand();
        return places;
    }

}

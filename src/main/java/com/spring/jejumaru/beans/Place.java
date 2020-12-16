package com.spring.jejumaru.beans;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int pno; // 1
    private String pcontentsid; // 2
    private String ptitle; // 3
    private String plabel; // 4
    private String paddr; //5
    private String proad; // 6
    private String pintro; // 7
    private double plat; //8
    private double plong; //9
    private String ptel; // 10
    private String pimg; // 11
    private String pthumb; //12
    private String popentime; // 13
    private String pclosetime; //14

}

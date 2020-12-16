package com.spring.jejumaru.beans;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)

    private int rno;
    private int rmno;
    private String rcontent;
    private Date rdate;
    private int rplace;
    private double rstar;
    private String rimg;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rmno", insertable = false, updatable = false)
    private Member member;
}
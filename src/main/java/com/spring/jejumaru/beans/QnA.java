package com.spring.jejumaru.beans;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class QnA {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int qno;

    private int qmno;

    @Column(nullable = false, length = 100)
    private String qtitle;

    @Lob // 대용량 데이터
    private String qcontent;

    // 조회수
    private int qviewcnt;

    // DB는 오브젝트를 저장할 수 없다. FK, 자바는 오브젝트를 저장할 수 있다.
    @ManyToOne(fetch = FetchType.EAGER)     // Many = Many, One = User
    @JoinColumn(name = "qmno", insertable = false, updatable = false)
    private Member user;

    @CreationTimestamp
    private Timestamp qdate;

    @Lob // 대용량 데이터
    private String qanswer;

}

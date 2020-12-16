package com.spring.jejumaru.beans;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int nno;

    @Column(nullable = false, length = 100)
    private String ntitle;

    @Lob // 대용량 데이터
    // 썸머노트 라이브러리 <html>태그가 섞여서 디자인 됨.
    private String ncontent;

    //    @ColumnDefault("0")
    // 조회수
    private int nviewcnt;

    // DB는 오브젝트를 저장할 수 없다. FK, 자바는 오브젝트를 저장할 수 있다.
//    @ManyToOne(fetch = FetchType.EAGER)     // Many = Many, One = User
//    @JoinColumn(name="nmno")
//    private Member_2 user;

    @CreationTimestamp
    private Timestamp ndate;
}

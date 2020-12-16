package com.spring.jejumaru.beans;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int mno;
    @Column(nullable = false, length = 30, unique = true)
    private String mid;
    @Column(nullable = false, length = 100)
    private String mpw;
    @Column(nullable = false, length = 30)
    private String mname;
    @Column(nullable = false, length = 50)
    private String memail;
    @ColumnDefault("'N'")
    @Column(nullable = true, length = 30)
    private String mnews;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(   name = "userroles",
            joinColumns = @JoinColumn(name = "memberid"),
            inverseJoinColumns = @JoinColumn(name = "roleid"))
    private Set<Roles> roles = new HashSet<>();

    public Member (String mid, String memail, String mpw, String mname){
        this.mid = mid;
        this.mpw = mpw;
        this.mname = mname;
        this.memail = memail;
    }
}
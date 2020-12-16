package com.spring.jejumaru.configuration.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.jejumaru.beans.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class MemberDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private int mno;

    private String mid;

    private String memail;

    @JsonIgnore
    private String mpw;

    private Collection<? extends GrantedAuthority> authorities;

    public MemberDetailsImpl(int mno, String mid, String memail, String mpw,
                           Collection<? extends GrantedAuthority> authorities) {
        this.mno = mno;
        this.mid = mid;
        this.memail = memail;
        this.mpw = mpw;
        this.authorities = authorities;
    }

    public static MemberDetailsImpl build(Member member) {
        List<GrantedAuthority> authorities = member.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRolename().name()))
                .collect(Collectors.toList());

        return new MemberDetailsImpl(
                member.getMno(),
                member.getMid(),
                member.getMemail(),
                member.getMpw(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public int getId() {
        return mno;
    }

    public String getEmail() {
        return memail;
    }

    @Override
    public String getPassword() {
        return mpw;
    }

    @Override
    public String getUsername() {
        return mid;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        MemberDetailsImpl member = (MemberDetailsImpl) o;
        return Objects.equals(mno, member.mno);
    }
}

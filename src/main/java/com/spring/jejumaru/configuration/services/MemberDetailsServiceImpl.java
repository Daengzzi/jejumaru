package com.spring.jejumaru.configuration.services;

import com.spring.jejumaru.beans.Member;
import com.spring.jejumaru.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class MemberDetailsServiceImpl implements UserDetailsService {
    @Autowired
    MemberRepository memberRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByMid(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return MemberDetailsImpl.build(member);
    }
}

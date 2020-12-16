package com.spring.jejumaru.controller;

import com.spring.jejumaru.beans.Member;
import com.spring.jejumaru.beans.RoleType;
import com.spring.jejumaru.beans.Roles;
import com.spring.jejumaru.configuration.jwt.JwtUtils;
import com.spring.jejumaru.configuration.mail.EmailSender;
import com.spring.jejumaru.configuration.services.MemberDetailsImpl;
import com.spring.jejumaru.payload.request.*;
import com.spring.jejumaru.payload.response.JwtResponse;
import com.spring.jejumaru.payload.response.MessageResponse;
import com.spring.jejumaru.repository.MemberRepository;
import com.spring.jejumaru.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    EmailSender emailSender;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    RolesRepository rolesRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));


        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        MemberDetailsImpl memberDetails = (MemberDetailsImpl) authentication.getPrincipal();
        List<String> roles = memberDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                memberDetails.getId(),
                memberDetails.getUsername(),
                memberDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (memberRepository.existsByMid(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (memberRepository.existsByMemail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        Member member = new Member(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()), signUpRequest.getName());

        Set<String> strRoles = signUpRequest.getRole();
        Set<Roles> roles = new HashSet<>();

        if (strRoles == null) {
            Roles userRole = rolesRepository.findByRolename(RoleType.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Roles adminRole = rolesRepository.findByRolename(RoleType.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Roles modRole = rolesRepository.findByRolename(RoleType.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Roles userRole = rolesRepository.findByRolename(RoleType.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        member.setRoles(roles);
        memberRepository.save(member);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @Transactional
    @PostMapping("/update")
    public ResponseEntity<?> updateMember(@Valid @RequestBody UpdateRequest updateRequest){
        Member member = memberRepository.findByMid(updateRequest.getUsername()).orElseThrow(()->{
            return new IllegalArgumentException("업데이트를 실패하였습니다.");
        });
        member.setMpw(encoder.encode(updateRequest.getPassword()));
        return ResponseEntity.ok(new MessageResponse("Update Complete!"));
    }

    @PostMapping("/confirm")
    public int confirmMail(@RequestBody MailRequest mailRequest){
        int number = ((int)(Math.random() * 900000) + 100000);
        emailSender.sendEmail(mailRequest.getEmail(), "인증번호입니다.","인증번호 : "+ number);
        return number;
    }

    @Transactional
    @PostMapping("/sub")
    public ResponseEntity<?> subMember(@Valid @RequestBody SubRequest subRequest){
        Member member = memberRepository.findByMid(subRequest.getUsername()).orElseThrow(()->{
            return new IllegalArgumentException("구독에 실패하였습니다.");
        });
        member.setMnews("Y");
        emailSender.sendEmail(member.getMemail(),"뉴스레터","<a href='http://localhost:3000/jejumaru'><img src='https://storage.googleapis.com/null_jeju/KakaoTalk_20201204_171851196.png'/><a>");

        return ResponseEntity.ok(new MessageResponse("NewsLetter Complete!"));
    }

    @GetMapping("/memberlist")
    public Page<Member> memberList(@PageableDefault(size = 10, sort = "mno", direction = Sort.Direction.ASC) Pageable pageable){
        Page<Member> members =  memberRepository.findAll(pageable);
        return members;
    }


    @PostMapping("/findId")
    public ResponseEntity<?> findId(@Valid @RequestBody FindRequest findRequest){
        Member members = memberRepository.findByMemail(findRequest.getEmail()).orElseThrow(()->{
            return new IllegalArgumentException("찾기에 실패하였습니다.");
        });
        emailSender.sendEmail(findRequest.getEmail(),"제주마루 회원님의 정보 입니다.","회원님의 아이디는 " + members.getMid() + " 입니다.");
        return ResponseEntity.ok(new MessageResponse("Find Complete!"));
    }

    @Transactional
    @PostMapping("/findPw")
    public ResponseEntity<?> findPw(@Valid @RequestBody FindRequest findRequest){
        int random = ((int)(Math.random()*900000)+100000);
        Member members = memberRepository.findByMemail(findRequest.getEmail()).orElseThrow(()->{
            return new IllegalArgumentException("찾기에 실패하였습니다.");
        });
        members.setMpw(encoder.encode(""+random));
        emailSender.sendEmail(findRequest.getEmail(),"제주마루 회원님의 정보 입니다.", "회원님의 비밀번호가 "+ random + " 로 변경되었습니다. 로그인하여 변경해 주세요.");
        return ResponseEntity.ok(new MessageResponse("Find Complete!"));
    }

    @Transactional
    @PostMapping("/delete")
    public ResponseEntity<?> deleteMember(@Valid @RequestBody DeleteRequest deleteRequest){
        memberRepository.deleteByMid(deleteRequest.getUsername());
        return ResponseEntity.ok(new MessageResponse("delete Complete!"));
    }

    @Transactional
    @PostMapping("/delete/members")
    public ResponseEntity<?> deleteMembers(@RequestBody SignOutRequest signOutRequest){
        memberRepository.deleteMembersByMno(signOutRequest.getMno());
        return ResponseEntity.ok(new MessageResponse("Delete Complete!"));
    }
}

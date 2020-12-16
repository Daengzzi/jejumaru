package com.spring.jejumaru.controller;

import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.spring.jejumaru.beans.Member;
import com.spring.jejumaru.beans.RoleType;
import com.spring.jejumaru.beans.Roles;
import com.spring.jejumaru.configuration.oauth.GoogleUser;
import com.spring.jejumaru.configuration.oauth.OAuthUserInfo;
import com.spring.jejumaru.repository.MemberRepository;
import com.spring.jejumaru.repository.RolesRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "Content-Type")
@RestController
public class JwtCreateController {

	private String jwtSecret = "maru";
	private int jwtExpirationMs = 60000;

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	RolesRepository rolesRepository;

	@Autowired
	PasswordEncoder encoder;
	
	@PostMapping("/oauth/jwt/google")
	public String jwtCreate(@RequestBody Map<String, Object> data) {


		OAuthUserInfo googleUser =
				new GoogleUser((Map<String, Object>)data.get("profileObj"));

		Member memberEntity =
				memberRepository.findByMid(googleUser.getProvider()+"_"+googleUser.getProviderId()).orElseThrow(()->{
					return new IllegalArgumentException("이미 존재하는 아이디입니다.");
				});
		
		if(memberEntity == null) {
			Member memberRequest = Member.builder()
					.mid(googleUser.getProvider()+"_"+googleUser.getProviderId())
					.mpw(encoder.encode("마루"))
					.mname(googleUser.getName())
					.memail(googleUser.getEmail())
					.build();

			Set<Roles> roles = new HashSet<>();

			Roles userRole = rolesRepository.findByRolename(RoleType.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);

			memberRequest.setRoles(roles);
			memberEntity = memberRepository.save(memberRequest);
		}
		
		String jwtToken = Jwts.builder()
				.setSubject((memberEntity.getMid()))
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();
		
		return jwtToken;
	}
	
}

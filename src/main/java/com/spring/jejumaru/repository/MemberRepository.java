package com.spring.jejumaru.repository;

import com.spring.jejumaru.beans.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByMid(String mid);

    Optional<Member> deleteByMid(String mid);

    Boolean existsByMid(String mid);

    Boolean existsByMemail(String memail);

    Optional<Member> findByMemail(String memail);

    @Modifying
    @Query("DELETE FROM Member m WHERE m.mno IN (:mno)")
    void deleteMembersByMno(@Param("mno")List<Integer> mno);
}

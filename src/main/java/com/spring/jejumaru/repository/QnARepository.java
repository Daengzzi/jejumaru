package com.spring.jejumaru.repository;

import com.spring.jejumaru.beans.QnA;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface QnARepository extends JpaRepository<QnA, Integer> {

    QnA findByQno(int qno);

    Optional<QnA> findById(int qno);

    @Query(value="SELECT * FROM QANDA, MEMBER WHERE (QANDA.QMNO = MEMBER.MNO) AND MID= :mid", nativeQuery = true)
    Optional<QnA> findByMid(@Param("mid") String mid);

    Page<QnA> findAllByQmno(int qmno, Pageable pageable);
}

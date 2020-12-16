package com.spring.jejumaru.repository;

import com.spring.jejumaru.beans.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    Notice findByNno(int nno);
}

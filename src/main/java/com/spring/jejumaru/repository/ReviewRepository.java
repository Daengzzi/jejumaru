package com.spring.jejumaru.repository;

import com.spring.jejumaru.beans.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query(value = "SELECT * FROM REVIEW r JOIN member m ON r.rmno = m.mno where r.rplace = :rplace ORDER BY RNO DESC", nativeQuery = true)
    Page<Review> findAllByRplaceOrderByRnoDesc(@Param("rplace") int rplace, Pageable pageable);
}

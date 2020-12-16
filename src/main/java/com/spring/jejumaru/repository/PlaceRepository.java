package com.spring.jejumaru.repository;

import com.spring.jejumaru.beans.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Integer> {
    Page<Place> findAllByPlabelOrderByPnoAsc(String plabel, Pageable pageable);

    Page<Place> findAllByPintroLikeOrPtitleLikeOrPaddrLikeOrProadLikeOrderByPno(String param1, String param2, String param3, String param4, Pageable pageable);

    Place findAllByPno(int pno);

    @Query(value = "SELECT * FROM (SELECT * FROM place ORDER BY dbms_random.value) WHERE rownum >= 1 and rownum <= 9", nativeQuery = true)
    List<Place> findRecommand();
}

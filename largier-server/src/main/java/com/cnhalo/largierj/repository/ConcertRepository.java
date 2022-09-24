package com.cnhalo.largierj.repository;

import com.cnhalo.largierj.model.Concert;
import com.cnhalo.largierj.model.User2;
import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Henry Huang on 2022/9/19.
 */
public interface ConcertRepository extends JpaRepository<Concert, Long> {

    List<Concert> findAllByDateLessThanAndVisibleEqualsOrderByDateDesc(Pageable pageable, Date date, boolean visible);

    List<Concert> findAllByDateGreaterThanEqualAndVisibleEqualsOrderByDateAsc(Pageable pageable, Date date, boolean visible);

    List<Concert> findAllByVisibleEqualsOrderByDateAsc(boolean visible);

    List<Concert> findAllByOrderByVisibleDescDateAsc();

}

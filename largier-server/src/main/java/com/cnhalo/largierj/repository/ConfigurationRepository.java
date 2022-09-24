package com.cnhalo.largierj.repository;

import com.cnhalo.largierj.model.Concert;
import com.cnhalo.largierj.model.Configuration;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Henry Huang on 2022/9/19.
 */
public interface ConfigurationRepository extends JpaRepository<Configuration, Long> {

    List<Configuration> findByGroupName(String groupName);

}

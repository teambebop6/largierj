package com.cnhalo.largierj.repository;

import com.cnhalo.largierj.model.User2;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.stereotype.Repository;

/**
 * Created by Henry Huang on 2022/9/19.
 */
public interface User2Repository extends JpaRepository<User2, Long> {

    User2 findOneByUsernameAndPassword(String username, String password);

}

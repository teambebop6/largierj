package com.cnhalo.largierj.ctrl;

import com.cnhalo.largierj.model.User2;
import com.cnhalo.largierj.repository.User2Repository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@RestController
@RequestMapping("/users")
public class User2Controller {

    @Autowired
    User2Repository user2Repository;

    @RequestMapping({"/", ""})
    public List<User2> findAllUsers() {
        return user2Repository.findAll();
    }

}

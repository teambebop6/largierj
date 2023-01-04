package com.cnhalo.largierj.ctrl.cards;

import com.cnhalo.largierj.dt.cards.Account;
import com.cnhalo.largierj.service.cards.AccountService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Henry Huang on 2023/1/3.
 */
@RestController
@RequestMapping("/cards")
public class CardsRestController {

    @Autowired
    AccountService accountService;

    @GetMapping("/accounts")
    public List<Account> getAccounts() {
        return accountService.getAccounts();
    }

}

package com.cnhalo.largierj.service.cards;

import com.cnhalo.largierj.dt.cards.Account;
import com.cnhalo.largierj.dt.cards.Test;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Created by Henry Huang on 2023/1/3.
 */
@Service
public class AccountServiceImpl implements AccountService {

    @Override
    public List<Account> getAccounts() {
        try {
            return Arrays.asList(new ObjectMapper().readValue(Test.class.getResourceAsStream("/data/accounts.json"), Account[].class));
        } catch (IOException e) {
            return null;
        }
    }
}

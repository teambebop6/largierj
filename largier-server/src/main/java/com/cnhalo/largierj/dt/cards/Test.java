package com.cnhalo.largierj.dt.cards;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

/**
 * Created by Henry Huang on 2023/1/3.
 */
public class Test {

    public static void main(String[] args) throws IOException {

        Account[] accounts = new ObjectMapper().readValue(Test.class.getResourceAsStream("/data/accounts.json"), Account[].class);
        for (Account account : accounts) {
            System.out.println(account);
        }

    }

}

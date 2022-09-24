package com.cnhalo.largierj.config;

import lombok.Data;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@Data
public class DBBasedConfig {

    private int pastConcertNum;
    private int upcomingConcertNum;

}

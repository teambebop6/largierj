package com.cnhalo.largierj.config;

import com.cnhalo.largierj.constant.ConfigConstant;
import com.cnhalo.largierj.model.ConfigurationItem;
import com.cnhalo.largierj.repository.ConfigurationRepository;
import com.cnhalo.largierj.security.JWTAuthenticationTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@Configuration
public class LargierJConfig {

    @Autowired
    private ConfigurationRepository configurationRepository;

    @Bean
    public DBBasedConfig dbBasedConfig() {
        DBBasedConfig dbBasedConfig = new DBBasedConfig();
        com.cnhalo.largierj.model.Configuration configuration = configurationRepository.findByGroupName(ConfigConstant.GROUP_NAME_GLOBAL).get(0);
        for (ConfigurationItem item : configuration.getItems()) {
            if (ConfigConstant.NAME_PAST_CONCERT_NUM.equals(item.getName())) {
                dbBasedConfig.setPastConcertNum(Integer.parseInt(item.getConfigValue()));
            } else if (ConfigConstant.NAME_UPCOMING_CONCERT_NUM.equals(item.getName())) {
                dbBasedConfig.setUpcomingConcertNum(Integer.parseInt(item.getConfigValue()));
            }
        }
        return dbBasedConfig;
    }

    @Bean
    public FilterRegistrationBean registration(JWTAuthenticationTokenFilter filter) {
        FilterRegistrationBean registration = new FilterRegistrationBean(filter);
        registration.setEnabled(false);
        return registration;
    }

}

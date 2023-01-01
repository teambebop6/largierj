package com.cnhalo.largierj.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Henry Huang on 2022/9/21.
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JWTConfig {

    private String header;
    private String tokenStartWith;
    private String base64Secret;
    private Long tokenValidityInSeconds;

    public String getTokenStartWith() {
        return tokenStartWith + " ";
    }
}

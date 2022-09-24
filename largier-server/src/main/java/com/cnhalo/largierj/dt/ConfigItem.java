package com.cnhalo.largierj.dt;

import com.cnhalo.largierj.model.Configuration;
import com.cnhalo.largierj.model.ConfigurationItem;
import lombok.Builder;
import lombok.Data;

/**
 * Created by Henry Huang on 2022/9/21.
 */
@Data
@Builder
public class ConfigItem {

    private Long id;
    private String name;
    private String title;
    private String value;

    public static ConfigItem convert(ConfigurationItem ci) {
        return ConfigItem.builder()
            .id(ci.getId())
            .name(ci.getName())
            .title(ci.getTitle())
            .value(ci.getConfigValue())
            .build();
    }
}

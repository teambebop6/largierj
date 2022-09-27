package com.cnhalo.largierj.config;

import com.cnhalo.largierj.dt.ImageSavedInfo;
import java.util.List;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Henry Huang on 2022/9/27.
 */
@Configuration
@ConfigurationProperties(prefix = "upload")
@Data
public class UploadConfig {

    private String location;
    private List<String> defaultAvatarFileNames;
    private List<ImageSavedInfo> defaultImageSavedInfos;

}

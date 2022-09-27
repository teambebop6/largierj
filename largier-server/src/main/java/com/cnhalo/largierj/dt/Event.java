package com.cnhalo.largierj.dt;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Date;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by Henry Huang on 2022/9/25.
 */
@Data
@NoArgsConstructor
@JsonIgnoreProperties
public class Event {

    private Long id;
    private String title;
    private String location;
    private String venue;
    private Date date;
    private String link;
    private String imageURI;
    private Integer imageWidth;
    private Integer imageHeight;
    private String type;
    private Integer order = -1;
    private Boolean visible;
    private Date creationDate = new Date();
    private Date lastModifiedDate = new Date();

}

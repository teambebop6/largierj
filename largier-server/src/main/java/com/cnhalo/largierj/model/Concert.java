package com.cnhalo.largierj.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@Entity
@Data
@DynamicInsert
@ToString
public class Concert {

    private Long id;
    private String title;
    private String location;
    private String venue;
    private Date date;
    private String link;
    private String type;
    private Integer sortOrder;
    private Boolean visible;
    private Date creationDate;
    private Date lastModifiedDate;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

}

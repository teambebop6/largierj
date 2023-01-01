package com.cnhalo.largierj.model;

import com.cnhalo.largierj.constant.Role;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@Entity
@Data
public class User2 {

    private Long id;
    private String username;
    private String password;
    private String email;
    private int role;
    private Boolean enabled;
    private Date creationDate;
    private Date lastModifiedDate;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

}

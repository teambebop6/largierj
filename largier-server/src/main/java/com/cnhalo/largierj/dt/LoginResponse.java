package com.cnhalo.largierj.dt;

import com.cnhalo.largierj.constant.Role;
import lombok.Data;

/**
 * Created by Henry Huang on 2022/9/22.
 */
@Data
public class LoginResponse {

    private String username;
    private String token;
    private String role;
    private Long expiredDate;

}

package com.cnhalo.largierj.dt;

import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * Created by Henry Huang on 2022/9/22.
 */
@Data
public class LoginRequest {

    @NotNull
    private String username;
    @NotNull
    private String password;

}

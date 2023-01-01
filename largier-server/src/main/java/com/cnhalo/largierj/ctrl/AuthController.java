package com.cnhalo.largierj.ctrl;

import com.cnhalo.largierj.constant.Role;
import com.cnhalo.largierj.dt.LoginRequest;
import com.cnhalo.largierj.dt.LoginResponse;
import com.cnhalo.largierj.dt.Result;
import com.cnhalo.largierj.dt.TokenTestResult;
import com.cnhalo.largierj.model.User2;
import com.cnhalo.largierj.repository.User2Repository;
import com.cnhalo.largierj.security.JWTTokenUtils;
import io.jsonwebtoken.ExpiredJwtException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.cnhalo.largierj.constant.ConfigConstant.CLAIM_USERNAME;
import static com.cnhalo.largierj.constant.ConfigConstant.CLAIM_PASSWORD;
import static com.cnhalo.largierj.constant.ConfigConstant.CLAIM_ROLES;

/**
 * Created by Henry Huang on 2022/9/21.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JWTTokenUtils jwtTokenUtils;

    @Autowired
    User2Repository user2Repository;

    @PostMapping("/login")
    public ResponseEntity<Result<LoginResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        User2 user = user2Repository.findOneByUsernameAndPassword(username, password);
        if (user == null) {
            throw new ResourceNotFoundException();
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_USERNAME, username);
        claims.put(CLAIM_PASSWORD, password);
        claims.put(CLAIM_ROLES, Collections.singletonList(Role.ADMIN));
        String token = jwtTokenUtils.createToken(claims);

        LoginResponse authResult = new LoginResponse();
        authResult.setUsername(username);
        authResult.setToken(token);
        authResult.setRole(Role.ADMIN.name().toLowerCase());
        authResult.setExpiredDate(jwtTokenUtils.getExpirationDateFromToken(token).getTime());
        return ResponseEntity.ok(Result.ok(authResult));
    }

    @PostMapping("/check")
    public ResponseEntity<Result<Authentication>> check(@RequestBody String token) {
        try {
            Authentication authentication = jwtTokenUtils.getAuthentication(token);
            return ResponseEntity.ok(Result.ok(authentication));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.badRequest().body(Result.fail("Token is expired."));
        }
    }

}

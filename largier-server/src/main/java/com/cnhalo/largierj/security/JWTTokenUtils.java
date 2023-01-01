package com.cnhalo.largierj.security;

import com.cnhalo.largierj.config.JWTConfig;
import com.cnhalo.largierj.constant.ConfigConstant;
import com.cnhalo.largierj.constant.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.CompressionCodecs;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import static com.cnhalo.largierj.constant.ConfigConstant.CLAIM_USERNAME;
import static com.cnhalo.largierj.constant.ConfigConstant.CLAIM_PASSWORD;
import static com.cnhalo.largierj.constant.ConfigConstant.CLAIM_ROLES;

/**
 * Created by Henry Huang on 2022/9/21.
 */
@Slf4j
@Component
public class JWTTokenUtils implements InitializingBean {

    private final JWTConfig jwtConfig;
    private static final String AUTHORITIES_KEY = "auth";
    private static final String ROLE_PREFIX = "ROLE_";
    private Key key;

    public JWTTokenUtils(JWTConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtConfig.getBase64Secret()));
    }

    public String createToken(Map<String, Object> claims) {
        return Jwts.builder()
            .claim(AUTHORITIES_KEY, claims)
            .setId(UUID.randomUUID().toString())
            .setIssuedAt(new Date())
            .setExpiration(new Date(new Date().getTime() + jwtConfig.getTokenValidityInSeconds() * 1000))
            .compressWith(CompressionCodecs.DEFLATE)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    public Date getExpirationDateFromToken(String token) {
        Date expiration;
        try {
            final Claims claims = getClaimsFromToken(token);
            expiration = claims.getExpiration();
        } catch (Exception e) {
            expiration = null;
        }
        return expiration;
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();

        Map<String, Object> claimValues = (Map<String, Object>) claims.get(AUTHORITIES_KEY);
        List<String> roles = (List<String>) claimValues.get(CLAIM_ROLES);
        Collection<? extends GrantedAuthority> authorities = new ArrayList<>();
        if (roles != null) {
            authorities = roles.stream().map(r -> new SimpleGrantedAuthority(ROLE_PREFIX + r)).collect(Collectors.toList());
        }

        User principal = new User(claimValues.get(CLAIM_USERNAME).toString(), claimValues.get(CLAIM_PASSWORD).toString(), authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT signature.");
            e.printStackTrace();
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
            e.printStackTrace();
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
            e.printStackTrace();
        }
        return false;
    }

    private Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

}

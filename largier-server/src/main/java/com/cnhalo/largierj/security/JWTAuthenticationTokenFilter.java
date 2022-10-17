package com.cnhalo.largierj.security;

import com.cnhalo.largierj.config.JWTConfig;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Created by Henry Huang on 2022/9/22.
 */
@Slf4j
@Component
public class JWTAuthenticationTokenFilter extends OncePerRequestFilter {

    private JWTTokenUtils jwtTokenUtils;
    private JWTConfig jwtConfig;

    public JWTAuthenticationTokenFilter(JWTConfig jwtConfig, JWTTokenUtils jwtTokenUtils) {
        this.jwtConfig = jwtConfig;
        this.jwtTokenUtils = jwtTokenUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String requestRri = httpServletRequest.getRequestURI();
        String token = null;
        String bearerToken = httpServletRequest.getHeader(jwtConfig.getHeader());
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(jwtConfig.getTokenStartWith())) {
            token = bearerToken.substring(jwtConfig.getTokenStartWith().length());
        }

        if (StringUtils.hasText(token) && jwtTokenUtils.validateToken(token)) {
            Authentication authentication = jwtTokenUtils.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
//            log.debug("set Authentication to security context for '{}', uri: {}", authentication.getName(), requestRri);
        } else {
//            log.debug("no valid JWT token found, uri: {}", requestRri);
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);

    }

}

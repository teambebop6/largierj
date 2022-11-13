package com.cnhalo.largierj.config;

import com.cnhalo.largierj.security.JWTAccessDeniedHandler;
import com.cnhalo.largierj.security.JWTAuthenticationEntryPoint;
import com.cnhalo.largierj.security.JWTAuthenticationTokenFilter;
import com.cnhalo.largierj.security.JWTTokenUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Created by Henry Huang on 2022/9/21.
 */
@EnableWebSecurity
@Configuration
public class SecurityConfiguration {

    @Autowired
    private JWTAccessDeniedHandler jwtAccessDeniedHandler;
    @Autowired
    private JWTAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    @Autowired
    private JWTTokenUtils jwtTokenUtils;
    @Autowired
    private JWTConfig jwtConfig;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(BCryptPasswordEncoder bCryptPasswordEncoder) {
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        manager.createUser(User.withUsername("admin")
            .password(bCryptPasswordEncoder.encode("password"))
            .roles("ADMIN")
            .build()
        );
        return manager;
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder, UserDetailsService userDetailService)
        throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
            .userDetailsService(userDetailService)
            .passwordEncoder(bCryptPasswordEncoder)
            .and()
            .build();
    }

    @Bean
    public SecurityFilterChain adminFilterChain(HttpSecurity http) throws Exception {
        http.csrf()
            .disable()

            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .accessDeniedHandler(jwtAccessDeniedHandler)

            .and()
            .headers()
            .frameOptions()
            .disable()

            // do not create session
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

            .and()
            .authorizeRequests()

            .antMatchers("/hc")
            .permitAll()

            .antMatchers("/api/admin/**")
            .hasRole("ADMIN")

            .antMatchers("/**", "/api/auth/**", "/file/**")
            .permitAll()
//            .anonymous()
            .anyRequest()
            .authenticated();

        // disable cache
        http.headers().cacheControl();

        http
            .apply(new TokenConfigurer(jwtConfig, jwtTokenUtils));

        return http.build();
    }

    @AllArgsConstructor
    public static class TokenConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

        private JWTConfig jwtConfig;
        private JWTTokenUtils jwtTokenUtils;

        @Override
        public void configure(HttpSecurity http) {
            JWTAuthenticationTokenFilter customFilter = new JWTAuthenticationTokenFilter(jwtConfig, jwtTokenUtils);
            http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
        }
    }

}

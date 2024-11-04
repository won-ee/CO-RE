package com.core.backend.config;

import com.core.backend.handler.OAuth2LoginFailureHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;

    public SecurityConfig(OAuth2LoginFailureHandler oAuth2LoginFailureHandler) {
        this.oAuth2LoginFailureHandler = oAuth2LoginFailureHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/login/jira").permitAll()
                        .requestMatchers("/oauth2/**").permitAll()
                        .requestMatchers("/callback/oauth2/**").permitAll()
                        .anyRequest().authenticated()  // 나머지 요청은 인증 필요
                )
                .oauth2Login(oauth2Login -> oauth2Login
                                .loginPage("/login/jira")
//                                .defaultSuccessUrl("/callback/oauth2/code/jira")
//                        .successHandler(oAuth2LoginSuccessHandler)
                                .failureHandler(oAuth2LoginFailureHandler)
                );

        return http.build();
    }
}

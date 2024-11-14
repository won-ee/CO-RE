package com.core.backend.config;

import com.core.backend.filter.JwtAuthenticationFilter;
import com.core.backend.handler.JiraOAuth2LoginFailureHandler;
import com.core.backend.service.JwtTokenService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {

    private final JiraOAuth2LoginFailureHandler jiraOAuth2LoginFailureHandler;

    public SecurityConfig(JiraOAuth2LoginFailureHandler jiraOAuth2LoginFailureHandler) {
        this.jiraOAuth2LoginFailureHandler = jiraOAuth2LoginFailureHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtTokenService jwtTokenService) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/login/jira").permitAll()
                        .requestMatchers("/oauth2/**").permitAll()
                        .requestMatchers("/callback/oauth2/**").permitAll()
                        .requestMatchers("/jira/**").permitAll()
                        .requestMatchers("/ssafy/atlassian/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2Login -> oauth2Login
                        .loginPage("/login/jira")
                        .failureHandler(jiraOAuth2LoginFailureHandler)
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}

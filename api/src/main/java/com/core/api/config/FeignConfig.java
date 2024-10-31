package com.core.api.config;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {

    @Bean
    public RequestInterceptor requestInterceptor() {

        // TODO : 시큐리티 토큰값으로 변경
        String token = "";
        return requestTemplate -> {
            requestTemplate.header("Authorization", "Bearer " + token);
            requestTemplate.header("X-GitHub-Api-Version", "2022-11-28");
            requestTemplate.header("Accept", "application/vnd.github+json");
        };
    }
}

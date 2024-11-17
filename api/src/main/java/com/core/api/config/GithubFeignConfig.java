package com.core.api.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import feign.RequestInterceptor;
import feign.codec.Decoder;
import feign.codec.Encoder;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import feign.okhttp.OkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


@Configuration
public class GithubFeignConfig {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {
            System.out.println("testsetset");
            String token = getGitHubToken();
            System.out.println(token);
            requestTemplate.header("Authorization", "Bearer " + token);
            requestTemplate.header("X-GitHub-Api-Version", "2022-11-28");
            requestTemplate.header("Accept", "application/vnd.github+json; charset=UTF-8");
        };
    }

    @Bean
    public Encoder feignEncoder() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
        return new JacksonEncoder(objectMapper);
    }

    @Bean
    public Decoder feignDecoder() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
        return new JacksonDecoder(objectMapper);
    }

    @Bean
    public OkHttpClient client() {
        return new OkHttpClient();
    }

    private String getGitHubToken() throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        if (authentication != null && authentication.getDetails() != null) {
            return authentication.getDetails()
                    .toString();
        }
        System.out.println("필터설정" + authentication + "  " + authentication.getDetails());
        throw new AccessDeniedException("GitHub token is missing");
    }

}

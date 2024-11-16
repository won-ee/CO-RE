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


@Configuration
public class FeignConfig {

    @Bean
    public RequestInterceptor requestInterceptor() {

        // TODO : 시큐리티 토큰값으로 변경
        String token = "";
        return requestTemplate -> {
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
}
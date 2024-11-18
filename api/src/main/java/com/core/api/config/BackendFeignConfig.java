package com.core.api.config;

import feign.RequestInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
public class BackendFeignConfig {

    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {
            if (!requestTemplate.url()
                    .equals("/users/search/git-token") && !requestTemplate.url()
                    .equals("/project-users/search/email")) {
                String token = getAccessToken();
                log.info("백엔드 서버 요청 (깃 아이디 반환 제외 ) Access token: {}", token);
                requestTemplate.header("Authorization", "Bearer " + token);
            }
        };
    }

    private String getAccessToken() throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        if (authentication != null && authentication.getPrincipal() != null) {
            return authentication.getPrincipal()
                    .toString();
        }
        throw new AccessDeniedException("Access token is missing from SecurityContext");
    }


}

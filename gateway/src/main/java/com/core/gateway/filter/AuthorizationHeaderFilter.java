package com.core.gateway.filter;

import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;


@Slf4j
@Component
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {

    @Value("${JWT_SECRET_KEY}")
    private String jwtSecretKey;

    //    토큰 검증이 필요하지 않은 URL
    private static final List<String> whitelistedUrls = List.of();

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            String requestPath = request.getURI().getPath();

            if (isWhitelistedUrl(requestPath)) {
                return chain.filter(exchange);
            }

            List<String> authHeaders = request.getHeaders().get(HttpHeaders.AUTHORIZATION);
            if (authHeaders == null || authHeaders.isEmpty()) {
                return onError(exchange, "No Authorization header");
            }

            String authorizationHeader = authHeaders.get(0);
            log.info("Authorization header: {}", authorizationHeader);
            String jwt = authorizationHeader.replace("Bearer ", "");

            if (!isJwtValid(jwt)) {
                return onError(exchange, "JWT Token is not valid");
            }

            return chain.filter(exchange);
        };
    }

    private boolean isWhitelistedUrl(String requestPath) {
        return whitelistedUrls.stream().anyMatch(requestPath::startsWith);
    }

    private boolean isJwtValid(String jwt) {
        try {
            String subject = Jwts.parser()
                    .setSigningKey(jwtSecretKey)
                    .parseClaimsJws(jwt)
                    .getBody()
                    .getSubject();
            return subject != null && !subject.isEmpty();
        } catch (Exception e) {
            return false;
        }
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);

        log.error(err);
        return response.setComplete();
    }

    public static class Config {
    }
}

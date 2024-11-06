package com.core.backend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.core.backend.data.entity.JwtToken;
import com.core.backend.data.repository.JiraOAuthTokenRepository;
import com.core.backend.data.repository.JwtTokenRepository;
import com.core.backend.data.repository.UserRepository;
import com.core.backend.exception.InCorrectAccessTokenException;
import com.core.backend.util.CookieUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Getter
@Slf4j
public class JwtTokenService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private int accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private int refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    private final JwtTokenRepository jwtTokenRepository;
    private final JiraOAuthTokenRepository jiraOAuthTokenRepository;

    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String EMAIL_CLAIM = "email";
    private static final String BEARER = "Bearer";

    private final UserRepository userRepository;

    public String createAccessToken(String email) {
        Date now = new Date();
        return JWT.create()
                .withSubject(ACCESS_TOKEN_SUBJECT)
                .withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod))
                .withClaim(EMAIL_CLAIM, email)
                .sign(Algorithm.HMAC512(secretKey));
    }

    public String createRefreshToken() {
        Date now = new Date();
        return JWT.create()
                .withSubject(REFRESH_TOKEN_SUBJECT)
                .withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
                .sign(Algorithm.HMAC512(secretKey));
    }

    public void sendAccessToken(HttpServletResponse response, String accessToken) {
        response.setStatus(HttpServletResponse.SC_OK);

        response.setHeader(accessHeader, accessToken);
        log.info("재발급 Access Token : {}", accessToken);
    }

    public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
        response.setStatus(HttpServletResponse.SC_OK);

        setAccessTokenHeader(response, accessToken);
        setRefreshTokenHeader(response, refreshToken);
        log.info("Access Token, Refresh Token 헤더 설정 완료");
    }

    public Optional<String> extraRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(refreshHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    public Optional<String> extractEmail(String accessToken) {
        try {
            var decodedJWT = JWT.require(Algorithm.HMAC512(secretKey)).build().verify(accessToken);

            String email = decodedJWT.getClaim(EMAIL_CLAIM).asString();
            if (email == null) {
                throw new InCorrectAccessTokenException();
            }
            return Optional.of(email);
        } catch (Exception e) {
            log.error("Access Token이 유효하지 않습니다.");
            return Optional.empty();
        }
    }

    public void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
        response.setHeader(accessHeader, accessToken);
    }

    public void setRefreshTokenHeader(HttpServletResponse response, String refreshToken) {
        response.setHeader(refreshHeader, refreshToken);
    }

    //    TODO: 이거 다시짜기 두개다 재발급하는 코드
    public void reissueToken(HttpServletRequest request, HttpServletResponse response) {
        Optional<String> refreshToken = extraRefreshToken(request);
    }

    public boolean isJwtTokenValid(String token) {
        try {
            var decodeJWT = JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);

            String email = decodeJWT.getClaim(EMAIL_CLAIM).asString();
            String subject = decodeJWT.getSubject();

            return email != null && subject != null && subject.equals(ACCESS_TOKEN_SUBJECT);
        } catch (Exception ex) {
            log.error("유효하지 않은 토큰입니다. : {}", ex.getMessage());
            return false;
        }
    }

    public JwtToken createAndStoreToken(String email) {
        String accessToken = createAccessToken(email);
        String refreshToken = createRefreshToken();

        JwtToken jwtToken = new JwtToken(accessToken, refreshToken, email);
        saveJwtToken(jwtToken);

        log.info("Redis에 저장된 AccessToken: {}", accessToken);
        log.info("Redis에 저장된 RefreshToken: {}", refreshToken);

        return jwtToken;
    }

    public Cookie createAllTokenCookie(String email) {
        JwtToken jwtToken = createAndStoreToken(email);
        return CookieUtil.createTokenCookie("accessToken", jwtToken.getAccessToken(), accessTokenExpirationPeriod);
    }

    public Cookie createAccessTokenCookie(String email) {
        String newAccessToken = createAccessToken(email);

        return CookieUtil.createTokenCookie("accessToken", newAccessToken, accessTokenExpirationPeriod);
    }

    public JwtToken getJwtToken(String id) {
        return jwtTokenRepository.findById(id).orElse(null);
    }

    public void saveJwtToken(JwtToken targetToken) {
        try {
            jwtTokenRepository.save(targetToken);
        } catch (Exception ex) {
            log.error("JwtToken Save Error : {}", ex.toString());
        }
    }


}

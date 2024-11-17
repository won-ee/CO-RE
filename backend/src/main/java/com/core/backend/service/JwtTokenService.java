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

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
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
    private static final String ID_CLAIM = "id";
    private static final String EMAIL_CLAIM = "email";
    private static final String BEARER = "Bearer";

    private final UserRepository userRepository;

    public String createAccessToken(Long id, String email) {

        ZonedDateTime nowKST = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        ZonedDateTime nowUTC = nowKST.withZoneSameInstant(ZoneId.of("UTC"));
        ZonedDateTime expirationUTC = nowUTC.plusMinutes(accessTokenExpirationPeriod);

        return JWT.create()
                .withSubject(ACCESS_TOKEN_SUBJECT)
                .withExpiresAt(Date.from(expirationUTC.toInstant()))
                .withClaim(ID_CLAIM, id)
                .withClaim(EMAIL_CLAIM, email)
                .sign(Algorithm.HMAC512(secretKey));
    }

    public String createRefreshToken() {
        ZonedDateTime nowKST = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        ZonedDateTime nowUTC = nowKST.withZoneSameInstant(ZoneId.of("UTC"));
        ZonedDateTime expirationUTC = nowUTC.plusMinutes(refreshTokenExpirationPeriod);

        return JWT.create()
                .withSubject(REFRESH_TOKEN_SUBJECT)
                .withExpiresAt(Date.from(expirationUTC.toInstant()))
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

    public Map<String, Optional<String>> extractIdAndEmail(String accessToken) {
        try {
            var decodedJWT = JWT.require(Algorithm.HMAC512(secretKey)).build().verify(accessToken);

            Long id = decodedJWT.getClaim(ID_CLAIM).asLong();
            String email = decodedJWT.getClaim(EMAIL_CLAIM).asString();

            if (id == null || email == null) {
                throw new InCorrectAccessTokenException();
            }

            Map<String, Optional<String>> claims = new HashMap<>();
            claims.put(ID_CLAIM, Optional.of(id.toString()));
            claims.put(EMAIL_CLAIM, Optional.of(email));

            return claims;

        } catch (Exception e) {
            log.error("Access Token이 유효하지 않습니다.");
            return Map.of(ID_CLAIM, Optional.empty(), EMAIL_CLAIM, Optional.empty());
        }
    }

    public void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
        response.setHeader(accessHeader, accessToken);
    }

    public void setRefreshTokenHeader(HttpServletResponse response, String refreshToken) {
        response.setHeader(refreshHeader, refreshToken);
    }

    public boolean isJwtTokenValid(String token) {
        try {
            log.info(token);
            var decodeJWT = JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);

            ZonedDateTime nowUTC = ZonedDateTime.now(ZoneId.of("UTC"));

            Date expiration = decodeJWT.getExpiresAt();
            ZonedDateTime expirationUTC = expiration.toInstant().atZone(ZoneId.of("UTC"));

            if (nowUTC.isAfter(expirationUTC)) {
                log.info("JWT Token has expired. Expiration time (UTC): {}", expirationUTC);
                return false;
            }

            Long id = decodeJWT.getClaim(ID_CLAIM).asLong();
            String email = decodeJWT.getClaim(EMAIL_CLAIM).asString();
            String subject = decodeJWT.getSubject();

            return id != null && email != null && subject != null && subject.equals(ACCESS_TOKEN_SUBJECT);
        } catch (Exception ex) {
            log.error("유효하지 않은 토큰입니다. : {}", ex.getMessage());
            return false;
        }
    }

    public JwtToken createAndStoreToken(Long id, String email) {
        String accessToken = createAccessToken(id, email);
        String refreshToken = createRefreshToken();

        JwtToken jwtToken = new JwtToken(email, accessToken, refreshToken);
        saveJwtToken(jwtToken);

        log.info("Redis에 저장된 AccessToken: {}", accessToken);
        log.info("Redis에 저장된 RefreshToken: {}", refreshToken);

        return jwtToken;
    }

    public Cookie createAllTokenCookie(Long id, String email) {
        JwtToken jwtToken = createAndStoreToken(id, email);
        return CookieUtil.createTokenCookie("accessToken", jwtToken.getAccessToken(), accessTokenExpirationPeriod);
    }

    public Cookie createAccessTokenCookie(Long id, String email) {
        String newAccessToken = createAccessToken(id, email);

        return CookieUtil.createTokenCookie("accessToken", newAccessToken, accessTokenExpirationPeriod);
    }

    public void saveJwtToken(JwtToken targetToken) {
        try {
            jwtTokenRepository.save(targetToken);
        } catch (Exception ex) {
            log.error("JwtToken Save Error : {}", ex.toString());
        }
    }


}

package com.core.backend.util;

import jakarta.servlet.http.Cookie;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CookieUtil {

    private CookieUtil() {
        throw new IllegalStateException("Utility class");
    }

    public static Cookie createCookie(String key, String value, int maxAge, boolean secure) {
        Cookie cookie = new Cookie(key, value);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);
        cookie.setPath("/");
        cookie.setSecure(secure);

        return cookie;
    }

    public static Cookie createTokenCookie(String key, String token, int period) {
        return createCookie(key, token, period, false);
    }

}

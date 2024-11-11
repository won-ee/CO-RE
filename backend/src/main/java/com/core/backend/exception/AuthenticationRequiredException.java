package com.core.backend.exception;

public class AuthenticationRequiredException extends CoreException {

    private static final String MESSAGE = "OAuth 인증기간이 지났습니다. 재로그인 해 주십시오.";

    public AuthenticationRequiredException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 401;
    }
}

package com.core.backend.exception;

public class InCorrectAccessTokenException extends CoreException {

    private static final String MESSAGE = "유효하지 않은 AccessToken입니다.";

    public InCorrectAccessTokenException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}

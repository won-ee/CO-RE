package com.core.backend.exception;

public class UserNotFoundException extends CoreException {
    private static final String MESSAGE = "해당 유저를 찾을 수 없습니다.";

    public UserNotFoundException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 401;
    }
}

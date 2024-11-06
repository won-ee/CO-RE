package com.core.backend.exception;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public abstract class CoreException extends RuntimeException {

    public final Map<String, String> validation = new HashMap<>();

    public CoreException(String message) {
        super(message);
    }

    public CoreException(String message, Throwable cause) {
        super(message, cause);
    }

    public abstract int getStatusCode();

    public void addValidation(String fileName, String message) {
        validation.put(fileName, message);
    }

}

package com.core.api.handler;


import com.core.api.data.dto.ErrorResponseDto;
import feign.FeignException;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Arrays;

@Slf4j(topic = "GLOBAL_EXCEPTION_HANDLER")
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    public static final String TRACE = "trace";

    @Value("${spring.error.printStackTrace}")
    private boolean isPrintStackTrace;

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(@NotNull Exception ex, Object body, HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        return buildErrorResponse(ex, ex.getMessage(), HttpStatus.valueOf(statusCode.value()), request);
    }

    private ResponseEntity<Object> buildErrorResponse(Exception exception, String message, HttpStatus httpStatus, WebRequest webRequest) {
        ErrorResponseDto errorResponseDto = new ErrorResponseDto(httpStatus.value(), message, LocalDateTime.now());
        if (isPrintStackTrace && isTraceOn(webRequest)) {
            errorResponseDto.setStackTrace(Arrays.toString(exception.getStackTrace()));
        }
        return ResponseEntity.status(httpStatus)
                .body(errorResponseDto);
    }

    private boolean isTraceOn(WebRequest request) {
        String[] value = request.getParameterValues(TRACE);
        return value != null && value.length > 0 && value[0].contentEquals("true");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<Object> handleAllUnCaughtException(Exception exception, WebRequest webRequest) {
        log.error("Internal error occured", exception);
        return buildErrorResponse(exception, exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, webRequest);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ErrorResponseDto errorResponseDto = new ErrorResponseDto(HttpStatus.UNPROCESSABLE_ENTITY.value(), "Validation error. Check 'errors' field for details.", LocalDateTime.now());
        for (FieldError fieldError : ex.getBindingResult()
                .getFieldErrors())
            errorResponseDto.addValidationError(fieldError.getField(), fieldError.getDefaultMessage());
        return ResponseEntity.unprocessableEntity()
                .body(errorResponseDto);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<Object> handleAccessDeniedException(AccessDeniedException exception, WebRequest webRequest) {
        log.error("Access denied", exception);
        return buildErrorResponse(exception, exception.getMessage(), HttpStatus.FORBIDDEN, webRequest);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    protected ResponseEntity<Object> handleIllegalArgument(IllegalArgumentException exception, WebRequest webRequest) {
        log.error("Illegal argument", exception);
        return buildErrorResponse(exception, exception.getMessage(), HttpStatus.NOT_FOUND, webRequest);
    }

    @ExceptionHandler(DateTimeParseException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected ResponseEntity<Object> handleDateTimeParse(DateTimeParseException exception, WebRequest webRequest) {
        log.error("Date time parse error", exception);
        return buildErrorResponse(exception, exception.getMessage(), HttpStatus.BAD_REQUEST, webRequest);
    }

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<Object> handleFeignException(FeignException exception, WebRequest webRequest) {
        HttpStatus status = HttpStatus.valueOf(exception.status());
        log.error("Feign client error: {}", exception.getMessage(), exception);

        ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                status.value(),
                "Feign client error: " + exception.getMessage(),
                LocalDateTime.now()
        );

        if (isPrintStackTrace && isTraceOn(webRequest)) {
            errorResponseDto.setStackTrace(Arrays.toString(exception.getStackTrace()));
        }

        return ResponseEntity.status(status)
                .body(errorResponseDto);
    }
}


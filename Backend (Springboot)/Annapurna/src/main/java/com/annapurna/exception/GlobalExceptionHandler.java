package com.annapurna.exception;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiException> handleRuntime(RuntimeException e) {
        ApiException api = new ApiException(e.getMessage(), false);
        return new ResponseEntity<>(api, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiException> handleGeneral(Exception e) {
        ApiException api = new ApiException("Something went wrong: " + e.getMessage(), false);
        return new ResponseEntity<>(api, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

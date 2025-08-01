package com.annapurna.exception;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiException {
    private String message;
    private boolean success;
}

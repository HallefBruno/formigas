
package com.formiga.entity.exception;

public class ObjectSaveException extends RuntimeException {
    
    public ObjectSaveException(String message) {
        super(message);
    }
    
    public ObjectSaveException(String message, Throwable cause) {
        super(message,cause);
    }
}

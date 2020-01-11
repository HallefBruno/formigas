
package com.formiga.entity.exception;

import org.springframework.dao.DataIntegrityViolationException;

public class NotDeleteException extends DataIntegrityViolationException{
    
    public NotDeleteException(String msg) {
        super(msg);
    }
    
}

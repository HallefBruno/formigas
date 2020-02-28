
package com.formiga.entity.dto;

public class DefaultAutoCompleteSelect2DTO {
    
    private String id;
    private String text;

    public DefaultAutoCompleteSelect2DTO() {
    }

    public DefaultAutoCompleteSelect2DTO(String id, String text) {
        this.id = id;
        this.text = text;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
    
    
    
}

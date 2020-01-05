
package com.formiga.entity;

public enum Status {
    
    ONLINE("Online"),
    OFFLINE("Offline");
    
    private String value;

    private Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
    
    public void setValue(String value) {
        this.value = value;
    }
}

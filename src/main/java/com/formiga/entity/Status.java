
package com.formiga.entity;

public enum Status {
    
    ONLINE("Online"),
    OFFLINE("Offline");
    
    private final String value;

    private Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

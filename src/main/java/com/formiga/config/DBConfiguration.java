
package com.formiga.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@ConfigurationProperties("spring.datasource")
public class DBConfiguration {
    
    private String url;
    
    @Profile("dev")
    @Bean
    public String devDataBaseConnection() {
        return "DB Connection for DEV: "+url;
    }
    
    @Profile("prod")
    @Bean
    public String prodDataBaseConnection() {
        return "DB Connection for PROD: "+url;
    }
    
}

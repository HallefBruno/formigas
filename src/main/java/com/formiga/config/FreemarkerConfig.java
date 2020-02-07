
package com.formiga.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class FreemarkerConfig {
    
    @Bean
    @Primary
    public freemarker.template.Configuration getFreeMarkerConfiguration() {
        freemarker.template.Configuration config = new freemarker.template.Configuration(freemarker.template.Configuration.getVersion());
        config.setClassForTemplateLoading(this.getClass(), "/templates/");
        return config;
    }
    
}

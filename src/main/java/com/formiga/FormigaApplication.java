package com.formiga;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class FormigaApplication {

    public static void main(String[] args) {
        SpringApplication.run(FormigaApplication.class, args);
    }
}

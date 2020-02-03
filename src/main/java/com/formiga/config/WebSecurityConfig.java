
package com.formiga.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/webjars/**");
        web.ignoring().antMatchers("/stylesheet/**");
        web.ignoring().antMatchers("/font/**");
        web.ignoring().antMatchers("/imagens/**");
        web.ignoring().antMatchers("/vendor-js/**");
        web.ignoring().antMatchers("/flyer-js/**");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
          .authorizeRequests()
            .antMatchers("/criarconta/**").permitAll()
            .antMatchers("/credenciais/**").permitAll()
            .and()
          .authorizeRequests()
            .antMatchers("/flyer").hasAnyAuthority("CADASTRAR")
            .antMatchers("/resident").hasAnyAuthority("CADASTRAR")
            .anyRequest().authenticated()
            .and()
          .formLogin().loginPage("/login").permitAll()
            .and()
          .logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login").permitAll()
            .and()
          .exceptionHandling()
            .accessDeniedPage("/403")
            .and()
          .rememberMe()
            .userDetailsService(userDetailsService)
            .and()
          .sessionManagement()
            .maximumSessions(1).expiredUrl("/login")
            .and()
          .invalidSessionUrl("/login");
            
          
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}






































//auth
//          .inMemoryAuthentication()
//          .withUser("user")
//            .password(encoder.encode("password"))
//            .roles("USER")
//          .and()
//          .withUser("admin")
//            .password(encoder.encode("admin"))
//            .roles("USER", "ADMIN");
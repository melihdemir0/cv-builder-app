package com.cvbuilder.backend.security;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<JwtAuthenticationFilter> jwtFilter() {
        FilterRegistrationBean<JwtAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new JwtAuthenticationFilter());  // Burada JwtAuthenticationFilter'ı kullanıyoruz
        registrationBean.addUrlPatterns("/api/*");  // Filtrenin hangi URL'lerde çalışacağını belirtiyoruz (örneğin "/api/*")
        return registrationBean;
    }
}

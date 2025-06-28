package com.cvbuilder.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;  // yeni import
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter implements Filter {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Gerekli başlangıç işlemleri (isteğe bağlı)
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // HTTP request ve response nesnelerine cast ediyoruz
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Authorization header'ından token'ı alıyoruz
        String token = httpRequest.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);  // "Bearer " kısmını çıkar

            // Token'dan kullanıcı adını alıyoruz
            String username = jwtTokenUtil.extractUsername(token);

            // Token geçerli ise ve kullanıcı doğrulandıysa
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Token doğrulama
                if (jwtTokenUtil.validateToken(token, username)) {
                    // Kullanıcı doğrulandıysa, Authentication objesi oluşturuluyor ve SecurityContext'e ekleniyor
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(username, null, null);
                    SecurityContextHolder.getContext().setAuthentication(authentication);  // Kullanıcıyı authenticate ediyoruz
                }
            }
        }

        // Filtre zincirine devam ediyoruz
        chain.doFilter(request, response);  // Bir sonraki filtreyi çağırır
    }

    @Override
    public void destroy() {
        // Temizleme işlemleri (isteğe bağlı)
    }
}

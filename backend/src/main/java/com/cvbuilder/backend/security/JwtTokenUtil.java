package com.cvbuilder.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenUtil {

    private String secretKey = "your_secret_key";  // Secret key

    // Token üretme
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))  // 1 gün geçerlilik
                .signWith(SignatureAlgorithm.HS512, secretKey)  // HS512 algoritması ile imzalıyoruz
                .compact();
    }

    // Token'dan kullanıcı adını çıkarma
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();  // Token'dan kullanıcı adını çıkarıyoruz
    }

    // Token geçerliliğini kontrol etme
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Token'dan bitiş tarihini çıkarma
    private Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    // Token'dan Claims (veri) çıkarma
    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)  // Token'ı doğrulamak için kullanılan anahtar
                .parseClaimsJws(token)  // Token'ı analiz edip body kısmındaki veriyi döndürüyoruz
                .getBody();
    }

    // Token'ı doğrulama
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));  // Token geçerli mi?
    }
}
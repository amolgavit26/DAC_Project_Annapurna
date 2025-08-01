package com.annapurna.security;

import com.annapurna.config.JwtConstant;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

	public String generateToken(String email, String role) {
	    return Jwts.builder()
	            .setSubject(email)
	            .claim("role", role)
	            .setIssuedAt(new Date())
	            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
	            .signWith(SignatureAlgorithm.HS512, JwtConstant.SECRET_KEY)
	            .compact();
	}


    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(JwtConstant.SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    
    
    public String getRoleFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(JwtConstant.SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    
    
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(JwtConstant.SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

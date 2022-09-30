package br.com.passwordManager.configurations.security.services;

import br.com.passwordManager.entities.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class TokenService {

    @Value("${passwordManager.jwt.expiration}")
    private String expirationDate;

    @Value("${passwordManager.jwt.secret}")
    private String secret;

    public String createToken(Authentication authentication){

        UserEntity user = (UserEntity)authentication.getPrincipal();

        Date validFrom = new Date();
        Date validUntil = new Date(validFrom.getTime() + Long.parseLong(expirationDate));

        return Jwts.builder()
                .setIssuer("API PasswordManager")
                .setSubject(user.getId().toString())
                .setIssuedAt(validFrom)
                .setExpiration(validUntil)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public boolean isTokenValid(String token){

        try{
            Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public UUID getUserId(String token){
        Claims claim =  Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token).getBody();

        return UUID.fromString(claim.getSubject());
    }
}

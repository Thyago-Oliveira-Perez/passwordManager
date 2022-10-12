package br.com.passwordManager.services;

import br.com.passwordManager.configurations.security.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class HeadersService {

    @Autowired
    private TokenService tokenService;

    public UUID getIdFromToken(HttpHeaders headers){
        String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
        UUID id = this.tokenService.getUserId(token.substring(7, token.length()));
        return id;
    }
}

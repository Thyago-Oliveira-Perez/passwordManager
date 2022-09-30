package br.com.passwordManager.configurations.security.controller;

import br.com.passwordManager.configurations.security.models.LoginCredentialsRequest;
import br.com.passwordManager.configurations.security.models.Token;
import br.com.passwordManager.configurations.security.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<Token> login(@RequestBody @Valid LoginCredentialsRequest credentials){

        UsernamePasswordAuthenticationToken loginCredentials =
                new UsernamePasswordAuthenticationToken(credentials.getLogin(), credentials.getPassword());

        try{
            Authentication authentication = authenticationManager.authenticate(loginCredentials);
            String token = tokenService.createToken(authentication);
            return ResponseEntity.ok().body(new Token(token));
        }catch (AuthenticationException e){
            return ResponseEntity.notFound().build();
        }
    }
}

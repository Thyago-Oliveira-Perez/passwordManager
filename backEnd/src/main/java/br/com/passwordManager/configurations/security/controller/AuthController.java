package br.com.passwordManager.configurations.security.controller;

import br.com.passwordManager.configurations.security.dto.LoginCredentialsRequest;
import br.com.passwordManager.configurations.security.dto.TokenResponse;
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
    public ResponseEntity<TokenResponse> login(@RequestBody @Valid LoginCredentialsRequest credentials){

        UsernamePasswordAuthenticationToken loginCredentials =
                new UsernamePasswordAuthenticationToken(credentials.getLogin(), credentials.getPassword());

        try{
            Authentication authentication = authenticationManager.authenticate(loginCredentials);
            String token = tokenService.createToken(authentication);
            String userName = tokenService.getUserName(authentication);
            return ResponseEntity.ok().body(new TokenResponse(token, userName));
        }catch (AuthenticationException e){
            return ResponseEntity.notFound().build();
        }
    }
}

package br.com.passwordManager.services;

import br.com.passwordManager.configurations.security.services.TokenService;
import br.com.passwordManager.dto.responses.PasswordsResponse;
import br.com.passwordManager.entities.PasswordEntity;
import br.com.passwordManager.repositories.PasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PasswordService {

    @Autowired
    private PasswordRepository passwordRepository;

    @Autowired
    private TokenService tokenService;

    public ResponseEntity<?> registerPassword(PasswordEntity password){
        try{
            this.passwordRepository.save(password);
            return ResponseEntity.ok().body("Senha cadastrada com sucesso!");
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Senha já cadastrada!");
        }
    }

    public Page<PasswordsResponse> getPasswords(HttpHeaders headers, Pageable pageable) {
        String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
        UUID userId = this.tokenService.getUserId(token.substring(7, token.length()));
        this.passwordRepository.findAllUserPasswords(userId, pageable);
        return this.passwordRepository.findAllUserPasswords(userId, pageable);
    }
}

package br.com.passwordManager.services;

import br.com.passwordManager.configurations.security.services.TokenService;
import br.com.passwordManager.dto.responses.PasswordsResponse;
import br.com.passwordManager.entities.PasswordEntity;
import br.com.passwordManager.repositories.PasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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

    public ResponseEntity<Page<PasswordsResponse>> getPasswords(HttpHeaders headers, Pageable pageable) {
        String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
        UUID userId = this.tokenService.getUserId(token.substring(7, token.length()));

        List<PasswordsResponse> returnListPassword = new ArrayList<PasswordsResponse>();
        Page<PasswordEntity> userPasswordsDB = this.passwordRepository.findAllUserPasswords(userId, pageable);

        userPasswordsDB.getContent().forEach(e -> {
          returnListPassword.add(new PasswordsResponse(e.getId(), e.getValue()));
        });

        Page<PasswordsResponse> returnPageAbleList = new PageImpl<PasswordsResponse>(returnListPassword);
        return ResponseEntity.ok(returnPageAbleList);
    }
}

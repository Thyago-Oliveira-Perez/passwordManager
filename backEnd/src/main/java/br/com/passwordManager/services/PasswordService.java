package br.com.passwordManager.services;

import br.com.passwordManager.entities.PasswordEntity;
import br.com.passwordManager.repositories.PasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    @Autowired
    private PasswordRepository passwordRepository;

    public ResponseEntity<?> registerPassword(PasswordEntity password){
        try{
            this.passwordRepository.save(password);
            return ResponseEntity.ok().body("Senha cadastrada com sucesso!");
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Senha já cadastrada!");
        }
    }
}

package br.com.passwordManager.controllers;

import br.com.passwordManager.entities.PasswordEntity;
import br.com.passwordManager.services.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/passwords")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @PostMapping("/insert")
    public ResponseEntity<?> insertPassword(PasswordEntity password){
        return this.passwordService.registerPassword(password);
    }
}

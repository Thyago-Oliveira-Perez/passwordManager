package br.com.passwordManager.controllers;

import br.com.passwordManager.dto.responses.PasswordsResponse;
import br.com.passwordManager.entities.PasswordEntity;
import br.com.passwordManager.services.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/passwords")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @PostMapping("/insert")
    public ResponseEntity<?> insertPassword(@RequestBody PasswordEntity password){
        return this.passwordService.registerPassword(password);
    }

    @GetMapping("/user-passwords")
    public ResponseEntity<Page<PasswordsResponse>> listPasswords(@RequestHeader HttpHeaders headers, Pageable pageable){
        return this.passwordService.getPasswords(headers, pageable);
    }
}

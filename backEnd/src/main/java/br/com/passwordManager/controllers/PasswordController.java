package br.com.passwordManager.controllers;

import br.com.passwordManager.dto.responses.PasswordsResponse;
import br.com.passwordManager.entities.PasswordEntity;
import br.com.passwordManager.services.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

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

    @PostMapping("/update")
    public ResponseEntity<Page<PasswordsResponse>> updatePasswords(@RequestHeader HttpHeaders headers, @RequestBody List<PasswordsResponse> updatedPasswords){
        return this.passwordService.updatePasswords(headers, updatedPasswords);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePasswords(@PathParam("id") String passwordId){
        return this.passwordService.deletePassword(passwordId);
    }
}

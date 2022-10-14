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

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/api/passwords")
@CrossOrigin("http://localhost:3000")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @GetMapping("/user-passwords")
    public ResponseEntity<Page<PasswordsResponse>> listPasswords(@RequestHeader HttpHeaders headers, Pageable pageable){
        return this.passwordService.getPasswords(headers, pageable);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertPasswords(@RequestHeader HttpHeaders httpHeaders, @RequestBody List<PasswordsResponse> newPasswords){
        return this.passwordService.insertPasswords(httpHeaders, newPasswords);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updatePasswords(@RequestHeader HttpHeaders headers, @RequestBody List<PasswordsResponse> updatedPasswords){
        return this.passwordService.updatePasswords(headers, updatedPasswords);
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deletePasswords(@RequestBody List<UUID> deletedPasswords){
        return this.passwordService.deletePasswords(deletedPasswords);
    }
}

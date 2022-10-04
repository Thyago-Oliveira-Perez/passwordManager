package br.com.passwordManager.controllers;

import br.com.passwordManager.dto.RegisterRequest;
import br.com.passwordManager.entities.UserEntity;
import br.com.passwordManager.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/register")
    public ResponseEntity<?> register(RegisterRequest registerRequest){
        return this.usersService.registerNewUser(registerRequest);
    }

    @GetMapping("/my-datas")
    public ResponseEntity<UserEntity> register(@RequestHeader HttpHeaders headers){
        return this.usersService.getMyDatas(headers);
    }

    @GetMapping("/my-passwords")
    public Page<?> listPasswords(@RequestHeader HttpHeaders headers, Pageable pageable){
        return this.usersService.getPasswords(headers, pageable);
    }

}

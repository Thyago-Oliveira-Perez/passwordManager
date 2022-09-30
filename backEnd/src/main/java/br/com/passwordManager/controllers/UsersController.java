package br.com.passwordManager.controllers;

import br.com.passwordManager.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @GetMapping("/my-passwords")
    public Page<?> listPasswords(@RequestHeader HttpHeaders headers, Pageable pageable){
        return this.usersService.getPasswords(headers, pageable);
    }

}

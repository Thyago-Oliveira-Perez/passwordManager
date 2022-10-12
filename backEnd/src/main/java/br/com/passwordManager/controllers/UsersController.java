package br.com.passwordManager.controllers;

import br.com.passwordManager.dto.requests.RegisterRequest;
import br.com.passwordManager.dto.requests.UpdateUserDatasRequest;
import br.com.passwordManager.dto.responses.UserDatasResponse;
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
@CrossOrigin("http://localhost:3000")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest){
        return this.usersService.registerNewUser(registerRequest);
    }

    @PostMapping("/update")
    public ResponseEntity<?> udpate(@RequestBody UpdateUserDatasRequest updateUserDatasRequest, @RequestHeader HttpHeaders headers){
        return this.usersService.updateUserDatas(headers, updateUserDatasRequest);
    }

    @GetMapping("/my-datas")
    public ResponseEntity<UserDatasResponse> myDatas(@RequestHeader HttpHeaders headers){
        return this.usersService.getMyDatas(headers);
    }

}

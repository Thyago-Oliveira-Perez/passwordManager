package br.com.passwordManager.services;

import br.com.passwordManager.configurations.security.services.TokenService;
import br.com.passwordManager.dto.RegisterRequest;
import br.com.passwordManager.dto.UserDatasResponse;
import br.com.passwordManager.entities.UserEntity;
import br.com.passwordManager.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private TokenService tokenService;

    public Page<?> getPasswords(HttpHeaders headers, Pageable pageable) {
        String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
        UUID userId = this.tokenService.getUserId(token.substring(7, token.length()));
        return this.usersRepository.findAllUserPassWords(userId, pageable);
    }

    public String getUserNameById(UUID userId){
        return this.usersRepository.getNameById(userId);
    }

    public ResponseEntity<?> registerNewUser(RegisterRequest registerRequest) {
        try{
            UserEntity newUser = new UserEntity();
            newUser.setName(registerRequest.getName());
            newUser.setEmail(registerRequest.getEmail());
            newUser.setPassword(registerRequest.getPassword());
            this.usersRepository.save(newUser);
            return ResponseEntity.ok(newUser);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity<UserDatasResponse> getMyDatas(HttpHeaders headers) {
        String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
        UUID userId = this.tokenService.getUserId(token.substring(7, token.length()));
        Optional<UserEntity> user = this.usersRepository.findById(userId);
        UserDatasResponse userResponse = new UserDatasResponse(user.get().getName(), user.get().getEmail());
        return user.isPresent() ? ResponseEntity.ok(userResponse) : ResponseEntity.notFound().build();
    }
}

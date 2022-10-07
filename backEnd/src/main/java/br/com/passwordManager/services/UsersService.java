package br.com.passwordManager.services;

import br.com.passwordManager.configurations.security.services.TokenService;
import br.com.passwordManager.dto.requests.RegisterRequest;
import br.com.passwordManager.dto.requests.UpdateUserDatasRequest;
import br.com.passwordManager.dto.responses.UserDatasResponse;
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
        Optional<UserEntity> user = this.usersRepository.findById(getIdFromToken(headers));
        UserDatasResponse userResponse = new UserDatasResponse(user.get().getName(), user.get().getEmail());
        return user.isPresent() ? ResponseEntity.ok(userResponse) : ResponseEntity.notFound().build();
    }

    public ResponseEntity<?> updateUserDatas(HttpHeaders headers, UpdateUserDatasRequest updateUserDatasRequest) {
        try{
            UserEntity user = this.usersRepository.getById(getIdFromToken(headers));
            user.setName(updateUserDatasRequest.getName());
            user.setEmail(updateUserDatasRequest.getEmail());
            user.setPassword(updateUserDatasRequest.getPassword());
            this.usersRepository.save(user);
            return ResponseEntity.ok(user);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    protected UUID getIdFromToken(HttpHeaders headers){
        String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
        UUID userId = this.tokenService.getUserId(token.substring(7, token.length()));
        return userId;
    }
}

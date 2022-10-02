package br.com.passwordManager.services;

import br.com.passwordManager.configurations.security.services.TokenService;
import br.com.passwordManager.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;

import org.springframework.stereotype.Service;

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
}

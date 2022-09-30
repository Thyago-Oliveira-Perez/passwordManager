package br.com.passwordManager.configurations.security.services;

import br.com.passwordManager.configurations.security.repository.AuthRepository;
import br.com.passwordManager.entities.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private AuthRepository authRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserEntity> usuario = this.authRepository.findByLoginOrEmail(username);

        if(usuario.isPresent() && usuario.get().isAccountNonExpired()){
            return usuario.get();
        }else{
            return null;
        }
    }
}

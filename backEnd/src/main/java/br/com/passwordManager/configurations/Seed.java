package br.com.passwordManager.configurations;

import br.com.passwordManager.entities.UserEntity;
import br.com.passwordManager.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class Seed implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    protected UsersRepository usersRepository;

    public void createDefaultUser(){

        if(this.usersRepository.count() <= 0){

            BCryptPasswordEncoder senha = new BCryptPasswordEncoder();

            UserEntity user = new UserEntity();
            user.setId(UUID.randomUUID());
            user.setName("DefaultUser");
            user.setEmail("default@gmail.com");
            user.setPassword(senha.encode("123"));

            this.usersRepository.save(user);
        }
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        createDefaultUser();
    }
}

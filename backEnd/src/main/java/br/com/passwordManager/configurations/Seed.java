package br.com.passwordManager.configurations;

import br.com.passwordManager.entities.PasswordEntity;
import br.com.passwordManager.entities.UserEntity;
import br.com.passwordManager.repositories.PasswordRepository;
import br.com.passwordManager.repositories.UsersRepository;
import br.com.passwordManager.services.CryptographyService;
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

    @Autowired
    protected PasswordRepository passwordRepository;

    public void createDefaultUser(){

        if(this.usersRepository.count() <= 0){

            BCryptPasswordEncoder senha = new BCryptPasswordEncoder();

            UserEntity user = new UserEntity();

            user.setId(UUID.randomUUID());
            user.setName("DefaultUser");
            user.setEmail("default@gmail.com");
            user.setPassword(senha.encode("123"));

            this.usersRepository.save(user);

            if(this.passwordRepository.count() <= 0){

                CryptographyService cyptography = new CryptographyService();

                PasswordEntity password = new PasswordEntity();

                password.setId(UUID.randomUUID());
                password.setValue(cyptography.encrypt("mypassword"));
                password.setUser(user);
                this.passwordRepository.save(password);
            }
        }

    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        createDefaultUser();
    }
}

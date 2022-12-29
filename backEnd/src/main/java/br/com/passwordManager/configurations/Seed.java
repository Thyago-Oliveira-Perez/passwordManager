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
            user.setName("root");
            user.setEmail("default@gmail.com");
            user.setPassword(senha.encode("root"));

            this.usersRepository.save(user);

            if(this.passwordRepository.count() <= 0){

                CryptographyService cyptography = new CryptographyService();

                PasswordEntity password0 = new PasswordEntity();
                PasswordEntity password1 = new PasswordEntity();

                password0.setId(UUID.randomUUID());
                password0.setValue(cyptography.encrypt("mypassword0"));
                password0.setUser(user);

                password1.setId(UUID.randomUUID());
                password1.setValue(cyptography.encrypt("mypassword1"));
                password1.setUser(user);


                this.passwordRepository.save(password0);
                this.passwordRepository.save(password1);
            }
        }

    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        createDefaultUser();
    }
}

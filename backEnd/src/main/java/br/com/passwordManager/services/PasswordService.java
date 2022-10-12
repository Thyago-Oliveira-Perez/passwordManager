package br.com.passwordManager.services;

import br.com.passwordManager.dto.responses.PasswordsResponse;
import br.com.passwordManager.entities.PasswordEntity;
import br.com.passwordManager.entities.UserEntity;
import br.com.passwordManager.repositories.PasswordRepository;
import br.com.passwordManager.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class PasswordService {

    @Autowired
    private PasswordRepository passwordRepository;

    @Autowired
    private CryptographyService cyptography;

    @Autowired
    private HeadersService headersService;

    @Autowired
    private UsersRepository usersRepository;

    public ResponseEntity<Page<PasswordsResponse>> getPasswords(HttpHeaders headers, Pageable pageable) {

        List<PasswordsResponse> returnListPassword = new ArrayList<PasswordsResponse>();
        Page<PasswordEntity> userPasswordsDB = this.passwordRepository.findAllUserPasswords(headersService.getIdFromToken(headers), pageable);

        userPasswordsDB.getContent().forEach(e -> {
            returnListPassword.add(new PasswordsResponse(e.getId(), cyptography.decrypt(e.getValue())));
        });

        Page<PasswordsResponse> returnPageAbleList = new PageImpl<PasswordsResponse>(returnListPassword);
        return ResponseEntity.ok(returnPageAbleList);
    }

    @Transactional
    public ResponseEntity<Page<PasswordsResponse>> updatePasswords(HttpHeaders headers, List<PasswordsResponse> passwords) {

        /**
         * listas auxiliares
         */
        List<PasswordsResponse> newPasswords = new ArrayList<PasswordsResponse>();
        List<PasswordsResponse> updatedPasswords = new ArrayList<PasswordsResponse>();
        List<UUID> deletedPasswordsIds = new ArrayList<UUID>();

        List<PasswordEntity> dbPasswords = this.passwordRepository.listAllUserPasswords(headersService.getIdFromToken(headers));

        /**
         * confere o que foi adicionado e o que foi atualizado
         */
        passwords.forEach(password -> {
            if(dbPasswords.stream().noneMatch((e) -> e.getId().equals(password.getId()))){
                newPasswords.add(password);
            }else if(dbPasswords.stream().anyMatch((e) -> e.getId().equals(password.getId()))){

                updatedPasswords.add(password);
            }
        });

        /**
         * pega os ids das senhas deletadas
         */
        dbPasswords.forEach(dbPassword -> {
            if(passwords.stream().noneMatch(e -> e.getId().equals(dbPassword.getId()))){
                deletedPasswordsIds.add(dbPassword.getId());
            }
        });

        /**
         * instancia a service para criptografia
         * pega o usuario para adicionar as senhas
         */
        CryptographyService cyptography = new CryptographyService();
        UserEntity user = usersRepository.getById(headersService.getIdFromToken(headers));

        /**
         * adiciona as senhas novas
         */
        if(newPasswords.size() > 0){
            newPasswords.forEach(newPassword -> {
                this.passwordRepository.save(new PasswordEntity(UUID.randomUUID(), cyptography.encrypt(newPassword.getValue()), user));
            });
        }
        /**
         * atualiza as senhas
         */
        if(updatedPasswords.size() > 0 && deletedPasswordsIds.size() == 0){
            updatedPasswords.forEach(updatedPassword -> {
                this.passwordRepository.save(new PasswordEntity(updatedPassword.getId(), cyptography.encrypt(updatedPassword.getValue()), user));
            });
        }
        /**
         * deleta as senhas
         */
        if(deletedPasswordsIds.size() > 0){
            this.passwordRepository.deleteAllById(deletedPasswordsIds);
        }

        Page<PasswordsResponse> newPageableList = new PageImpl<PasswordsResponse>(passwords);

        return ResponseEntity.ok(newPageableList);
    }

}

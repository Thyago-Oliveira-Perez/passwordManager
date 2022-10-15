package br.com.passwordManager.services;

import br.com.passwordManager.dto.requests.DeletedPasswords;
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
    public ResponseEntity<?> insertPasswords(HttpHeaders httpHeaders, List<PasswordsResponse> newPasswords) {

        try{
            CryptographyService cyptography = new CryptographyService();
            UserEntity user = usersRepository.getById(headersService.getIdFromToken(httpHeaders));

            List<PasswordEntity> newPasswordsEntites = new ArrayList<PasswordEntity>();

            newPasswords.forEach(newPassword -> {
                newPasswordsEntites.add(new PasswordEntity(UUID.randomUUID(), cyptography.encrypt(newPassword.getValue()), user));
            });

            this.passwordRepository.saveAll(newPasswordsEntites);

            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> updatePasswords(HttpHeaders httpHeaders, List<PasswordsResponse> updatedPasswords) {

        try{
            CryptographyService cyptography = new CryptographyService();
            UserEntity user = usersRepository.getById(headersService.getIdFromToken(httpHeaders));

            List<PasswordEntity> updatedPasswordsEntites = new ArrayList<PasswordEntity>();

            updatedPasswords.forEach(updatedPassword -> {
                updatedPasswordsEntites.add(new PasswordEntity(updatedPassword.getId(), cyptography.encrypt(updatedPassword.getValue()), user));
            });

            this.passwordRepository.saveAll(updatedPasswordsEntites);

            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> deletePasswords(DeletedPasswords deletedPasswords) {
        try{
            this.passwordRepository.deleteAllById(deletedPasswords.getDeletedPasswords());
            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

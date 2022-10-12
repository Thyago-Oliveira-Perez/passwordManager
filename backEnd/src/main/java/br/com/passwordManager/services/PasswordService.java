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

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

    public ResponseEntity<?> registerPassword(PasswordEntity password){
        try{
            password.setValue(cyptography.encrypt(password.getValue()));
            this.passwordRepository.save(password);
            return ResponseEntity.ok().body("Senha cadastrada com sucesso!");
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Senha já cadastrada!");
        }
    }

    public ResponseEntity<Page<PasswordsResponse>> getPasswords(HttpHeaders headers, Pageable pageable) {

        List<PasswordsResponse> returnListPassword = new ArrayList<PasswordsResponse>();
        Page<PasswordEntity> userPasswordsDB = this.passwordRepository.findAllUserPasswords(headersService.getIdFromToken(headers), pageable);

        userPasswordsDB.getContent().forEach(e -> {
            returnListPassword.add(new PasswordsResponse(e.getId(), cyptography.decrypt(e.getValue())));
        });

        Page<PasswordsResponse> returnPageAbleList = new PageImpl<PasswordsResponse>(returnListPassword);
        return ResponseEntity.ok(returnPageAbleList);
    }

    public ResponseEntity<Page<PasswordsResponse>> updatePasswords(HttpHeaders headers, List<PasswordsResponse> updatedPasswords) {

        CryptographyService cyptography = new CryptographyService();

        UserEntity user = usersRepository.getById(headersService.getIdFromToken(headers));

        List<PasswordEntity> newPasswords = new ArrayList<>();
        updatedPasswords.forEach(e -> {
           newPasswords.add(new PasswordEntity(e.id, cyptography.encrypt(e.value), user));
        });

        Page<PasswordsResponse> newPageableList = new PageImpl<PasswordsResponse>(updatedPasswords);

        this.passwordRepository.saveAll(newPasswords);

        return ResponseEntity.ok(newPageableList);
    }

    public ResponseEntity<?> deletePassword(String idPassword){
        this.passwordRepository.deleteById(UUID.fromString(idPassword));
        return ResponseEntity.ok().build();
    }
}

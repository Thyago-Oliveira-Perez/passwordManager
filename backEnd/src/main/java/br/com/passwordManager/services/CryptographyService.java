package br.com.passwordManager.services;

import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class CryptographyService {

    public String encrypt(String password){
        String encodedPassword = Base64.getEncoder().encodeToString(password.getBytes());
        return encodedPassword;
    }

    public String decrypt(String password){
        byte[] decodedBytes = Base64.getDecoder().decode(password);
        String decodedPassword = new String(decodedBytes);
        return decodedPassword;
    }

}

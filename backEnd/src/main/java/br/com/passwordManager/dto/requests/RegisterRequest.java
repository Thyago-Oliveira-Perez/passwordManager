package br.com.passwordManager.dto.requests;

import lombok.Getter;
import lombok.Setter;

public class RegisterRequest {
    @Getter @Setter
    private String Name;
    @Getter @Setter
    private String Email;
    @Getter @Setter
    private String Password;
}

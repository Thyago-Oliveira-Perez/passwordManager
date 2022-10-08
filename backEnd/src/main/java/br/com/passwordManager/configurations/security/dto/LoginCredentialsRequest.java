package br.com.passwordManager.configurations.security.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

public class LoginCredentialsRequest {
    @NotNull
    @Getter @Setter
    private String login;
    @NotNull
    @Getter @Setter
    private String password;

    public LoginCredentialsRequest(String login, String password) {
        this.login = login;
        this.password = password;
    }
}

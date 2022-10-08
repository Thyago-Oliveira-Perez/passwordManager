package br.com.passwordManager.configurations.security.dto;

public class TokenResponse {

    public String Token;
    //tipo de autenticação = Bearer
    public String AuthenticationType = "Bearer";

    public String UserName;
    public TokenResponse(String token, String userName) {
        this.Token = token;
        this.UserName = userName;
    }
}


package br.com.passwordManager.configurations.security.models;

public class Token {

    public String Token;
    //tipo de autenticação = Bearer
    public String AuthenticationType = "Bearer";

    public String UserName;
    public Token(String token, String userName) {
        this.Token = token;
        this.UserName = userName;
    }
}


package br.com.passwordManager.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
public class PasswordsResponse {

    @Getter @Setter
    public UUID id;
    @Getter @Setter
    public String value;

}

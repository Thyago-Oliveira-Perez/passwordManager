package br.com.passwordManager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class UserDatasResponse {
    @Getter @Setter
    private String name;
    @Getter @Setter
    private String email;
}

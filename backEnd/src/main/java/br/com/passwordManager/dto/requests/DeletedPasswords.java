package br.com.passwordManager.dto.requests;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

public class DeletedPasswords {

    @Getter @Setter
    public List<UUID> deletedPasswords;
}

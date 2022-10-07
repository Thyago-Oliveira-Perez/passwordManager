package br.com.passwordManager.configurations.interfaces;

import br.com.passwordManager.dto.requests.UpdatePasswordRequest;
import br.com.passwordManager.dto.responses.PasswordsResponse;
import br.com.passwordManager.entities.PasswordEntity;
import org.mapstruct.Mapper;

@Mapper
public interface MapStrucutre{

    PasswordsResponse passwordEntityToPasswordResponse(PasswordEntity passwordEntity);
    PasswordEntity passwordRequestToPasswordEntity(UpdatePasswordRequest sourceCode);
}

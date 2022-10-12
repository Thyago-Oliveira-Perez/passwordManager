package br.com.passwordManager.repositories;

import br.com.passwordManager.dto.responses.PasswordsResponse;
import br.com.passwordManager.entities.PasswordEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PasswordRepository extends JpaRepository<PasswordEntity, UUID> {

    @Query("FROM PasswordEntity password WHERE password.user.id = :userId")
    Page<PasswordEntity> findAllUserPasswords(@Param("userId") UUID userId, Pageable pageable);

    @Query("FROM PasswordEntity password WHERE password.user.id = :userId")
    List<PasswordEntity> listAllUserPasswords(@Param("userId") UUID userId);

}

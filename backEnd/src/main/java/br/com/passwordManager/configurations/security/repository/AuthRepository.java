package br.com.passwordManager.configurations.security.repository;

import br.com.passwordManager.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AuthRepository extends JpaRepository<UserEntity, UUID> {

    @Query("FROM UserEntity usuario WHERE usuario.email = :input OR usuario.name = :input")
    Optional<UserEntity> findByLoginOrEmail(@Param("input")String input);

}
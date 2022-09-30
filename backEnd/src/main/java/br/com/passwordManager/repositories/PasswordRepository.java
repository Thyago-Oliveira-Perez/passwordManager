package br.com.passwordManager.repositories;

import br.com.passwordManager.entities.PasswordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PasswordRepository extends JpaRepository<PasswordEntity, UUID> {
}

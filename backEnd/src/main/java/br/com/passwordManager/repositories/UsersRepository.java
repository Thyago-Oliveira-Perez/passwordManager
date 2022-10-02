package br.com.passwordManager.repositories;

import br.com.passwordManager.entities.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.servlet.annotation.WebFilter;
import java.util.UUID;

@Repository
public interface UsersRepository extends JpaRepository<UserEntity, UUID> {

    @Query("FROM UserEntity users WHERE users.Id = :userId")
    public Page<?> findAllUserPassWords(@Param("userId") UUID userId, Pageable pageable);

    @Query("FROM UserEntity  users WHERE users.Id =: userId")
    public String getNameById(@Param("userId") UUID userId);
}

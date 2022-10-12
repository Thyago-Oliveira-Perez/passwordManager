package br.com.passwordManager.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "passwords")
@AllArgsConstructor
@NoArgsConstructor
public class PasswordEntity {

    @Id
    @Getter @Setter
    private UUID id;

    @Getter @Setter
    @NotNull
    @Column(nullable = false)
    private String value;

    @Getter @Setter
    @ManyToOne
    @JoinColumn(name = "users_id")
    private UserEntity user;

}

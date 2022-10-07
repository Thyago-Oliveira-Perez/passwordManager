package br.com.passwordManager.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "passwords")
public class PasswordEntity {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
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

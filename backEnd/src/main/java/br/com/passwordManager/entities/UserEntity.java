package br.com.passwordManager.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.UUID;

@Entity
@Table(name = "Users")
public class UserEntity implements UserDetails  {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private UUID id;

    @Getter @Setter
    @NotNull
    @Column(nullable = false)
    private String name;

    @Getter @Setter
    @NotNull
    @Column(nullable = false)
    private String email;

    @Getter @Setter
    @NotNull
    private String password;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

package br.com.passwordManager.configurations.security;

import br.com.passwordManager.configurations.security.services.AuthService;
import br.com.passwordManager.configurations.security.services.TokenService;
import br.com.passwordManager.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfigurations extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthService autenticacaoService;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UsersRepository usuarioRepository;
    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    //Configurações de autenticações
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.autenticacaoService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }

    //Configurações de autorização(urls publicas e as que precisam de controller)
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/usuarios/register").permitAll()
                .antMatchers(HttpMethod.POST, "/auth/login").permitAll()
                .antMatchers(HttpMethod.GET, "/api-docs/**").permitAll()
                .anyRequest().authenticated()
                .and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(new AuthRequestFilter(tokenService, usuarioRepository), UsernamePasswordAuthenticationFilter.class);
    }

    //Configurações de recursos estaticos(js, css, html, imagens, etc...)
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/**.html",
                        "/v3/api-docs/**",
                        "/webjars/**",
                        "/configuration/**",
                        "/swagger-resources/**",
                        "/swagger-ui/**");
    }

}

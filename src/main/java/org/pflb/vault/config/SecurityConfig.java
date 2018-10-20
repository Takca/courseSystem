package org.pflb.vault.config;

import org.pflb.vault.security.RESTAuthenticationEntryPoint;
import org.pflb.vault.security.RESTAuthenticationFailureHandler;
import org.pflb.vault.security.RESTAuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    RESTAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    RESTAuthenticationFailureHandler authenticationFailureHandler;

    @Autowired
    RESTAuthenticationSuccessHandler authenticationSuccessHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //http.httpBasic();

//        http.csrf()
//                .disable()
//                .authorizeRequests()
//                .antMatchers("/swagger-ui.html").permitAll()
//                .anyRequest().permitAll();
//
//        http.formLogin().permitAll();
//
//        http.logout()
//                .permitAll()
//                .invalidateHttpSession(true);

        http.csrf().disable();
        http.authorizeRequests().antMatchers("/api/**").authenticated();
        http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
        http.formLogin().successHandler(authenticationSuccessHandler);
        http.formLogin().failureHandler(authenticationFailureHandler);
        http.logout().logoutSuccessUrl("/");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder builder) throws Exception {
        builder.inMemoryAuthentication().withUser("admin").password("admin").roles("ADMIN");
    }

//    @Override
//    public void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(rpgUserDetailsService);
//    }

    public void configure(WebSecurity web) {
        web.ignoring()
                .antMatchers("/h2console/**");

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence rawPassword) {
                return String.valueOf(rawPassword);
            }

            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                return rawPassword.equals(encodedPassword);
            }
        };
    }

}

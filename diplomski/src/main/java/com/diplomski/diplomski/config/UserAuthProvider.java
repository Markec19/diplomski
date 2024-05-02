package com.diplomski.diplomski.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.diplomski.diplomski.dto.ProfilDto;
import com.diplomski.diplomski.service.ProfilService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    private final ProfilService profilService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(ProfilDto profil) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3_600_000);

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(profil.getUsername())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withClaim("firstName", profil.getIme())
                .withClaim("lastName", profil.getPrezime())
                .sign(algorithm);
    }

    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decoded = verifier.verify(token);

        ProfilDto profil = ProfilDto.builder()
                .username(decoded.getSubject())
                .ime(decoded.getClaim("firstName").asString())
                .prezime(decoded.getClaim("lastName").asString())
                .build();
        return new UsernamePasswordAuthenticationToken(profil, null, Collections.emptyList());
    }
}

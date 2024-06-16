package com.diplomski.diplomski.rest;

import com.diplomski.diplomski.config.UserAuthProvider;
import com.diplomski.diplomski.dto.CredentialsDto;
import com.diplomski.diplomski.dto.ProfilDto;
import com.diplomski.diplomski.service.ProfilService;
import com.diplomski.diplomski.service.impl.ProfilServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private ProfilService profilService;
    private UserAuthProvider userAuthProvider;

    public AuthController(ProfilServiceImpl profilService, UserAuthProvider userAuthProvider) {
        this.profilService = profilService;
        this.userAuthProvider = userAuthProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<ProfilDto> login(@RequestBody CredentialsDto credentialsDto) throws Exception {
        ProfilDto profilDto = profilService.login(credentialsDto);
        profilDto.setToken(userAuthProvider.createToken(profilDto));
        return ResponseEntity.ok(profilDto);
    }
}

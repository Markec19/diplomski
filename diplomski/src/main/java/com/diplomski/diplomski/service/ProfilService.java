package com.diplomski.diplomski.service;

import com.diplomski.diplomski.dto.CredentialsDto;
import com.diplomski.diplomski.dto.ProfilDto;
import com.diplomski.diplomski.entity.Profil;

public interface ProfilService extends EntityService<Profil> {
    public ProfilDto login(CredentialsDto credentialsDto) throws Exception;

    public ProfilDto findByUsername(String username) throws Exception;

    //Profil vratiProfil(String username);
}

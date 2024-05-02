package com.diplomski.diplomski.dto;

import com.diplomski.diplomski.entity.Profil;
import com.diplomski.diplomski.entity.Rola;
import com.diplomski.diplomski.entity.Zaposleni;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfilDto {

    private int profilId;
    private String username;
    private String password;
    private String ime;
    private String prezime;
    private Rola rola;
    private String token;
}

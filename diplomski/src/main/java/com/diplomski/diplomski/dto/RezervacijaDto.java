package com.diplomski.diplomski.dto;

import com.diplomski.diplomski.entity.Rezervacija;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RezervacijaDto {

    private Rezervacija rezervacija;
    private String username;
}

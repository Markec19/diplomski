package com.diplomski.diplomski.mapper;

import com.diplomski.diplomski.dto.ProfilDto;
import com.diplomski.diplomski.entity.Profil;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfilMapper {

    ProfilDto toProfilDto(Profil profil);


}

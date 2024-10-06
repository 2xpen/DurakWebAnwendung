package org.hacienda.durakweb.api.dto.spielerDTO;

import lombok.Getter;
import org.hacienda.durakweb.data.Spieler;


@Getter
public class SpielerAnzeigenViewDTO {

    private String name;
    private String profilePicture = "";

    public SpielerAnzeigenViewDTO(Spieler spieler) {
        this.name = spieler.getName();
        this.profilePicture = spieler.getprofilePicture();
    }

    public SpielerAnzeigenViewDTO() {
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}

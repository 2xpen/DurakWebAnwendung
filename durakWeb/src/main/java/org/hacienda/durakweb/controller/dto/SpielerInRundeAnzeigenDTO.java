package org.hacienda.durakweb.controller.dto;

import lombok.Getter;
import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.data.SpielerStandRecord;
import org.hacienda.durakweb.data.identifier.SpielerId;

@Getter
public class SpielerInRundeAnzeigenDTO {
    private final String spielername;
    private final SpielerId spielerId;
    private final String profilePicture;
    private final Integer stand;

    public SpielerInRundeAnzeigenDTO(Spieler spieler, SpielerStandRecord spielerStandRecord) {
        this.spielername = spieler.getName();
        this.spielerId = spieler.getSpielerId();
        this.profilePicture = spieler.getprofilePicture();
        this.stand = spielerStandRecord.getStand();
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public SpielerId getSpielerId() {
        return spielerId;
    }

    public Integer getStand() {
        return stand;
    }

    public String getSpielername() {
        return spielername;
    }
}

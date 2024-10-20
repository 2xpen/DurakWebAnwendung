package org.hacienda.durakweb.api.dto.spielerDTO;

import lombok.Getter;
import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.data.SpielerStandRecord;

@Getter
public class SpielerInRundeAnzeigenDTO {
    private final String name;
    private final String spielerId;
    private final String profilePicture;
    private final Integer durakStand;

    public SpielerInRundeAnzeigenDTO(Spieler spieler, SpielerStandRecord spielerStandRecord) {
        this.name = spieler.getName();
        this.spielerId = spieler.getSpielerId().toString();
        this.profilePicture = spieler.getprofilePicture();
        this.durakStand = spielerStandRecord.getDurakAnzahl();
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public String getSpielerId() {
        return spielerId;
    }

    public Integer getDurakStand() {
        return durakStand;
    }

    public String getName() {
        return name;
    }
}

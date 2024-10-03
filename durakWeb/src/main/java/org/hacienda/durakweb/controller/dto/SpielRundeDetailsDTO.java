package org.hacienda.durakweb.controller.dto;

import lombok.Getter;
import org.hacienda.durakweb.data.Spielrunde;

import java.util.List;

@Getter
public class SpielRundeDetailsDTO {

    private final String spielRundenName;
    private final String spielRundenId;
    private final List<SpielerInRundeAnzeigenDTO> spielerInRundeAnzeigenDTOS;

    public SpielRundeDetailsDTO(Spielrunde spielrunde, List<SpielerInRundeAnzeigenDTO> spielerInRundeAnzeigenDTOS) {
        this.spielRundenId = spielrunde.getSpielRundenId().toString();
        this.spielRundenName = spielrunde.getSpielRundenName();
        this.spielerInRundeAnzeigenDTOS = spielerInRundeAnzeigenDTOS;
    }

    public List<SpielerInRundeAnzeigenDTO> getSpielerInRundeAnzeigenDTOS() {
        return spielerInRundeAnzeigenDTOS;
    }

    public String getSpielRundenId() {
        return spielRundenId;

    }

    public String getSpielRundenName() {
        return spielRundenName;
    }

}

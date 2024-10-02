package org.hacienda.durakweb.controller.dto;

import lombok.Getter;
import org.hacienda.durakweb.data.Spielrunde;
import org.hacienda.durakweb.data.identifier.SpielrundenId;

import java.util.List;

@Getter
public class SpielRundeDetailsDTO {

    private final String spielrundenNamen;
    private final SpielrundenId spielrundenId;
    private final List<SpielerInRundeAnzeigenDTO> spielerInRundeAnzeigenDTOS;

    public SpielRundeDetailsDTO(Spielrunde spielrunde, List<SpielerInRundeAnzeigenDTO> spielerInRundeAnzeigenDTOS) {
        this.spielrundenId = spielrunde.getSpielRundenId();
        this.spielrundenNamen = spielrunde.getSpielRundenName();
        this.spielerInRundeAnzeigenDTOS = spielerInRundeAnzeigenDTOS;
    }

    public List<SpielerInRundeAnzeigenDTO> getSpielerInRundeAnzeigenDTOS() {
        return spielerInRundeAnzeigenDTOS;
    }

    public SpielrundenId getSpielrundenId() {
        return spielrundenId;
    }

    public String getSpielrundenNamen() {
        return spielrundenNamen;
    }

}

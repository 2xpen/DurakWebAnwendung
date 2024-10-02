package org.hacienda.durakweb.controller.dto;

import lombok.Getter;
import org.hacienda.durakweb.data.Spielrunde;
import org.hacienda.durakweb.data.identifier.SpielrundenId;

import java.util.ArrayList;
import java.util.List;

@Getter
public class SpielrundeAuswahlDTO {
    private final SpielrundenId spielRundenId;
    private final String spielRundenNamen;
    private final List<SpielerAnzeigenViewDTO> spielerAnzeigenViewDTOS = new ArrayList<>();

    public SpielrundeAuswahlDTO(Spielrunde spielrunde, List<SpielerAnzeigenViewDTO> spielerAnzeigenViewDTOS) {
        this.spielRundenId = spielrunde.getSpielRundenId();
        this.spielRundenNamen = spielrunde.getSpielRundenName();
        this.spielerAnzeigenViewDTOS.addAll(spielerAnzeigenViewDTOS);
    }

    public SpielrundenId getSpielRundenId() {
        return spielRundenId;
    }

    public List<SpielerAnzeigenViewDTO> getSpielerAnzeigenViewDTOS() {
        return spielerAnzeigenViewDTOS;
    }

    public String getSpielRundenNamen() {
        return spielRundenNamen;
    }


}

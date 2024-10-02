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
    private final List<SpielerAnzeigenViewDTO> spielerAnzeigenDTOlist = new ArrayList<>();

    public SpielrundeAuswahlDTO(Spielrunde spielrunde,List<SpielerAnzeigenViewDTO> spielerAnzeigenDTOlist){
        this.spielRundenId = spielrunde.getSpielRundenId();
        this.spielRundenNamen = spielrunde.getSpielRundenName();
        this.spielerAnzeigenDTOlist.addAll(spielerAnzeigenDTOlist);
    }

    public SpielrundenId getSpielRundenId() {
        return spielRundenId;
    }

    public List<SpielerAnzeigenViewDTO> getSpielerAnzeigenDTOlist() {
        return spielerAnzeigenDTOlist;
    }

    public String getSpielRundenNamen() {
        return spielRundenNamen;
    }



}

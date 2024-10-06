package org.hacienda.durakweb.api.dto.spielrundeDTO;

import lombok.Getter;
import org.hacienda.durakweb.api.dto.spielerDTO.SpielerAnzeigenViewDTO;
import org.hacienda.durakweb.data.Spielrunde;

import java.util.ArrayList;
import java.util.List;

@Getter
public class SpielrundeAuswahlDTO {
    private final String spielRundenId;
    private final String spielRundenName;
    private final List<SpielerAnzeigenViewDTO> spielerAnzeigenViewDTOS = new ArrayList<>();

    public SpielrundeAuswahlDTO(Spielrunde spielrunde, List<SpielerAnzeigenViewDTO> spielerAnzeigenViewDTOS) {
        this.spielRundenId = spielrunde.getSpielRundenId().toString();
        this.spielRundenName = spielrunde.getSpielRundenName();
        this.spielerAnzeigenViewDTOS.addAll(spielerAnzeigenViewDTOS);
    }

    public String getSpielRundenId() {
        return spielRundenId;
    }

    public List<SpielerAnzeigenViewDTO> getSpielerAnzeigenViewDTOS() {
        return spielerAnzeigenViewDTOS;
    }

    public String getSpielRundenName() {
        return spielRundenName;
    }


}

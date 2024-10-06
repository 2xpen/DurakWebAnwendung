package org.hacienda.durakweb.api.controller.requests;

import lombok.Getter;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;

@Getter
public class ChangeDurakStandRequest {
    private final SpielrundenId spielrundenId;
    private final SpielerId spielerId;
    private final Integer verrechungszahl;

    ChangeDurakStandRequest(SpielrundenId spielRundenId, SpielerId spielerId, Integer verrechnungszahl) {
        this.spielrundenId = spielRundenId;
        this.spielerId = spielerId;
        this.verrechungszahl = verrechnungszahl;
    }


    public SpielerId getSpielerId() {
        return spielerId;
    }

    public SpielrundenId getSpielrundenId() {
        return spielrundenId;
    }


    public Integer getVerrechungszahl() {
        return verrechungszahl;
    }


}

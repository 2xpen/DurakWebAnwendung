package org.hacienda.durakweb.api.controller.requests;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.hacienda.durakweb.constants.DurakArt;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;

@Slf4j
@Getter
public class ChangeDurakStandRequest {
    private final SpielrundenId spielrundenId;
    private final SpielerId spielerId;
    private final DurakArt durakArt;
    private final boolean isKorrektur;

    ChangeDurakStandRequest(SpielrundenId spielRundenId, SpielerId spielerId, String durakArt, boolean isKorrektur) {
        this.spielrundenId = spielRundenId;
        this.spielerId = spielerId;
        this.durakArt = DurakArt.of(durakArt);
        log.info(durakArt);
        this.isKorrektur = isKorrektur;
    }

    public SpielerId getSpielerId() {
        return spielerId;
    }

    public SpielrundenId getSpielrundenId() {
        return spielrundenId;
    }

    public DurakArt getDurakArt() {
        return durakArt;
    }

    public boolean isKorrektur() {
        return isKorrektur;
    }


    @Override
    public String toString() {
        return "ChangeDurakStandRequest{" +
                "spielrundenId=" + spielrundenId +
                ", spielerId=" + spielerId +
                ", durakArt=" + durakArt +
                ", isKorrektur=" + isKorrektur +
                '}';
    }
}

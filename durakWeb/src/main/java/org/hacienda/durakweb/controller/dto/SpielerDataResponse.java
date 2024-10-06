package org.hacienda.durakweb.controller.dto;

import org.hacienda.durakweb.data.Spieler;

public class SpielerDataResponse {
    private final String name;
    private final String spielerId;
    private final String profilePicture;

    public SpielerDataResponse(Spieler spieler) {
        this.name = spieler.getName();
        this.spielerId = spieler.getSpielerId().toString();
        this.profilePicture = spieler.getprofilePicture();
    }

    public String getSpielerId() {
        return spielerId;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public String getName() {
        return name;
    }

}

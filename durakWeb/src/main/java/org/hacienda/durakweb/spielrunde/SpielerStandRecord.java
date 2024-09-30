package org.hacienda.durakweb.spielrunde;

import org.hacienda.durakweb.identifier.SpielerId;

public class SpielerStandRecord {

    private final SpielerId spielerId;
    private Integer stand;

    SpielerStandRecord(SpielerId spielerId) {
        this.spielerId = spielerId;
        this.stand = 0;
    }

    public SpielerId getSpielerId() {
        return spielerId;
    }

    public Integer getStand() {
        return stand;
    }

    public void setStand(Integer stand) {
        this.stand = stand;
    }

}

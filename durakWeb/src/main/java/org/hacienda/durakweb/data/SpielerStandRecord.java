package org.hacienda.durakweb.data;

import org.hacienda.durakweb.data.identifier.SpielerId;

public class SpielerStandRecord {

    private final SpielerId spielerId;
    private Integer stand;

    public SpielerStandRecord(SpielerId spielerId) {
        this.spielerId = spielerId;
        this.stand = 0;
    }

    public SpielerId getSpielerId() {
        return spielerId;
    }

    public Integer getStand() {
        return stand;
    }

    @Override
    public String toString() {
        return super.toString();
    }

    public void setStand(Integer stand) {
        this.stand = stand;
    }

}

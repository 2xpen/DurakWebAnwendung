package org.hacienda.durakweb.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hacienda.durakweb.data.identifier.SpielerId;

public class SpielerStandRecord {

    private final SpielerId spielerId;
    private Integer stand;

    public SpielerStandRecord(SpielerId spielerId) {
        this.spielerId = spielerId;
        this.stand = 0;
    }

    @JsonCreator
    public SpielerStandRecord(@JsonProperty("spielerId") SpielerId spielerId,
                              @JsonProperty("stand") Integer stand) {
        this.spielerId = spielerId;
        this.stand = stand != null ? stand : 0; // Standardwert auf 0 setzen, wenn nicht angegeben
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

    @Override
    public String toString() {
        return super.toString();
    }

}

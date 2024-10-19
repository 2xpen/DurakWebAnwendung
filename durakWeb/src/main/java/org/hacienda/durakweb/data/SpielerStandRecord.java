package org.hacienda.durakweb.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hacienda.durakweb.data.identifier.SpielerId;

public class SpielerStandRecord {

    private final SpielerId spielerId;
    private Integer normalesDurakAnzahl;
    private Integer bockrundenAnzahl;

    public SpielerStandRecord(SpielerId spielerId) {
        this.spielerId = spielerId;
        this.normalesDurakAnzahl = 0;
        this.bockrundenAnzahl = 0;
    }

    @JsonCreator
    public SpielerStandRecord(@JsonProperty("spielerId") SpielerId spielerId,
                              @JsonProperty("normalesDurakAnzahl") Integer normalesDurakAnzahl,
                              @JsonProperty("bockrundenAnzahl") Integer bockrundenAnzahl) {
        this.spielerId = spielerId;
        this.normalesDurakAnzahl = normalesDurakAnzahl != null ? normalesDurakAnzahl : 0; // Standardwert auf 0 setzen, wenn nicht angegeben
        this.bockrundenAnzahl = bockrundenAnzahl != null ? bockrundenAnzahl : 0;
    }

    public SpielerId getSpielerId() {
        return spielerId;
    }

    public Integer getNormalesDurakAnzahl() {
        return normalesDurakAnzahl;
    }

    public void setNormalesDurakAnzahl(Integer normalesDurakAnzahl) {
        this.normalesDurakAnzahl = normalesDurakAnzahl;
    }

    public Integer getBockrundenAnzahl() {
        return bockrundenAnzahl;
    }

    public void setBockrundenAnzahl(Integer bockrundenAnzahl) {
        this.bockrundenAnzahl = bockrundenAnzahl;
    }

    @JsonIgnore
    public Integer getDurakAnzahl() {
        return this.bockrundenAnzahl + this.normalesDurakAnzahl;
    }

    @Override
    public String toString() {
        return super.toString();
    }

}

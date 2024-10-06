package org.hacienda.durakweb.api.dto.spielerDTO;

import org.hacienda.durakweb.data.identifier.SpielerId;

public class SpielerStandRecordDTO {


    private final String spielerId;
    private final Integer durakStand;

    public SpielerStandRecordDTO(SpielerId spielerId, Integer durakStand) {
        this.spielerId = spielerId.getId().toString();
        this.durakStand = durakStand;
    }

    public Integer getDurakStand() {
        return durakStand;
    }

    public String getSpielerId() {
        return spielerId;
    }


}

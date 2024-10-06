package org.hacienda.durakweb.api.dto.spielrundeDTO;

import lombok.Getter;

@Getter
public class SpielRundeCreateParamDTO {
    String[] spielerIds;
    String spielRundenName;

    public SpielRundeCreateParamDTO(String[] spielerIds, String spielRundenName) {
        this.spielerIds = spielerIds;
        this.spielRundenName = spielRundenName;
    }

    SpielRundeCreateParamDTO() {

    }

    public String[] getSpielerIds() {
        return spielerIds;
    }

    public String getSpielRundenName() {
        return spielRundenName;
    }
//
//    public void setSpielerIds(String[] spielerIds) {
//        this.spielerIds = spielerIds;
//    }
//
//    public void setSpielRundenName(String spielRundenName) {
//        this.spielRundenName = spielRundenName;
//    }

}

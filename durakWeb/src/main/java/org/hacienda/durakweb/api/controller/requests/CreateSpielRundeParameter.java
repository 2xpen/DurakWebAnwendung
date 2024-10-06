package org.hacienda.durakweb.api.controller.requests;

import org.hacienda.durakweb.data.SpielerStandRecord;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;

import java.util.ArrayList;
import java.util.List;

public class CreateSpielRundeParameter {

    private final String spielRundenName;
    private final List<String> spielerInfos = new ArrayList<>();


    public CreateSpielRundeParameter(String spielRundenName, List<String> spielerIds) {
        this.spielRundenName = spielRundenName;
        this.spielerInfos.addAll(spielerIds);
    }

    public String getSpielRundenName() {
        return spielRundenName;
    }


    public List<String> getSpielerInfos() {
        return spielerInfos;
    }


}



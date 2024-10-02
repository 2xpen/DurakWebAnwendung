package org.hacienda.durakweb.data;

import lombok.Getter;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;

import java.util.ArrayList;
import java.util.List;

@Getter
public class Spielrunde {

    private final SpielrundenId spielRundenId;
    private String spielRundenName;
    private final List<SpielerStandRecord> spielerInfos = new ArrayList<>();

    public Spielrunde(String spielRundenName, List<String> spielerIds) {
        this.spielRundenName = spielRundenName;
        this.spielRundenId = new SpielrundenId();

        for (String id : spielerIds) {
            this.spielerInfos.add(new SpielerStandRecord(new SpielerId(id)));
        }
    }

    public String getSpielRundenName() {
        return spielRundenName;
    }

    public List<SpielerStandRecord> getSpielerInfos() {
        return spielerInfos;
    }

    public SpielrundenId getSpielRundenId() {
        return spielRundenId;
    }

    public void setSpielRundenName(String spielRundenName) {
        this.spielRundenName = spielRundenName;
    }


}


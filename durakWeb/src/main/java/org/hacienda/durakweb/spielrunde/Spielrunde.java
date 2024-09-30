package org.hacienda.durakweb.spielrunde;

import lombok.Getter;
import org.hacienda.durakweb.identifier.SpielerId;
import org.hacienda.durakweb.identifier.SpielrundenId;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class Spielrunde {

    private final SpielrundenId spielRundenId;
    private String name;
    private final List<SpielerStandRecord> spielerInfos = new ArrayList<>();

    public Spielrunde(String name,List<SpielerId> spielerIds) {
        this.name = name;
        this.spielRundenId = new SpielrundenId();

        for(SpielerId id : spielerIds){
            this.spielerInfos.add(new SpielerStandRecord(id));
        }
    }

    public String getName() {
        return name;
    }

    public List<SpielerStandRecord> getSpielerInfos() {
        return spielerInfos;
    }

    public SpielrundenId getSpielRundenId() {
        return spielRundenId;
    }

    public void setName(String name) {
        this.name = name;
    }


}

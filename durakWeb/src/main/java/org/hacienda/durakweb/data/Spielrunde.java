package org.hacienda.durakweb.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;

import java.util.ArrayList;
import java.util.List;

@Getter
public class Spielrunde {

    private final SpielrundenId spielRundenId;
    private final String spielRundenName;
    private final List<SpielerStandRecord> spielerInfos = new ArrayList<>();

    public Spielrunde(String spielRundenName, List<String> spielerIds) {
        this.spielRundenName = spielRundenName;
        this.spielRundenId = new SpielrundenId();
        System.out.println("ES WURDE DER GEILE CONSTRUKTOR GENOMMEN");
        for (String id : spielerIds) {
            this.spielerInfos.add(new SpielerStandRecord(new SpielerId(id)));
        }
    }


    @JsonCreator
    public Spielrunde(@JsonProperty("spielRundenName") String spielRundenName,
                      @JsonProperty("spielRundenId") SpielrundenId spielRundenId,
                      @JsonProperty("spielerInfos") List<SpielerStandRecord> spielerStandRecords) {
        System.out.println("ES WURDE DER BASTARD CONSTRUKTOR GENOMMEN");
        this.spielRundenName = spielRundenName;
        this.spielRundenId = spielRundenId == null ? new SpielrundenId() : spielRundenId;
        this.spielerInfos.addAll(spielerStandRecords);
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


}


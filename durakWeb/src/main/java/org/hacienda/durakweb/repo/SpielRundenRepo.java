package org.hacienda.durakweb.repo;

import org.hacienda.durakweb.data.SpielerStandRecord;
import org.hacienda.durakweb.data.Spielrunde;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class SpielRundenRepo {

    List<Spielrunde> spielRunden = new ArrayList<>();

    public List<Spielrunde> getSpielRunden() {
        return spielRunden;
    }

    public Spielrunde getSpielRundeById(SpielrundenId id) {
        return spielRunden.stream()
                .filter(spieler -> spieler.getSpielRundenId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public void addSpielRunde(Spielrunde spielRunde) {
        spielRunden.add(spielRunde);
    }


    public List<SpielerId> getSpielerIdsOfSpielerRunde(Spielrunde spielRunde) {
        Spielrunde spielrunde = getSpielRundeById(spielRunde.getSpielRundenId());

        List<SpielerId> spielerIds = new ArrayList<>();

        spielrunde.getSpielerInfos().forEach(s -> spielerIds.add(s.getSpielerId()));
        return spielerIds;
    }

    public SpielerStandRecord getSpielerStandRecordBySpielerId(SpielerId spielerId, SpielrundenId spielRundeId) {
        return
                getSpielRundeById(spielRundeId).
                        getSpielerInfos().stream().filter
                                (s -> s.getSpielerId().equals(spielerId)).findFirst().orElse(null);
    }


}


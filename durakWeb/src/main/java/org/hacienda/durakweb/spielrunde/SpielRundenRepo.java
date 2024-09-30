package org.hacienda.durakweb.spielrunde;

import org.hacienda.durakweb.identifier.SpielrundenId;
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


}


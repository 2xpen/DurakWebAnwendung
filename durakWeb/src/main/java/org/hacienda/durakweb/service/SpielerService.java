package org.hacienda.durakweb.service;


import lombok.extern.slf4j.Slf4j;
import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.durakfehlermeldung.DurakFehlerMeldung;
import org.hacienda.durakweb.repo.SpielRundenRepo;
import org.hacienda.durakweb.repo.SpielerRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class SpielerService {

    private final SpielerRepo repo;

    SpielerService(SpielerRepo repo) {
        this.repo = repo;
    }


    public void addSpieler(Spieler spieler) {
        repo.addSpieler(spieler);
    }

    public void removeSpieler(Spieler spieler) {
        repo.removeSpielerById(spieler.getSpielerId());
    }

    public List<Spieler> getAllSpieler() {

        return repo.getSpielerListe();
    }

    public List<Spieler> getSpielerById(List<SpielerId> spielerIds) {
        return repo.getSpielerById(spielerIds);
    }

    public Spieler getSpielerById(SpielerId spielerIds) throws DurakFehlerMeldung {
        return repo.getSpielerById(spielerIds);
    }


    // eigentlich utility
    public List<SpielerId> convertStringToSpielerId(List<String> idStrings) {
        List<SpielerId> convertierteSpielerIds = new ArrayList<>();
        for (String id : idStrings) {
            convertierteSpielerIds.add(new SpielerId(id));
        }
        return convertierteSpielerIds;
    }

    public SpielerId convertStringToSpielerId(String idString) {
        return new SpielerId(idString);
    }


}

package org.hacienda.durakweb.service;


import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.repo.SpielerRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SpielerService {

    SpielerRepo repo;


    SpielerService(SpielerRepo repo) {
        this.repo = repo;
    }


    public void addSpieler(Spieler spieler) {
        repo.addSpieler(spieler);
    }

    public List<Spieler> getAllSpieler() {
        return repo.getSpielerListe();
    }

    public List<Spieler> getSpielerById(List<SpielerId> spielerIds){
        return repo.getSpielerById(spielerIds);
    }







    // eigentlich utility
    public List<SpielerId> convertStringToSpielerId(String[] idStrings){
        List<SpielerId> convertierteSpielerIds = new ArrayList<>();
        for(String id : idStrings){
            convertierteSpielerIds.add(new SpielerId(id));
        }
        return convertierteSpielerIds;
    }


}

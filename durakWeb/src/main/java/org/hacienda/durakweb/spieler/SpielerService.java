package org.hacienda.durakweb.spieler;


import org.springframework.stereotype.Service;

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


}

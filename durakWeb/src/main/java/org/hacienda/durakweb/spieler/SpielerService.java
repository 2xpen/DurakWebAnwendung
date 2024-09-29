package org.hacienda.durakweb.spieler;


import org.springframework.stereotype.Service;

@Service
public class SpielerService {

    SpielerRepo repo;


    SpielerService(SpielerRepo repo) {
        this.repo = repo;
    }


    public void addSpieler(Spieler spieler) {
        repo.addSpieler(spieler);
    }


}

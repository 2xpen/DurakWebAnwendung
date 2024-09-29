package org.hacienda.durakweb.spieler;


import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class SpielerRepo {


    List<Spieler> spielerListe = new ArrayList<>();


    public void addSpieler(Spieler spieler) {
        System.out.println("Spieler " + spieler.getName() + " added");
        spielerListe.add(spieler);
    }



}

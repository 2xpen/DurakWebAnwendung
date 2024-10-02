package org.hacienda.durakweb.repo;


import lombok.extern.slf4j.Slf4j;
import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
public class SpielerRepo {


    List<Spieler> spielerListe = new ArrayList<>();


    public void addSpieler(Spieler spieler) {
        System.out.println("Spieler " + spieler.getName() + " added");
        spielerListe.add(spieler);
    }

    public List<Spieler> getSpielerListe() {
        return spielerListe;
    }

    public void removeSpielerById(SpielerId spielerId) {
        spielerListe.forEach(spieler -> {if(spieler.getSpielerId().equals(spielerId)){spielerListe.remove(spieler);}});
    }

    public List<Spieler> getSpielerById(List<SpielerId> spielerIds) {

        log.info("Spieler liste: " + spielerListe.toString());

        List<Spieler> gefundeneSpieler = new ArrayList<>();

        for (Spieler spieler : spielerListe) {
            for (SpielerId spielerId : spielerIds) {

                System.out.println(spieler.getSpielerId() + " " + spielerId);

                if (spieler.getSpielerId().equals(spielerId)) {

                    System.out.println("Spieler " + spieler.getName() + " gefunden");
                    //todo PERFORMANCE
                    // hier wenn eine der SpielerIds gefunden aus der liste entfernen
                    gefundeneSpieler.add(spieler);
                }
            }
        }
        return gefundeneSpieler;
    }


}

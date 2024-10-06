package org.hacienda.durakweb.repo;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.hacienda.durakweb.data.DateiPfade;
import org.hacienda.durakweb.data.Serialisierbar;
import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.durakfehlermeldung.DurakFehlerMeldung;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
public class SpielerRepo implements Serialisierbar {


    List<Spieler> spielerListe = new ArrayList<>();


    public SpielerRepo() {
        load();
    }

    public void addSpieler(Spieler spieler) {
        System.out.println("Spieler " + spieler.getName() + " added");
        spielerListe.add(spieler);
        save();
    }

    public List<Spieler> getSpielerListe() {
        return spielerListe;
    }

    public void removeSpielerById(SpielerId spielerId) {
        spielerListe.forEach(spieler -> {
            if (spieler.getSpielerId().equals(spielerId)) {
                spielerListe.remove(spieler);
            }
        });
        save();
    }

    public List<Spieler> getSpielerById(List<SpielerId> spielerIds) {

        log.info("Spieler liste: " + spielerListe.stream().toString());

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

    public Spieler getSpielerById(SpielerId spielerId) throws DurakFehlerMeldung {

        log.info("Spieler liste: " + spielerListe.stream().toString());

        try {
            for (Spieler spieler : spielerListe) {
                System.out.println(spieler.getSpielerId() + " " + spielerId);

                if (spieler.getSpielerId().equals(spielerId)) {

                    System.out.println("Spieler " + spieler.getName() + " gefunden");
                    //todo PERFORMANCE
                    // hier wenn eine der SpielerIds gefunden aus der liste entfernen
                    return spieler;
                }
            }
        } catch (Exception e) {
            log.error("Spieler " + spielerId + " nicht gefunden");
        }
        return null;
    }

    @Override
    public void save() {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            objectMapper.writeValue(new FileWriter(DateiPfade.SPIERLERREPO.getPath()), spielerListe);
            System.out.println("Spieler wurden gespeichert");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            System.out.println("Fehler beim Serialisieren: " + e.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Fehler beim Schreiben in die Datei: " + e.getMessage());
        }
    }


    public void load() {

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            Spieler[] spielerArray = objectMapper.readValue(new File(DateiPfade.SPIERLERREPO.getPath()), Spieler[].class);
            this.spielerListe = new ArrayList<>(List.of(spielerArray));
            System.out.println("Spieler wurden geladen");
        } catch (IOException e) {
            this.spielerListe = new ArrayList<>();
            e.printStackTrace();
            System.out.println("Fehler beim Lesen aus der Datei: " + e.getMessage());
        }
    }

}

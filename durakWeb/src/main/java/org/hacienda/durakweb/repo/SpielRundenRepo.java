package org.hacienda.durakweb.repo;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.hacienda.durakweb.api.controller.requests.ChangeDurakStandRequest;
import org.hacienda.durakweb.constants.DateiPfade;
import org.hacienda.durakweb.data.*;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;
import org.hacienda.durakweb.durakfehlermeldung.DurakFehlerMeldung;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
public class SpielRundenRepo implements Serialisierbar {

    List<Spielrunde> spielrunden = new ArrayList<>();

    public SpielRundenRepo() {
        load();
    }

    public List<Spielrunde> getSpielrunden() {
        return spielrunden;
    }

    public Spielrunde getSpielRundeById(SpielrundenId id) {
        return spielrunden.stream()
                .filter(spieler -> spieler.getSpielRundenId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public void addSpielRunde(Spielrunde spielRunde) {
        spielrunden.add(spielRunde);
        save();
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


    public SpielerStandRecord changeSpielerstandRecord(ChangeDurakStandRequest req) throws DurakFehlerMeldung {
        SpielerStandRecord currentRecord = getSpielerStandRecordBySpielerId(req.getSpielerId(), req.getSpielrundenId());

        switch (req.getDurakArt()) {
            case NORMAL:
                currentRecord.setNormalesDurakAnzahl(currentRecord.getNormalesDurakAnzahl() + 1);
                break;
            case BOCKRUNDE:
                currentRecord.setBockrundenAnzahl(currentRecord.getBockrundenAnzahl() + 2);
                break;
            case UNBEKANNT:
                throw new DurakFehlerMeldung("DURAK ART NICHT GEFUNDEN");
        }
        save();
        return currentRecord;
    }

    public SpielerStandRecord korrekturSpielerStandRecord(ChangeDurakStandRequest req) throws DurakFehlerMeldung {

        SpielerStandRecord currentRecord = getSpielerStandRecordBySpielerId(req.getSpielerId(), req.getSpielrundenId());
        log.info("es wurde eine Korrektur durchgeführt");

        switch (req.getDurakArt()) {
            case NORMAL:
                currentRecord.setNormalesDurakAnzahl(currentRecord.getNormalesDurakAnzahl() - 1);
                break;
            case BOCKRUNDE:
                currentRecord.setBockrundenAnzahl(currentRecord.getBockrundenAnzahl() - 2);
                log.info("es wurde eine Bockrunden Korrektur durchgeführt");
                break;
            case UNBEKANNT:
                throw new DurakFehlerMeldung("DURAK ART NICHT GEFUNDEN");
        }
        save();
        return currentRecord;
    }

    @Override
    public void save() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.writeValue(new File(DateiPfade.SPIELERRUNDENREPO.getPath()), spielrunden);
            System.out.println("SpielRunden wurden gespeichert");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            System.out.println("Fehler beim Serialisieren: " + e.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Fehler beim Schreiben in die Datei: " + e.getMessage());
        }
    }

@Override
    public void load() {

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            Spielrunde[] spielrunden = objectMapper.readValue(new File(DateiPfade.SPIELERRUNDENREPO.getPath()), Spielrunde[].class);
            this.spielrunden = new ArrayList<>(List.of(spielrunden));
            System.out.println("SpielRunden wurden geladen");
        } catch (IOException e) {
            this.spielrunden = new ArrayList<>();
            e.printStackTrace();
            System.out.println("Fehler beim Lesen aus der Datei: " + e.getMessage());
        }
    }

}


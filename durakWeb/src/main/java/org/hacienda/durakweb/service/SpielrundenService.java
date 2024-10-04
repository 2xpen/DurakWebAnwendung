package org.hacienda.durakweb.service;

import lombok.extern.slf4j.Slf4j;
import org.hacienda.durakweb.data.SpielerStandRecord;
import org.hacienda.durakweb.data.Spielrunde;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.hacienda.durakweb.repo.SpielRundenRepo;

import java.util.List;

@Slf4j
@Service
public class SpielrundenService {

    private final SpielRundenRepo repo;

    @Autowired
    public SpielrundenService(SpielRundenRepo spielRundenRepo) {
        this.repo = spielRundenRepo;
    }


    public List<Spielrunde> getAlleSpielrunde() {
        return repo.getSpielrunden();
    }

    public Spielrunde addSpielRunde(Spielrunde spielRunde) {

        log.info("diese spielrunde wurde geadded {} {}", spielRunde.getSpielRundenName(), spielRunde.getSpielRundenId());
        repo.addSpielRunde(spielRunde);
        return spielRunde;
    }

    public List<SpielerId> getSpielerIdsOfSpielrunde(Spielrunde spielrunde) {
        return repo.getSpielerIdsOfSpielerRunde(spielrunde);
    }

    public Spielrunde getSpielRundeById(SpielrundenId spielRundeId) {
        return repo.getSpielRundeById(spielRundeId);
    }

    public SpielerStandRecord getSpielerStandRecordById(SpielrundenId spielrundenId, SpielerId spielerId) {
        return repo.getSpielerStandRecordBySpielerId(spielerId, spielrundenId);
    }

    public SpielerStandRecord changeSpielerstandRecord(SpielerId spielerId, SpielrundenId spielrundenId, Integer verrechnungsZahl) {
        return repo.changeSpielerstandRecord(spielrundenId, spielerId, verrechnungsZahl);
    }

}


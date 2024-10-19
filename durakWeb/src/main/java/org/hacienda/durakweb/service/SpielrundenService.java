package org.hacienda.durakweb.service;

import lombok.extern.slf4j.Slf4j;
import org.hacienda.durakweb.api.controller.requests.ChangeDurakStandRequest;
import org.hacienda.durakweb.constants.DurakArt;
import org.hacienda.durakweb.data.SpielerStandRecord;
import org.hacienda.durakweb.data.Spielrunde;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;
import org.hacienda.durakweb.durakfehlermeldung.DurakFehlerMeldung;
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

    public SpielerStandRecord changeSpielerstandRecord(ChangeDurakStandRequest req) throws DurakFehlerMeldung {

        if (!req.isKorrektur()) {
            return repo.changeSpielerstandRecord(req);
        } else {
            return repo.korrekturSpielerStandRecord(req);
        }

    }
}


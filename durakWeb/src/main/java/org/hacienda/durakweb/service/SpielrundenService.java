package org.hacienda.durakweb.service;

import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.data.Spielrunde;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.hacienda.durakweb.repo.SpielRundenRepo;

import java.util.List;

@Service
public class SpielrundenService {

    private final SpielRundenRepo repo;

    @Autowired
    public SpielrundenService(SpielRundenRepo spielRundenRepo) {
        this.repo = spielRundenRepo;
    }


    public List<Spielrunde> getAlleSpielrunde(){
        return repo.getSpielRunden();
    }

    public Spielrunde addSpielRunde(Spielrunde spielRunde){
        System.out.println("diese spielrunde wurde geadded "+spielRunde.getSpielRundenName() + " " + spielRunde.getSpielRundenId());
        repo.addSpielRunde(spielRunde);
        return spielRunde;
    }

    public List<SpielerId> getSpielerIdsOfSpielrunde(Spielrunde spielrunde){
        return repo.getSpielerIdsOfSpielerRunde(spielrunde);
    }




}

package org.hacienda.durakweb.spielrunde;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        repo.addSpielRunde(spielRunde);
        return spielRunde;
    }


}

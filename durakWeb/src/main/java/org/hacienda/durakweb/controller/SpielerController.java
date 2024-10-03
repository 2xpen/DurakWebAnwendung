package org.hacienda.durakweb.controller;


import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.apiresponse.ResponseWrapper;
import org.hacienda.durakweb.constants.StatusCode;
import org.hacienda.durakweb.data.SpielerStandRecord;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.service.SpielerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")

@Controller
public class SpielerController {

    /**
     *
     */


    private final SpielerService service;

    @Autowired
    SpielerController(SpielerService service) {
        this.service = service;
    }


    @PostMapping("/createSpieler")
    public ResponseEntity<ResponseWrapper<Spieler>> createSpieler(@RequestBody Spieler spieler) {
        ResponseWrapper<Spieler> wrapper = new ResponseWrapper<>();


        service.addSpieler(spieler);

        wrapper.setData(spieler);
        wrapper.setStatusIndicator(StatusCode.ALLESMAMBOHUGE);
        wrapper.addMeldungen("Allet Tuti");

        return ResponseEntity.ok(wrapper);
    }

    @GetMapping("/getAlleSpieler")
    public ResponseEntity<ResponseWrapper<List<Spieler>>> getAllPlayers() {

        ResponseWrapper<List<Spieler>> wrapper = new ResponseWrapper<>();
        wrapper.setData(service.getAllSpieler());
        wrapper.addMeldungen("Allet Tuti");
        wrapper.setStatusIndicator(StatusCode.ALLESMAMBOHUGE);

        return ResponseEntity.ok(wrapper);
    }

    @GetMapping("/getSpielerById")
    public ResponseEntity<ResponseWrapper<List<Spieler>>> getSpieler(@RequestBody String[] spielerIds) {
        ResponseWrapper<List<Spieler>> wrapper = new ResponseWrapper<>();


        wrapper.setData(
                service.getSpielerById(
                        service.convertStringToSpielerId(spielerIds)));

        wrapper.addMeldungen("Alle Tuti");
        wrapper.setStatusIndicator(StatusCode.ALLESMAMBOHUGE);

        return ResponseEntity.ok(wrapper);
    }

//
//    @PostMapping("/updateDurakstand")
//    public ResponseEntity<ResponseWrapper<SpielerStandRecord>> updateDurakstand(@RequestParam SpielerId spielerId, @RequestParam Integer wert) {
//
//    }


}

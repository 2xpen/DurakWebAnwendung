

package org.hacienda.durakweb.spieler;


import org.hacienda.durakweb.apiresponse.ResponseWrapper;
import org.hacienda.durakweb.constants.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/api")

@Controller
public class SpielerController {

    /**
     *
     */



    private final SpielerService service;

    @Autowired
    SpielerController(SpielerService service){
        this.service = service;
    }


    @PostMapping("/createSpieler")
    public ResponseEntity<ResponseWrapper<Spieler>> createSpieler(@RequestBody Spieler spieler) {
        ResponseWrapper<Spieler> wrapper = new ResponseWrapper<>();


        service.addSpieler(spieler);

        wrapper.setData(spieler);
        wrapper.setStatusCode(StatusCode.ALLESHUGE);
        wrapper.addMeldungen("Allet Tuti");

        return ResponseEntity.ok(wrapper);
    }

    @GetMapping("/getAlleSpieler")
    public ResponseEntity<ResponseWrapper<List<Spieler>>> getAllPlayers() {

        ResponseWrapper<List<Spieler>> wrapper = new ResponseWrapper<>();
        wrapper.setData(service.getAllSpieler());
        wrapper.addMeldungen("Allet Tuti");
        wrapper.setStatusCode(StatusCode.ALLESHUGE);

        return ResponseEntity.ok(wrapper);



    }


}

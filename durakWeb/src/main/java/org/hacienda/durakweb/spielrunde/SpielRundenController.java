package org.hacienda.durakweb.spielrunde;


import org.hacienda.durakweb.apiresponse.ResponseWrapper;
import org.hacienda.durakweb.constants.StatusCode;
import org.hacienda.durakweb.spieler.SpielerController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api")

@Controller
public class SpielRundenController {

    private final SpielrundenService service;


    @Autowired
    public SpielRundenController(SpielrundenService service){
        this.service = service;
    }


    @PostMapping("/createSpielRunde")
    public ResponseEntity<ResponseWrapper<Spielrunde>> createSpielRunde(Spielrunde spielrunde) {

        ResponseWrapper<Spielrunde> wrapper = new ResponseWrapper<>();

        wrapper.setData(service.addSpielRunde(spielrunde));
        wrapper.addMeldungen("Allet Tuti");
        wrapper.setStatusIndicator(StatusCode.ALLESHUGE);

        return ResponseEntity.ok(wrapper);
    }

}

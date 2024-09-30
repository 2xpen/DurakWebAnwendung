package org.hacienda.durakweb.spielrunde;


import org.hacienda.durakweb.apiresponse.ResponseWrapper;
import org.hacienda.durakweb.constants.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RequestMapping("/api")

@Controller
public class SpielRundenController {

    private final SpielrundenService service;


    @Autowired
    public SpielRundenController(SpielrundenService service) {
        this.service = service;
    }






    @PostMapping("/createSpielRunde")
    public ResponseEntity<ResponseWrapper<Spielrunde>> createSpielRunde(@RequestBody Spielrunde spielRunde) {

        ResponseWrapper<Spielrunde> wrapper = new ResponseWrapper<>();

        wrapper.setData(service.addSpielRunde(spielRunde));
        wrapper.addMeldungen("Allet Tuti");
        wrapper.setStatusIndicator(StatusCode.ALLESHUGE);

        return ResponseEntity.ok(wrapper);
    }


//    @PostMapping("/createSpielRunde")
//    public ResponseEntity<ResponseWrapper<Spielrunde>> createSpielRunde(@RequestBody String json) {
//
//        System.out.println(json);
//
//        return null;
//    }


    //    @PostMapping("/createSpielRunde")
//    public ResponseEntity<ResponseWrapper<Spielrunde>> createSpielRunde(@RequestBody SpielRundeCreateParamDTO dto) {
//
//        ResponseWrapper<Spielrunde> wrapper = new ResponseWrapper<>();
//
//        wrapper.setData(service.addSpielRunde(new Spielrunde(dto.getSpielRundenName(), Arrays.asList(dto.getSpielerIds() ))));
//        wrapper.addMeldungen("Allet Tuti");
//        wrapper.setStatusIndicator(StatusCode.ALLESHUGE);
//
//        return ResponseEntity.ok(wrapper);
//    }



}


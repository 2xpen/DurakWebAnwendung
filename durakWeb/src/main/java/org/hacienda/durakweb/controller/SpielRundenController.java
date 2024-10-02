package org.hacienda.durakweb.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hacienda.durakweb.apiresponse.ResponseWrapper;
import org.hacienda.durakweb.constants.StatusCode;
import org.hacienda.durakweb.controller.dto.SpielerAnzeigenViewDTO;
import org.hacienda.durakweb.controller.dto.SpielrundeAuswahlDTO;
import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.data.Spielrunde;
import org.hacienda.durakweb.service.SpielerService;
import org.hacienda.durakweb.service.SpielrundenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api")

@Controller
public class SpielRundenController {

    private final SpielrundenService spielrundenService;
    private final SpielerService spielerService;


    @Autowired
    public SpielRundenController(SpielrundenService spielrundenService, SpielerService spielerService) {
        this.spielrundenService = spielrundenService;
        this.spielerService = spielerService;
    }


    @PostMapping("/createSpielRunde")
    public ResponseEntity<ResponseWrapper<Spielrunde>> createSpielRunde(@RequestBody Spielrunde spielRunde) {

        ResponseWrapper<Spielrunde> wrapper = new ResponseWrapper<>();

        wrapper.setData(spielrundenService.addSpielRunde(spielRunde));
        wrapper.addMeldungen("Allet Tuti");
        wrapper.setStatusIndicator(StatusCode.ALLESMAMBOHUGE);



        /**
         * TEST
         */
        ObjectMapper mapper = new ObjectMapper();
        try {
            System.out.println(mapper.writeValueAsString(spielRunde));
        }catch (JsonProcessingException e){
            e.getMessage();
        }

        /**
         * TEST
         */


        return ResponseEntity.ok(wrapper);
    }


    @GetMapping("/getAlleSpielrundenAuswahlView")
    public ResponseEntity<ResponseWrapper<List<SpielrundeAuswahlDTO>>> getAlleSpielrunden() {

        ResponseWrapper<List<SpielrundeAuswahlDTO>> wrapper = new ResponseWrapper<>();

//TODO HIER UNBEDINGT NACHBESSERN, DAFÜR EINEN SERVICE SCHREIBEN DER DEDIZIERT DAS ERMITTELT*******************************************************************************************************************************************************************************************************************************************
        List<SpielrundeAuswahlDTO> spielrundeAuswahlDTOS = new ArrayList<>();

        for(Spielrunde spielrunde : spielrundenService.getAlleSpielrunde()){

            List<SpielerAnzeigenViewDTO> spielerAnzeigenViewDTOS = new ArrayList<>();

            //  es wird jeder spieler der spielrunde ermittelt → das spielrunden repo schaut alle spielerIds nach die es für die spielrunde hat, und im spielerRepo wird jeder spieler anhand seiner id ermittelt
            for(Spieler spieler : spielerService.getSpielerById(spielrundenService.getSpielerIdsOfSpielrunde(spielrunde))){
                //umwandlung vom Spieler zum DTO
                spielerAnzeigenViewDTOS.add(new SpielerAnzeigenViewDTO(spieler));
            }
            spielrundeAuswahlDTOS.add(new SpielrundeAuswahlDTO(spielrunde, spielerAnzeigenViewDTOS));
        }
//TODO*******************************************************************************************************************************************************************************************************************************************
        wrapper.setData(spielrundeAuswahlDTOS);
        wrapper.setStatusIndicator(StatusCode.ALLESMAMBOHUGE);
        wrapper.addMeldungen("alter tom wenn du das siehst, erinner mich dran den service hier umzuschreiben");

        /**
         * TEST
         */
        ObjectMapper mapper = new ObjectMapper();
        try {
            System.out.println(mapper.writeValueAsString(spielrundeAuswahlDTOS));
        }catch (JsonProcessingException e){
            e.getMessage();
        }

        /**
         * TEST
         */

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


package org.hacienda.durakweb.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.hacienda.durakweb.apiresponse.ResponseWrapper;
import org.hacienda.durakweb.constants.StatusCode;
import org.hacienda.durakweb.controller.dto.SpielRundeDetailsDTO;
import org.hacienda.durakweb.controller.dto.SpielerAnzeigenViewDTO;
import org.hacienda.durakweb.controller.dto.SpielerInRundeAnzeigenDTO;
import org.hacienda.durakweb.controller.dto.SpielrundeAuswahlDTO;
import org.hacienda.durakweb.controller.requests.ChangeDurakStandRequest;
import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.data.SpielerStandRecord;
import org.hacienda.durakweb.data.Spielrunde;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;
import org.hacienda.durakweb.service.SpielerService;
import org.hacienda.durakweb.service.SpielrundenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequestMapping("/api")

//MAMBO TODO HIER EINE BASE KLASSE ERSTELLEN, DIE DEN WRAPPER VERPFLICHTET

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
        log.info("das ist der name der Spielrunde= " + spielRunde.getSpielRundenName());

        ResponseWrapper<Spielrunde> wrapper = new ResponseWrapper<>();

        wrapper.setData(spielrundenService.addSpielRunde(spielRunde));
        wrapper.addMeldungen("Allet Tuti");
        wrapper.setStatusIndicator(StatusCode.ALLESMAMBOHUGE);

        return ResponseEntity.ok(wrapper);
    }


    @GetMapping("/getAlleSpielrundenAuswahlView")
    public ResponseEntity<ResponseWrapper<List<SpielrundeAuswahlDTO>>> getAlleSpielrunden() {

        log.info("called /getAlleSpielrunden");

        ResponseWrapper<List<SpielrundeAuswahlDTO>> wrapper = new ResponseWrapper<>();

//TODO HIER UNBEDINGT NACHBESSERN, DAFÜR EINEN SERVICE SCHREIBEN DER DEDIZIERT DAS ERMITTELT*******************************************************************************************************************************************************************************************************************************************
        List<SpielrundeAuswahlDTO> spielrundeAuswahlDTOS = new ArrayList<>();

        for (Spielrunde spielrunde : spielrundenService.getAlleSpielrunde()) {

            List<SpielerAnzeigenViewDTO> spielerAnzeigenViewDTOS = new ArrayList<>();

            //  es wird jeder spieler der spielrunde ermittelt → das spielrunden repo schaut alle spielerIds nach die es für die spielrunde hat, und im spielerRepo wird jeder spieler anhand seiner id ermittelt
            for (Spieler spieler : spielerService.getSpielerById(spielrundenService.getSpielerIdsOfSpielrunde(spielrunde))) {
                //umwandlung vom Spieler zum DTOS
                log.info(spieler.getName() + " WURDE BEIM DOT SUCHEN GEFUNDEN");
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
            log.info("response /get alle SpielrundeAuswahlView = " + mapper.writeValueAsString(wrapper.getData()));
        } catch (JsonProcessingException e) {
            e.getMessage();
        }

        /**
         * TEST
         */

        return ResponseEntity.ok(wrapper);
    }

    @GetMapping("/getSpielrundeById")
    public ResponseEntity<ResponseWrapper<SpielRundeDetailsDTO>> getSpielrundeById(@RequestParam SpielrundenId spielRundenId) {
        ResponseWrapper<SpielRundeDetailsDTO> wrapper = new ResponseWrapper<>();

        log.info("spielerRunde By Id ausgelöst");
        System.out.println("spielerRunde By Id ausgelöst");
        Spielrunde spielRunde = spielrundenService.getSpielRundeById(spielRundenId);


        List<SpielerInRundeAnzeigenDTO> spielerInRundeAnzeigenDTOS = new ArrayList<>();

        for (Spieler spieler : spielerService.getSpielerById(spielrundenService.getSpielerIdsOfSpielrunde(spielRunde))) {
            SpielerStandRecord spielerStandRecord = spielrundenService.getSpielerStandRecordById(spielRundenId, spieler.getSpielerId());
            spielerInRundeAnzeigenDTOS.add(new SpielerInRundeAnzeigenDTO(spieler, spielerStandRecord));
        }

        wrapper.setData(new SpielRundeDetailsDTO(spielRunde, spielerInRundeAnzeigenDTOS));
        wrapper.setStatusIndicator(StatusCode.ALLESDISCO);
        wrapper.addMeldungen("wie immer tom, alles TUTI FRUTTI BANUTTI");

        /**
         * TEST
         * */

        ObjectMapper mapper = new ObjectMapper();
        try {
            log.info("response /getSpielRundeById = " + mapper.writeValueAsString(wrapper.getData()));
        } catch (JsonProcessingException e) {
            e.getMessage();
        }
        /**
         * TEST
         */
        return ResponseEntity.ok(wrapper);
    }


    @PostMapping("/changedurakstand")
    public ResponseEntity<ResponseWrapper<SpielerStandRecord>> changeSpielerStandRecord(@RequestBody ChangeDurakStandRequest request) {

        ResponseWrapper<SpielerStandRecord> wrapper = new ResponseWrapper<>();

        wrapper.setData(spielrundenService.changeSpielerstandRecord(request.getSpielerId(), request.getSpielrundenId(), request.getVerrechungszahl()));
        wrapper.addMeldungen("banutti titi");
        wrapper.setStatusIndicator(StatusCode.ALLESDISCO);


        /**
         * TEST
         * */

        ObjectMapper mapper = new ObjectMapper();
        try {
            log.info("response /changeDurakstand = " + mapper.writeValueAsString(wrapper.getData()));
        } catch (JsonProcessingException e) {
            e.getMessage();
        }
        /**
         * TEST
         */

        return ResponseEntity.ok(wrapper);
    }


}


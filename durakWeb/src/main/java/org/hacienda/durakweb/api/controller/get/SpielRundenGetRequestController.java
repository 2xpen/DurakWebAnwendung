package org.hacienda.durakweb.api.controller.get;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.hacienda.durakweb.api.apiresponse.ResponseWrapper;
import org.hacienda.durakweb.constants.StatusCode;
import org.hacienda.durakweb.api.dto.spielerDTO.SpielerAnzeigenViewDTO;
import org.hacienda.durakweb.api.dto.spielerDTO.SpielerInRundeAnzeigenDTO;
import org.hacienda.durakweb.api.dto.spielrundeDTO.SpielRundeDetailsDTO;
import org.hacienda.durakweb.api.dto.spielrundeDTO.SpielrundeAuswahlDTO;
import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.data.SpielerStandRecord;
import org.hacienda.durakweb.data.Spielrunde;
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
public class SpielRundenGetRequestController {

    private final SpielrundenService spielrundenService;
    private final SpielerService spielerService;


    @Autowired
    public SpielRundenGetRequestController(SpielrundenService spielrundenService, SpielerService spielerService) {
        this.spielrundenService = spielrundenService;
        this.spielerService = spielerService;
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

        return ResponseEntity.ok(wrapper);
    }


    @GetMapping("/getSpielrundeById")
    public ResponseEntity<ResponseWrapper<SpielRundeDetailsDTO>> getSpielrundeById(@RequestParam String spielRundenId) {
        ResponseWrapper<SpielRundeDetailsDTO> wrapper = new ResponseWrapper<>();

        log.info("spielerRunde By Id ausgelöst");
        System.out.println("spielerRunde By Id ausgelöst");
        Spielrunde spielRunde = spielrundenService.getSpielRundeById(new SpielrundenId(spielRundenId));

        List<SpielerInRundeAnzeigenDTO> spielerInRundeAnzeigenDTOS = new ArrayList<>();

        for (Spieler spieler : spielerService.getSpielerById(spielrundenService.getSpielerIdsOfSpielrunde(spielRunde))) {
            SpielerStandRecord spielerStandRecord = spielrundenService.getSpielerStandRecordById(new SpielrundenId(spielRundenId), spieler.getSpielerId());
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

        return ResponseEntity.ok(wrapper);
    }


}


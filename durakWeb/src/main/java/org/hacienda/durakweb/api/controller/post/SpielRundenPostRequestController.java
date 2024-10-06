package org.hacienda.durakweb.api.controller.post;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.hacienda.durakweb.api.apiresponse.ResponseWrapper;
import org.hacienda.durakweb.constants.StatusCode;
import org.hacienda.durakweb.api.dto.spielerDTO.SpielerAnzeigenViewDTO;
import org.hacienda.durakweb.api.dto.spielerDTO.SpielerInRundeAnzeigenDTO;
import org.hacienda.durakweb.api.dto.spielerDTO.SpielerStandRecordDTO;
import org.hacienda.durakweb.api.dto.spielrundeDTO.SpielRundeDetailsDTO;
import org.hacienda.durakweb.api.dto.spielrundeDTO.SpielrundeAuswahlDTO;
import org.hacienda.durakweb.api.controller.requests.ChangeDurakStandRequest;
import org.hacienda.durakweb.api.controller.requests.CreateSpielRundeParameter;
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
public class SpielRundenPostRequestController {

    private final SpielrundenService spielrundenService;


    @Autowired
    public SpielRundenPostRequestController(SpielrundenService spielrundenService) {
        this.spielrundenService = spielrundenService;
    }


    @PostMapping("/createSpielRunde")
    public ResponseEntity<ResponseWrapper<Spielrunde>> createSpielRunde(@RequestBody CreateSpielRundeParameter parameter) {
        log.info("das ist der name der Spielrunde= " + parameter.getSpielRundenName());

        ResponseWrapper<Spielrunde> wrapper = new ResponseWrapper<>();

        wrapper.setData(spielrundenService.addSpielRunde(new Spielrunde(parameter.getSpielRundenName(), parameter.getSpielerInfos())));
        wrapper.addMeldungen("Allet Tuti");
        wrapper.setStatusIndicator(StatusCode.ALLESMAMBOHUGE);

        return ResponseEntity.ok(wrapper);
    }

    @PostMapping("/changedurakstand")
    public ResponseEntity<ResponseWrapper<SpielerStandRecordDTO>> changeSpielerStandRecord(@RequestBody ChangeDurakStandRequest request) {


        System.out.println("changeSpielerStandRecord AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        System.out.println(request.getSpielerId().toString());
        System.out.println(request.getVerrechungszahl().toString());
        System.out.println(request.getSpielrundenId().toString());

        ResponseWrapper<SpielerStandRecordDTO> wrapper = new ResponseWrapper<>();

        SpielerStandRecord spielerStandRecord = spielrundenService.changeSpielerstandRecord(request.getSpielerId(), request.getSpielrundenId(), request.getVerrechungszahl());

        wrapper.setData(new SpielerStandRecordDTO(spielerStandRecord.getSpielerId(), spielerStandRecord.getStand()));
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


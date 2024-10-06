package org.hacienda.durakweb.api.controller.get;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.hacienda.durakweb.api.apiresponse.ResponseWrapper;
import org.hacienda.durakweb.api.dto.spielerDTO.SpielerDataResponse;
import org.hacienda.durakweb.constants.StatusCode;
import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.durakfehlermeldung.DurakFehlerMeldung;
import org.hacienda.durakweb.service.SpielerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api")

@Slf4j
@Controller
public class SpielerGetRequestController {


    private final SpielerService service;

    @Autowired
    SpielerGetRequestController(SpielerService service) {
        this.service = service;
    }


    @GetMapping("/getAlleSpieler")
    public ResponseEntity<ResponseWrapper<List<Spieler>>> getAllPlayers() {

        ResponseWrapper<List<Spieler>> wrapper = new ResponseWrapper<>();
        wrapper.setData(service.getAllSpieler());
        wrapper.addMeldungen("Allet Tuti");
        wrapper.setStatusIndicator(StatusCode.ALLESMAMBOHUGE);

        /**
         * TEST
         */
        ObjectMapper mapper = new ObjectMapper();
        try {
            log.info("response /get alle Spieler = " + mapper.writeValueAsString(wrapper.getData()));
        } catch (JsonProcessingException e) {
            e.getMessage();
        }

        /**
         * TEST
         */


        return ResponseEntity.ok(wrapper);
    }


    @GetMapping("/getSpielerById")
    public ResponseEntity<ResponseWrapper<SpielerDataResponse>> getSpieler(@RequestParam String spielerId) throws DurakFehlerMeldung {
        ResponseWrapper<SpielerDataResponse> wrapper = new ResponseWrapper<>();

        List<SpielerDataResponse> spielerList = new ArrayList<>();


        wrapper.setData(new SpielerDataResponse(
                service.getSpielerById(
                        service.convertStringToSpielerId(spielerId))));

        wrapper.addMeldungen("Alle Tuti");
        wrapper.setStatusIndicator(StatusCode.ALLESMAMBOHUGE);


        /**
         * TEST
         */
        ObjectMapper mapper = new ObjectMapper();
        try {
            log.info("response /get Spieler By Id= " + mapper.writeValueAsString(wrapper.getData()));
        } catch (JsonProcessingException e) {
            e.getMessage();
        }

        /**
         * TEST
         */

        return ResponseEntity.ok(wrapper);
    }


    @GetMapping("/getSpielerListById")
    public ResponseEntity<ResponseWrapper<List<SpielerDataResponse>>> getSpielerList(@RequestParam List<String> spielerIds) {
        ResponseWrapper<List<SpielerDataResponse>> wrapper = new ResponseWrapper<>();

        List<SpielerDataResponse> spielerList = new ArrayList<>();

        service.getSpielerById(
                service.convertStringToSpielerId(spielerIds)).forEach(s -> spielerList.add(new SpielerDataResponse(s)));


        wrapper.setData(spielerList);

        wrapper.addMeldungen("Alle Tuti");

        wrapper.setStatusIndicator(StatusCode.ALLESMAMBOHUGE);


        /**
         * TEST
         */
        ObjectMapper mapper = new ObjectMapper();
        try {
            log.info("response /get Spieler By Id= " + mapper.writeValueAsString(wrapper.getData()));
        } catch (JsonProcessingException e) {
            e.getMessage();
        }

        /**
         * TEST
         */

        return ResponseEntity.ok(wrapper);
    }


}


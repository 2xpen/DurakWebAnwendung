package org.hacienda.durakweb.api.controller.post;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.hacienda.durakweb.api.dto.spielerDTO.SpielerDataResponse;
import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.api.apiresponse.ResponseWrapper;
import org.hacienda.durakweb.constants.StatusCode;
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
public class SpielerPostRequestController {

    private final SpielerService service;

    @Autowired
    SpielerPostRequestController(SpielerService service) {
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


}

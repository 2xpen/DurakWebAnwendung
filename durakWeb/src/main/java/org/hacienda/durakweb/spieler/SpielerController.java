

package org.hacienda.durakweb.spieler;


import org.hacienda.durakweb.apiresponse.ResponseWrapper;
import org.hacienda.durakweb.constants.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SpielerController {



    private final SpielerService spielerService;

    @Autowired
    SpielerController(SpielerService service){
        this.spielerService = service;
    }


    @PostMapping("/createSpieler")
    public ResponseEntity<ResponseWrapper<Spieler>> createSpieler(@RequestParam String name, @RequestParam String profilePicture) {
        ResponseWrapper<Spieler> wrapper = new ResponseWrapper<>();

        Spieler spieler = new Spieler(name, profilePicture);

        wrapper.setData(spieler);
        wrapper.addMeldungen("Allet Tuti");
        wrapper.setStatusCode(StatusCode.ALLESHUGE);

        return ResponseEntity.ok(wrapper);
    }


}

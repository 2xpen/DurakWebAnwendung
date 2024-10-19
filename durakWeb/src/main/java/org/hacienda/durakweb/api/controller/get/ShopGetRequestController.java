package org.hacienda.durakweb.api.controller.get;

import org.hacienda.durakweb.api.apiresponse.ResponseWrapper;
import org.hacienda.durakweb.api.dto.GetShopItemsDTO;
import org.hacienda.durakweb.api.dto.shopDTO.ShopItemDTO;
import org.hacienda.durakweb.constants.StatusCode;
import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.service.ShopService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ShopGetRequestController {
    private final ShopService shopService;

    public ShopGetRequestController(ShopService shopService) {
        this.shopService = shopService;
    }

    @GetMapping("/getshopitems")
    public ResponseEntity<ResponseWrapper<List<ShopItemDTO>>> getShopItems() {
        ResponseWrapper<List<ShopItemDTO>> wrapper = new ResponseWrapper<>();
        wrapper.setData(new GetShopItemsDTO(shopService.getShopItems()).getShopItems());
        wrapper.addMeldungen("Allet Tuti");
        wrapper.setStatusIndicator(StatusCode.ALLESMAMBOHUGE);
        return ResponseEntity.ok(wrapper);
    }
}


package org.hacienda.durakweb.api.dto;

import org.hacienda.durakweb.api.dto.shopDTO.ShopItemDTO;
import org.hacienda.durakweb.data.shop.item.ShopItem;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class GetShopItemsDTO {
    private final List<ShopItemDTO> shopItems;

    public GetShopItemsDTO(List<ShopItem> shopItems) {
        this.shopItems = shopItems.stream()
                .map(ShopItemDTO::new)
                .collect(Collectors.toList());
    }

    public List<ShopItemDTO> getShopItems() {
        return shopItems;
    }

    
}

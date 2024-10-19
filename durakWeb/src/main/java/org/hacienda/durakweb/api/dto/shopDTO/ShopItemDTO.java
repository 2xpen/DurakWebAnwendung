package org.hacienda.durakweb.api.dto.shopDTO;

import org.hacienda.durakweb.data.shop.item.ShopItem;

public class ShopItemDTO {
    private final String name;
    private final String bild;
    private final double preis;

    public ShopItemDTO(ShopItem shopItem) {
        this.name = shopItem.getItemName().getName();
        this.bild = shopItem.getBild();
        this.preis = shopItem.getPrice();
    }

    public String getName() {
        return name;
    }

    public String getBild() {
        return bild;
    }

    public double getPreis() {
        return preis;
    }
}

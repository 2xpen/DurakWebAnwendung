package org.hacienda.durakweb.data.shop.item;

import lombok.Getter;
import org.hacienda.durakweb.data.shop.ItemName;

@Getter
public class ShopItem extends ItemBase {
    private final double price;

    public ShopItem(ItemName itemName, String bild, double price) {
        super(itemName, bild);
        this.price = price;
    }

}

package org.hacienda.durakweb.data.shop.item;

import org.hacienda.durakweb.data.shop.ItemName;

public abstract class ItemBase {
    private final ItemName itemName;
    private final String bild;


    public ItemBase(ItemName itemName, String bild) {
        this.itemName = itemName;
        this.bild = bild;
    }

    public ItemName getItemName() {
        return itemName;
    }

    public String getBild() {
        return bild;
    }


}

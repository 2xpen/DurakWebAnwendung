package org.hacienda.durakweb.data.shop.item;

import org.hacienda.durakweb.data.shop.ItemName;

public class SpielerItem extends ItemBase {
    private final int anzahl;

    public SpielerItem(ItemName itemName, String bild, int anzahl) {
        super(itemName, bild);
        this.anzahl = anzahl;
    }

    public int getAnzahl() {
        return anzahl;
    }
}

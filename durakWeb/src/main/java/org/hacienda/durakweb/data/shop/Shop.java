package org.hacienda.durakweb.data.shop;

import lombok.Getter;
import org.hacienda.durakweb.data.shop.item.ShopItem;

import java.util.ArrayList;
import java.util.List;

@Getter
public class Shop {

    private final List<ShopItem> items = new ArrayList<>();

    public void addItem(List<ShopItem> items) {
        this.items.addAll(items);
    }

}

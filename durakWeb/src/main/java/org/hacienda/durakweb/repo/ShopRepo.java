package org.hacienda.durakweb.repo;

import org.hacienda.durakweb.data.shop.ItemName;
import org.hacienda.durakweb.data.shop.Shop;
import org.hacienda.durakweb.data.shop.item.ShopItem;
import org.hacienda.durakweb.durakfehlermeldung.DurakFehlerMeldung;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.util.List;

@Repository
public class ShopRepo {

    private final Shop shop;

    public ShopRepo() {
        this.shop = new Shop();
        this.shop.addItem(init());
    }

    private List<ShopItem> init() {
        List<ShopItem> items = List.of(
                new ShopItem(ItemName.BUBATZ, new File("src//main//resources//itemBilder//bubatz_circe_denyer_pixabay.jpg").toString(), 3.99)
        );
        return items;
    }


    public List<ShopItem> getShopItems() {
        return shop.getItems();
    }

    public ShopItem getShopItemsByName(ItemName name) throws DurakFehlerMeldung {
        for (ShopItem item : shop.getItems()) {
            if (item.getItemName().equals(name)) {
                return item;
            }
        }
        throw new DurakFehlerMeldung("ShopRepo konnte Item nicht finden");
    }
}

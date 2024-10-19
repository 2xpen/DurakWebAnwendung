package org.hacienda.durakweb.service;

import org.hacienda.durakweb.data.shop.item.ShopItem;
import org.hacienda.durakweb.repo.ShopRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopService {
    private final ShopRepo shopRepo;

    public ShopService(ShopRepo shopRepo) {
        this.shopRepo = shopRepo;
    }

    public List<ShopItem> getShopItems() {
        return shopRepo.getShopItems();
    }


}

package org.hacienda.durakweb.data.shop;

public enum ItemName {

    BUBATZ("bubatz"),
    BIERE("biere"),
    UNBEKANNT("");


    private final String name;

    private ItemName(String name) {
        this.name = name;
    }

    public static ItemName of(String name) {
        for (ItemName itemName : ItemName.values()) {
            if (itemName.getName().equals(name)) {
                return itemName;
            }
        }
        return UNBEKANNT;
    }

    public String getName() {
        return name;
    }

}

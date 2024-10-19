package org.hacienda.durakweb.constants;

public enum DurakArt {

    NORMAL("normal", 1),
    BOCKRUNDE("bockrunde", 2),
    UNBEKANNT("", 0);


    private final String identitaet;
    private final int verrechnungsWert;

    private DurakArt(String identitaet, int verrechnungsWert) {
        this.identitaet = identitaet;
        this.verrechnungsWert = verrechnungsWert;
    }

    public static DurakArt of(String name) {
        for (DurakArt art : DurakArt.values()) {
            if (art.getIdentitaet().equals(name)) {
                return art;
            }
        }
        return UNBEKANNT;
    }

    public String getIdentitaet() {
        return identitaet;
    }

    public int getVerrechnungsWert() {
        return verrechnungsWert;
    }

}

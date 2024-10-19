package org.hacienda.durakweb.durakfehlermeldung;

public class DurakFehlerMeldung extends Exception {
    String meldung;


    public DurakFehlerMeldung(String meldung) {
        this.meldung = meldung;
    }

    public String getMeldung() {
        return meldung;
    }
}

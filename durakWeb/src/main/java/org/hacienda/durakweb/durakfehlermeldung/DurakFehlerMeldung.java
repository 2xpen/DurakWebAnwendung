package org.hacienda.durakweb.durakfehlermeldung;

public class DurakFehlerMeldung extends Exception{
    String meldung;

    DurakFehlerMeldung(String meldung){
        this.meldung = meldung;
    }

}

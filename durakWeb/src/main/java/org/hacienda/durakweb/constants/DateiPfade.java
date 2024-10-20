package org.hacienda.durakweb.constants;

public enum DateiPfade {

    SPIERLERREPO("C:\\Projekte\\DurakWebAnwendung\\durakWeb\\src\\main\\resources\\SpielerSpeicher.txt"),
    SPIELERRUNDENREPO("C:\\Projekte\\DurakWebAnwendung\\durakWeb\\src\\main\\resources\\SpielrundenSpeicher.txt"),
    UNBEKANNT("");


    private final String path;

    DateiPfade(String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }


}

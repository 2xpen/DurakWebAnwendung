package org.hacienda.durakweb.data;

public enum DateiPfade {

    SPIERLERREPO("C:\\Users\\840 G6\\IdeaProjects\\DurakWebDerVergeltung\\durakWeb\\src\\main\\resources\\SpielerSpeicher.txt"),
    SPIELERRUNDENREPO("C:\\Users\\840 G6\\IdeaProjects\\DurakWebDerVergeltung\\durakWeb\\src\\main\\resources\\SpielrundenSpeicher.txt"),
    UNBEKANNT("");


    private final String path;

    DateiPfade(String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }


}

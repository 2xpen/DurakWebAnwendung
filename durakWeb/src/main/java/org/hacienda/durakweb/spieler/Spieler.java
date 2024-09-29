package org.hacienda.durakweb.spieler;

import lombok.Getter;
import org.hacienda.durakweb.identifier.SpielerId;

import javax.swing.*;
import java.util.UUID;

@Getter
public class Spieler {

    private String name;
    private String profilBild = "";
    private final SpielerId spielerId;


    Spieler(String name,String profilBild){
        this.name = name;
        this.profilBild = profilBild;
        this.spielerId = new SpielerId();
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setProfilBild(String profilBild) {
        this.profilBild = profilBild;
    }

    public String getName() {
        return name;
    }

    public SpielerId getSpielerId() {
        return spielerId;
    }

    public String getProfilBild() {
        return profilBild;
    }


}


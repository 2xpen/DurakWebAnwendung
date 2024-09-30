package org.hacienda.durakweb.spieler;

import lombok.Getter;
import org.hacienda.durakweb.identifier.SpielerId;

import javax.swing.*;
import java.util.UUID;

@Getter
public class Spieler {

    private String name;
    private String profilePicture = "";
    private final SpielerId spielerId;


    Spieler(String name,String profilePicture){
        this.name = name;
        this.profilePicture = profilePicture;
        this.spielerId = new SpielerId();
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setProfilBild(String profilBild) {
        this.profilePicture = profilBild;
    }

    public String getName() {
        return name;
    }

    public SpielerId getSpielerId() {
        return spielerId;
    }

    public String getprofilePicture() {
        return profilePicture;
    }


}


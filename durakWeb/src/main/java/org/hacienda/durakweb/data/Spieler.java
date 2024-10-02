package org.hacienda.durakweb.data;

import lombok.Getter;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;

import java.util.ArrayList;
import java.util.List;

@Getter
public class Spieler {

    private String name;
    private String profilePicture = "";
    private final SpielerId spielerId;
    private final List<SpielrundenId> spielrunden = new ArrayList<>();

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

    // todo womeoglich eine aufgabe für das repo und nicht die Person klasse an sich
    public void addSpielrunde(SpielrundenId id){
        spielrunden.add(id);
    }

    public void removeSpielrunde(SpielrundenId id){
        spielrunden.remove(id);
    }

}


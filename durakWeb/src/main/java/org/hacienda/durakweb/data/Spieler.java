package org.hacienda.durakweb.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.data.identifier.SpielrundenId;

import java.util.ArrayList;
import java.util.List;

@Getter
public class Spieler {

    private final SpielerId spielerId;
    private String name;
    private String profilePicture = "";
    

    @JsonCreator
    public Spieler(@JsonProperty("name") String name,
                   @JsonProperty("profilePicture") String profilePicture,
                   @JsonProperty("spielerId") SpielerId spielerId) {
        this.name = name;
        this.profilePicture = profilePicture;
        this.spielerId = spielerId == null ? new SpielerId() : spielerId;
    }


    public void setProfilBild(String profilBild) {
        this.profilePicture = profilBild;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SpielerId getSpielerId() {
        return spielerId;
    }

    public String getprofilePicture() {
        return profilePicture;
    }


}


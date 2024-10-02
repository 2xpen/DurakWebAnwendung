package org.hacienda.durakweb.data.identifier;

import lombok.Getter;

import java.util.UUID;


@Getter
public abstract class AbstractIdentifier {

private final UUID id;


    AbstractIdentifier(){
        this.id = UUID.randomUUID();
    }

    AbstractIdentifier(String id){

        System.out.println(id +" EINE UUID WURDE MIT STRING ERZEUGT");
        this.id = UUID.fromString(id);
    }

    public UUID getId() {
        return id;
    }


    public boolean equals(AbstractIdentifier other) {
    return getId().equals(other.getId());
    }

}

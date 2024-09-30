package org.hacienda.durakweb.identifier;

import lombok.Getter;

import java.util.UUID;


@Getter
public abstract class AbstractIdentifier {

private final UUID id;


    AbstractIdentifier(){
        this.id = UUID.randomUUID();
    }

    AbstractIdentifier(String id){
        this.id = UUID.fromString(id);
    }

    public UUID getId() {
        return id;
    }

}

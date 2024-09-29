package org.hacienda.durakweb.apiresponse;

import lombok.Getter;
import org.hacienda.durakweb.constants.StatusCode;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ResponseWrapper<DATA_TYPE> {


   private DATA_TYPE data;
    private List<String> meldungen = new ArrayList<String>();
    private StatusCode statusCode = StatusCode.ALLESHUGE;


    public ResponseWrapper() {
    }

    public ResponseWrapper setData(DATA_TYPE data){
        this.data = data;
        return this;
    }


    public ResponseWrapper addMeldungen(String meldungen){
        this.meldungen.add(meldungen);
        return this;
    }

    public ResponseWrapper setStatusCode(StatusCode statusCode){
        this.statusCode = statusCode;
        return this;
    }


    public StatusCode getStatusCode() {
        return statusCode;
    }

    public DATA_TYPE getData() {
        return data;
    }

    public List<String> getMeldungen() {
        return meldungen;
    }


}

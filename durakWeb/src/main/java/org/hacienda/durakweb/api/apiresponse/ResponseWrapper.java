package org.hacienda.durakweb.api.apiresponse;

import lombok.Getter;
import org.hacienda.durakweb.constants.StatusCode;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ResponseWrapper<DATA_TYPE> {

    private DATA_TYPE data;
    private final List<String> meldungen = new ArrayList<String>();
    private StatusCode statusIndicator = StatusCode.ALLESMAMBOHUGE;


    public ResponseWrapper() {
    }

    public ResponseWrapper<DATA_TYPE> addMeldungen(String meldungen) {
        this.meldungen.add(meldungen);
        return this;
    }

    public StatusCode getStatusIndicator() {
        return statusIndicator;
    }

    public ResponseWrapper<DATA_TYPE> setStatusIndicator(StatusCode statusIndicator) {
        this.statusIndicator = statusIndicator;
        return this;
    }

    public DATA_TYPE getData() {
        return data;
    }

    public ResponseWrapper<DATA_TYPE> setData(DATA_TYPE data) {
        this.data = data;
        return this;
    }

    public List<String> getMeldungen() {
        return meldungen;
    }

    @Override
    public String toString() {
        return "ResponseWrapper{" +
                "data=" + data +
                ", meldungen=" + meldungen +
                ", statusIndicator=" + statusIndicator +
                '}';
    }
}

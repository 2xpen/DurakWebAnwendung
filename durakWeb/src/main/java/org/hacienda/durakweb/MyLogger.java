package org.hacienda.durakweb;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class MyLogger {
    private static final Logger log = LoggerFactory.getLogger(MyLogger.class);

    public void doSomething() {
        log.info("Das ist eine Info-Nachricht.");
        log.error("Das ist eine Fehler-Nachricht.");
    }

}

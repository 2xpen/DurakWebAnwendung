package org.hacienda.durakweb;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class DurakWebApplication {

    public static void main(String[] args) {
        log.info("DurakWebApplication started");
        SpringApplication.run(DurakWebApplication.class, args);

    }

}

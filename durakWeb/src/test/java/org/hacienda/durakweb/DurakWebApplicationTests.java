package org.hacienda.durakweb;

import org.hacienda.durakweb.data.Spieler;
import org.hacienda.durakweb.data.Spielrunde;
import org.hacienda.durakweb.data.identifier.SpielerId;
import org.hacienda.durakweb.repo.SpielRundenRepo;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.Collectors;

@SpringBootTest
class DurakWebApplicationTests {


    @BeforeAll
    public static void setup() {


        Spieler spieler1 = new Spieler("Barc", null, new SpielerId("idvonBarco"));
        Spieler spieler2 = new Spieler("Tom", null, new SpielerId("idvontom"));
        Spieler spieler3 = new Spieler("Mathis", null, new SpielerId("idvonMathis"));
        Spieler spieler4 = new Spieler("Brenker", null, new SpielerId("idvonBrenker"));
        Spieler spieler5 = new Spieler("Schimanke", null, new SpielerId("idVonSchimanke"));

        List<Spieler> spielerGruppe1 = List.of(spieler1, spieler2, spieler3, spieler4);
        List<Spieler> spielerGruppe2 = List.of(spieler1, spieler3);
        List<Spieler> spielerGruppe3 = List.of(spieler1, spieler4);
        List<Spieler> spielerGruppe4 = List.of(spieler1, spieler2, spieler3, spieler4, spieler5);


        Spielrunde spielrunde1 = new Spielrunde("Gruppe Hamburg", spielerGruppe1.stream().map(spieler -> spieler.getSpielerId().getId().toString()).collect(Collectors.toList()));
        Spielrunde spielrunde2 = new Spielrunde("Gruppe Bernburg", spielerGruppe2.stream().map(spieler -> spieler.getSpielerId().getId().toString()).collect(Collectors.toList()));
        Spielrunde spielrunde3 = new Spielrunde("Gruppe Köthen", spielerGruppe3.stream().map(spieler -> spieler.getSpielerId().getId().toString()).collect(Collectors.toList()));
        Spielrunde spielrunde4 = new Spielrunde("Gruppe Morl", spielerGruppe4.stream().map(spieler -> spieler.getSpielerId().getId().toString()).collect(Collectors.toList()));


        SpielRundenRepo spielRundenRepo = new SpielRundenRepo();


        for (Spielrunde spielrunde : List.of(spielrunde1, spielrunde2, spielrunde3, spielrunde4)) {
            spielRundenRepo.addSpielRunde(spielrunde);
        }


    }


    @Test
    void contextLoads() {
    }


}

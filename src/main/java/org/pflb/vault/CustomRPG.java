package org.pflb.vault;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.sql.SQLException;

@Configuration
@ComponentScan
@EnableAutoConfiguration
@EnableScheduling
@EnableJpaRepositories
@PropertySource(value = {"classpath:env/${env}/web.properties",
        "classpath:env/${env}/db.properties"})
public class CustomRPG {

    public static void main(String[] args) throws SQLException {
        SpringApplication.run(CustomRPG.class, args);

//        Comparator<Creature> comparator = new Comparator<Creature>() {
//            @Override
//            public int compare(Creature person1, Creature person2) {
//                if (person1.getLevel() > person2.getLevel()) {
//                    return 1;
//                } else if (person1.getLevel() < person2.getLevel()) {
//                    return -1;
//                }
//                if (person1.equals(person2)) {
//                    return 0;
//                }
//                return 1;
//            }
//        };
//
//        TreeMap<Creature, String> personsDictionary = new TreeMap<>(comparator);
//
//        for (int i = 2; i < 100; i++) {
//            Creature elfGenerated = new CreatureElf(i, "Elf" + i);
//            personsDictionary.put(elfGenerated, "" + Math.random());
//        }
//
//        for (int i = 2; i < 100; i++) {
//            Creature dragonGenerated = new CreatureDragon(i, "Dragon" + i);
//            personsDictionary.put(dragonGenerated, "" + Math.random());
//        }
//
//
//        int sum = personsDictionary.keySet()
//                .stream()
//                .filter(z -> z.getName().contains("2"))
//                .flatMapToInt(z -> IntStream.of(z.getDamagePerSecond()))
//                .sum();
//
//        System.out.println(sum);

    }

}

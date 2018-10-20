package org.pflb.vault.model;


import lombok.extern.slf4j.Slf4j;
import org.pflb.vault.model.config.CreatureConfiguration;
import org.pflb.vault.model.config.CreatureStats;

@Slf4j
public enum RaceType {

    ELF,
    DRAGON,
    HUMAN,
    DWARF;

    public static CreatureStats getStatsByType(RaceType type) {

        switch (type) {
            case ELF:
                return CreatureConfiguration.elfStats;
            case DRAGON:
                return CreatureConfiguration.dragonStats;
            case DWARF:
                return CreatureConfiguration.dwarfStats;
            case HUMAN:
                return CreatureConfiguration.humanStats;
        }

        log.warn("Для типа " + type.name() + " не найдено характеристик!");
        return null;
    }
}

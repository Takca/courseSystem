package org.pflb.vault.service;

import org.pflb.vault.model.Creature;
import org.pflb.vault.model.RaceType;
import org.pflb.vault.model.config.CreatureStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class CreatureManagingService {

    @Autowired
    @Qualifier("persistent")
    private CreatureCache storage;

    private Long creaturesCount = 0L;

    public Creature createCreature(int level, String name, RaceType raceType) {
        creaturesCount++;
        Creature creature = new Creature();
        creature.setId(creaturesCount);
        creature.setLevel(level);
        creature.setName(name);
        creature.setRace(raceType);

        CreatureStats statsByType = RaceType.getStatsByType(raceType);

        creature.setDamagePerSecond(statsByType.getINITIAL_DPS() + level * statsByType.getDPS_PER_LVL());
        creature.setHitPoints(statsByType.getINITIAL_HP() + level * statsByType.getHP_PER_LVL());

        return creature;
    }

    public boolean isDead(String name) {
        Creature creatureByName = storage.getCreatureByName(name);

        return creatureByName.getHitPoints() <= 0;
    }
}

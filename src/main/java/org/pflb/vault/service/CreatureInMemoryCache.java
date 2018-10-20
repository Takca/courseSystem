package org.pflb.vault.service;

import com.google.common.collect.Maps;
import org.pflb.vault.model.Creature;
import org.pflb.vault.model.RaceType;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CreatureInMemoryCache implements CreatureCache {

    private Map<String, Creature> creatureStorage = Maps.newHashMap();

    public void saveCreature(Creature creature) {
        creatureStorage.put(creature.getName(), creature);
    }

    public Creature getCreatureByName(String creatureName) {
        return creatureStorage.get(creatureName);
    }

    @Override
    public List<Creature> getAllByDamagePerSecondGreaterThan(Integer damagePerSecondLimit) {
        return creatureStorage.values()
                .stream()
                .filter(z -> z.getDamagePerSecond() > damagePerSecondLimit)
                .collect(Collectors.toList());
    }

    @Override
    public List<Creature> getAllByRace(RaceType raceType) {
        return creatureStorage.values()
                .stream()
                .filter(z -> z.getRace() == raceType)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAllByLevelGreaterThenEqual(Integer level) {
        List<String> creaturesToDelete = creatureStorage.entrySet()
                .stream()
                .filter(z -> z.getValue().getLevel() >= level)
                .map(z -> z.getKey())
                .collect(Collectors.toList());

        creatureStorage.remove(creaturesToDelete);
    }
}

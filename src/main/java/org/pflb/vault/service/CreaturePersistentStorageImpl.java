package org.pflb.vault.service;

import org.pflb.vault.model.Creature;
import org.pflb.vault.model.RaceType;
import org.pflb.vault.repository.CreatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("persistent")
public class CreaturePersistentStorageImpl implements CreatureCache {
    @Autowired
    CreatureRepository creatureRepository;

    @Override
    public void saveCreature(Creature creature) {
        creatureRepository.save(creature);
    }

    @Override
    public Creature getCreatureByName(String name) {
        return creatureRepository.getCreatureByName(name);
    }

    @Override
    public List<Creature> getAllByDamagePerSecondGreaterThan(Integer damagePerSecondLimit) {
        return creatureRepository.getAllByDamagePerSecondGreaterThan(damagePerSecondLimit);
    }

    @Override
    public List<Creature> getAllByRace(RaceType raceType) {
        return creatureRepository.getAllByRace(raceType);
    }

    @Override
    public void deleteAllByLevelGreaterThenEqual(Integer level) {
        creatureRepository.deleteAllByLevelGreaterThanEqual(level);
    }


}

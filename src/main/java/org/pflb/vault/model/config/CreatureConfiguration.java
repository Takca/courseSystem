package org.pflb.vault.model.config;

import lombok.Getter;

@Getter
public class CreatureConfiguration {

    public static final CreatureStats elfStats = new CreatureStats(10, 100, 1, 10);
    public static final CreatureStats dragonStats = new CreatureStats(100, 1000, 1000, 1000);
    public static final CreatureStats dwarfStats = new CreatureStats(20, 1000, 1000, 0);
    public static final CreatureStats humanStats = new CreatureStats(100, 100, 100, -10);

    private CreatureConfiguration() {

    }
}

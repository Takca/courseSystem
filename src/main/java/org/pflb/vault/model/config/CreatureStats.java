package org.pflb.vault.model.config;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CreatureStats {
        int INITIAL_DPS;
        int INITIAL_HP;

        int DPS_PER_LVL;
        int HP_PER_LVL;

}

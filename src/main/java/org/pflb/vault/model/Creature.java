package org.pflb.vault.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@ToString
@EqualsAndHashCode
@Getter
@Setter
@Entity
@Table(name = "CREATURE")
public class Creature implements Serializable {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "hp")
    private Integer hitPoints;

    @Enumerated
    @Column(name = "race")
    private RaceType race;

    @Column(name = "dps")
    private Integer damagePerSecond;

    @Column(name = "name")
    private String name;

    @Column(name = "level")
    private Integer level;

}

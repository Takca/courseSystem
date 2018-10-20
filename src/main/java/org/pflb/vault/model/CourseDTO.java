package org.pflb.vault.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class CourseDTO implements Serializable {
    private Long id;
    private String name;
    private Integer numOfDays;
    private Set<StudentMarkDTO> marks = new HashSet<>();
}

package org.pflb.vault.model;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class CourseGetDTO extends CourseDTO {
    private Set<Student> freeStudents = new HashSet<>();
}

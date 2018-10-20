package org.pflb.vault.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class MetricsDTO implements Serializable {
    private Long numCurCourses;
    private Long numPastCourses;
    private Long numUpcomingCourses;
    private Long numStudents;
}

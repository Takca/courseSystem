package org.pflb.vault.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StudentMarkDTO {
    private Long studentId;
    private String studentName;
    private List<Integer> values;
}

package org.pflb.vault.service;

import org.pflb.vault.model.Mark;
import org.pflb.vault.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarkPersistentStorage {
    @Autowired
    MarkRepository markRepository;

    public List<Integer> findValuesByCourseIdAndStudentId(Long courseId, Long studentId) {
        return markRepository.findAllValuesByCourseIdAndStudentIdOrderById(courseId, studentId);
    }

    public List<Mark> findMarksByCourseIdAndStudentId(Long courseId, Long studentId) {
        return markRepository.findMarksByCourse_IdAndStudent_IdOrderById(courseId, studentId);
    }

    public void saveMarks(List<Mark> marks) {
        markRepository.saveAll(marks);
    }
}

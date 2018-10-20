package org.pflb.vault.repository;

import org.pflb.vault.model.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MarkRepository extends JpaRepository<Mark, Long> {
    @Query("SELECT m.value FROM Mark m JOIN m.course c JOIN m.student s where c.id = :courseId and s.id = :studentId ORDER BY m.id")
    List<Integer> findAllValuesByCourseIdAndStudentIdOrderById(@Param("courseId") Long courseId, @Param("studentId") Long studentId);

    List<Mark> findMarksByCourse_IdAndStudent_IdOrderById(Long courseId, Long studentId);
}

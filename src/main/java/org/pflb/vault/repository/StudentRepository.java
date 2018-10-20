package org.pflb.vault.repository;

import org.pflb.vault.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query("SELECT s FROM Student s WHERE s.id NOT IN (SELECT s.id FROM Student s LEFT JOIN s.courses c WHERE c.id = :courseId)")
    Set<Student> getAllWithoutCourse(@Param("courseId") Long id);
}

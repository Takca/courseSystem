package org.pflb.vault.repository;

import org.pflb.vault.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Long countAllByDateEndLessThan(Date date);
    Long countAllByDateStartGreaterThan(Date date);
    @Query("SELECT COUNT(c.id) FROM Course c WHERE c.dateStart <= :curDate AND c.dateEnd >= :curDate")
    Long countAllByDateBetweenDateStartAndDateEnd(@Param("curDate") Date date);
}

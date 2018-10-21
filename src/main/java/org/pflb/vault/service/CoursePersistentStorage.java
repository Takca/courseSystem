package org.pflb.vault.service;

import org.pflb.vault.model.Course;
import org.pflb.vault.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class CoursePersistentStorage {

    @Autowired
    CourseRepository courseRepository;

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course getCourseById(Long id) {
        return courseRepository.getOne(id);
    }

    public List<Course> getAll() {
        return courseRepository.findAll();
    }

    @Transactional
    public void deleteCourseById(Long id) {
        courseRepository.deleteById(id);
    }

    public Long countPastCourses(Date date) {
        return courseRepository.countAllByDateEndLessThan(date);
    }

    public Long countUpcomingCourses(Date date) {
        return courseRepository.countAllByDateStartGreaterThan(date);
    }

    public Long countCurrentCourses(Date date) {
        return courseRepository.countAllByDateBetweenDateStartAndDateEnd(date);
    }
}

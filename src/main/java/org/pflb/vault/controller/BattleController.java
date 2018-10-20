package org.pflb.vault.controller;

import org.pflb.vault.model.*;
import org.pflb.vault.service.CoursePersistentStorage;
import org.pflb.vault.service.MarkPersistentStorage;
import org.pflb.vault.service.StudentPersistentStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "null")
public class BattleController {

    @Autowired
    private StudentPersistentStorage studentStorage;

    @Autowired
    private CoursePersistentStorage coursePersistentStorage;

    @Autowired
    private MarkPersistentStorage markStorage;


    @GetMapping("user")
    public boolean isAuth(Principal principal) {
        return principal == null;
    }

    @PostMapping("students/")
    public Student createStudent(@RequestBody Student student) {
        return studentStorage.saveStudent(student);
    }

    @GetMapping("students/")
    public List<Student> getAllStudents() {
        return studentStorage.getAll();
    }

    @GetMapping("students/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentStorage.getStudentById(id);
    }

    @PutMapping("students/{id}")
    public Student updateStudentById(@PathVariable Long id, @RequestBody Student student) {
        Student studentFromDb = studentStorage.getStudentById(id);
        studentFromDb.setEmail(student.getEmail());
        studentFromDb.setName(student.getName());
        studentFromDb.setPhone(student.getPhone());
        return studentStorage.saveStudent(studentFromDb);
    }

    @DeleteMapping("students/{id}")
    public void deleteStudentById(@PathVariable Long id) {
        studentStorage.deleteStudentById(id);
    }

    @PostMapping("courses/")
    public Course createCourse(@RequestBody Course course) {
        return coursePersistentStorage.saveCourse(course);

    }

    @GetMapping("courses/")
    public List<Course> getAllCourses() {
        return coursePersistentStorage.getAll();
    }

    @GetMapping("courses/{id}")
    public CourseGetDTO getCourseById(@PathVariable Long id) {
        Course course = coursePersistentStorage.getCourseById(id);
        Set<Student> students = course.getStudents();
        CourseGetDTO courseDTO = new CourseGetDTO();
        courseDTO.setId(course.getId());
        courseDTO.setName(course.getName());
        courseDTO.setNumOfDays(course.getNumOfDays());
        for (Student student : students) {
            List<Integer> marks = markStorage.findValuesByCourseIdAndStudentId(course.getId(), student.getId());
            StudentMarkDTO studentMarkDTO = new StudentMarkDTO();
            studentMarkDTO.setStudentId(student.getId());
            studentMarkDTO.setStudentName(student.getName());
            studentMarkDTO.setValues(marks);
            courseDTO.getMarks().add(studentMarkDTO);
        }
        courseDTO.setFreeStudents(studentStorage.getStudentsWithoutCourse(id));

        return courseDTO;
    }

    @PutMapping("courses/{id}")
    public void updateCourseById(@PathVariable Long id, @RequestBody CourseDTO course) {
        //Course courseFromDb = coursePersistentStorage.getCourseById(id);
        for (StudentMarkDTO studentMark : course.getMarks()) {
            List<Mark> marks = markStorage.findMarksByCourseIdAndStudentId(id, studentMark.getStudentId());
            for (int i = 0; i < marks.size(); i++) {
                marks.get(i).setValue(studentMark.getValues().get(i));
            }
            markStorage.saveMarks(marks);
        }
    }

    @DeleteMapping("courses/{id}")
    public void deleteCourseById(@PathVariable Long id) {
        //List<Student> students = studentStorage.getAll();
        Course course = coursePersistentStorage.getCourseById(id);
        Set<Student> students = course.getStudents();

        for (Student student : students) {
            student.getCourses().remove(course);
        }

        coursePersistentStorage.saveCourse(course);
        coursePersistentStorage.deleteCourseById(id);
    }

    @PutMapping("courses/{courseId}/students/{studentId}")
    public String addStudentToCourse(@PathVariable Long courseId, @PathVariable Long studentId) {
        Course course = coursePersistentStorage.getCourseById(courseId);
        Student student = studentStorage.getStudentById(studentId);
        student.getCourses().add(course);

        List<Mark> marks = new ArrayList<>();
        for (int i = 0; i < course.getNumOfDays(); i++) {
            Mark mark = new Mark();
            mark.setStudent(student);
            mark.setCourse(course);
            mark.setValue(0);
            marks.add(mark);
        }


        studentStorage.saveStudent(student);
        markStorage.saveMarks(marks);
        return student.toString();
    }

    @GetMapping("metrics")
    public MetricsDTO getMetrics() {
        MetricsDTO metricsDTO = new MetricsDTO();
        metricsDTO.setNumPastCourses(coursePersistentStorage.countPastCourses(new Date()));
        metricsDTO.setNumUpcomingCourses(coursePersistentStorage.countUpcomingCourses(new Date()));
        metricsDTO.setNumCurCourses(coursePersistentStorage.countCurrentCourses(new Date()));
        metricsDTO.setNumStudents(studentStorage.countStudents());

        return metricsDTO;
    }
}

import Student from "./models/Student.js";
import Instructor from "./models/Instructor.js";
import Assessment from "./models/Assessment.js";
import Course from "./models/Course.js";

import WeightedGradingStrategy from "./strategies/WeightedGradingStrategy.js";
import PassFailGradingStrategy from "./strategies/PassFailGradingStrategy.js";

import AcademicPerformanceSystem from "./services/AcademicPerformanceSystem.js";

const system = new AcademicPerformanceSystem();

try {
  // -----------------------------
  // 1. Create instructors
  // -----------------------------
  const instructor1 = new Instructor("I001", "Dr. Tan", "Computer Science");
  const instructor2 = new Instructor("I002", "Ms. Lee", "Mathematics");

  system.addInstructor(instructor1);
  system.addInstructor(instructor2);

  // -----------------------------
  // 2. Create students
  // -----------------------------
  const student1 = new Student("S001", "Alice");
  const student2 = new Student("S002", "Ben");
  const student3 = new Student("S003", "Chloe");
  const student4 = new Student("S004", "Daniel");

  system.addStudent(student1);
  system.addStudent(student2);
  system.addStudent(student3);
  system.addStudent(student4);

  // -----------------------------
  // 3. Create grading strategies
  // -----------------------------
  const weightedStrategy = new WeightedGradingStrategy();
  const passFailStrategy = new PassFailGradingStrategy(50);

  // -----------------------------
  // 4. Create courses
  // -----------------------------
  const course1 = new Course(
    "CS101",
    "Programming Fundamentals",
    "I001",
    weightedStrategy,
  );

  const course2 = new Course(
    "MA201",
    "Discrete Mathematics",
    "I002",
    passFailStrategy,
  );

  system.addCourse(course1);
  system.addCourse(course2);

  // -----------------------------
  // 5. Add assessments to courses
  // -----------------------------
  course1.addAssessment(new Assessment("Quiz 1", 20, 100));
  course1.addAssessment(new Assessment("Midterm", 30, 100));
  course1.addAssessment(new Assessment("Final Exam", 50, 100));

  course2.addAssessment(new Assessment("Coursework", 40, 100));
  course2.addAssessment(new Assessment("Final Exam", 60, 100));

  // -----------------------------
  // 6. Enroll students
  // -----------------------------
  system.enrollStudent("S001", "CS101");
  system.enrollStudent("S002", "CS101");
  system.enrollStudent("S003", "CS101");
  system.enrollStudent("S004", "CS101");

  system.enrollStudent("S001", "MA201");
  system.enrollStudent("S002", "MA201");

  // -----------------------------
  // 7. Record scores for CS101
  // -----------------------------
  system.recordAssessmentScore("S001", "CS101", "Quiz 1", 80);
  system.recordAssessmentScore("S001", "CS101", "Midterm", 75);
  system.recordAssessmentScore("S001", "CS101", "Final Exam", 90);

  system.recordAssessmentScore("S002", "CS101", "Quiz 1", 85);
  system.recordAssessmentScore("S002", "CS101", "Midterm", 70);
  system.recordAssessmentScore("S002", "CS101", "Final Exam", 90);

  system.recordAssessmentScore("S003", "CS101", "Quiz 1", 85);
  system.recordAssessmentScore("S003", "CS101", "Midterm", 70);
  system.recordAssessmentScore("S003", "CS101", "Final Exam", 90);

  system.recordAssessmentScore("S004", "CS101", "Quiz 1", 70);
  system.recordAssessmentScore("S004", "CS101", "Midterm", 65);
  system.recordAssessmentScore("S004", "CS101", "Final Exam", 80);

  // -----------------------------
  // 8. Record scores for MA201
  // -----------------------------
  system.recordAssessmentScore("S001", "MA201", "Coursework", 60);
  system.recordAssessmentScore("S001", "MA201", "Final Exam", 55);

  system.recordAssessmentScore("S002", "MA201", "Coursework", 40);
  system.recordAssessmentScore("S002", "MA201", "Final Exam", 45);

  // -----------------------------
  // 9. Print student details
  // -----------------------------
  console.log("\n=== STUDENT DETAILS ===");
  console.log(student1.getDetails());
  console.log(student2.getDetails());

  // -----------------------------
  // 10. Print course details
  // -----------------------------
  console.log("\n=== COURSE DETAILS ===");
  console.log(course1.getDetails());
  console.log(course2.getDetails());

  // -----------------------------
  // 11. Calculate individual results
  // -----------------------------
  console.log("\n=== INDIVIDUAL RESULTS ===");
  console.log(
    `Alice (CS101): ${system.calculateStudentResult("S001", "CS101")}`,
  );
  console.log(`Ben (CS101): ${system.calculateStudentResult("S002", "CS101")}`);
  console.log(
    `Alice (MA201): ${system.calculateStudentResult("S001", "MA201")}`,
  );
  console.log(`Ben (MA201): ${system.calculateStudentResult("S002", "MA201")}`);

  // -----------------------------
  // 12. Print rankings for CS101
  // -----------------------------
  console.log("\n=== CS101 RANKINGS ===");
  const rankings = system.getCourseRankings("CS101");
  console.table(rankings);

  // -----------------------------
  // 13. Print top students
  // -----------------------------
  console.log("\n=== TOP 3 STUDENTS IN CS101 ===");
  console.table(system.getTopStudents("CS101", 3));
} catch (error) {
  console.error("Error:", error.message);
}
